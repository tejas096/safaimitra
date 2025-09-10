import { MapPin, Clock, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import EcoCard from "./EcoCard";

interface ComplaintTileProps {
  id: string;
  type: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  submittedBy: string;
  submittedAt: string;
  priority: "low" | "medium" | "high";
  description: string;
  imageUrl?: string;
}

const ComplaintTile = ({ 
  id, 
  type, 
  location, 
  status, 
  submittedBy, 
  submittedAt, 
  priority,
  description,
  imageUrl 
}: ComplaintTileProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-warning";
      case "in-progress": return "text-primary";
      case "resolved": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <EcoCard variant="hover" className="relative">
      {imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Complaint" 
            className="w-full h-32 object-cover"
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">#{id}</h3>
          <span className="text-sm text-muted-foreground">{type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <AlertTriangle className={`h-4 w-4 ${getPriorityColor(priority)}`} />
          <span className={`text-sm font-medium ${getPriorityColor(priority)}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{submittedBy}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{submittedAt}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </span>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </EcoCard>
  );
};

export default ComplaintTile;