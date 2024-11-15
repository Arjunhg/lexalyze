'use client'
import { useModalStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function googleSignIn():Promise<void>{
    return new Promise((resolve) => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        resolve();
    })
}

export function ConnectAccountModal() {
    const modalKey = "connectAccountModal";
    const { isOpen, closeModal } = useModalStore();
    const [isAgreed, setIsAgreed] = useState(false);
  
    const mutation = useMutation({
      mutationFn: googleSignIn,
      onSuccess: () => {
        closeModal(modalKey);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  
    const handleGoogleSignIn = async () => {
      if (isAgreed) {
        mutation.mutate();
      } else {
        toast.error("You must agree to the terms and conditions");
      }
    };
  
    return (
      <Dialog
        open={isOpen(modalKey)}
        onOpenChange={() => closeModal(modalKey)}
        key={modalKey}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Connect Google Account
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Sign in with your Google account to access all features and continue your journey.
            </DialogDescription>
          </DialogHeader>
  
          <div className="grid gap-6 py-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={!isAgreed || mutation.isPending}
              className="w-full relative group hover:shadow-lg transition-all duration-300 h-12"
              variant="outline"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                  />
                </svg>
              </div>
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Connecting...
                </div>
              ) : (
                <span className="ml-4">Sign in with Google</span>
              )}
            </Button>
  
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id="terms"
                  checked={isAgreed}
                  onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-tight cursor-pointer select-none group-hover:text-primary transition-colors duration-200"
                >
                  I agree to the{" "}
                  
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </Label>
              </div>
              
              {!isAgreed && (
                <p className="text-xs text-muted-foreground/80 italic">
                  Please accept the terms and conditions to continue
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }