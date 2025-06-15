
// This simulates the Gemini API endpoint for development
// In production, this would be replaced with actual Gemini API integration

interface RoadmapRequest {
  prompt: string;
  model: string;
  userProfile: any;
}

export const mockGenerateRoadmapWithGemini = async (request: RoadmapRequest): Promise<any> => {
  // Simulate Gemini API delay (faster than OpenAI typically)
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Simulate occasional API failures for realistic error handling
  if (Math.random() < 0.05) { // Lower failure rate for Gemini
    throw new Error('Gemini API temporarily unavailable');
  }

  const { userProfile } = request;
  
  // Generate AI-like response based on user profile using Gemini-style processing
  const aiGeneratedRoadmap = {
    role: userProfile.targetRole,
    timeline: userProfile.timeframe,
    milestones: generateGeminiStyleMilestones(userProfile)
  };

  return { roadmap: aiGeneratedRoadmap };
};

const generateGeminiStyleMilestones = (userProfile: any) => {
  const isJunior = userProfile.experience === '0-1' || userProfile.experience === '1-3';
  const isSenior = userProfile.experience === '6-10' || userProfile.experience === '10+';
  
  // Gemini tends to be more detailed and practical in its responses
  const milestones = [
    {
      id: 1,
      title: `${userProfile.targetRole} Skill Foundation`,
      description: `Build comprehensive understanding of ${userProfile.targetRole} core competencies tailored to ${userProfile.industry} industry`,
      duration: userProfile.timeframe === '3-months' ? '3-4 weeks' : '5-6 weeks',
      tasks: [
        `Master ${userProfile.targetRole.toLowerCase()} fundamentals through structured learning`,
        `Complete ${userProfile.industry.toLowerCase()}-specific certification programs`,
        'Build practical projects demonstrating key concepts',
        'Join professional communities and establish mentorship connections'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 2,
      title: 'Hands-on Portfolio Development',
      description: `Create compelling portfolio showcasing ${userProfile.targetRole} capabilities`,
      duration: userProfile.timeframe === '3-months' ? '4-5 weeks' : '6-8 weeks',
      tasks: [
        `Develop 2-3 comprehensive ${userProfile.targetRole.toLowerCase()} projects`,
        'Implement industry best practices and modern methodologies',
        'Document technical decisions and problem-solving approaches',
        'Gather feedback from industry professionals and iterate'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 3,
      title: `${userProfile.industry} Industry Expertise`,
      description: `Deep dive into ${userProfile.industry.toLowerCase()} sector requirements and trends`,
      duration: userProfile.timeframe === '3-months' ? '2-3 weeks' : '4-5 weeks',
      tasks: [
        `Research current ${userProfile.industry.toLowerCase()} market dynamics and challenges`,
        'Learn industry-standard tools, platforms, and technologies',
        'Study successful case studies and implementation strategies',
        'Build network within the industry through events and online communities'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Professional Market Preparation',
      description: 'Optimize professional presence and prepare for job market entry',
      duration: userProfile.timeframe === '3-months' ? '2-3 weeks' : '3-4 weeks',
      tasks: [
        `Craft compelling resume highlighting ${userProfile.targetRole} transition`,
        'Prepare for technical interviews with practice and mock sessions',
        'Establish strong online presence across professional platforms',
        'Execute strategic job search and networking campaign'
      ],
      completed: false,
      progress: 0
    }
  ];

  // Add advanced milestone for senior professionals
  if (isSenior) {
    milestones.push({
      id: 5,
      title: 'Leadership & Strategic Impact',
      description: 'Develop leadership capabilities and strategic thinking for senior roles',
      duration: userProfile.timeframe === '3-months' ? '2 weeks' : '3-4 weeks',
      tasks: [
        'Develop team leadership and management skills',
        'Learn strategic planning and business impact measurement',
        'Build thought leadership through content creation and speaking',
        'Prepare for senior-level responsibilities and stakeholder management'
      ],
      completed: false,
      progress: 0
    });
  }

  return milestones;
};

// Override fetch for the Gemini API endpoint simulation
const originalFetch = window.fetch;
window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (typeof input === 'string' && input === '/api/generate-roadmap') {
    return new Promise((resolve) => {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      
      mockGenerateRoadmapWithGemini(body)
        .then(result => {
          resolve(new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        })
        .catch(error => {
          resolve(new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }));
        });
    });
  }
  
  return originalFetch.call(this, input, init);
};
