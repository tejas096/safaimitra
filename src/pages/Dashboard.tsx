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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Waste Assistant */}
          <div className="lg:col-span-2">
            <EcoCard className="h-full">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Camera className="h-5 w-5 text-primary mr-2" />
                AI Waste Segregation Assistant
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded waste"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      {wasteClassification ? (
                        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                          <h3 className="font-semibold text-success mb-2">
                            Classification Result:
                          </h3>
                          <p className="text-foreground">
                            {wasteClassification}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button variant="success" size="sm">
                              Add to Log
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setUploadedImage(null);
                                setWasteClassification(null);
                              }}
                            >
                              Classify Another
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2 text-primary">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                          <span>Analyzing image...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Upload Waste Photo
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Take a photo or upload an image to get instant
                        AI-powered waste classification
                      </p>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button variant="outline" className="mx-auto">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Or describe the waste item:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., plastic water bottle, banana peel..."
                      className="flex-1"
                    />
                    <Button variant="eco">Classify</Button>
                  </div>
                </div>
              </div>
            </EcoCard>
          </div>

          {/* Recent Activity */}
          <div>
            <EcoCard className="h-full">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                Recent Activity
              </h2>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Icon
                        className={`h-5 w-5 mt-0.5 ${getActivityColor(
                          activity.status
                        )}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </EcoCard>
          </div>
        </div>

        {/* Smart Bins Map */}
      </div>
    </div>
  );
};

export default Dashboard;
