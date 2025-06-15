
// This simulates the actual API endpoint that would handle OpenAI requests
// In a real deployment, this would be replaced with a proper backend service

interface RoadmapRequest {
  prompt: string;
}

export const mockGenerateRoadmap = async (request: RoadmapRequest): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Simulate occasional API failures for realistic error handling
  if (Math.random() < 0.1) {
    throw new Error('API temporarily unavailable');
  }

  // Parse the prompt to extract user information
  const prompt = request.prompt;
  const targetRoleMatch = prompt.match(/transitioning to (.*?) in the/);
  const industryMatch = prompt.match(/in the (.*?) industry/);
  const timeframeMatch = prompt.match(/Target Timeframe: (.*?)$/m);
  
  const targetRole = targetRoleMatch ? targetRoleMatch[1] : 'Software Developer';
  const industry = industryMatch ? industryMatch[1] : 'Technology';
  const timeframe = timeframeMatch ? timeframeMatch[1] : '6 months';

  // Generate AI-like response based on extracted information
  const aiGeneratedRoadmap = {
    role: targetRole,
    timeline: timeframe,
    milestones: [
      {
        id: 1,
        title: `${targetRole} Fundamentals`,
        description: `Master the core concepts and technologies essential for ${targetRole} role`,
        duration: "4-6 weeks",
        tasks: [
          `Study ${targetRole.toLowerCase()} best practices and methodologies`,
          `Complete relevant online courses and certifications`,
          `Set up development environment and essential tools`,
          "Join professional communities and forums"
        ],
        completed: false,
        progress: 0
      },
      {
        id: 2,
        title: "Hands-on Project Development",
        description: `Build practical projects that demonstrate ${targetRole} capabilities`,
        duration: "6-8 weeks",
        tasks: [
          "Create portfolio project showcasing key skills",
          "Contribute to open-source projects",
          "Document your learning journey and technical decisions",
          "Seek code reviews and feedback from experienced professionals"
        ],
        completed: false,
        progress: 0
      },
      {
        id: 3,
        title: `${industry} Domain Knowledge`,
        description: `Develop expertise in ${industry.toLowerCase()} industry standards and practices`,
        duration: "3-4 weeks",
        tasks: [
          `Research ${industry.toLowerCase()} industry trends and challenges`,
          "Learn industry-specific tools and technologies",
          "Study successful companies and their technical approaches",
          "Network with professionals in the industry"
        ],
        completed: false,
        progress: 0
      },
      {
        id: 4,
        title: "Professional Preparation",
        description: "Prepare for job applications and interviews in your target role",
        duration: "3-4 weeks",
        tasks: [
          `Optimize resume for ${targetRole} positions`,
          "Practice technical and behavioral interviews",
          "Build professional online presence (LinkedIn, GitHub)",
          "Apply to target positions and prepare for negotiations"
        ],
        completed: false,
        progress: 0
      }
    ]
  };

  return { roadmap: aiGeneratedRoadmap };
};

// Override fetch for the specific API endpoint
const originalFetch = window.fetch;
window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (typeof input === 'string' && input === '/api/generate-roadmap') {
    return new Promise((resolve) => {
      const body = init?.body ? JSON.parse(init.body as string) : {};
      
      mockGenerateRoadmap(body)
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
