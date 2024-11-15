"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadModal } from "@/components/modals/upload-modal";
import { XCircle } from "lucide-react";

export default function PaymentCancelled() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400">
        <Card className="w-full max-w-md shadow-2xl bg-white/90 rounded-xl backdrop-blur-lg transition-transform transform">
          <CardHeader className="text-center py-6">
            <CardTitle className="flex flex-col items-center gap-2 text-red-600 font-extrabold text-2xl">
              <XCircle size={48} className="text-red-500" />
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Something went wrong with your payment.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="space-y-6">
              <p className="text-center text-gray-700">
                To receive your analysis, please upload a PDF document.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Your payment was cancelled. Please
                  contact our support team if you need assistance.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4">
            <div className="flex flex-col space-y-3 w-full">
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Upload for Full Analysis
              </Button>
              <Link href="/dashboard">
                <Button className="w-full hover:scale-105 hover:shadow- transition-all" variant="outline">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={() => setIsUploadModalOpen(true)}
      />
    </>
  );
}
