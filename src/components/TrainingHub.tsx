import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, HardHat, PlayCircle, Award } from "lucide-react";

const TrainingHub = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Training Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Worker Training Card */}
          <Card className="eco-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 eco-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <HardHat className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Worker Training</CardTitle>
              <CardDescription className="text-base">
                Professional training for waste management workers, safety
                protocols, and operational procedures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <PlayCircle className="w-5 h-5 text-primary" />
                <span>Interactive video training</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="w-5 h-5 text-primary" />
                <span>10 quiz questions • 100 points max</span>
              </div>
              <Link to="/training/worker" className="block w-full">
                <Button className="w-full eco-gradient text-primary-foreground hover:opacity-90">
                  Start Worker Training
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Citizen Training Card */}
          <Card className="eco-card hover-lift group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 eco-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Citizen Training</CardTitle>
              <CardDescription className="text-base">
                Public education on waste sorting, recycling, and environmental
                responsibility for community members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <PlayCircle className="w-5 h-5 text-primary" />
                <span>Interactive video training</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="w-5 h-5 text-primary" />
                <span>10 quiz questions • 100 points max</span>
              </div>
              <Link to="/training/citizen" className="block w-full">
                <Button className="w-full eco-gradient text-primary-foreground hover:opacity-90">
                  Start Citizen Training
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Training Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Video Learning</h3>
              <p className="text-sm text-muted-foreground">
                Interactive video content with real-world scenarios
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Gamification</h3>
              <p className="text-sm text-muted-foreground">
                Earn points and track your progress
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Retake Option</h3>
              <p className="text-sm text-muted-foreground">
                Practice until you master the content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingHub;
