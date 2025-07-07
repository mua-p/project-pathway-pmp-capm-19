import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flag, 
  Grid3X3, 
  CheckCircle,
  Circle,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import AppNav from "@/components/AppNav";
import { Question, ExamSession, Answer } from "@/types";
import { apiService } from "@/services/api";
import { formatTime, getDifficultyColor } from "@/utils/helpers";

const ExamInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    initializeExam();
  }, []);

  const initializeExam = async () => {
    try {
      const sessionId = location.state?.sessionId;
      if (!sessionId) {
        navigate('/dashboard');
        return;
      }

      const [questionsData] = await Promise.all([
        apiService.getExamQuestions(sessionId),
      ]);

      setQuestions(questionsData);
      setAnswers(new Array(questionsData.length).fill(null).map(() => ({ 
        questionId: '', 
        selectedOption: -1, 
        timeSpent: 0 
      })));
      
      // Set initial time - this would come from the session/stage data
      setTimeLeft(5400); // 90 minutes default
      setQuestionStartTime(Date.now());
      
      setExamSession({ 
        id: sessionId, 
        userId: '', 
        stageId: '', 
        startTime: new Date().toISOString(),
        answers: [],
        status: 'in_progress'
      });
      
    } catch (error) {
      console.error('Failed to initialize exam:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const totalQuestions = questions.length;
  const currentQuestionData = questions[currentQuestion];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted && !loading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      // Auto-submit when time runs out
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, loading]);

  const getTimeColor = () => {
    if (timeLeft < 600) return 'text-destructive'; // Less than 10 minutes
    if (timeLeft < 1800) return 'text-warning'; // Less than 30 minutes
    return 'text-foreground';
  };

  const handleAnswerSelect = async (optionIndex: number) => {
    if (!examSession || !currentQuestionData) return;
    
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: currentQuestionData.id,
      selectedOption: optionIndex,
      timeSpent
    };
    setAnswers(newAnswers);

    // Submit answer to backend
    try {
      await apiService.submitAnswer(
        examSession.id, 
        currentQuestionData.id, 
        optionIndex, 
        timeSpent
      );
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setShowQuestionGrid(false);
    setQuestionStartTime(Date.now());
  };

  const handleSubmit = async () => {
    if (!examSession) return;
    
    setIsSubmitted(true);
    try {
      const result = await apiService.submitExam(examSession.id);
      navigate('/results', { state: { examResult: result, sessionId: examSession.id } });
    } catch (error) {
      console.error('Failed to submit exam:', error);
      setIsSubmitted(false);
    }
  };

  const answeredCount = answers.filter(answer => answer.selectedOption !== -1).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  const QuestionGrid = () => (
    <Card className="absolute top-16 left-4 w-80 z-50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Question Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-10 gap-2">
          {questions.map((_, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentQuestion ? "default" : answers[index]?.selectedOption !== -1 ? "outline" : "ghost"}
              className={`h-8 w-8 p-0 text-xs ${
                index === currentQuestion 
                  ? 'bg-info text-info-foreground' 
                  : answers[index]?.selectedOption !== -1 
                  ? 'border-success text-success bg-success/10' 
                  : ''
              }`}
              onClick={() => handleQuestionJump(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success/10 border border-success rounded"></div>
            <span>Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted border rounded"></div>
            <span>Not Answered ({totalQuestions - answeredCount})</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4" 
          onClick={() => setShowQuestionGrid(false)}
        >
          Close
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <AppNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-lg text-muted-foreground">Loading exam...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!examSession || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <AppNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <p className="text-lg text-destructive">Exam session not found</p>
            <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <AppNav />
      {/* Header */}
      <div className="bg-card border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                className="gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Questions
              </Button>
              <Badge variant="outline" className="text-sm">
                Exam in Progress
              </Badge>
            </div>

            <div className="flex items-center gap-6">
              {/* Progress */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {answeredCount}/{totalQuestions}
                </span>
                <Progress value={progressPercentage} className="w-32 h-2" />
              </div>

              {/* Timer */}
              <div className={`flex items-center gap-2 font-mono text-lg font-bold ${getTimeColor()}`}>
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>

              {/* Submit */}
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primary to-info"
                disabled={answeredCount < totalQuestions}
              >
                <Flag className="h-4 w-4 mr-2" />
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Grid Overlay */}
      {showQuestionGrid && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40" 
            onClick={() => setShowQuestionGrid(false)}
          />
          <QuestionGrid />
        </>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Question Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{currentQuestionData.domain}</Badge>
                    <Badge 
                      variant="outline" 
                      className={getDifficultyColor(currentQuestionData.difficulty)}
                    >
                      {currentQuestionData.difficulty}
                    </Badge>
                  </div>
                </div>
                {answers[currentQuestion]?.selectedOption !== -1 && (
                  <CheckCircle className="h-6 w-6 text-success" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{currentQuestionData.question}</p>
            </CardContent>
          </Card>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  answers[currentQuestion]?.selectedOption === index 
                    ? 'ring-2 ring-primary bg-primary/5 border-primary' 
                    : 'hover:border-primary/30'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-1 rounded-full border-2 ${
                      answers[currentQuestion]?.selectedOption === index 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted'
                    }`}>
                      {answers[currentQuestion]?.selectedOption === index ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm text-muted-foreground">
                          Option {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <p className="text-base leading-relaxed">{option}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {answers[currentQuestion]?.selectedOption === -1 && (
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-4 w-4" />
                  Question not answered
                </div>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentQuestion === totalQuestions - 1}
              className="gap-2 bg-gradient-to-r from-primary to-info"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;