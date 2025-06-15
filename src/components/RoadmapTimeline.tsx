
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, ArrowDown, Calendar } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
  completed: boolean;
  progress: number;
}

interface RoadmapTimelineProps {
  roadmap: {
    role: string;
    timeline: string;
    milestones: Milestone[];
  };
  onViewProgress: () => void;
  onBack: () => void;
}

const RoadmapTimeline = ({ roadmap, onViewProgress, onBack }: RoadmapTimelineProps) => {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  const totalProgress = roadmap.milestones.reduce((acc, milestone) => acc + milestone.progress, 0) / roadmap.milestones.length;

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            🎯 Personalized Roadmap Generated
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            Your Path to {roadmap.role}
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            A {roadmap.timeline} journey tailored specifically for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={onViewProgress} className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
              <Calendar className="mr-2" size={16} />
              View Progress Dashboard
            </Button>
            <Button variant="outline" onClick={onBack} className="text-white border-blue-700 hover:bg-blue-900/50 hover:text-white">
              Modify Assessment
            </Button>
          </div>
          
          {/* Overall Progress */}
          <Card className="mb-8 bg-gray-800/50 border-blue-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-300">Overall Progress</span>
                <span className="text-2xl font-bold text-blue-400">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-700 hidden md:block"></div>
          
          {roadmap.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative mb-8">
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-gray-900 rounded-full border-4 border-blue-500 hidden md:block z-10"></div>
              
              <Card className={`ml-0 md:ml-16 shadow-lg hover:shadow-xl transition-all duration-300 border-blue-800/50 ${
                milestone.completed ? 'bg-green-800/20 border-green-500' : 'bg-gray-800/50'
              }`}>
                <CardHeader className="cursor-pointer" onClick={() => setExpandedMilestone(
                  expandedMilestone === milestone.id ? null : milestone.id
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {milestone.completed ? (
                        <CheckCircle className="text-green-400" size={24} />
                      ) : (
                        <Clock className="text-blue-400" size={24} />
                      )}
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-100">
                          {milestone.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 mt-1">
                          Duration: {milestone.duration}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={milestone.completed ? "default" : "secondary"} className="bg-blue-900/80 text-blue-300">
                      {milestone.progress}% Complete
                    </Badge>
                  </div>
                  <p className="text-gray-300 mt-3">{milestone.description}</p>
                  <Progress value={milestone.progress} className="mt-4 h-2" />
                </CardHeader>
                
                {expandedMilestone === milestone.id && (
                  <CardContent className="pt-0">
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold text-gray-100 mb-3">Tasks & Activities:</h4>
                      <div className="space-y-2">
                        {milestone.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-gray-900/70 rounded-lg">
                            <div className="w-4 h-4 border-2 border-gray-600 rounded"></div>
                            <span className="text-gray-300">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
              
              {index < roadmap.milestones.length - 1 && (
                <div className="flex justify-center mt-4 mb-4">
                  <ArrowDown className="text-blue-500" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Success Message */}
        <Card className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🎉 Congratulations!</h3>
            <p className="text-lg opacity-90 mb-6">
              You're now ready to begin your journey to becoming a {roadmap.role}. 
              Follow this roadmap step by step, and you'll be amazed at your progress!
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onViewProgress}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Start Tracking Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoadmapTimeline;
