"use client";

import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { ApiProvider } from "@/context/ApiContext";

export default function QRTestPage() {
  return (
    <ApiProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto">
          <div className="mb-6">
            <a href="/" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </a>
          </div>
          
          <QRCodeGenerator />
        </div>
      </div>
    </ApiProvider>
  );
}
