
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
  const apiKey = localStorage.getItem('gemini_api_key');

  if (!apiKey) {
    console.error('Gemini API key not found. Falling back to mock data.');
    return generateFallbackRoadmap(userProfile);
  }

  const prompt = `Create a detailed career roadmap for someone transitioning to ${userProfile.targetRole} in the ${userProfile.industry} industry.

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

Focus on practical, industry-specific skills and experiences needed for ${userProfile.targetRole}. Consider the user's current experience level and learning preferences.

Return ONLY a valid JSON object based on the following TypeScript interfaces, without any markdown formatting like \`\`\`json or any other text outside the JSON object:
interface Milestone {
  id: number;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
}
interface Roadmap {
  role: string;
  timeline: string;
  milestones: Milestone[];
}`;

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Failed to generate roadmap with Gemini API. Status:', response.status, 'Body:', errorBody);
      throw new Error(`Failed to generate roadmap with Gemini. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', data);
    
    const roadmapJsonString = data.candidates[0].content.parts[0].text;
    const roadmap = JSON.parse(roadmapJsonString);
    
    roadmap.milestones.forEach((m: Milestone, index: number) => {
        m.id = m.id || index + 1;
        m.completed = false;
        m.progress = 0;
    });

    return roadmap;
  } catch (error) {
    console.error('Error generating roadmap with Gemini:', error);
    
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
      title: `${userProfile.industry} Domain Knowledge`,
      description: `Develop expertise in ${userProfile.industry.toLowerCase()} industry standards and practices`,
      duration: userProfile.timeframe === '3-months' ? '3 weeks' : '6 weeks',
      tasks: [
        `Research ${userProfile.industry.toLowerCase()} industry trends and challenges`,
        'Learn industry-specific tools and technologies',
        'Study successful companies and their technical approaches',
        'Network with professionals in the industry'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Professional Preparation',
      description: 'Prepare for and execute your job search strategy',
      duration: userProfile.timeframe === '3-months' ? '3 weeks' : '4 weeks',
      tasks: [
        'Tailor resume for target role',
        'Practice technical and behavioral interviews',
        'Build professional online presence (LinkedIn, GitHub)',
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
