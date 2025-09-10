import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  Users, 
  MapPin, 
  Calendar,
  TrendingUp,
  Filter
} from "lucide-react";
import EcoCard from "@/components/EcoCard";
import LeaderboardBadge from "@/components/LeaderboardBadge";

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [regionFilter, setRegionFilter] = useState("all");

  const individualLeaders = [
    { rank: 1, name: "Sarah Johnson", points: 15420, avatar: "", category: "individual" as const, change: "up" as const },
    { rank: 2, name: "Mike Chen", points: 14850, avatar: "", category: "individual" as const, change: "down" as const },
    { rank: 3, name: "Emma Davis", points: 13990, avatar: "", category: "individual" as const, change: "up" as const },
    { rank: 4, name: "David Wilson", points: 12750, avatar: "", category: "individual" as const, change: "same" as const },
    { rank: 5, name: "Lisa Anderson", points: 11680, avatar: "", category: "individual" as const, change: "up" as const },
    { rank: 6, name: "John Kumar", points: 10920, avatar: "", category: "individual" as const, change: "down" as const },
    { rank: 7, name: "Maria Garcia", points: 10150, avatar: "", category: "individual" as const, change: "up" as const },
    { rank: 8, name: "Alex Thompson", points: 9840, avatar: "", category: "individual" as const, change: "same" as const },
  ];

  const workerLeaders = [
    { rank: 1, name: "Rajesh Patel", points: 28750, avatar: "", category: "worker" as const, change: "up" as const },
    { rank: 2, name: "Ahmed Hassan", points: 26420, avatar: "", category: "worker" as const, change: "same" as const },
    { rank: 3, name: "Carlos Rodriguez", points: 24890, avatar: "", category: "worker" as const, change: "down" as const },
    { rank: 4, name: "Priya Sharma", points: 23150, avatar: "", category: "worker" as const, change: "up" as const },
    { rank: 5, name: "James Murphy", points: 21680, avatar: "", category: "worker" as const, change: "up" as const },
  ];

  const areaLeaders = [
    { rank: 1, name: "Green Valley District", points: 125420, avatar: "", category: "area" as const, change: "up" as const },
    { rank: 2, name: "Central Business District", points: 118750, avatar: "", category: "area" as const, change: "same" as const },
    { rank: 3, name: "Riverside Community", points: 112340, avatar: "", category: "area" as const, change: "down" as const },
    { rank: 4, name: "University Campus", points: 98560, avatar: "", category: "area" as const, change: "up" as const },
    { rank: 5, name: "Industrial Zone", points: 87920, avatar: "", category: "area" as const, change: "up" as const },
  ];

  const topPerformers = [
    { name: "Sarah Johnson", achievement: "Most Reports Filed", value: "124 reports", period: "This month" },
    { name: "Rajesh Patel", achievement: "Fastest Response Time", value: "8.5 min avg", period: "This week" },
    { name: "Green Valley", achievement: "Cleanest Area", value: "99.2% score", period: "This quarter" },
    { name: "Mike Chen", achievement: "Best Classifier", value: "95% accuracy", period: "All time" },
  ];

  const myStats = {
    currentRank: 12,
    totalPoints: 8750,
    monthlyRank: 8,
    weeklyProgress: "+245 points",
    completedTasks: 67,
    accuracy: 94.5
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Community Leaderboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating our eco-warriors who are making a difference in waste management.
            Track rankings and compete for a cleaner environment.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">This Week</SelectItem>
                  <SelectItem value="monthly">This Month</SelectItem>
                  <SelectItem value="quarterly">This Quarter</SelectItem>
                  <SelectItem value="yearly">This Year</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="district1">District 1</SelectItem>
                  <SelectItem value="district2">District 2</SelectItem>
                  <SelectItem value="district3">District 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* My Performance Card */}
        <EcoCard variant="gradient" className="relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">#{myStats.currentRank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{myStats.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">#{myStats.monthlyRank}</div>
              <div className="text-sm text-muted-foreground">Monthly Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{myStats.weeklyProgress}</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{myStats.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{myStats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </EcoCard>

        {/* Top Performers Highlights */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">🏆 Featured Achievements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPerformers.map((performer, index) => (
              <EcoCard key={index} variant="hover" className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{performer.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{performer.achievement}</p>
                <div className="text-lg font-bold text-primary">{performer.value}</div>
                <div className="text-xs text-muted-foreground">{performer.period}</div>
              </EcoCard>
            ))}
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="individuals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individuals" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Individuals</span>
            </TabsTrigger>
            <TabsTrigger value="workers" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Workers</span>
            </TabsTrigger>
            <TabsTrigger value="areas" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Areas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individuals" className="mt-6">
            <div className="space-y-4">
              {individualLeaders.map(leader => (
                <LeaderboardBadge key={leader.rank} {...leader} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Load More Rankings</Button>
            </div>
          </TabsContent>

          <TabsContent value="workers" className="mt-6">
            <div className="space-y-4">
              {workerLeaders.map(leader => (
                <LeaderboardBadge key={leader.rank} {...leader} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Load More Rankings</Button>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="mt-6">
            <div className="space-y-4">
              {areaLeaders.map(leader => (
                <LeaderboardBadge key={leader.rank} {...leader} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Load More Rankings</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Achievement Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EcoCard variant="gradient" className="text-center">
            <Trophy className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Champions League</h3>
            <p className="text-sm text-muted-foreground mb-4">Top 10 performers with exclusive rewards</p>
            <Button variant="outline" size="sm">View Champions</Button>
          </EcoCard>
          
          <EcoCard variant="gradient" className="text-center">
            <Medal className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Rising Stars</h3>
            <p className="text-sm text-muted-foreground mb-4">Fastest climbing participants this month</p>
            <Button variant="outline" size="sm">View Rising Stars</Button>
          </EcoCard>
          
          <EcoCard variant="gradient" className="text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Consistency Awards</h3>
            <p className="text-sm text-muted-foreground mb-4">Most consistent performers over time</p>
            <Button variant="outline" size="sm">View Awards</Button>
          </EcoCard>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;