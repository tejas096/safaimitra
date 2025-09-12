import { useState } from "react";
import { Search, MapPin, Star, Phone, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EcoCard from "@/components/EcoCard";

interface Dealer {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  phone: string;
  specialties: string[];
  pricing: Record<string, number>;
  isOpen: boolean;
  pickupAvailable: boolean;
}

interface RecyclableItem {
  id: string;
  category: string;
  items: Array<{
    name: string;
    priceRange: string;
    unit: string;
    description: string;
  }>;
}

const KabadiShop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dealers: Dealer[] = [
    {
      id: "1",
      name: "Green Recyclers",
      location: "Sector 15, Noida",
      distance: "1.2 km",
      rating: 4.5,
      reviews: 128,
      phone: "+91 98765 43210",
      specialties: ["Paper", "Plastic", "Metal"],
      pricing: { paper: 8, plastic: 15, metal: 45 },
      isOpen: true,
      pickupAvailable: true,
    },
    {
      id: "2",
      name: "EcoWaste Solutions",
      location: "Sector 22, Gurgaon",
      distance: "2.5 km",
      rating: 4.3,
      reviews: 89,
      phone: "+91 87654 32109",
      specialties: ["Electronics", "Metal", "Glass"],
      pricing: { electronics: 25, metal: 42, glass: 6 },
      isOpen: false,
      pickupAvailable: true,
    },
    {
      id: "3",
      name: "City Scrap Dealers",
      location: "Karol Bagh, Delhi",
      distance: "3.8 km",
      rating: 4.7,
      reviews: 256,
      phone: "+91 76543 21098",
      specialties: ["Paper", "Cardboard", "Books"],
      pricing: { paper: 9, cardboard: 7, books: 12 },
      isOpen: true,
      pickupAvailable: false,
    },
  ];

  const recyclableItems: RecyclableItem[] = [
    {
      id: "paper",
      category: "Paper & Cardboard",
      items: [
        { name: "Newspapers", priceRange: "₹6-8", unit: "per kg", description: "Old newspapers and magazines" },
        { name: "Cardboard Boxes", priceRange: "₹5-7", unit: "per kg", description: "Corrugated cardboard boxes" },
        { name: "Office Paper", priceRange: "₹8-12", unit: "per kg", description: "White office paper and documents" },
        { name: "Books", priceRange: "₹10-15", unit: "per kg", description: "Old books and notebooks" },
      ],
    },
    {
      id: "plastic",
      category: "Plastic Items",
      items: [
        { name: "PET Bottles", priceRange: "₹12-18", unit: "per kg", description: "Water and soft drink bottles" },
        { name: "Plastic Bags", priceRange: "₹8-12", unit: "per kg", description: "Shopping bags and packaging" },
        { name: "Containers", priceRange: "₹15-20", unit: "per kg", description: "Food containers and packaging" },
      ],
    },
    {
      id: "metal",
      category: "Metal & Electronics",
      items: [
        { name: "Aluminum Cans", priceRange: "₹80-100", unit: "per kg", description: "Beverage cans and containers" },
        { name: "Copper Wire", priceRange: "₹400-500", unit: "per kg", description: "Electrical wires and cables" },
        { name: "Iron Scrap", priceRange: "₹25-35", unit: "per kg", description: "Iron and steel items" },
        { name: "Old Electronics", priceRange: "₹50-200", unit: "per piece", description: "Phones, computers, appliances" },
      ],
    },
  ];

  const categories = ["all", "paper", "plastic", "metal"];

  const filteredItems = selectedCategory === "all" 
    ? recyclableItems 
    : recyclableItems.filter(item => item.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="eco-gradient text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Kabadi Marketplace</h1>
            <p className="text-xl opacity-90 mb-8">
              Connect with local scrap dealers and turn your waste into value
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search dealers or items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white text-foreground"
                />
              </div>
              <Button variant="secondary" size="lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Price Guide */}
          <div className="lg:col-span-1">
            <EcoCard className="sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Current Market Prices</h3>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category === "all" ? "All Items" : category}
                  </Button>
                ))}
              </div>

              {/* Price List */}
              <div className="space-y-4">
                {filteredItems.map((category) => (
                  <div key={category.id}>
                    <h4 className="font-medium text-primary mb-2">{category.category}</h4>
                    <div className="space-y-2">
                      {category.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start p-3 bg-accent/30 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-primary">{item.priceRange}</div>
                            <div className="text-xs text-muted-foreground">{item.unit}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </EcoCard>
          </div>

          {/* Main Content - Dealers */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Nearby Dealers</h2>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                View on Map
              </Button>
            </div>

            <div className="space-y-4">
              {dealers.map((dealer) => (
                <Card key={dealer.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {dealer.name}
                          {dealer.isOpen ? (
                            <Badge className="bg-success text-success-foreground">Open</Badge>
                          ) : (
                            <Badge variant="destructive">Closed</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {dealer.location} • {dealer.distance} away
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{dealer.rating}</span>
                          <span className="text-muted-foreground">({dealer.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Specialties */}
                      <div>
                        <h4 className="font-medium mb-2">Specializes in:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dealer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div>
                        <h4 className="font-medium mb-2">Current Rates:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(dealer.pricing).map(([item, price]) => (
                            <div key={item} className="text-sm p-2 bg-accent/30 rounded">
                              <div className="capitalize font-medium">{item}</div>
                              <div className="text-primary">₹{price}/kg</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Now
                        </Button>
                        {dealer.pickupAvailable && (
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-1" />
                            Request Pickup
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Request Pickup CTA */}
            <EcoCard variant="gradient" className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Need a Pickup?</h3>
              <p className="text-muted-foreground mb-4">
                Schedule a pickup from your location and get the best rates from multiple dealers
              </p>
              <Button variant="secondary" size="lg">
                <Truck className="h-5 w-5 mr-2" />
                Schedule Pickup
              </Button>
            </EcoCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KabadiShop;