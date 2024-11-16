"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Loader2, LockIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useModalStore } from "@/store/zustand";
import { useEffect } from "react";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, error } = useCurrentUser();

  useEffect(() => {
    // Debug logs
    console.log('Protected Layout State:', {
      user,
      isLoading,
      error,
      cookies: document.cookie // Check if cookies exist
    });
  }, [user, isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center">
          <Loader2 className="size-4 mr-2 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          Error loading user: {error.message}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AuthCard />
      </div>
    );
  }

  return <>{children}</>;
}

export default function AuthCard() {
    const { openModal } = useModalStore();
  
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden">
          <div className="sm:w-1/3 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center p-8">
            <div className="bg-white/10 p-4 rounded-full">
              <LockIcon className="size-20 text-primary" />
            </div>
          </div>
          <div className="sm:w-2/3 p-6">
            <CardHeader className="space-y-2 px-0 pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Authentication required
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Please sign in to access this protected content.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 py-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => openModal("connectAccountModal")}
                  className="flex-1 hover:scale-105 transition-transform duration-200"
                  variant="outline"
                  size="lg"
                >
                  <svg className="mr-2 size-5" viewBox="0 0 24 24">
                    {/* Google icon path */}
                    <path
                      fill="currentColor"
                      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <Link href="/" className="flex-1">
                  <Button 
                    className="w-full hover:scale-105 transition-transform duration-200"
                    size="lg"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }