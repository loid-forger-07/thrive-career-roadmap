
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Sparkles, Zap } from "lucide-react";

const LoadingRoadmap = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white animate-pulse">
            <Brain className="mr-2" size={16} />
            Gemini AI Generating Your Roadmap
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Creating Your Personalized Path
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Google's Gemini AI is analyzing your profile and crafting a tailored career roadmap...
          </p>
          
          {/* Animated Progress Indicator */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            <Zap className="text-blue-600 animate-pulse" size={20} />
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <Sparkles className="text-purple-600 animate-spin" size={20} />
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} className="shadow-lg border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-2 w-full mt-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((taskIndex) => (
                    <div key={taskIndex} className="flex items-center space-x-3">
                      <Skeleton className="w-5 h-5 rounded" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processing Messages */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center">
              <Zap className="mr-2 text-blue-600" size={20} />
              Gemini AI Processing
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Analyzing your skills and experience level with advanced AI</p>
              <p>• Researching real-time industry requirements and trends</p>
              <p>• Creating personalized milestones with detailed action items</p>
              <p>• Optimizing timeline based on your learning preferences</p>
              <p>• Generating industry-specific recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingRoadmap;
