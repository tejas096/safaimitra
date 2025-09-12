import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Trophy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: Question[];
  title: string;
  onComplete?: (score: number) => void;
}

const Quiz = ({ questions, title, onComplete }: QuizProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [score, setScore] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer;
    const newScore = isCorrect ? score + 10 : score;
    setScore(newScore);

    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowFinalResult(true);
        onComplete?.(newScore);
      }
    }, 2000);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setShowFinalResult(false);
    setScore(0);
  };

  const getScoreMessage = (finalScore: number) => {
    const percentage = (finalScore / (questions.length * 10)) * 100;
    if (percentage >= 90)
      return { message: "Outstanding! 🌟", color: "text-success" };
    if (percentage >= 80)
      return { message: "Excellent! 🎉", color: "text-success" };
    if (percentage >= 70)
      return { message: "Good job! 👍", color: "text-primary" };
    if (percentage >= 60)
      return { message: "Not bad! 📚", color: "text-warning" };
    return { message: "Keep practicing! 💪", color: "text-destructive" };
  };

  if (showFinalResult) {
    const scoreMessage = getScoreMessage(score);
    return (
      <Card className="eco-card bounce-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 eco-gradient rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>
            Congratulations on finishing the training quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-3xl font-bold eco-gradient rounded-full bg-clip-text">
              {score} / {questions.length * 10}
            </div>
            <p className={`text-lg font-medium ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
            <p className="text-muted-foreground">
              You got{" "}
              {
                answers.filter(
                  (answer, index) => answer === questions[index].correctAnswer
                ).length
              }{" "}
              out of {questions.length} questions correct
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-primary">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor((score / (questions.length * 10)) * 5)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleRetake}
            className="eco-gradient text-primary-foreground hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = showResult && selectedAnswer === question.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="eco-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Current Score: {score} points</span>
            <span>Max Score: {questions.length * 10} points</span>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="eco-card">
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1}
          </CardTitle>
          <CardDescription className="text-base text-foreground">
            {question.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`p-4 h-auto text-left justify-start transition-all ${
                  showResult
                    ? index === question.correctAnswer
                      ? "border-success bg-success/10 text-success"
                      : index === selectedAnswer &&
                        selectedAnswer !== question.correctAnswer
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "opacity-50"
                    : selectedAnswer === index
                    ? "eco-gradient text-primary-foreground"
                    : ""
                }`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {showResult &&
                    index === selectedAnswer &&
                    selectedAnswer !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                </div>
              </Button>
            ))}
          </div>

          {showResult && question.explanation && (
            <div
              className={`p-4 rounded-lg border ${
                isCorrect
                  ? "border-success bg-success/10 text-black"
                  : "border-warning bg-warning/10 text-black"
              }`}
            >
              <h4 className="font-semibold mb-2">
                {isCorrect ? "Correct!" : "Explanation:"}
              </h4>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showResult}
              className="eco-gradient text-primary-foreground hover:opacity-90"
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
