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
    console.error('Error in flash card route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
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
        content: `You are an AI system designed to generate multiple-choice questions (MCQs) based on planetary information.

Task Description:
You have basic details about a planet, such as its physical properties, atmosphere, gravity, orbit, and unique features.
Your task is to generate 4 high-quality multiple-choice questions (MCQs) that test a user's knowledge about the planet. do not include any other text than the list of json object.

Each MCQ should:

Be clear and scientifically accurate.
Have four answer choices.
Include one correct answer and three plausible incorrect answers.
Provide a short explanation of why the correct answer is right.
[
  {
      question: "What is the main purpose of a rocket's launch escape system?",
      options: [
        "To safely separate crew from rocket during emergencies",
        "To make the rocket go faster",
        "To store extra fuel",
        "To communicate with Earth"
      ],
      correctAnswer: 0,
      explanation: "The launch escape system is like a safety belt for astronauts - it pulls the crew capsule away from the rocket if something goes wrong during launch."
    }
]`,
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