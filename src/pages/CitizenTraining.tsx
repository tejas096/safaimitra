import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import Quiz from "@/components/Quiz";

const citizenQuestions = [
  {
    id: 1,
    question: "Which bin should you use for plastic bottles?",
    options: [
      "General waste bin",
      "Organic waste bin",
      "Recycling bin",
      "Hazardous waste bin",
    ],
    correctAnswer: 2,
    explanation:
      "Plastic bottles are recyclable materials and should be placed in the recycling bin to support environmental sustainability.",
  },
  {
    id: 2,
    question: "What should you do before putting items in the recycling bin?",
    options: [
      "Break them into small pieces",
      "Clean and rinse them",
      "Leave them as they are",
      "Mix them with other waste",
    ],
    correctAnswer: 1,
    explanation:
      "Items should be cleaned and rinsed before recycling to prevent contamination and ensure proper processing.",
  },
  {
    id: 3,
    question: "Which of these items belongs in organic waste?",
    options: [
      "Plastic bags",
      "Food scraps and yard trimmings",
      "Electronics",
      "Metal cans",
    ],
    correctAnswer: 1,
    explanation:
      "Organic waste includes food scraps, yard trimmings, and other biodegradable materials that can be composted.",
  },
  {
    id: 4,
    question: "How should you dispose of old electronics?",
    options: [
      "Regular trash bin",
      "Recycling bin",
      "Special e-waste collection points",
      "Bury them in the yard",
    ],
    correctAnswer: 2,
    explanation:
      "Electronics contain valuable and hazardous materials and should be taken to special e-waste collection points for proper processing.",
  },
  {
    id: 5,
    question: "What is the best way to reduce household waste?",
    options: [
      "Buy more disposable items",
      "Reuse, reduce, and recycle",
      "Burn everything",
      "Throw everything away",
    ],
    correctAnswer: 1,
    explanation:
      "The 3 Rs - Reduce, Reuse, and Recycle - are the most effective ways to minimize household waste and environmental impact.",
  },
  {
    id: 6,
    question: "Which items should NOT go in the recycling bin?",
    options: [
      "Clean paper and cardboard",
      "Glass bottles",
      "Dirty diapers and food waste",
      "Aluminum cans",
    ],
    correctAnswer: 2,
    explanation:
      "Dirty diapers, food waste, and other contaminated items should not go in recycling as they can contaminate other recyclables.",
  },
  {
    id: 7,
    question: "How often should you take out your household waste?",
    options: [
      "Once a month",
      "When bins are full or on collection day",
      "Only when it smells",
      "Never",
    ],
    correctAnswer: 1,
    explanation:
      "Waste should be taken out when bins are full or on scheduled collection days to prevent overflow and maintain hygiene.",
  },
  {
    id: 8,
    question: "What should you do with hazardous materials like batteries?",
    options: [
      "Throw in regular trash",
      "Put in recycling",
      "Take to special collection centers",
      "Keep them forever",
    ],
    correctAnswer: 2,
    explanation:
      "Hazardous materials like batteries contain toxic substances and should be taken to special collection centers for safe disposal.",
  },
  {
    id: 9,
    question: "Why is proper waste sorting important?",
    options: [
      "It's not important",
      "To make the bins look organized",
      "To protect the environment and enable recycling",
      "To make collection faster only",
    ],
    correctAnswer: 2,
    explanation:
      "Proper waste sorting protects the environment, enables effective recycling, and reduces the burden on landfills.",
  },
  {
    id: 10,
    question: "What can you do with glass jars and bottles?",
    options: [
      "Always throw them away",
      "Reuse them or put in glass recycling",
      "Break them and throw away",
      "Bury them in the garden",
    ],
    correctAnswer: 1,
    explanation:
      "Glass jars and bottles can be reused for storage or crafts, or placed in glass recycling bins for processing into new products.",
  },
];

const CitizenTraining = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const handleVideoComplete = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
  };

  return (
    <div className="min-h-screen eco-gradient-light">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 fade-in-up">
          <Link to="/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Training Hub
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Citizen Training Module
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn how to properly sort waste and protect the environment
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showQuiz ? (
            <VideoPlayer
              title="Citizen Waste Management Education"
              description="Learn the fundamentals of waste sorting, recycling, and environmental responsibility. Discover how your actions can make a difference in creating a sustainable community."
              onVideoComplete={handleVideoComplete}
            />
          ) : (
            <Quiz
              questions={citizenQuestions}
              title="Environmental Responsibility Assessment"
              onComplete={handleQuizComplete}
            />
          )}

          {finalScore !== null && (
            <div className="mt-8 text-center">
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  Return to Training Hub
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenTraining;
