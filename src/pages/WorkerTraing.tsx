import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import Quiz from "@/components/Quiz";

const workerQuestions = [
  {
    id: 1,
    question: "What is the first step in waste collection safety protocol?",
    options: [
      "Start collecting immediately",
      "Wear proper personal protective equipment (PPE)",
      "Check the weather",
      "Count the number of bins",
    ],
    correctAnswer: 1,
    explanation:
      "Always wear proper PPE including gloves, safety vest, and closed-toe shoes before beginning any waste collection activities.",
  },
  {
    id: 2,
    question: "How should hazardous waste be handled?",
    options: [
      "Mix it with regular waste",
      "Use special containers and follow strict protocols",
      "Dispose of it in any bin",
      "Leave it for someone else",
    ],
    correctAnswer: 1,
    explanation:
      "Hazardous waste requires special handling procedures, proper containers, and adherence to safety protocols to protect workers and the environment.",
  },
  {
    id: 3,
    question: "What should you do if you encounter a sharp object in waste?",
    options: [
      "Pick it up with bare hands",
      "Use proper tools and puncture-resistant gloves",
      "Ignore it",
      "Throw it back",
    ],
    correctAnswer: 1,
    explanation:
      "Sharp objects should always be handled with appropriate tools and puncture-resistant gloves to prevent injury.",
  },
  {
    id: 4,
    question:
      "What is the correct lifting technique for heavy waste containers?",
    options: [
      "Bend your back and lift quickly",
      "Use your legs, keep your back straight, and lift slowly",
      "Use only one arm",
      "Don't lift anything heavy",
    ],
    correctAnswer: 1,
    explanation:
      "Proper lifting technique involves bending your knees, keeping your back straight, and using your leg muscles to prevent injury.",
  },
  {
    id: 5,
    question: "How often should waste collection vehicles be inspected?",
    options: ["Once a year", "Only when broken", "Daily before use", "Never"],
    correctAnswer: 2,
    explanation:
      "Daily vehicle inspections ensure safety and help identify potential issues before they become serious problems.",
  },
  {
    id: 6,
    question:
      "What should you do if you find medical waste mixed with regular waste?",
    options: [
      "Continue with regular collection",
      "Stop and call a supervisor",
      "Mix it all together",
      "Throw it away quickly",
    ],
    correctAnswer: 1,
    explanation:
      "Medical waste requires special handling and disposal procedures. Always contact a supervisor when encountered.",
  },
  {
    id: 7,
    question: "Which of these is NOT proper PPE for waste workers?",
    options: [
      "Safety gloves",
      "High-visibility vest",
      "Sandals",
      "Safety glasses",
    ],
    correctAnswer: 2,
    explanation:
      "Sandals do not provide adequate foot protection. Closed-toe safety shoes are required for waste collection work.",
  },
  {
    id: 8,
    question: "What is the maximum weight a worker should lift alone?",
    options: [
      "As much as possible",
      "Follow company guidelines and safety limits",
      "100 pounds always",
      "Whatever fits in the truck",
    ],
    correctAnswer: 1,
    explanation:
      "Weight limits vary by company and regulations, but workers should always follow established safety guidelines to prevent injury.",
  },
  {
    id: 9,
    question: "How should you handle aggressive animals during collection?",
    options: [
      "Approach them directly",
      "Make noise to scare them",
      "Maintain distance and contact animal control if needed",
      "Feed them to calm them down",
    ],
    correctAnswer: 2,
    explanation:
      "For safety, maintain a safe distance from aggressive animals and contact appropriate authorities like animal control when necessary.",
  },
  {
    id: 10,
    question:
      "What should be done with recyclable materials found in regular waste?",
    options: [
      "Leave them in regular waste",
      "Separate and place in appropriate recycling containers",
      "Throw them away faster",
      "Take them home",
    ],
    correctAnswer: 1,
    explanation:
      "Recyclable materials should be separated and placed in appropriate recycling containers to support environmental sustainability.",
  },
];

const WorkerTraining = () => {
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
        {/* Header */}
        <div className="mb-8 fade-in-up">
          <Link to="/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Training Hub
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Worker Training Module
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional safety training for waste management workers
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {!showQuiz ? (
            <VideoPlayer
              title="Waste Management Worker Safety Training"
              description="This comprehensive video covers safety protocols, proper equipment usage, handling procedures, and emergency responses for waste management workers."
              onVideoComplete={handleVideoComplete}
            />
          ) : (
            <Quiz
              questions={workerQuestions}
              title="Worker Safety Assessment"
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

export default WorkerTraining;
