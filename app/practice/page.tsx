// "use client";

// import React, { useState } from 'react';
// import { Card } from '../ui/card';
// import { ChevronRight, Monitor, BookOpen } from 'lucide-react';
// import { JSX } from 'react/jsx-runtime';
// import NavBar from '../components/nav-bar';

// type ModeType = 'mcq' | 'flashcards' | null;
// type DifficultyType = 'basic' | 'intermediate' | 'advanced' | null;

// interface Mode {
//   id: 'mcq' | 'flashcards';
//   title: string;
//   description: string;
//   icon: JSX.Element;
// }

// interface Difficulty {
//   id: 'basic' | 'intermediate' | 'advanced';
//   title: string;
//   color: string;
// }

// interface Flashcard {
//   question: string;
//   answer: string;
// }

// const PracticePage = () => {
//   const [selectedMode, setSelectedMode] = useState<ModeType>(null);
//   const [difficulty, setDifficulty] = useState<DifficultyType>(null);
//   const [currentCard, setCurrentCard] = useState(0);
//   const [isFlipped, setIsFlipped] = useState(false);

//   const modes: Mode[] = [
//     {
//       id: 'mcq',
//       title: "Multiple Choice Questions",
//       description: "Test your knowledge with interactive quizzes",
//       icon: <Monitor className="w-12 h-12" />,
//     },
//     {
//       id: 'flashcards',
//       title: "Flash Cards",
//       description: "Learn and memorize with interactive flashcards",
//       icon: <BookOpen className="w-12 h-12" />,
//     }
//   ];

//   const difficulties: Difficulty[] = [
//     { id: 'basic', title: 'Basic', color: 'bg-green-500' },
//     { id: 'intermediate', title: 'Intermediate', color: 'bg-yellow-500' },
//     { id: 'advanced', title: 'Advanced', color: 'bg-red-500' }
//   ];

//   const flashcards: Flashcard[] = [
//     { question: "What is the closest planet to the Sun?", answer: "Mercury" },
//     { question: "Which planet is known as the Red Planet?", answer: "Mars" }
//   ];

//   const handleCardSwipe = () => {
//     setIsFlipped(false);
//     setTimeout(() => {
//       setCurrentCard((prev) => (prev + 1) % flashcards.length);
//     }, 300);
//   };

//   return (
//       <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white p-8">
//            <NavBar/>
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">Practice & Learn</h1>
//           <p className="text-xl text-gray-300">Choose your learning style</p>
//         </div>

//         {!selectedMode && (
//           <div className="grid md:grid-cols-2 gap-6">
//             {modes.map((mode) => (
//               <Card
//                 key={mode.id}
//                 className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all transform hover:scale-105 cursor-pointer"
//                 onClick={() => setSelectedMode(mode.id)}
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="text-blue-400 mr-4">{mode.icon}</div>
//                   <div>
//                     <h3 className="text-xl font-semibold">{mode.title}</h3>
//                   </div>
//                 </div>
//                 <p className="text-gray-300">{mode.description}</p>
//               </Card>
//             ))}
//           </div>
//         )}

//         {selectedMode === 'mcq' && !difficulty && (
//           <div className="space-y-4">
//             <button
//               className="text-blue-400 mb-4 flex items-center"
//               onClick={() => setSelectedMode(null)}
//             >
//               <ChevronRight className="w-4 h-4 mr-2" /> Back
//             </button>
//             <h2 className="text-2xl font-bold mb-6">Select Difficulty Level</h2>
//             <div className="grid md:grid-cols-3 gap-4">
//               {difficulties.map((diff) => (
//                 <Card
//                   key={diff.id}
//                   className={`p-6 rounded-lg cursor-pointer transform transition-all hover:scale-105 ${diff.color}/20 hover:${diff.color}/30`}
//                   onClick={() => setDifficulty(diff.id)}
//                 >
//                   <h3 className="text-xl font-bold">{diff.title}</h3>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {selectedMode === 'flashcards' && (
//           <div className="flex flex-col items-center">
//             <button
//               className="text-blue-400 mb-4 self-start flex items-center"
//               onClick={() => setSelectedMode(null)}
//             >
//               <ChevronRight className="w-4 h-4 mr-2" /> Back
//             </button>
//             <div
//               className={`w-96 h-64 bg-blue-900/30 rounded-xl p-6 cursor-pointer transform transition-all duration-300 perspective-1000 ${isFlipped ? 'rotate-y-180' : ''}`}
//               onClick={() => setIsFlipped(!isFlipped)}
//             >
//               <div className="relative w-full h-full">
//                 <div className={`absolute w-full h-full backface-hidden transition-all duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
//                   <div className="flex items-center justify-center h-full text-xl">
//                     {flashcards[currentCard].question}
//                   </div>
//                 </div>
//                 <div className={`absolute w-full h-full backface-hidden transition-all duration-300 rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
//                   <div className="flex items-center justify-center h-full text-xl">
//                     {flashcards[currentCard].answer}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               className="mt-6 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//               onClick={handleCardSwipe}
//             >
//               Next Card
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PracticePage;





"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { ChevronRight, Monitor, BookOpen, Star, Users, Trophy } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import NavBar from '../components/nav-bar';
// Inline TypewriterEffect component to avoid import issues
const TypewriterEffect = ({ texts, speed = 50, delay = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < texts[currentTextIndex].length) {
          setCurrentText(texts[currentTextIndex].slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((current) => (current + 1) % texts.length);
        } else {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, delay]);

  return (
    <span className="text-blue-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

type ModeType = 'mcq' | 'flashcards' | null;
type DifficultyType = 'basic' | 'intermediate' | 'advanced' | null;

interface Mode {
  id: 'mcq' | 'flashcards';
  title: string;
  description: string;
  icon: JSX.Element;
}

interface Difficulty {
  id: 'basic' | 'intermediate' | 'advanced';
  title: string;
  color: string;
}

interface Flashcard {
  question: string;
  answer: string;
}

const PracticePage = () => {
  const [selectedMode, setSelectedMode] = useState<ModeType>(null);
  const [difficulty, setDifficulty] = useState<DifficultyType>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
      label: "Active Learners"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      value: "4.8/5",
      label: "Average Rating"
    },
    {
      icon: <Trophy className="w-6 h-6 text-green-400" />,
      value: "10k+",
      label: "Questions Answered"
    }
  ];

  const modes: Mode[] = [
    {
      id: 'mcq',
      title: "Multiple Choice Questions",
      description: "Perfect for exam preparation! Test yourself with carefully crafted questions across different difficulty levels. Get instant feedback and detailed explanations.",
      icon: <Monitor className="w-12 h-12" />,
    },
    {
      id: 'flashcards',
      title: "Interactive Flash Cards",
      description: "Master key concepts through active recall! Flip cards to test your memory, track your progress, and reinforce your understanding.",
      icon: <BookOpen className="w-12 h-12" />,
    }
  ];

  const difficulties: Difficulty[] = [
    { id: 'basic', title: 'Basic', color: 'bg-green-500' },
    { id: 'intermediate', title: 'Intermediate', color: 'bg-yellow-500' },
    { id: 'advanced', title: 'Advanced', color: 'bg-red-500' }
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

const basicQuestions  = [
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
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: [
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn"
      ],
      correctAnswer: 1,
      explanation: "Mars is called the Red Planet because its surface contains lots of iron oxide (rust), which gives it a reddish color that we can see from Earth!"
    },
    {
      question: "What does ISS stand for?",
      options: [
        "International Space Station",
        "Interplanetary Space System",
        "Internal Space Service",
        "International Star Station"
      ],
      correctAnswer: 0,
      explanation: "The ISS (International Space Station) is like a giant space house where astronauts from different countries live and work together while orbiting Earth."
    },
    {
      question: "Which of these is NOT a type of space telescope?",
      options: [
        "Radio telescope",
        "X-ray telescope",
        "Optical telescope",
        "Sonic telescope"
      ],
      correctAnswer: 3,
      explanation: "Sonic telescope isn't real - sound can't travel in space! We use radio, X-ray, and optical telescopes to study different types of light and radiation from space."
    }
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

  const handleDifficultySelect = (diff: DifficultyType) => {
    setDifficulty(diff);
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white p-8">
          <NavBar />
          
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Practice & Learn</h1>
          <div className="h-8 mb-4">
            <TypewriterEffect texts={typingTexts} speed={70} delay={2000} />
          </div>
          <p className="text-xl text-gray-300 mb-8">Choose your learning style and boost your understanding!</p>
          <p className="text-md text-gray-400 max-w-2xl mx-auto">
            Everyone learns differently! Select the method that works best for you. 
            Whether you prefer structured quizzes or interactive flashcards, we've got you covered.
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

        {!selectedMode && (
          <div className="grid md:grid-cols-2 gap-6">
            {modes.map((mode) => (
              <Card 
                key={mode.id}
                className="bg-blue-900/30 p-8 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedMode(mode.id)}
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

        {selectedMode === 'mcq' && !difficulty && (
          <div className="space-y-4">
            <button 
              className="text-blue-400 mb-4 flex items-center"
              onClick={() => setSelectedMode(null)}
            >
              <ChevronRight className="w-4 h-4 mr-2" /> Back
            </button>
            <h2 className="text-2xl font-bold mb-6">Select Difficulty Level</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {difficulties.map((diff) => (
                <Card
                  key={diff.id}
                  className={`p-6 rounded-lg cursor-pointer transform transition-all hover:scale-105 ${diff.color}/20 hover:${diff.color}/30`}
                  onClick={() => handleDifficultySelect(diff.id)}
                >
                  <h3 className="text-xl font-bold">{diff.title}</h3>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedMode === 'mcq' && difficulty && showQuiz && !showResult && (
          <div className="max-w-3xl mx-auto">
            <button 
              className="text-blue-400 mb-4 flex items-center"
              onClick={() => setDifficulty(null)}
            >
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
                  {basicQuestions[currentQuestion].options.map((option, index) => (
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