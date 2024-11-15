import { cn } from "@/lib/utils";
import {
  ArrowRight,
  FileSearch,
  Globe,
  Hourglass,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    title: "AI-powered Analysis",
    description: "Leverage advanced AI to analyze contracts quickly and accurately.",
    icon: FileSearch,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Risk Identification",
    description: "Spot potential risks and opportunities in your contracts.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Streamlined Negotiation",
    description: "Accelerate the negotiation process with AI-driven insights.",
    icon: Hourglass,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Cost Reduction",
    description: "Significantly reduce legal costs through automation.",
    icon: PiggyBank,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Improved Compliance",
    description: "Ensure your contracts meet all regulatory requirements.",
    icon: Scale,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Faster Turnaround",
    description: "Complete contract reviews in minutes instead of hours.",
    icon: Zap,
    color: "bg-teal-100 text-teal-600",
  },
];

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/40 via-purple-200/40 to-pink-200/40 opacity-30 blur-2xl"></div>
      <div className="container px-6 md:px-8 flex flex-col items-center max-w-7xl mx-auto relative z-10">
        <Link
          href={"/dashboard"}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-5 py-2 mb-6 rounded-full hidden md:flex items-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-blue-600 transition duration-300 shadow-lg"
          )}
        >
          <Sparkles className="mr-3" size={20} />
          <span>Discover Simple Metrics for Your Team</span>
        </Link>
        <div className="text-center mb-12 w-full">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 mb-4 animate-gradient">
            Revolutionize Your Contracts
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Harness the power of AI to analyze, understand, and optimize your contracts faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              className="inline-flex items-center justify-center text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl transform hover:scale-105 transition-all duration-300"
              size={"lg"}
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              className="inline-flex items-center justify-center text-lg font-semibold bg-white text-gray-900 shadow-xl border-gray-300 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              size={"lg"}
              variant={"outline"}
            >
              Learn More
              <Globe className="ml-2" size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="h-full bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md`}>
                    <feature.icon className="text-current" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
