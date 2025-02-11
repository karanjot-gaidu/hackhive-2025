import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

const AiChat = ({ selectedPlanet }: { selectedPlanet: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference to scroll to the bottom

  // Load messages from localStorage on component mount or planet change
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatMessages-${selectedPlanet}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with a welcome message if no previous messages exist
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Welcome! Ask me anything about ${selectedPlanet}!`,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedPlanet]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chatMessages-${selectedPlanet}`, JSON.stringify(messages));
    }
  }, [messages, selectedPlanet]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `The selected object is ${selectedPlanet}. ${inputText}`,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message || "Sorry, I couldn't process that.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    // Clear messages from both state and localStorage
    localStorage.removeItem(`chatMessages-${selectedPlanet}`);
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden">
      <h3 className="text-xl font-bold text-white p-4 border-b border-gray-600 flex justify-start items-center">
        AI Chat
        <button
          onClick={handleClearHistory}
          className="text-sm text-red-500 hover:text-red-700 ml-4 mt-1"
        >
          Clear History
        </button>
      </h3>
      {/* Chat Messages Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'none' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white text-right"
                  : "bg-gray-800 text-gray-100 text-left"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-2 opacity-70">
                {format(new Date(message.timestamp), "HH:mm • MMM d, yyyy")}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Animation */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to the end of the chat */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about space..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChat;
