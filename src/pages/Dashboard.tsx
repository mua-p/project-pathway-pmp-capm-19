import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, Clock, Star, Lock, Crown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppNav from "@/components/AppNav";
import { Certification, Stage, UserProgress } from "@/types";
import { apiService } from "@/services/api";
import { CERTIFICATION_TYPES } from "@/utils/constants";
import { formatDuration, calculateScore } from "@/utils/helpers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<'PMP' | 'CAPM'>('PMP');
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (selectedTrack && certifications.length > 0) {
      loadStagesForCertification();
    }
  }, [selectedTrack, certifications]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [certsData] = await Promise.all([
        apiService.getCertifications(),
      ]);
      
      setCertifications(certsData);
      
      if (certsData.length > 0) {
        const defaultCert = certsData.find(c => c.type === selectedTrack) || certsData[0];
        setSelectedTrack(defaultCert.type);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStagesForCertification = async () => {
    try {
      const selectedCertification = certifications.find(c => c.type === selectedTrack);
      if (!selectedCertification) return;

      const [stagesData, progressData] = await Promise.all([
        apiService.getCertificationStages(selectedCertification.id),
        apiService.getUserProgress(selectedCertification.id).catch(() => null), // Progress might not exist for new users
      ]);

      setStages(stagesData);
      setUserProgress(progressData);
    } catch (err) {
      console.error('Error loading stages:', err);
    }
  };

  const handleStartExam = async (stageId: string) => {
    try {
      const session = await apiService.startExam(stageId);
      navigate('/exam', { state: { sessionId: session.id } });
    } catch (err) {
      console.error('Failed to start exam:', err);
      // TODO: Show error toast
    }
  };

  const currentCertification = certifications.find(c => c.type === selectedTrack);
  const completedStages = userProgress?.completedStages?.length || 0;
  const totalStages = currentCertification?.totalStages || 0;

  const renderStageCard = (stage: Stage, index: number) => {
    const stageNumber = stage.number;
    const isCompleted = userProgress?.completedStages?.includes(stage.id) || false;
    const isCurrent = index === completedStages && stage.isUnlocked;
    const isLocked = !stage.isUnlocked || (stage.isPremium && !userProgress);
    const questionCount = stage.questionCount;

    return (
      <Card 
        key={stage.id}
        className={`relative transition-all duration-300 hover:shadow-lg cursor-pointer ${
          isCompleted 
            ? 'bg-gradient-to-br from-success/10 to-success/5 border-success/30' 
            : isCurrent 
            ? 'bg-gradient-to-br from-info/10 to-info/5 border-info/30 ring-2 ring-info/20' 
            : isLocked
            ? 'bg-muted/50 border-muted opacity-60'
            : 'hover:border-primary/30'
        }`}
      >
        {isLocked && stage.isPremium && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-premium to-premium/80 text-premium-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12 z-10">
            <Crown className="h-3 w-3 inline mr-1" />
            PREMIUM
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : isCurrent 
                  ? 'bg-info text-info-foreground'
                  : isLocked
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}>
                {isCompleted ? (
                  <Trophy className="h-5 w-5" />
                ) : isLocked ? (
                  <Lock className="h-5 w-5" />
                ) : (
                  <BookOpen className="h-5 w-5" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{stage.name}</CardTitle>
                <CardDescription className="text-sm">
                  {questionCount} Questions • {formatDuration(stage.timeLimit)}
                </CardDescription>
              </div>
            </div>
            
            {isCompleted && userProgress && (
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Star className="h-3 w-3 mr-1" />
                {userProgress.averageScore}%
              </Badge>
            )}
            
            {isLocked && stage.isPremium && (
              <Crown className="h-5 w-5 text-premium" />
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatDuration(stage.timeLimit)}
            </div>
            
            {isCompleted && userProgress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Best Score</span>
                  <span className="font-medium">{userProgress.averageScore}%</span>
                </div>
                <Progress value={userProgress.averageScore} className="h-2" />
              </div>
            )}
            
            {isCurrent && !isLocked && (
              <Button 
                className="w-full bg-gradient-to-r from-info to-primary hover:shadow-lg"
                onClick={() => handleStartExam(stage.id)}
              >
                Start Exam
              </Button>
            )}
            
            {isLocked && stage.isPremium && (
              <Button variant="outline" className="w-full border-premium/30 text-premium hover:bg-premium/5">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-accent">
        <AppNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-accent">
        <AppNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <p className="text-lg text-destructive">{error}</p>
            <Button onClick={loadDashboardData}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-accent">
      <AppNav />
      <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6 pt-8">
          <h1 className="gradient-text text-5xl md:text-6xl font-bold tracking-tight">
            Certification Hub
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Choose your path to project management excellence with our AI-powered learning platform
          </p>
        </div>

        {/* Track Selection */}
        {certifications.length > 1 && (
          <div className="flex justify-center">
            <div className="glass-effect border border-card-border rounded-3xl p-3 shadow-lg">
              <div className="flex gap-3">
                {certifications.map((cert) => (
                  <Button
                    key={cert.id}
                    variant={selectedTrack === cert.type ? 'default' : 'ghost'}
                    className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                      selectedTrack === cert.type 
                        ? 'btn-gradient shadow-primary' 
                        : 'hover:bg-muted/10 text-foreground-secondary'
                    }`}
                    onClick={() => setSelectedTrack(cert.type)}
                  >
                    {cert.type} {cert.type === 'PMP' ? 'Professional' : 'Associate'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Track Overview */}
        {currentCertification && (
          <Card className="card-elevated bg-gradient-to-br from-card to-card-accent/50 border-card-border rounded-3xl overflow-hidden">
            <CardHeader className="pb-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold gradient-text">{currentCertification.name}</CardTitle>
                  <CardDescription className="text-lg text-foreground-secondary">
                    {currentCertification.description}
                  </CardDescription>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {completedStages}<span className="text-2xl text-muted-foreground">/{totalStages}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Stages Completed</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Overall Progress</span>
                  <span className="text-xl font-bold bg-gradient-success bg-clip-text text-transparent">
                    {totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0}%
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={totalStages > 0 ? (completedStages / totalStages) * 100 : 0} 
                    className="h-4 bg-muted rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-success to-success-light opacity-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage, index) => renderStageCard(stage, index))}
        </div>

        {/* Premium CTA - Show if user has free subscription and there are premium stages */}
        {userProgress && stages.some(stage => stage.isPremium) && (
          <Card className="bg-gradient-to-r from-premium/10 via-premium/5 to-premium/10 border-premium/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-premium" />
                <div>
                  <CardTitle className="text-xl">Unlock Premium Access</CardTitle>
                  <CardDescription>
                    Get full access to all stages, AI-powered questions, and detailed analytics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">$10/month</div>
                  <div className="text-sm text-muted-foreground">Cancel anytime</div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-premium to-premium/80 text-premium-foreground"
                  onClick={() => apiService.upgradeToPremium()}
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;