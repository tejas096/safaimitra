import { useState } from "react";
import { Trophy, Coins, MessageSquare, CheckCircle } from "lucide-react";
import EcoCard from "@/components/EcoCard";
import TrainingHub from "@/components/TrainingHub";

const Dashboard = () => {
  const [points, setPoints] = useState<number>(1287);

  const userStats = {
    points: points,
    rank: 12,
    complaintsSubmitted: 8,
    complaintsResolved: 6,
    wasteClassified: 142,
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's your environmental impact summary.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <EcoCard variant="gradient" className="text-center">
            <Coins className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {userStats.points.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </EcoCard>

          <EcoCard variant="gradient" className="text-center">
            <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              #{userStats.rank}
            </div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </EcoCard>

          <EcoCard variant="gradient" className="text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {userStats.complaintsSubmitted}
            </div>
            <div className="text-sm text-muted-foreground">Reports Filed</div>
          </EcoCard>

          <EcoCard variant="gradient" className="text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {userStats.complaintsResolved}
            </div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </EcoCard>
        </div>
      </div>
      <TrainingHub />
    </div>
  );
};

export default Dashboard;
