
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, User, Calendar, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CareerAssessment from "@/components/CareerAssessment";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import ProgressDashboard from "@/components/ProgressDashboard";
import LoadingRoadmap from "@/components/LoadingRoadmap";
import { generateCareerRoadmap } from "@/services/aiService";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'assessment' | 'loading' | 'roadmap' | 'progress'>('landing');
  const [userProfile, setUserProfile] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAssessmentComplete = async (profile: any) => {
    setUserProfile(profile);
    setCurrentStep('loading');
    setIsGenerating(true);

    try {
      console.log('Generating roadmap for profile:', profile);
      const roadmap = await generateCareerRoadmap(profile);
      console.log('Generated roadmap:', roadmap);
      
      setRoadmapData(roadmap);
      setCurrentStep('roadmap');
      
      toast({
        title: "Roadmap Generated! 🎉",
        description: "Your personalized career roadmap has been created successfully.",
      });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Generation Failed",
        description: "We'll use a personalized template based on your profile instead.",
        variant: "destructive",
      });
      
      // Still show roadmap with fallback data
      setCurrentStep('roadmap');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartJourney = () => {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (apiKey && apiKey.trim() !== '') {
      setCurrentStep('assessment');
    } else {
      setIsApiDialogOpen(true);
    }
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300">
              🚀 AI-Powered Career Planning
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Your Personalized Career Roadmap
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Get a tailored, step-by-step career plan powered by AI. Track your progress, 
              achieve milestones, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 text-white hover:bg-blue-500 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                onClick={handleStartJourney}
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
            <div className="animate-bounce">
              <ArrowDown className="mx-auto text-white/60" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our Career Roadmaps?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform creates personalized career paths that adapt to your unique background and goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-blue-800 bg-gray-800/50 shadow-lg text-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl font-bold text-white">AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-lg leading-relaxed">
                  Advanced AI analyzes your skills, experience, and goals to create a perfectly tailored career roadmap.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-blue-800 bg-gray-800/50 shadow-lg text-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Dynamic Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-lg leading-relaxed">
                  Interactive timeline with milestones, deadlines, and progress tracking to keep you motivated and on track.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-blue-800 bg-gray-800/50 shadow-lg text-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Check className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Adaptive Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-lg leading-relaxed">
                  Your roadmap evolves based on your progress, market changes, and new opportunities in your field.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully navigated their career transitions with our AI-powered roadmaps.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            onClick={handleStartJourney}
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  );
  
  const mainContent = () => {
    if (currentStep === 'landing') {
      return renderLandingPage();
    }
  
    const backgroundClass = currentStep === 'assessment' 
      ? "min-h-screen bg-gray-900"
      : "min-h-screen bg-gradient-to-br from-gray-800 to-gray-900";

    if (currentStep === 'assessment') {
      return (
        <div className={backgroundClass}>
          <CareerAssessment onComplete={handleAssessmentComplete} onBack={() => setCurrentStep('landing')} />
        </div>
      );
    }
  
    if (currentStep === 'loading') {
      return (
        <div className={backgroundClass}>
          <LoadingRoadmap />
        </div>
      );
    }
  
    if (currentStep === 'roadmap' && roadmapData) {
      return (
        <div className={backgroundClass}>
          <RoadmapTimeline 
            roadmap={roadmapData} 
            onViewProgress={() => setCurrentStep('progress')}
            onBack={() => setCurrentStep('assessment')}
          />
        </div>
      );
    }
  
    if (currentStep === 'progress' && roadmapData) {
      return (
        <div className={backgroundClass}>
          <ProgressDashboard 
            roadmap={roadmapData}
            userProfile={userProfile}
            onBack={() => setCurrentStep('roadmap')}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {mainContent()}
       <ApiKeyDialog 
        open={isApiDialogOpen}
        onOpenChange={setIsApiDialogOpen}
        onSave={() => setCurrentStep('assessment')}
      />
    </>
  );
};

export default Index;
