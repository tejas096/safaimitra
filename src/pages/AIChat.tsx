import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const faqs = [
  {
    question: "How does the waste management system work?",
    answer:
      "Our waste management system uses smart routing and AI-powered scheduling to optimize collection routes, reduce costs, and minimize environmental impact. Users can schedule pickups, track waste disposal, and receive analytics on their waste patterns.",
  },
  {
    question: "What types of waste can be managed?",
    answer:
      "We handle all types of waste including household waste, recyclables, organic waste, hazardous materials, and commercial waste. Our system categorizes waste types automatically and ensures proper disposal methods for each category.",
  },
  {
    question: "How do I schedule a waste pickup?",
    answer:
      "You can schedule waste pickups through our platform by selecting your location, waste type, and preferred time slot. Our AI system will optimize the route and confirm your pickup time within minutes.",
  },
  {
    question: "What are the environmental benefits?",
    answer:
      "Our system reduces carbon emissions by 40% through optimized routes, increases recycling rates by 60% through smart sorting, and provides detailed analytics to help users reduce their overall waste footprint.",
  },
  {
    question: "How much does the service cost?",
    answer:
      "Pricing varies based on location, waste volume, and service frequency. We offer competitive rates with transparent pricing and no hidden fees. Contact us for a personalized quote based on your specific needs.",
  },
  {
    question: "Is the system available in my area?",
    answer:
      "We're expanding rapidly across major cities. Enter your zip code on our platform to check availability in your area. We're adding new regions monthly and prioritize areas with high demand.",
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant for waste management. You can ask me questions or click on any FAQ below to get started.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (question: string): string => {
    const responses = [
      "That's a great question about waste management! Based on current industry standards and our system capabilities, here's what I can tell you: ",
      "Thank you for asking! Our waste management system is designed to handle this type of inquiry efficiently. ",
      "I'd be happy to help you with that! Here's the information you're looking for: ",
      "That's an important aspect of sustainable waste management. Let me provide you with detailed information: ",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    if (
      question.toLowerCase().includes("cost") ||
      question.toLowerCase().includes("price")
    ) {
      return (
        randomResponse +
        "Our pricing structure is transparent and competitive. We offer flexible plans based on your waste volume and collection frequency. Basic residential service starts at $25/month, while commercial rates vary based on specific requirements. All plans include smart scheduling, route optimization, and detailed analytics."
      );
    }

    if (
      question.toLowerCase().includes("environment") ||
      question.toLowerCase().includes("green") ||
      question.toLowerCase().includes("sustainable")
    ) {
      return (
        randomResponse +
        "Our system significantly reduces environmental impact through AI-optimized routes that cut emissions by up to 40%, smart sorting that increases recycling rates by 60%, and comprehensive tracking that helps users minimize their overall waste footprint. We're committed to creating a more sustainable future."
      );
    }

    if (
      question.toLowerCase().includes("schedule") ||
      question.toLowerCase().includes("pickup")
    ) {
      return (
        randomResponse +
        "Scheduling is simple and flexible. You can book pickups through our platform, choose from available time slots, and our AI system will optimize routing automatically. You'll receive confirmation and tracking information, plus the ability to modify or cancel bookups up to 2 hours before the scheduled time."
      );
    }

    return (
      randomResponse +
      "Our comprehensive waste management system addresses this through intelligent routing, automated scheduling, and real-time tracking. We provide detailed analytics and reporting to help optimize your waste management strategy while maintaining the highest standards of environmental responsibility."
    );
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleFAQClick = (faq: (typeof faqs)[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      isUser: true,
      timestamp: new Date(),
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: faq.answer,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* FAQ Sidebar */}
          <div className="lg:col-span-1 bg-card rounded-lg border p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq)}
                    className="w-full text-left p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 bg-card rounded-lg border flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b">
              <h1 className="text-xl font-semibold text-foreground">
                AI Waste Management Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                Ask questions about our waste management solutions
              </p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p
                        className={`text-xs mt-2 opacity-70 ${
                          message.isUser
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground/70"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-muted-foreground">
                        AI is thinking...
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question about waste management..."
                  className="resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
