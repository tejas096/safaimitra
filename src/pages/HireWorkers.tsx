import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users, Clock, MapPin, Star, Truck, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface WorkerTeam {
  id: string;
  name: string;
  rating: number;
  completedJobs: number;
  specialties: string[];
  hourlyRate: number;
  minTeamSize: number;
  maxTeamSize: number;
  availability: string;
  location: string;
}

const HireWorkers = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamSize, setTeamSize] = useState<number>(2);
  const [workDuration, setWorkDuration] = useState<number>(4);
  const [workType, setWorkType] = useState<string>("");
  const [includeVehicle, setIncludeVehicle] = useState<boolean>(false);

  const workerTeams: WorkerTeam[] = [
    {
      id: "1",
      name: "EcoClean Express",
      rating: 4.8,
      completedJobs: 156,
      specialties: ["Waste Collection", "Street Cleaning", "Recycling"],
      hourlyRate: 45,
      minTeamSize: 2,
      maxTeamSize: 8,
      availability: "Available",
      location: "Downtown Area",
    },
    {
      id: "2",
      name: "Green Solutions Team",
      rating: 4.9,
      completedJobs: 203,
      specialties: [
        "Industrial Cleaning",
        "Hazardous Waste",
        "Bulk Collection",
      ],
      hourlyRate: 55,
      minTeamSize: 3,
      maxTeamSize: 12,
      availability: "Available",
      location: "Industrial Zone",
    },
    {
      id: "3",
      name: "Swift Waste Handlers",
      rating: 4.6,
      completedJobs: 98,
      specialties: [
        "Residential Collection",
        "Garden Waste",
        "Emergency Cleanup",
      ],
      hourlyRate: 60,
      minTeamSize: 2,
      maxTeamSize: 6,
      availability: "Busy",
      location: "Residential Areas",
    },
  ];

  const calculatePrice = () => {
    const team = workerTeams.find((t) => t.id === selectedTeam);
    if (!team) return 0;

    const basePrice = team.hourlyRate * teamSize * workDuration;
    const vehicleCost = includeVehicle ? 50 * workDuration : 0; // $50/hour for vehicle
    const urgencyMultiplier = workType === "emergency" ? 1.5 : 1;
    const teamSizeDiscount = teamSize >= 5 ? 0.9 : 1;

    return Math.round(
      (basePrice + vehicleCost) * urgencyMultiplier * teamSizeDiscount
    );
  };

  const selectedTeamData = workerTeams.find((t) => t.id === selectedTeam);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Hire Waste Worker Teams
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with professional waste management teams for efficient and
            reliable service
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Teams */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Available Teams
            </h2>

            {workerTeams.map((team) => (
              <Card
                key={team.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedTeam === team.id
                    ? "ring-2 ring-primary bg-primary/5"
                    : ""
                }`}
                onClick={() => setSelectedTeam(team.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        {team.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{team.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>{team.completedJobs} jobs completed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{team.location}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        team.availability === "Available"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {team.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {team.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="outline"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Hourly Rate:
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{team.hourlyRate}/hour per worker
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Team Size:</span>
                      <span>
                        {team.minTeamSize}-{team.maxTeamSize} workers
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Book Service
                </CardTitle>
                <CardDescription>
                  Configure your team and get instant pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedTeamData && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="font-medium text-foreground">
                      {selectedTeamData.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTeamData.location}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="workType">Work Type</Label>
                  <Select value={workType} onValueChange={setWorkType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">
                        Regular Collection
                      </SelectItem>
                      <SelectItem value="deep-clean">Deep Cleaning</SelectItem>
                      <SelectItem value="bulk-removal">Bulk Removal</SelectItem>
                      <SelectItem value="emergency">
                        Emergency Cleanup (+50%)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize">
                    Team Size: {teamSize} workers
                    {selectedTeamData && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({selectedTeamData.minTeamSize}-
                        {selectedTeamData.maxTeamSize} available)
                      </span>
                    )}
                  </Label>
                  <Input
                    type="range"
                    min={selectedTeamData?.minTeamSize || 2}
                    max={selectedTeamData?.maxTeamSize || 8}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duration: {workDuration} hours
                  </Label>
                  <Input
                    type="range"
                    min="1"
                    max="12"
                    value={workDuration}
                    onChange={(e) => setWorkDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Work Location</Label>
                  <Input placeholder="Enter address or area" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-1">
                    <Label htmlFor="vehicle">
                      Include Garbage Collection Vehicle
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      +₹50/hour for vehicle service
                    </p>
                  </div>
                  <Switch
                    id="vehicle"
                    checked={includeVehicle}
                    onCheckedChange={setIncludeVehicle}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    placeholder="Special requirements, access instructions, etc."
                    rows={3}
                  />
                </div>

                {selectedTeam && workType && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Estimated Cost:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{calculatePrice()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>
                          Base rate ({teamSize} × {workDuration}h):
                        </span>
                        <span>
                          ₹
                          {selectedTeamData?.hourlyRate
                            ? selectedTeamData.hourlyRate *
                              teamSize *
                              workDuration
                            : 0}
                        </span>
                      </div>
                      {includeVehicle && (
                        <div className="flex justify-between text-blue-600">
                          <span>Vehicle service ({workDuration}h):</span>
                          <span>+₹{50 * workDuration}</span>
                        </div>
                      )}
                      {workType === "emergency" && (
                        <div className="flex justify-between text-orange-600">
                          <span>Emergency surcharge (+50%):</span>
                          <span>
                            +₹
                            {selectedTeamData?.hourlyRate
                              ? Math.round(
                                  (selectedTeamData.hourlyRate *
                                    teamSize *
                                    workDuration +
                                    (includeVehicle ? 50 * workDuration : 0)) *
                                    0.5
                                )
                              : 0}
                          </span>
                        </div>
                      )}
                      {teamSize >= 5 && (
                        <div className="flex justify-between text-green-600">
                          <span>Large team discount (-10%):</span>
                          <span>
                            -₹
                            {selectedTeamData?.hourlyRate
                              ? Math.round(
                                  (selectedTeamData.hourlyRate *
                                    teamSize *
                                    workDuration +
                                    (includeVehicle ? 50 * workDuration : 0)) *
                                    0.1
                                )
                              : 0}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={!selectedTeam || !workType}
                  size="lg"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Book Team Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireWorkers;
