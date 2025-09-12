import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react";
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
  features?: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
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
    features: [
      "3 separate compartments for different waste types",
      "Smart sensor technology for hands-free operation",
      "Made from 100% recycled materials",
      "Odor-resistant coating",
      "Easy to clean and maintain",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Solar-Powered Garbage Compactor",
    price: 12000,
    image: Image2,
    category: "Compactors",
    description:
      "Eco-friendly solar-powered garbage compactor that reduces waste volume by up to 70%, ideal for public parks and residential complexes.",
    features: [
      "Solar-powered for energy efficiency",
      "Automatic compaction to save space",
      "Durable stainless steel body",
      "Weather-resistant design",
      "Easy to monitor fill levels",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Biodegradable Compost Bin",
    price: 1800,
    image: Image3,
    category: "Composters",
    description:
      "Compact compost bin for home use, perfect for converting kitchen waste into nutrient-rich compost for gardens.",
    features: [
      "Durable, odor-free design",
      "Aeration system for faster decomposition",
      "Made from recycled materials",
      "Compact size fits kitchens or balconies",
      "Easy-to-empty compost tray",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 4,
    name: "Recyclable Waste Storage Bags (Pack of 50)",
    price: 700,
    image: Image4,
    category: "Accessories",
    description:
      "Strong and durable recyclable bags designed to store segregated waste efficiently, reducing contamination of recyclables.",
    features: [
      "Eco-friendly and recyclable",
      "Large 20-liter capacity per bag",
      "Durable tear-resistant material",
      "Suitable for home or office use",
      "Comes in pack of 50",
    ],
    inStock: true,
    rating: 4.5,
    reviews: 150,
  },
  {
    id: 5,
    name: "Industrial Waste Shredder",
    price: 45000,
    image: Image5,
    category: "Industrial Equipment",
    description:
      "Heavy-duty shredder for breaking down bulky industrial waste into smaller pieces for easier disposal or recycling.",
    features: [
      "High-capacity shredding for industrial use",
      "Durable steel blades",
      "Energy-efficient motor",
      "Safety lock mechanism",
      "Easy maintenance and cleaning",
    ],
    inStock: true,
    rating: 4.4,
    reviews: 42,
  },
  {
    id: 6,
    name: "Odorless Kitchen Food Waste Bin",
    price: 1200,
    image: Image6,
    category: "Dustbins",
    description:
      "Compact kitchen bin designed to store food waste without odors, perfect for apartments and small kitchens.",
    features: [
      "Activated charcoal filter to prevent odors",
      "Foot-pedal for hands-free operation",
      "Durable, easy-to-clean material",
      "Compact design for countertop or under-sink",
      "Removable inner bucket",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 102,
  },
  {
    id: 7,
    name: "Recycled Plastic Outdoor Dustbin",
    price: 3000,
    image: Image7,
    category: "Dustbins",
    description:
      "Weather-resistant outdoor dustbin made from recycled plastics, ideal for parks, schools, and public spaces.",
    features: [
      "UV-resistant material for outdoor durability",
      "Large 100-liter capacity",
      "Rust-free construction",
      "Easy to clean and maintain",
      "Eco-friendly recycled plastic",
    ],
    inStock: true,
    rating: 4.5,
    reviews: 76,
  },
  {
    id: 8,
    name: "Electronic Waste Collection Box",
    price: 2500,
    image: Image8,
    category: "E-Waste",
    description:
      "Secure collection box for household electronic waste, ensuring safe disposal of old gadgets and batteries.",
    features: [
      "Lockable lid for safety",
      "Durable steel construction",
      "Compact for home or office",
      "Clearly labeled for e-waste separation",
      "Eco-friendly disposal initiative",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 58,
  },
  {
    id: 9,
    name: "Smart Recycling Station",
    price: 9000,
    image: Image9,
    category: "Recycling Units",
    description:
      "Multi-bin smart recycling station with sensors to detect fullness and guide users to recycle correctly.",
    features: [
      "AI-based sensor detection",
      "Separate bins for paper, plastics, and metals",
      "LCD interface for user guidance",
      "Durable, weatherproof design",
      "Suitable for schools, offices, and malls",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 34,
  },
  {
    id: 10,
    name: "Compost Accelerator Powder",
    price: 600,
    image: Image10,
    category: "Composters",
    description:
      "Organic powder that accelerates the composting process, ideal for home gardens and sustainable waste management.",
    features: [
      "100% natural and non-toxic",
      "Speeds up decomposition of organic waste",
      "Suitable for indoor and outdoor composting",
      "Odor-free formulation",
      "Easy to sprinkle over kitchen or garden waste",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 88,
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h2>
          <Link to="/rewards">
            <Button variant="primary">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/rewards"
            className="inline-flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-soft">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                {product.price} Points
              </span>
              {product.inStock ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant={isWishlisted ? "default" : "outline"}
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-eco-light/50 p-6 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">
                🌱 Eco-Friendly Impact
              </h4>
              <p className="text-sm text-muted-foreground">
                By choosing this product, you're contributing to a more
                sustainable future. Each purchase helps reduce waste and
                supports environmentally responsible practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
