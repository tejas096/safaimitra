import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Camera,
  MapPin,
  Trophy,
  Coins,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Recycle,
  Users,
} from "lucide-react";
import EcoCard from "@/components/EcoCard";
import SmartBinCard from "@/components/SmartBinCard";

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [wasteClassification, setWasteClassification] = useState<string | null>(
    null
  );

  const userStats = {
    points: 2847,
    rank: 12,
    complaintsSubmitted: 8,
    complaintsResolved: 6,
    wasteClassified: 142,
  };

  const recentActivity = [
    {
      type: "complaint",
      message: "Complaint #C-456 resolved",
      time: "2 hours ago",
      status: "resolved",
    },
    {
      type: "classification",
      message: "Classified 5 waste items",
      time: "1 day ago",
      status: "success",
    },
    {
      type: "points",
      message: "Earned 50 points",
      time: "2 days ago",
      status: "success",
    },
    {
      type: "complaint",
      message: "Complaint #C-455 submitted",
      time: "3 days ago",
      status: "pending",
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI classification
        setTimeout(() => {
          const classifications = [
            "Plastic Bottle - Recyclable",
            "Food Waste - Organic",
            "Paper - Recyclable",
            "Electronic Waste - Special",
          ];
          setWasteClassification(
            classifications[Math.floor(Math.random() * classifications.length)]
          );
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return MessageSquare;
      case "classification":
        return Recycle;
      case "points":
        return Coins;
      default:
        return CheckCircle;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-success";
      case "success":
        return "text-success";
      case "pending":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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

          <EcoCard variant="gradient" className="text-center">
            <Recycle className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {userStats.wasteClassified}
            </div>
            <div className="text-sm text-muted-foreground">
              Items Classified
            </div>
          </EcoCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
