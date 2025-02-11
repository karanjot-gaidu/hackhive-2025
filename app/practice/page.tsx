"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { ChevronRight, Monitor, BookOpen, Star, Users, Trophy } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import NavBar from "../components/nav-bar";
import { useUser } from "@clerk/nextjs";

// Inline TypewriterEffect component to avoid import issues
const TypewriterEffect = ({
  texts = [],
  speed = 50,
  delay = 2000,
}: {
  texts: string[];
  speed?: number;
  delay?: number;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        setCurrentText(currentText.slice(0, -1));
      }
    } else {
      if (currentText.length < texts[currentTextIndex].length) {
        setCurrentText(currentText + texts[currentTextIndex].charAt(currentText.length));
      } else {
        setTimeout(() => setIsDeleting(true), delay);
      }
    }
  }, [currentText, isDeleting, currentTextIndex, texts, delay]);

  return (
    <span className="text-blue-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const PracticePage = () => {
  const [selectedMode, setSelectedMode] = useState<"mcq" | "flashcards" | null>(null);
  const [difficulty, setDifficulty] = useState<"basic" | "intermediate" | "advanced" | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);

  const { user } = useUser();

  const typingTexts = [
    "Ready to test your knowledge?",
    "Challenge yourself!",
    "Learn something new today!",
    "Practice makes perfect!",
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      value: "500+",
      label: "Active Learners",
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      value: "4.8/5",
      label: "Average Rating",
    },
    {
      icon: <Trophy className="w-6 h-6 text-green-400" />,
      value: "10k+",
      label: "Questions Answered",
    },
  ];

  const modes = [
    {
      id: "mcq",
      title: "Multiple Choice Questions",
      description:
        "Perfect for exam preparation! Test yourself with carefully crafted questions across different difficulty levels. Get instant feedback and detailed explanations.",
      icon: <Monitor className="w-12 h-12" />,
    },
    {
      id: "flashcards",
      title: "Interactive Flash Cards",
      description:
        "Master key concepts through active recall! Flip cards to test your memory, track your progress, and reinforce your understanding.",
      icon: <BookOpen className="w-12 h-12" />,
    },
  ];

  const difficulties = [
    { id: "basic", title: "Basic", color: "bg-green-500" },
    { id: "intermediate", title: "Intermediate", color: "bg-yellow-500" },
    { id: "advanced", title: "Advanced", color: "bg-red-500" },
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const basicQuestions = [
    {
      question: "What is Mercury's closest distance to the Sun?",
      options: [
        "57.91 million kilometers",
        "108.2 million kilometers",
        "227.9 million kilometers",
        "384,400 kilometers",
      ],
      correctAnswer: 0,
      explanation:
        "Mercury's closest distance to the Sun, known as perihelion, is 57.91 million kilometers, which is much closer than Earth's average distance.",
    },
    {
      question: "What is the length of a day on Mercury?",
      options: [
        "58.6 Earth days",
        "24 hours",
        "365 days",
        "88 Earth days",
      ],
      correctAnswer: 0,
      explanation:
        "A day on Mercury, from one sunrise to the next, lasts 58.6 Earth days, much longer than an Earth day.",
    },
    {
      question: "What is the primary component of Mercury's atmosphere?",
      options: [
        "Oxygen",
        "Nitrogen",
        "Carbon dioxide",
        "It has no significant atmosphere",
      ],
      correctAnswer: 3,
      explanation:
        "Mercury has no significant atmosphere, as it is too small and lacks the gravity to retain one.",
    },
    {
      question: "What is Mercury's surface gravity compared to Earth's?",
      options: [
        "It is about 0.38 times Earth's gravity",
        "It is about the same as Earth's gravity",
        "It is about 1.5 times Earth's gravity",
        "It is about 3 times Earth's gravity",
      ],
      correctAnswer: 0,
      explanation:
        "Mercury's surface gravity is about 0.38 times that of Earth's, which is less than the gravity we experience here.",
    },
  ];

  const handleAnswerSubmit = (selectedOption: number) => {
    if (selectedOption === basicQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < basicQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setShowQuiz(true);
  };

  const handleDifficultySelect = (diff: "basic" | "intermediate" | "advanced" | null) => {
    setDifficulty(diff);
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white p-8 relative overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/space.jpg')" }}
      />
      <NavBar />
      <div className="max-w-6xl mx-auto mt-20 z-10 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Practice & Learn</h1>
          <div className="h-8 mb-4">
            <TypewriterEffect texts={typingTexts} speed={70} delay={2000} />
          </div>
          <p className="text-xl text-gray-300 mb-8">Choose your learning style and boost your understanding!</p>
          <p className="text-md text-gray-400 max-w-2xl mx-auto">
            Everyone learns differently! Select the method that works best for you. Whether you prefer structured quizzes or interactive flashcards, we've got you covered.
          </p>

          {/* Stats Section */}
          {!selectedMode && (
            <div className="grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-blue-900/30 p-4 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mode Selection */}
        {!selectedMode && (
          <div className="grid md:grid-cols-2 gap-6">
            {modes.map((mode) => (
              <Card
                key={mode.id}
                className="bg-blue-900/30 p-8 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedMode(mode.id as "mcq" | "flashcards")}
              >
                <div className="flex items-center mb-6">
                  <div className="text-blue-400 mr-6">{mode.icon}</div>
                  <div>
                    <h3 className="text-2xl font-semibold">{mode.title}</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{mode.description}</p>
                <div className="mt-6 flex items-center text-blue-400 text-sm">
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Flashcards or Quiz Mode */}
        {selectedMode === "mcq" && !difficulty && (
          <div className="space-y-4">
            <button className="text-blue-400 mb-4 flex items-center" onClick={() => setSelectedMode(null)}>
              <ChevronRight className="w-4 h-4 mr-2" /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6">Select Difficulty Level</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {difficulties.map((diff) => (
                <Card
                  key={diff.id}
                  className={`p-6 rounded-lg cursor-pointer transform transition-all hover:scale-105 ${diff.color}/20 hover:${diff.color}/30`}
                  onClick={() => handleDifficultySelect(diff.id as "basic" | "intermediate" | "advanced")}
                >
                  <h3 className="text-xl font-bold">{diff.title}</h3>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedMode === "mcq" && difficulty && showQuiz && !showResult && (
          <div className="max-w-3xl mx-auto">
            <button className="text-blue-400 mb-4 flex items-center" onClick={() => setDifficulty(null)}>
              <ChevronRight className="w-4 h-4 mr-2" /> Back to Difficulty Selection
            </button>

            <div className="bg-blue-900/30 p-8 rounded-lg backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Question {currentQuestion + 1} of {basicQuestions.length}</h3>
                <span className="text-blue-400">Score: {score}</span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">{basicQuestions[currentQuestion].question}</h2>
                <div className="space-y-4">
                  {basicQuestions[currentQuestion].options.map((option: string, index: number) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 rounded bg-blue-800/30 hover:bg-blue-700/30 transition-colors"
                      onClick={() => handleAnswerSubmit(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {basicQuestions[currentQuestion].explanation && (
                <div className="mt-6 p-4 bg-blue-800/20 rounded-lg">
                  <p className="text-sm text-gray-300">{basicQuestions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {showResult && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-blue-900/30 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-6">Your score: {score} out of {basicQuestions.length}</p>
              <div className="space-x-4">
                <button
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={restartQuiz}
                >
                  Try Again
                </button>
                <button
                  className="px-6 py-3 bg-blue-600/50 rounded-lg hover:bg-blue-700/50 transition-colors"
                  onClick={() => {
                    setDifficulty(null);
                    setShowResult(false);
                  }}
                >
                  Choose Different Difficulty
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;
