import { MapPin, Trash2, Battery, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import EcoCard from "./EcoCard";

interface SmartBinCardProps {
  id: string;
  location: string;
  status: "full" | "half" | "empty" | "offline";
  batteryLevel: number;
  lastUpdated: string;
  distance?: string;
}

const SmartBinCard = ({ 
  id, 
  location, 
  status, 
  batteryLevel, 
  lastUpdated, 
  distance 
}: SmartBinCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "full": return "text-destructive";
      case "half": return "text-warning";
      case "empty": return "text-success";
      case "offline": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "full": return "🔴";
      case "half": return "🟡";
      case "empty": return "🟢";
      case "offline": return "⚫";
      default: return "⚫";
    }
  };

  return (
    <EcoCard variant="hover" className="relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trash2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Bin #{id}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-lg">{getStatusIcon(status)}</span>
          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
          {distance && <span className="text-primary">• {distance}</span>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Battery className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{batteryLevel}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-success" />
            <span className="text-muted-foreground">Online</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="eco" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </EcoCard>
  );
};

export default SmartBinCard;