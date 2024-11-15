import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export function PricingSection() {
  const handleUpgrade = async () => {
    try {
      const response = await api.get("/payment/create-checkout-session");
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="pricing-section" className="container mx-auto px-6 py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <h2 className="text-5xl font-extrabold tracking-tight text-center text-blue-700 mb-6">
        Choose the plan that&apos;s right for you
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
        Select the perfect plan for your needs. Upgrade anytime to unlock
        premium features and support.
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <PricingCard
          title="Basic"
          description="For comprehensive contract analysis"
          price="Free"
          period="/lifetime"
          features={[
            "Advanced contract analysis",
            "Unlimited projects",
            "Chat with your contract",
            "10+ risks with severity levels",
            "10+ opportunities with impact levels",
            "Comprehensive contract summary",
            "Improvement recommendations",
            "Key clauses identification",
            "Legal compliance assessment",
            "Negotiation points",
            "Contract duration analysis",
            "Termination conditions summary",
            "Compensation structure breakdown",
            "Performance metrics identification",
            "Intellectual property clause summary",
          ]}
          buttonText="Upgrade"
          onButtonClick={handleUpgrade}
        />
        <PricingCard
          title="Premium"
          description="For comprehensive contract analysis"
          price="$10"
          highlight
          period="/lifetime"
          features={[
            "Advanced contract analysis",
            "Unlimited projects",
            "Chat with your contract",
            "10+ risks with severity levels",
            "10+ opportunities with impact levels",
            "Comprehensive contract summary",
            "Improvement recommendations",
            "Key clauses identification",
            "Legal compliance assessment",
            "Negotiation points",
            "Contract duration analysis",
            "Termination conditions summary",
            "Compensation structure breakdown",
            "Performance metrics identification",
            "Intellectual property clause summary",
          ]}
          buttonText="Upgrade"
          onButtonClick={handleUpgrade}
        />
      </div>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  onButtonClick: () => void;
}

function PricingCard({
  title,
  description,
  price,
  features,
  period,
  buttonText,
  highlight,
  onButtonClick,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col rounded-lg shadow-md transition-all duration-300 overflow-hidden transform hover:scale-105 ${
        highlight
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
          : "bg-white border border-gray-200"
      }`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 bg-blue-700 text-xs font-bold uppercase text-white px-3 py-1 rounded-bl-lg shadow">
          Popular Choice
        </div>
      )}
      <CardHeader className="p-6 text-center">
        <CardTitle
          className={`text-2xl font-bold mb-2 ${
            highlight ? "text-white" : "text-blue-700"
          }`}
        >
          {title}
        </CardTitle>
        <CardDescription className={highlight ? "text-blue-100" : "text-gray-500"}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow px-6 py-4 text-center">
        <p className={`text-5xl font-extrabold ${highlight ? "text-white" : "text-gray-800"}`}>
          {price}
          <span className="text-lg font-normal ml-1">{period}</span>
        </p>
        <ul className="space-y-3 mt-6 text-sm text-gray-600">
          {features.map((feature, index) => (
            <li
              className={`flex items-center gap-2 ${
                highlight ? "text-blue-100" : "text-gray-700"
              }`}
              key={index}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6">
        <Button
          className={`w-full font-semibold py-3 ${
            highlight
              ? "bg-white text-blue-700 hover:bg-blue-200"
              : "bg-blue-700 text-white hover:bg-blue-800"
          }`}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
