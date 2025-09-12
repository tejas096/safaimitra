import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Image1 from "../assets/Smart Waste Segregation Dustbin images.webp";
import Image2 from "../assets/Solar-Powered Garbage Compactor.webp";
import Image3 from "../assets/Biodegradable Compost Bin.webp";
import Image4 from "../assets/Recyclable Waste Storage Bags (Pack of 50).webp";
import Image5 from "../assets/Industrial Waste Shredder.webp";
import Image6 from "../assets/Odorless Kitchen Food Waste Bin.webp";
import Image7 from "../assets/Recycled Plastic Outdoor Dustbin.webp";
import Image8 from "../assets/Electronic Waste Collection Box.webp";
import Image9 from "../assets/Smart Recycling Station.webp";
import Image10 from "../assets/Compost Accelerator Powder.webp";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Smart Waste Segregation Dustbin",
    price: 2500,
    image: Image1,
    category: "Dustbins",
    description:
      "3-compartment dustbin for efficient waste segregation with smart sensors and eco-friendly materials. Perfect for homes and offices looking to reduce their environmental footprint.",
  },
  {
    id: 2,
    name: "Solar-Powered Garbage Compactor",
    price: 12000,
    image: Image2,
    category: "Recycling Kits",
    description:
      "Eco-friendly solar-powered garbage compactor that reduces waste volume by up to 70%, ideal for public parks and residential complexes.",
  },
  {
    id: 3,
    name: "Biodegradable Compost Bin",
    price: 1800,
    image: Image3,
    category: "Composters",
    description:
      "Compact compost bin for home use, perfect for converting kitchen waste into nutrient-rich compost for gardens.",
  },
  {
    id: 4,
    name: "Recyclable Waste Storage Bags (Pack of 50)",
    price: 700,
    image: Image4,
    category: "Biodegradable Bags",
    description:
      "Strong and durable recyclable bags designed to store segregated waste efficiently, reducing contamination of recyclables.",
  },
  {
    id: 5,
    name: "Industrial Waste Shredder",
    price: 45000,
    image: Image5,
    category: "Recycling Kits",
    description:
      "Heavy-duty shredder for breaking down bulky industrial waste into smaller pieces for easier disposal or recycling.",
  },
  {
    id: 6,
    name: "Odorless Kitchen Food Waste Bin",
    price: 1200,
    image: Image6,
    category: "Dustbins",
    description:
      "Compact kitchen bin designed to store food waste without odors, perfect for apartments and small kitchens.",
  },
  {
    id: 7,
    name: "Recycled Plastic Outdoor Dustbin",
    price: 3000,
    image: Image7,
    category: "Dustbins",
    description:
      "Weather-resistant outdoor dustbin made from recycled plastics, ideal for parks, schools, and public spaces.",
  },
  {
    id: 8,
    name: "Electronic Waste Collection Box",
    price: 2500,
    image: Image8,
    category: "Dustbins",
    description:
      "Secure collection box for household electronic waste, ensuring safe disposal of old gadgets and batteries.",
  },
  {
    id: 9,
    name: "Smart Recycling Station",
    price: 9000,
    image: Image9,
    category: "Recycling Kits",
    description:
      "Multi-bin smart recycling station with sensors to detect fullness and guide users to recycle correctly.",
  },
  {
    id: 10,
    name: "Compost Accelerator Powder",
    price: 600,
    image: Image10,
    category: "Composters",
    description:
      "Organic powder that accelerates the composting process, ideal for home gardens and sustainable waste management.",
  },
];

const categories = [
  "All",
  "Dustbins",
  "Composters",
  "Biodegradable Bags",
  "Recycling Kits",
  "Cleaning Tools",
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            Shop Sustainable Products
          </h1>
          <p className="text-center text-primary-foreground/80 mt-2">
            Discover eco-friendly waste management solutions for a greener
            tomorrow
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "eco" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-hover transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Link to={`/product/${product.id}`} className="block h-full">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="text-xs text-primary font-medium uppercase tracking-wide">
                      {product.category}
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.price} Points
                      </span>
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Quick Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact us for custom waste management solutions tailored to your
            needs
          </p>
          <Button size="lg">Contact Support</Button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
