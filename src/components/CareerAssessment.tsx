
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, User } from "lucide-react";

interface CareerAssessmentProps {
  onComplete: (profile: any) => void;
  onBack: () => void;
}

const CareerAssessment = ({ onComplete, onBack }: CareerAssessmentProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    currentRole: '',
    experience: '',
    targetRole: '',
    industry: '',
    skills: [] as string[],
    timeframe: '',
    learningStyle: ''
  });

  const sections = [
    {
      title: "Personal Information",
      description: "Tell us about your current situation",
      fields: ['name', 'currentRole', 'experience']
    },
    {
      title: "Career Goals",
      description: "Where do you want to go?",
      fields: ['targetRole', 'industry', 'timeframe']
    },
    {
      title: "Skills & Preferences",
      description: "Help us understand your learning style",
      fields: ['skills', 'learningStyle']
    }
  ];

  const skillsOptions = [
    'JavaScript', 'React', 'Python', 'Data Analysis', 'Project Management',
    'Marketing', 'Design', 'Sales', 'Leadership', 'Communication'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      onBack();
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Your Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-2 text-lg py-3"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="currentRole" className="text-lg font-semibold text-gray-700">Current Role</Label>
              <Input
                id="currentRole"
                value={formData.currentRole}
                onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                className="mt-2 text-lg py-3"
                placeholder="e.g., Junior Developer, Marketing Assistant"
              />
            </div>
            <div>
              <Label htmlFor="experience" className="text-lg font-semibold text-gray-700">Years of Experience</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger className="mt-2 text-lg py-3">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="4-5">4-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="targetRole" className="text-lg font-semibold text-gray-700">Target Role</Label>
              <Input
                id="targetRole"
                value={formData.targetRole}
                onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
                className="mt-2 text-lg py-3"
                placeholder="e.g., Senior Developer, Product Manager"
              />
            </div>
            <div>
              <Label htmlFor="industry" className="text-lg font-semibold text-gray-700">Target Industry</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger className="mt-2 text-lg py-3">
                  <SelectValue placeholder="Select your target industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeframe" className="text-lg font-semibold text-gray-700">Desired Timeframe</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timeframe: value }))}>
                <SelectTrigger className="mt-2 text-lg py-3">
                  <SelectValue placeholder="How soon do you want to achieve your goal?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-months">3 months</SelectItem>
                  <SelectItem value="6-months">6 months</SelectItem>
                  <SelectItem value="1-year">1 year</SelectItem>
                  <SelectItem value="2-years">2+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold text-gray-700 mb-4 block">Current Skills</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillsOptions.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center transition-all duration-200 ${
                      formData.skills.includes(skill)
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'hover:bg-purple-50'
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="learningStyle" className="text-lg font-semibold text-gray-700">Learning Style</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, learningStyle: value }))}>
                <SelectTrigger className="mt-2 text-lg py-3">
                  <SelectValue placeholder="How do you prefer to learn?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="structured">Structured courses</SelectItem>
                  <SelectItem value="hands-on">Hands-on projects</SelectItem>
                  <SelectItem value="mentorship">Mentorship & guidance</SelectItem>
                  <SelectItem value="self-paced">Self-paced learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentSection + 1} of {sections.length}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(((currentSection + 1) / sections.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={28} />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              {sections[currentSection].title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {sections[currentSection].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {renderSection()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="px-6 py-3 text-lg"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 text-lg font-semibold"
              >
                {currentSection === sections.length - 1 ? 'Generate Roadmap' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerAssessment;
