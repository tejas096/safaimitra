import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Clock,
  MapPin,
  DollarSign,
  User,
  Trophy,
  Gavel,
  Plus,
} from "lucide-react";

interface Tender {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "open" | "closed" | "finalized";
  currentLowestBid?: number;
  winner?: {
    name: string;
    bid: number;
  };
}

interface Bid {
  id: string;
  tenderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

const mockTenders: Tender[] = [
  {
    id: "1",
    title: "Downtown Area Waste Collection",
    description:
      "Daily garbage collection for downtown commercial district covering 50 blocks",
    location: "Downtown District",
    budget: 150000,
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    status: "open",
    currentLowestBid: 142000,
  },
  {
    id: "2",
    title: "Residential Sector B Waste Management",
    description:
      "Tri-weekly waste collection for residential sector B (2000 households)",
    location: "Sector B",
    budget: 85000,
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    status: "open",
    currentLowestBid: 79000,
  },
  {
    id: "3",
    title: "Industrial Zone Hazardous Waste",
    description:
      "Specialized hazardous waste collection and disposal for industrial zone",
    location: "Industrial Zone",
    budget: 250000,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "finalized",
    winner: {
      name: "EcoClean Solutions",
      bid: 235000,
    },
  },
];

const mockBids: Bid[] = [
  {
    id: "1",
    tenderId: "1",
    bidderName: "GreenWaste Co.",
    amount: 145000,
    timestamp: "2024-01-22 10:30:00",
  },
  {
    id: "2",
    tenderId: "1",
    bidderName: "CleanCity Services",
    amount: 142000,
    timestamp: "2024-01-22 14:15:00",
  },
  {
    id: "3",
    tenderId: "2",
    bidderName: "WastePro Inc.",
    amount: 82000,
    timestamp: "2024-01-21 09:45:00",
  },
  {
    id: "4",
    tenderId: "2",
    bidderName: "EcoManage Ltd.",
    amount: 79000,
    timestamp: "2024-01-22 11:20:00",
  },
];

export default function TenderBidding() {
  const [userRole, setUserRole] = useState<"government" | "contractor">(
    "contractor"
  );
  const [tenders, setTenders] = useState(mockTenders);
  const [bids, setBids] = useState(mockBids);
  const [selectedTender, setSelectedTender] = useState<string | null>(null);
  const [newBidAmount, setNewBidAmount] = useState("");
  const [bidderName, setBidderName] = useState("Your Company");

  const tenderForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      budget: "",
      endDate: "",
    },
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update some bids to simulate real-time activity
      if (Math.random() > 0.95) {
        const openTenders = tenders.filter((t) => t.status === "open");
        if (openTenders.length > 0) {
          const randomTender =
            openTenders[Math.floor(Math.random() * openTenders.length)];
          const currentBid =
            randomTender.currentLowestBid || randomTender.budget;
          const newBid = currentBid - Math.floor(Math.random() * 5000) - 1000;

          if (newBid > 0) {
            const newBidEntry: Bid = {
              id: Date.now().toString(),
              tenderId: randomTender.id,
              bidderName: `Contractor ${Math.floor(Math.random() * 100)}`,
              amount: newBid,
              timestamp: new Date().toLocaleString(),
            };

            setBids((prev) => [newBidEntry, ...prev]);
            setTenders((prev) =>
              prev.map((t) =>
                t.id === randomTender.id
                  ? { ...t, currentLowestBid: newBid }
                  : t
              )
            );
          }
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [tenders]);

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) return "Expired";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return `${days}d ${hours}h`;
  };

  const placeBid = (tenderId: string) => {
    const amount = parseFloat(newBidAmount);
    const tender = tenders.find((t) => t.id === tenderId);

    if (!tender) return;

    if (tender.currentLowestBid && amount >= tender.currentLowestBid) {
      toast.error("Bid must be lower than current lowest bid");
      return;
    }

    if (amount >= tender.budget) {
      toast.error("Bid must be lower than budget");
      return;
    }

    const newBid: Bid = {
      id: Date.now().toString(),
      tenderId,
      bidderName,
      amount,
      timestamp: new Date().toLocaleString(),
    };

    setBids((prev) => [newBid, ...prev]);
    setTenders((prev) =>
      prev.map((t) =>
        t.id === tenderId ? { ...t, currentLowestBid: amount } : t
      )
    );

    setNewBidAmount("");
    toast.success("Bid placed successfully!");
  };

  const finalizeTender = (tenderId: string) => {
    const tender = tenders.find((t) => t.id === tenderId);
    const lowestBid = bids
      .filter((b) => b.tenderId === tenderId)
      .sort((a, b) => a.amount - b.amount)[0];

    if (tender && lowestBid) {
      setTenders((prev) =>
        prev.map((t) =>
          t.id === tenderId
            ? {
                ...t,
                status: "finalized" as const,
                winner: {
                  name: lowestBid.bidderName,
                  bid: lowestBid.amount,
                },
              }
            : t
        )
      );
      toast.success(`Tender finalized! Winner: ${lowestBid.bidderName}`);
    }
  };

  const createTender = (data: any) => {
    const newTender: Tender = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      location: data.location,
      budget: parseFloat(data.budget),
      startDate: new Date().toISOString().split("T")[0],
      endDate: data.endDate,
      status: "open",
    };

    setTenders((prev) => [newTender, ...prev]);
    tenderForm.reset();
    toast.success("Tender created successfully!");
  };

  const getTenderBids = (tenderId: string) => {
    return bids
      .filter((b) => b.tenderId === tenderId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Garbage Tender Bidding
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time bidding platform for waste management contracts
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <Select
              value={userRole}
              onValueChange={(value: "government" | "contractor") =>
                setUserRole(value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>

            {userRole === "government" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="eco-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    New Tender
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Tender</DialogTitle>
                  </DialogHeader>
                  <Form {...tenderForm}>
                    <form
                      onSubmit={tenderForm.handleSubmit(createTender)}
                      className="space-y-4"
                    >
                      <FormField
                        control={tenderForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter tender title"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={tenderForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter tender description"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={tenderForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter location"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={tenderForm.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter budget"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={tenderForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full eco-gradient">
                        Create Tender
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tender List */}
          <div className="lg:col-span-2">
            <Card className="eco-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  Active Tenders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tenders.map((tender) => (
                  <Card
                    key={tender.id}
                    className={`cursor-pointer transition-all hover-lift ${
                      selectedTender === tender.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTender(tender.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {tender.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {tender.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            tender.status === "open"
                              ? "default"
                              : tender.status === "finalized"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {tender.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{tender.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>Budget: ${tender.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{getTimeRemaining(tender.endDate)}</span>
                        </div>
                        {tender.currentLowestBid && (
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-primary" />
                            <span className="text-primary font-medium">
                              Current: $
                              {tender.currentLowestBid.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {tender.winner && (
                        <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Trophy className="w-4 h-4" />
                            Winner: {tender.winner.name} - $
                            {tender.winner.bid.toLocaleString()}
                          </div>
                        </div>
                      )}

                      {userRole === "government" &&
                        tender.status === "open" && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              finalizeTender(tender.id);
                            }}
                            className="mt-3 w-full"
                            variant="outline"
                          >
                            Finalize Tender
                          </Button>
                        )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bidding Panel */}
          <div>
            <Card className="eco-card">
              <CardHeader>
                <CardTitle>
                  {selectedTender ? "Place Bid" : "Select a Tender"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTender ? (
                  <div className="space-y-4">
                    {userRole === "contractor" &&
                      (() => {
                        const tender = tenders.find(
                          (t) => t.id === selectedTender
                        );
                        return tender?.status === "open" ? (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="bidderName">Company Name</Label>
                              <Input
                                id="bidderName"
                                value={bidderName}
                                onChange={(e) => setBidderName(e.target.value)}
                                placeholder="Your company name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="bidAmount">Bid Amount ($)</Label>
                              <Input
                                id="bidAmount"
                                type="number"
                                value={newBidAmount}
                                onChange={(e) =>
                                  setNewBidAmount(e.target.value)
                                }
                                placeholder={`Less than ${
                                  tender?.currentLowestBid?.toLocaleString() ||
                                  tender?.budget.toLocaleString()
                                }`}
                              />
                            </div>
                            <Button
                              onClick={() => placeBid(selectedTender)}
                              className="w-full eco-gradient"
                              disabled={!newBidAmount || !bidderName}
                            >
                              Place Bid
                            </Button>
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground">
                            This tender is{" "}
                            {tender?.status === "finalized"
                              ? "finalized"
                              : "closed"}
                          </p>
                        );
                      })()}

                    {/* Bid History */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Bid History</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {getTenderBids(selectedTender).map((bid) => (
                          <div
                            key={bid.id}
                            className="flex justify-between items-center p-2 bg-muted/50 rounded"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {bid.bidderName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {bid.timestamp}
                              </p>
                            </div>
                            <span className="font-semibold text-primary">
                              ${bid.amount.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Select a tender from the list to view details and place bids
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
