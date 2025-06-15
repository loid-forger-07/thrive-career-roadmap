
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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            🎯 Personalized Roadmap Generated
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Path to {roadmap.role}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A {roadmap.timeline} journey tailored specifically for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={onViewProgress} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Calendar className="mr-2" size={16} />
              View Progress Dashboard
            </Button>
            <Button variant="outline" onClick={onBack}>
              Modify Assessment
            </Button>
          </div>
          
          {/* Overall Progress */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-700">Overall Progress</span>
                <span className="text-2xl font-bold text-purple-600">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400 hidden md:block"></div>
          
          {roadmap.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative mb-8">
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-white rounded-full border-4 border-purple-400 hidden md:block z-10"></div>
              
              <Card className={`ml-0 md:ml-16 shadow-lg hover:shadow-xl transition-all duration-300 ${
                milestone.completed ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}>
                <CardHeader className="cursor-pointer" onClick={() => setExpandedMilestone(
                  expandedMilestone === milestone.id ? null : milestone.id
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {milestone.completed ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <Clock className="text-purple-500" size={24} />
                      )}
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {milestone.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          Duration: {milestone.duration}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={milestone.completed ? "default" : "secondary"} className="bg-purple-100 text-purple-700">
                      {milestone.progress}% Complete
                    </Badge>
                  </div>
                  <p className="text-gray-700 mt-3">{milestone.description}</p>
                  <Progress value={milestone.progress} className="mt-4 h-2" />
                </CardHeader>
                
                {expandedMilestone === milestone.id && (
                  <CardContent className="pt-0">
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Tasks & Activities:</h4>
                      <div className="space-y-2">
                        {milestone.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                            <span className="text-gray-700">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
              
              {index < roadmap.milestones.length - 1 && (
                <div className="flex justify-center mt-4 mb-4">
                  <ArrowDown className="text-purple-400" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Success Message */}
        <Card className="mt-12 bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
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
