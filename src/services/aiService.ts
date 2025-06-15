
interface UserProfile {
  name: string;
  currentRole: string;
  experience: string;
  targetRole: string;
  industry: string;
  skills: string[];
  timeframe: string;
  learningStyle: string;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
  completed: boolean;
  progress: number;
}

interface Roadmap {
  role: string;
  timeline: string;
  milestones: Milestone[];
}

export const generateCareerRoadmap = async (userProfile: UserProfile): Promise<Roadmap> => {
  const prompt = `
Create a detailed career roadmap for someone transitioning to ${userProfile.targetRole} in the ${userProfile.industry} industry.

Current situation:
- Name: ${userProfile.name}
- Current Role: ${userProfile.currentRole}
- Experience: ${userProfile.experience} years
- Current Skills: ${userProfile.skills.join(', ')}
- Preferred Learning Style: ${userProfile.learningStyle}
- Target Timeframe: ${userProfile.timeframe}

Please create a structured roadmap with 4-6 milestones. Each milestone should have:
- A clear title
- A description of what will be accomplished
- A realistic duration based on the timeframe
- 3-5 specific, actionable tasks

Format the response as JSON with this structure:
{
  "role": "${userProfile.targetRole}",
  "timeline": "${userProfile.timeframe}",
  "milestones": [
    {
      "id": 1,
      "title": "Milestone Title",
      "description": "What this milestone accomplishes",
      "duration": "X weeks",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "completed": false,
      "progress": 0
    }
  ]
}

Focus on practical, industry-specific skills and experiences needed for ${userProfile.targetRole}. Consider the user's current experience level and learning preferences.
  `;

  try {
    const response = await fetch('/api/generate-roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate roadmap');
    }

    const data = await response.json();
    return data.roadmap;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    
    // Fallback to enhanced mock data based on user profile
    return generateFallbackRoadmap(userProfile);
  }
};

const generateFallbackRoadmap = (userProfile: UserProfile): Roadmap => {
  const isExperienced = userProfile.experience === '4-5' || userProfile.experience === '6-10' || userProfile.experience === '10+';
  const timeframeMap: { [key: string]: string } = {
    '3-months': '3 months',
    '6-months': '6 months',
    '1-year': '12 months',
    '2-years': '24 months'
  };

  const baseMilestones = [
    {
      id: 1,
      title: isExperienced ? 'Skills Assessment & Gap Analysis' : 'Foundation Building',
      description: isExperienced ? 'Evaluate current capabilities and identify skill gaps' : 'Master the fundamental skills required',
      duration: userProfile.timeframe === '3-months' ? '2 weeks' : '4 weeks',
      tasks: isExperienced 
        ? [`Audit current ${userProfile.targetRole} skills`, 'Complete industry certifications assessment', 'Network with professionals in target role']
        : ['Complete foundational courses', 'Build first portfolio project', 'Set up professional profiles'],
      completed: false,
      progress: 0
    },
    {
      id: 2,
      title: 'Practical Experience',
      description: 'Gain hands-on experience in your target role',
      duration: userProfile.timeframe === '3-months' ? '6 weeks' : '8 weeks',
      tasks: [
        `Build ${userProfile.targetRole.toLowerCase()} projects`,
        'Contribute to open source or volunteer projects',
        'Seek mentorship or coaching'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 3,
      title: 'Portfolio & Professional Presence',
      description: 'Showcase your capabilities and build your network',
      duration: userProfile.timeframe === '3-months' ? '3 weeks' : '6 weeks',
      tasks: [
        'Create professional portfolio',
        'Optimize LinkedIn and professional profiles',
        'Publish thought leadership content'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Job Search & Interview Preparation',
      description: 'Prepare for and execute your job search strategy',
      duration: userProfile.timeframe === '3-months' ? '3 weeks' : '4 weeks',
      tasks: [
        'Tailor resume for target role',
        'Practice technical and behavioral interviews',
        'Apply to target positions and network actively'
      ],
      completed: false,
      progress: 0
    }
  ];

  return {
    role: userProfile.targetRole,
    timeline: timeframeMap[userProfile.timeframe] || userProfile.timeframe,
    milestones: baseMilestones
  };
};
