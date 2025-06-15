
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import ProgressDashboard from '@/components/ProgressDashboard';
import LoadingRoadmap from '@/components/LoadingRoadmap';

const ViewRoadmapPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState<any>(null);
    const [view, setView] = useState('timeline'); // 'timeline' or 'dashboard'

    useEffect(() => {
        if (!id) return;
        const savedRoadmaps = JSON.parse(localStorage.getItem('saved_roadmaps') || '[]');
        const foundRoadmap = savedRoadmaps.find((r: any) => r.id === id);

        if (foundRoadmap) {
            const progressData = JSON.parse(localStorage.getItem(`roadmap_progress_${foundRoadmap.id}`) || '[]');
            const completedTasks = new Set(progressData);
            
            foundRoadmap.milestones.forEach((milestone: any) => {
                const milestoneTasksCount = milestone.tasks.length;
                if (milestoneTasksCount === 0) {
                    milestone.progress = 0;
                    return;
                }
                const completedMilestoneTasks = milestone.tasks.filter((_: any, taskIndex: number) =>
                    completedTasks.has(`${milestone.id}-${taskIndex}`)
                ).length;
                milestone.progress = Math.round((completedMilestoneTasks / milestoneTasksCount) * 100);
            });

            setRoadmap(foundRoadmap);
        } else {
            navigate('/roadmaps');
        }
    }, [id, navigate, view]); // Re-run on view change to update progress on timeline

    if (!roadmap) {
        return <LoadingRoadmap />;
    }
    
    const handleBackToTimeline = () => setView('timeline');
    const handleBackToRoadmaps = () => navigate('/roadmaps');

    return (
        <div className="bg-gray-900 min-h-screen">
            {view === 'timeline' && (
                <RoadmapTimeline
                    roadmap={roadmap}
                    onViewProgress={() => setView('dashboard')}
                    onBack={handleBackToRoadmaps}
                />
            )}
            {view === 'dashboard' && (
                <ProgressDashboard
                    roadmap={roadmap}
                    userProfile={roadmap.userProfile}
                    onBack={handleBackToTimeline}
                />
            )}
        </div>
    );
};

export default ViewRoadmapPage;
