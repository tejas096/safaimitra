import { useState } from "react";
import { Search, ShoppingCart, Star, Leaf, Gift, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EcoCard from "@/components/EcoCard";

interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  originalPrice: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isEcoFriendly: boolean;
  imageUrl: string;
  discount?: number;
}

interface UserStats {
  totalPoints: number;
  pointsUsed: number;
  level: string;
  nextLevelPoints: number;
}

const Rewards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<string[]>([]);

  const userStats: UserStats = {
    totalPoints: 2450,
    pointsUsed: 800,
    level: "Eco Warrior",
    nextLevelPoints: 3000,
  };

  const products: Product[] = [
    {
      id: "1",
      name: "Bamboo Water Bottle",
      description: "Sustainable bamboo water bottle with leak-proof design",
      points: 500,
      originalPrice: 899,
      category: "lifestyle",
      rating: 4.5,
      reviews: 89,
      inStock: true,
      isEcoFriendly: true,
      imageUrl: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Solar Power Bank",
      description: "10000mAh solar power bank for eco-friendly charging",
      points: 1200,
      originalPrice: 2499,
      category: "electronics",
      rating: 4.3,
      reviews: 156,
      inStock: true,
      isEcoFriendly: true,
      imageUrl: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Organic Cotton Tote Bag",
      description: "Reusable organic cotton shopping bag",
      points: 300,
      originalPrice: 599,
      category: "lifestyle",
      rating: 4.7,
      reviews: 234,
      inStock: true,
      isEcoFriendly: true,
      imageUrl: "/placeholder.svg",
    },
    {
      id: "4",
      name: "Plant a Tree Certificate",
      description: "Sponsor a tree plantation in your name",
      points: 200,
      originalPrice: 500,
      category: "environmental",
      rating: 4.9,
      reviews: 567,
      inStock: true,
      isEcoFriendly: true,
      imageUrl: "/placeholder.svg",
    },
    {
      id: "5",
      name: "Eco-Friendly Notebook Set",
      description: "Set of 3 notebooks made from recycled paper",
      points: 400,
      originalPrice: 799,
      category: "lifestyle",
      rating: 4.4,
      reviews: 78,
      inStock: true,
      isEcoFriendly: true,
      imageUrl: "/placeholder.svg",
    },
    {
      id: "6",
      name: "Amazon Gift Voucher",
      description: "₹500 Amazon gift voucher",
      points: 450,
      originalPrice: 500,
      category: "vouchers",
      rating: 4.8,
      reviews: 1205,
      inStock: true,
      isEcoFriendly: false,
      imageUrl: "/placeholder.svg",
    },
  ];

  const categories = [
    { id: "all", name: "All Products", icon: Gift },
    { id: "lifestyle", name: "Eco Lifestyle", icon: Leaf },
    { id: "electronics", name: "Electronics", icon: Award },
    { id: "environmental", name: "Environmental", icon: Heart },
    { id: "vouchers", name: "Vouchers", icon: Gift },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(id => id !== productId));
  };

  const isInCart = (productId: string) => cart.includes(productId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="eco-gradient text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Rewards Store</h1>
            <p className="text-xl opacity-90 mb-8">
              Redeem your eco-points for sustainable products and experiences
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white text-foreground"
                />
              </div>
              <Button variant="secondary" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - User Stats & Categories */}
          <div className="lg:col-span-1">
            {/* User Points */}
            <EcoCard className="mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {userStats.totalPoints.toLocaleString()}
                </div>
                <div className="text-muted-foreground mb-4">Available Points</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Level:</span>
                    <Badge variant="default">{userStats.level}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Points Used:</span>
                    <span>{userStats.pointsUsed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Level:</span>
                    <span>{userStats.nextLevelPoints}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-accent rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(userStats.totalPoints / userStats.nextLevelPoints) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {userStats.nextLevelPoints - userStats.totalPoints} points to next level
                  </div>
                </div>
              </div>
            </EcoCard>

            {/* Categories */}
            <EcoCard>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </EcoCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="hover-lift">
                      <CardHeader className="pb-4">
                        <div className="aspect-square bg-accent/30 rounded-lg mb-4 flex items-center justify-center">
                          <Gift className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          {product.isEcoFriendly && (
                            <Badge className="bg-success text-success-foreground ml-2">
                              <Leaf className="h-3 w-3 mr-1" />
                              Eco
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{product.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({product.reviews} reviews)
                            </span>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold text-primary">
                                {product.points} pts
                              </div>
                              <div className="text-sm text-muted-foreground line-through">
                                ₹{product.originalPrice}
                              </div>
                            </div>
                            {product.discount && (
                              <Badge variant="destructive">
                                {product.discount}% OFF
                              </Badge>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="flex gap-2">
                            {product.inStock ? (
                              <Button
                                className="flex-1"
                                onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product.id)}
                                variant={isInCart(product.id) ? "outline" : "default"}
                              >
                                {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
                              </Button>
                            ) : (
                              <Button variant="outline" disabled className="flex-1">
                                Out of Stock
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <EcoCard className="text-center py-12">
                  <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start redeeming your points for amazing eco-friendly products!
                  </p>
                  <Button onClick={() => setSelectedCategory("all")}>
                    Browse Products
                  </Button>
                </EcoCard>
              </TabsContent>
              
              <TabsContent value="wishlist" className="mt-6">
                <EcoCard className="text-center py-12">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Save products you love to buy them later!
                  </p>
                  <Button onClick={() => setSelectedCategory("all")}>
                    Explore Products
                  </Button>
                </EcoCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;