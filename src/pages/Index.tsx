import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  MapPin,
  Upload,
  Trophy,
  ShoppingCart,
  BookOpen,
  MessageSquare,
  BarChart3,
  Recycle,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
} from "lucide-react";
import EcoCard from "@/components/EcoCard";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Upload,
      title: "AI Waste Assistant",
      description: "Upload photos to get instant waste segregation guidance",
      color: "text-primary",
    },
    {
      icon: MapPin,
      title: "Bin Mapping",
      description: "Find nearby bins and track their status in real-time",
      color: "text-secondary",
    },
    {
      icon: Trophy,
      title: "Rewards & Leaderboard",
      description:
        "Earn points for eco-friendly actions and compete with others",
      color: "text-warning",
    },
    {
      icon: Recycle,
      title: "Kabadi Marketplace",
      description: "Connect with local recyclers and get the best prices",
      color: "text-success",
    },
  ];

  const quickActions = [
    {
      href: "/report",
      label: "Report Issue",
      icon: MessageSquare,
      variant: "hero" as const,
    },
    {
      href: "/dashboard",
      label: "Training Portal",
      icon: BookOpen,
      variant: "eco" as const,
    },
    {
      href: "/leaderboard",
      label: "View Leaderboard",
      icon: Trophy,
      variant: "eco" as const,
    },
    {
      href: "/kabadi",
      label: "Kabadi Shop",
      icon: ShoppingCart,
      variant: "eco" as const,
    },
  ];

  const stats = [
    { label: "Waste Collected", value: "2,847 kg", icon: Recycle },
    { label: "Active Users", value: "1,234", icon: Users },
    { label: "Bins", value: "89", icon: Target },
    { label: "Complaints Resolved", value: "456", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-secondary-light to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="bounce-in">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="p-3 eco-gradient rounded-xl">
                  <Leaf className="h-8 w-8 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  Safai Mitra
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Smart Waste Management
                <span className="block text-primary">for a Cleaner Future</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Join the revolution in environmental sustainability. Our
                AI-powered platform connects citizens, workers, and
                administrators to create cleaner, greener communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
              <Button variant="hero" size="xl" asChild>
                <NavLink to="/login-signup">
                  Get Started <ArrowRight className="h-5 w-5 ml-2" />
                </NavLink>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <NavLink to="/report">Report an Issue</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <EcoCard
                key={index}
                variant="gradient"
                className="text-center slide-in-right"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From citizens to administrators, our platform provides tools that
              make waste management efficient and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <EcoCard
                key={index}
                variant="hover"
                className={`text-center cursor-pointer transition-all duration-300 ring-2 ring-primary shadow-lg${
                  activeFeature === index ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <feature.icon
                  className={`h-12 w-12 ${feature.color} mx-auto mb-4`}
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started with these essential features
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <EcoCard key={index} variant="hover" className="text-center">
                <action.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {action.label}
                </h3>
                <Button variant={action.variant} className="w-full" asChild>
                  <NavLink to={action.href}>Go to {action.label}</NavLink>
                </Button>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens working together to create cleaner, more
            sustainable communities through smart waste management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" asChild>
              <NavLink to="/dashboard">Start Your Journey</NavLink>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground text-primary"
              asChild
            >
              <NavLink to="/training">Learn More</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
