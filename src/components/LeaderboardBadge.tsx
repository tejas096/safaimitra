import { Trophy, Medal, Award, Star } from "lucide-react";
import EcoCard from "./EcoCard";

interface LeaderboardBadgeProps {
  rank: number;
  name: string;
  points: number;
  avatar?: string;
  category: "individual" | "worker" | "area";
  change?: "up" | "down" | "same";
}

const LeaderboardBadge = ({ 
  rank, 
  name, 
  points, 
  avatar, 
  category,
  change 
}: LeaderboardBadgeProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Star className="h-5 w-5 text-primary" />;
    }
  };

  const getChangeIcon = (change?: string) => {
    if (!change) return null;
    switch (change) {
      case "up": return <span className="text-success">↗</span>;
      case "down": return <span className="text-destructive">↘</span>;
      case "same": return <span className="text-muted-foreground">→</span>;
      default: return null;
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank <= 3) return "gradient-to-r from-primary-light to-secondary-light border-primary/30";
    return "";
  };

  return (
    <EcoCard variant="hover" className={`${getRankStyle(rank)} relative`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-foreground">#{rank}</span>
          {getRankIcon(rank)}
        </div>

        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            ) : (
              <span className="text-primary font-semibold">
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{category}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-primary">{points.toLocaleString()}</span>
            {getChangeIcon(change)}
          </div>
          <p className="text-xs text-muted-foreground">points</p>
        </div>
      </div>
    </EcoCard>
  );
};

export default LeaderboardBadge;