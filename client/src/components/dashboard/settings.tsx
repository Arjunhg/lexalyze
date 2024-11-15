import { useCurrentUser } from "@/hooks/use-current-user";
import { useSubscription } from "@/hooks/use-subscription";
import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CheckCircle, Star } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function PremiumSettings() {
  const {
    subscriptionStatus,
    setLoading,
  } = useSubscription();
  const { user } = useCurrentUser();

  if (!subscriptionStatus) {
    return null;
  }

  const isActive = subscriptionStatus.status === "active";

  const handleUpgrade = async () => {
    setLoading(true);
    if (!isActive) {
      try {
        const response = await api.get("/payments/create-checkout-session");
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      } catch (error) {
        toast.error("Please try again or login to your account");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You are already a premium member");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-16 px-6 md:px-12">
      <div className="grid gap-12 md:grid-cols-2">

        {/* Personal Information Card */}
        <Card className="bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-3xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-wider">Personal Information</CardTitle>
            <CardDescription className="text-sm text-gray-200">Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/90">Full Name</Label>
              <Input
                value={user.displayName}
                id="name"
                readOnly
                className="bg-white/20 text-white focus:bg-white/30 rounded-md p-3"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/90">Email</Label>
              <Input
                value={user.email}
                id="email"
                readOnly
                className="bg-white/20 text-white focus:bg-white/30 rounded-md p-3"
              />
            </div>
            <p className="text-xs text-gray-300">
              Your account is managed through Google. If you want to change your
              email, please contact us.
            </p>
          </CardContent>
        </Card>

        {/* Premium Card */}
        {isActive ? (
          <Card className="bg-gradient-to-br from-green-700 via-teal-700 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-3xl p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-wider">Premium Membership</CardTitle>
              <CardDescription className="text-sm text-gray-200">Your exclusive access details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-md bg-green-600/20 p-2 text-sm font-medium text-green-300 shadow-md">
                  <CheckCircle size={20} className="text-green-300" />
                  Active membership
                </div>
                <div className="flex items-center gap-1 rounded-md bg-yellow-500/20 p-2 text-sm font-medium text-yellow-300 shadow-md">
                  <Star size={20} className="text-yellow-300" />
                  Premium
                </div>
              </div>
              <Separator className="border-white/10 my-4" />
              <div className="space-y-2">
                <p className="text-white text-lg font-medium">
                  Thank you for supporting us! Enjoy your exclusive benefits.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out rounded-3xl p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-wider">Unlock Premium Access</CardTitle>
              <CardDescription className="text-sm text-gray-200">
                Upgrade to enjoy unlimited access and exclusive features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-yellow-400" />
                  <p>Unlimited access to all features</p>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-yellow-400" />
                  <p>Lifetime membership with no recurring fees</p>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-yellow-400" />
                  <p>Priority support and exclusive updates</p>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors duration-200 ease-in-out"
                onClick={handleUpgrade}
                size="lg"
              >
                Purchase Lifetime Membership
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
