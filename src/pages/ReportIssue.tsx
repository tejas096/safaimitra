import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  MapPin,
  Upload,
  CheckCircle,
  AlertTriangle,
  Trash2,
  TreePine,
  Factory,
  Truck,
} from "lucide-react";
import EcoCard from "@/components/EcoCard";
import ComplaintTile from "@/components/ComplaintTile";
import { useNavigate } from "react-router-dom";

const ReportIssue = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const addMorePhotosRef = useRef<HTMLInputElement | null>(null);
  const handleAddMorePhotos = () => {
    addMorePhotosRef.current?.click();
  };
  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };
  const navigate = useNavigate();

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const issueTypes = [
    { value: "uncollected-waste", label: "Uncollected Waste", icon: Trash2 },
    { value: "illegal-dumping", label: "Illegal Dumping", icon: AlertTriangle },
    { value: "overflowing-bin", label: "Overflowing Bin", icon: Trash2 },
    { value: "damaged-bin", label: "Damaged Smart Bin", icon: AlertTriangle },
    {
      value: "environmental-hazard",
      label: "Environmental Hazard",
      icon: TreePine,
    },
    { value: "industrial-waste", label: "Industrial Waste", icon: Factory },
    { value: "collection-delay", label: "Collection Delay", icon: Truck },
  ];

  const recentComplaints = [
    {
      id: "C-456",
      type: "Illegal Dumping",
      location: "Park Avenue, Near Mall",
      status: "in-progress" as const,
      submittedBy: "You",
      submittedAt: "2 hours ago",
      priority: "high" as const,
      description:
        "Large pile of construction waste dumped illegally near the park entrance.",
    },
    {
      id: "C-455",
      type: "Overflowing Bin",
      location: "Central Square",
      status: "resolved" as const,
      submittedBy: "You",
      submittedAt: "1 day ago",
      priority: "medium" as const,
      description: "Smart bin #034 overflowing with mixed waste.",
    },
    {
      id: "C-454",
      type: "Collection Delay",
      location: "Residential Area Block C",
      status: "pending" as const,
      submittedBy: "You",
      submittedAt: "3 days ago",
      priority: "low" as const,
      description: "Scheduled collection missed for 2 consecutive days.",
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setUploadedImages([]);
    setIssueType("");
    setDescription("");
    setLocation("");
    setIsSubmitted(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude.toFixed(
              6
            )}, ${position.coords.longitude.toFixed(6)}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <EcoCard className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Issue Reported Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your complaint has been submitted and assigned ID{" "}
              <strong>C-457</strong>. You'll receive updates via notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" onClick={resetForm}>
                Report Another Issue
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </EcoCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Report an Issue
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us keep your community clean by reporting waste management
            issues. Your reports help improve our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EcoCard>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Submit New Complaint
              </h2>

              <div className="space-y-6">
                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Issue Type *
                  </label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter location or coordinates"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={getCurrentLocation}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Provide detailed description of the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    {uploadedImages.length > 0 ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <input
                          ref={addMorePhotosRef}
                          id="upload-photos"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="upload-photos"
                          onClick={handleAddMorePhotos}
                        >
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Add More Photos
                          </Button>
                        </label>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Upload Photos
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Photos help us understand and resolve the issue faster
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button variant="outline" onClick={handleChooseClick}>
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Photos
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={
                      !issueType || !location || !description || isSubmitting
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Submit Complaint
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </EcoCard>
          </div>

          {/* Recent Complaints */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Your Recent Reports
            </h2>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <ComplaintTile key={complaint.id} {...complaint} />
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
