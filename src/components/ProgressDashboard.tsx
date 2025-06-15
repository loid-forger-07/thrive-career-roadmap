
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, Clock, User, ArrowDown, Check } from "lucide-react";

interface ProgressDashboardProps {
  roadmap: any;
  userProfile: any;
  onBack: () => void;
}

const ProgressDashboard = ({ roadmap, userProfile, onBack }: ProgressDashboardProps) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const totalTasks = roadmap.milestones.reduce((acc: number, milestone: any) => acc + milestone.tasks.length, 0);
  const completedTasksCount = completedTasks.size;
  const overallProgress = totalTasks > 0 ? (complete

TedTasksCount / totalTasks) * 100 : 0;

  const toggleTaskCompletion = (milestoneId: number, taskIndex: number) => {
    const taskKey = `${milestoneId}-${taskIndex}`;
    const newCompletedTasks = new Set(completedTasks);
    
    if (completedTasks.has(taskKey)) {
      newCompletedTasks.delete(taskKey);
    } else {
      newCompletedTasks.add(taskKey);
    }
    
    setCompletedTasks(newCompletedTasks);
  };

  const getMilestoneProgress = (milestone: any) => {
    const milestoneCompletedTasks = milestone.tasks.filter((_: any, index: number) => 
      completedTasks.has(`${milestone.id}-${index}`)
    ).length;
    return milestone.tasks.length > 0 ? (milestoneCompletedTasks / milestone.tasks.length) * 100 : 0;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            📊 Progress Dashboard
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Journey
          </h1>
          <p className="text-xl text-gray-600">
            Monitor your progress and stay motivated on your path to {roadmap.role}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Overall Progress</p>
                  <p className="text-3xl font-bold">{Math.round(overallProgress)}%</p>
                </div>
                <CheckCircle size={32} className="text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Tasks Completed</p>
                  <p className="text-3xl font-bold">{completedTasksCount}/{totalTasks}</p>
                </div>
                <Check size={32} className="text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Milestones</p>
                  <p className="text-3xl font-bold">{roadmap.milestones.length}</p>
                </div>
                <Calendar size={32} className="text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Target Role</p>
                  <p className="text-lg font-bold">{roadmap.role}</p>
                </div>
                <User size={32} className="text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="milestones" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="mt-6">
            <div className="space-y-6">
              {roadmap.milestones.map((milestone: any, index: number) => {
                const milestoneProgress = getMilestoneProgress(milestone);
                return (
                  <Card key={milestone.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">
                            {milestone.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {milestone.description}
                          </CardDescription>
                        </div>
                        <Badge variant={milestoneProgress === 100 ? "default" : "secondary"}>
                          {Math.round(milestoneProgress)}% Complete
                        </Badge>
                      </div>
                      <Progress value={milestoneProgress} className="mt-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {milestone.tasks.map((task: string, taskIndex: number) => {
                          const isCompleted = completedTasks.has(`${milestone.id}-${taskIndex}`);
                          return (
                            <div
                              key={taskIndex}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                              onClick={() => toggleTaskCompletion(milestone.id, taskIndex)}
                            >
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                }`}
                              >
                                {isCompleted && <Check size={12} className="text-white" />}
                              </div>
                              <span className={`${isCompleted ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                                {task}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Your Profile</CardTitle>
                <CardDescription>Your career journey details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</label>
                      <p className="text-lg text-gray-900">{userProfile?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Current Role</label>
                      <p className="text-lg text-gray-900">{userProfile?.currentRole}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Experience</label>
                      <p className="text-lg text-gray-900">{userProfile?.experience} years</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Target Role</label>
                      <p className="text-lg text-gray-900">{userProfile?.targetRole}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Industry</label>
                      <p className="text-lg text-gray-900">{userProfile?.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Timeframe</label>
                      <p className="text-lg text-gray-900">{userProfile?.timeframe}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 block">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {userProfile?.skills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roadmap.milestones.map((milestone: any) => (
                      <div key={milestone.id} className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{milestone.title}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={getMilestoneProgress(milestone)} className="w-20" />
                          <span className="text-sm text-gray-600 w-12">
                            {Math.round(getMilestoneProgress(milestone))}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Motivation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Keep Going!</h3>
                    <p className="text-gray-600 mb-4">
                      You're {Math.round(overallProgress)}% of the way to your goal of becoming a {roadmap.role}.
                    </p>
                    <p className="text-sm text-gray-500">
                      Every task completed brings you closer to your dream career!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button onClick={onBack} variant="outline" size="lg">
            Back to Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
