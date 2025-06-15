
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText } from 'lucide-react';

interface Roadmap {
  id: string;
  role: string;
  timeline: string;
  createdAt: string;
  milestones: any[];
}

const RoadmapsPage = () => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

    useEffect(() => {
        const savedRoadmaps = JSON.parse(localStorage.getItem('saved_roadmaps') || '[]');
        setRoadmaps(savedRoadmaps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 py-12 text-white">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold">Your Saved Roadmaps</h1>
                    <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                        <Link to="/">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create New Roadmap
                        </Link>
                    </Button>
                </div>
                {roadmaps.length === 0 ? (
                    <div className="text-center py-16 bg-gray-800/50 rounded-lg border border-blue-800/50">
                        <h2 className="text-2xl font-semibold mb-4">No Roadmaps Found</h2>
                        <p className="text-gray-400 mb-6">You haven't generated any roadmaps yet. Let's create your first one!</p>
                        <Button asChild>
                            <Link to="/">Start Your Journey</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmaps.map(roadmap => (
                            <Card key={roadmap.id} className="bg-gray-800/50 border-blue-800/50 hover:border-blue-700 transition-all flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-100">{roadmap.role}</CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Created on {new Date(roadmap.createdAt).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-between">
                                    <p className="text-gray-300 mb-4">A {roadmap.timeline} plan with {roadmap.milestones.length} milestones.</p>
                                    <Button asChild className="w-full mt-auto">
                                        <Link to={`/roadmap/${roadmap.id}`}>
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Roadmap
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoadmapsPage;
