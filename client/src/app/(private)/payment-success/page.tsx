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
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400">
        <Card className="w-full max-w-md shadow-2xl bg-white/90 rounded-xl backdrop-blur-lg transition-transform transform">
          <CardHeader className="text-center py-6">
            <CardTitle className="flex flex-col items-center gap-2 text-primary font-extrabold text-2xl text-indigo-700">
              <CheckCircle size={48} className="text-green-500" />
              Payment Successful
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Thank you for your payment. Your transaction is complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="space-y-6">
              <p className="text-center text-gray-700">
                To receive your analysis, please upload a PDF or DXS document.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> You can upload your contract in PDF or
                  DXS format.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4">
            <div className="flex flex-col space-y-3 w-full">
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 "
              >
                Upload for Full Analysis
              </Button>
              <Link href="/dashboard">
                <Button className="w-full hover:scale-105 transition-all duration-300" variant="outline">
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
