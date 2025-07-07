import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  BookOpen,
  Star,
  Loader2
} from "lucide-react";
import AppNav from "@/components/AppNav";
import { ExamResult } from "@/types";
import { apiService } from "@/services/api";
import { formatTime, getScoreColor, getScoreGradient } from "@/utils/helpers";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExamResult();
  }, []);

  const loadExamResult = async () => {
    try {
      // Check if result was passed via navigation state
      const stateResult = location.state?.examResult;
      const sessionId = location.state?.sessionId;

      if (stateResult) {
        setExamResult(stateResult);
      } else if (sessionId) {
        // Fetch result from API if only sessionId is provided
        const result = await apiService.getExamResult(sessionId);
        setExamResult(result);
      } else {
        // No result data available, redirect to dashboard
        navigate('/dashboard');
        return;
      }
    } catch (err) {
      console.error('Failed to load exam result:', err);
      setError('Failed to load exam results');
    } finally {
      setLoading(false);
    }
  };

  const handleRetakeExam = async () => {
    // TODO: Implement retake logic
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <AppNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-lg text-muted-foreground">Loading your results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !examResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <AppNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <p className="text-lg text-destructive">{error || 'Results not found'}</p>
            <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const isPassed = examResult.passed;
  const passingScore = 80; // This would come from stage configuration

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <AppNav />
      <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
            isPassed ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
          }`}>
            {isPassed ? (
              <Trophy className="h-10 w-10" />
            ) : (
              <Target className="h-10 w-10" />
            )}
          </div>
          
          <div>
            <h1 className="text-4xl font-bold">
              {isPassed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {isPassed 
                ? `You've successfully completed this exam!`
                : `You scored ${examResult.score}%. You need ${passingScore}% to pass.`
              }
            </p>
          </div>
        </div>

        {/* Score Overview */}
        <Card className={`bg-gradient-to-br ${getScoreGradient(examResult.score)} border-2 ${
          isPassed ? 'border-success/30' : 'border-destructive/30'
        }`}>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Your Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${getScoreColor(examResult.score)}`}>
                {examResult.score}%
              </div>
              <div className="text-lg text-muted-foreground">
                {examResult.correctAnswers} out of {examResult.totalQuestions} questions correct
              </div>
              <Progress 
                value={examResult.score} 
                className="h-4 max-w-md mx-auto"
              />
              <div className="flex justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{formatTime(examResult.timeSpent)}</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{passingScore}%</div>
                  <div className="text-sm text-muted-foreground">Passing Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Domain Performance */}
        {examResult.domainPerformance && examResult.domainPerformance.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance by Domain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examResult.domainPerformance.map((domain, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{domain.domain}</span>
                        <Badge variant="outline" className="text-xs">
                          {domain.correct}/{domain.total}
                        </Badge>
                      </div>
                      <span className={`font-bold ${getScoreColor(domain.percentage)}`}>
                        {domain.percentage}%
                      </span>
                    </div>
                    <Progress 
                      value={domain.percentage} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-info/10 text-info rounded-lg flex items-center justify-center mx-auto">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Review Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    See detailed explanations for all questions
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {/* TODO: Implement review functionality */}}
                >
                  Review Answers
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center mx-auto">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Retake Exam</h3>
                  <p className="text-sm text-muted-foreground">
                    Try again with 50% new questions
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleRetakeExam}
                >
                  Retake Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        {isPassed && (
          <Card className="bg-gradient-to-r from-success/10 to-success/5 border-success/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Star className="h-5 w-5" />
                Stage Completed!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Congratulations on passing!</p>
                  <p className="text-muted-foreground">
                    You've successfully completed this stage. Continue your learning journey.
                  </p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-success to-success/80 gap-2"
                  onClick={() => navigate('/dashboard')}
                >
                  Continue Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            Back to Dashboard
          </Button>
          
          {!isPassed && (
            <Button 
              className="bg-gradient-to-r from-primary to-info gap-2"
              onClick={handleRetakeExam}
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Results;