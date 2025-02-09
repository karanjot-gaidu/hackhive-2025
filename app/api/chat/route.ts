import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq();

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const message = body.message;

    // Get the chat completion
    const chatCompletion = await getGroqChatCompletion(message);
    
    // Return the AI response
    return NextResponse.json({ 
      message: chatCompletion.choices[0]?.message?.content || "No response generated"
    });

  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

export const getGroqChatCompletion = async (message: string) => {
  return groq.chat.completions.create({
    //
    // Required parameters
    //
    messages: [
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
      {
        role: "system",
        content: "You are a highly knowledgeable AI astronomer specializing in celestial bodies. When given the name of a planet, star, moon, asteroid, or any other cosmic object, provide an engaging and detailed response. Give short consice answers unless stated otherwise.",
      },
      // Set a user message for the assistant to respond to.
      {
        role: "user",
        content: message,
      },
    ],

    // The language model which will generate the completion.
    model: "llama-3.3-70b-versatile",

    //
    // Optional parameters
    //

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.5,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_completion_tokens: 1024,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    stop: null,

    // If set, partial message deltas will be sent.
    stream: false,
  });
};