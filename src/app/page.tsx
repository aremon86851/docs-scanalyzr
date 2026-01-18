"use client";

import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { QRCodeList } from "@/components/QRCodeList";
import { ApiKeyTester } from "@/components/ApiKeyTester";
import { QRTypeGuide } from "@/components/QRTypeGuide";
import { ApiProvider } from "@/context/ApiContext";
import { useState } from "react";
import Link from "next/link";

export default function TestingDashboard() {
  const [activeTab, setActiveTab] = useState<"create" | "list" | "apikey" | "guide">("apikey");

  return (
    <ApiProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div>
              <img src="/assets/logo.png" alt="Scanalyzr Logo" width={36} height={36} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-black">
                Scanalyzr
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-900">
                Documentation
              </span>
            </div>
          </Link>
          <a
            href="/docs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            📚 View API Docs
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Create QR Code
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            List QR Codes
          </button>
          <button
            onClick={() => setActiveTab("apikey")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "apikey"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🔑 Set API Key
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "guide"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            📚 QR Types Guide
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {activeTab === "create" && <QRCodeGenerator />}
          {activeTab === "list" && <QRCodeList />}
          {activeTab === "apikey" && <ApiKeyTester />}
          {activeTab === "guide" && <QRTypeGuide />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            API Base URL:{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}
            </code>
          </p>
          <p className="mt-2">
            Set your API key in the "Test API Key" tab to get started
          </p>
        </div>
        </div>
      </div>
    </ApiProvider>
  );
}
