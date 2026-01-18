"use client";

import React, { useState } from "react";

export default function DeveloperDocs() {
  const [activeSection, setActiveSection] = useState("overview");
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(true);
  const [showQRTypes, setShowQRTypes] = useState(true);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-blue-600 hover:underline">← Back to Dashboard</a>
              <h1 className="text-2xl font-bold">QR Code API Documentation</h1>
            </div>
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">v1.0.0</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 sticky top-24 h-[calc(100vh - 124px)] overflow-auto  bg-white rounded-lg shadow-sm px-3 py-2">
          <nav className="space-y-1">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Getting Started</h3>
              <button onClick={() => scrollToSection("overview")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "overview" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Overview
              </button>
              <button onClick={() => scrollToSection("authentication")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "authentication" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Authentication
              </button>
              <button onClick={() => scrollToSection("quick-start")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "quick-start" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Quick Start
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">API Endpoints</h3>
              <button onClick={() => scrollToSection("create-qr")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "create-qr" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Create QR Code
              </button>
              
              <button onClick={() => scrollToSection("list-qr")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "list-qr" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                List QR Codes
              </button>
              <button onClick={() => scrollToSection("get-qr")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "get-qr" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Get Single QR
              </button>
              <button onClick={() => scrollToSection("update-qr")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "update-qr" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Update QR Code
              </button>
              <button onClick={() => scrollToSection("delete-qr")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "delete-qr" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Delete QR Code
              </button>
              <button onClick={() => scrollToSection("analytics")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "analytics" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Get Analytics
              </button>
              
              {/* Advanced Features Collapsible */}
              <button
                onClick={() => {
                  setShowAdvancedFeatures(!showAdvancedFeatures);
                  // scrollToSection("advanced-features");
                }}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded text-sm ${activeSection === "advanced-features" || activeSection === "password-protection" || activeSection === "expiration-date" || activeSection === "scan-limit" || activeSection === "custom-design" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span>Advanced Features</span>
                <svg className={`w-4 h-4 transition-transform ${showAdvancedFeatures ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showAdvancedFeatures && (
                <div className="ml-4 space-y-1">
                  <button onClick={() => scrollToSection("password-protection")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "password-protection" ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Password Protection
                  </button>
                  <button onClick={() => scrollToSection("expiration-date")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "expiration-date" ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Expiration Date
                  </button>
                  <button onClick={() => scrollToSection("scan-limit")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "scan-limit" ? "bg-red-50 text-red-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Scan Limit
                  </button>
                  <button onClick={() => scrollToSection("custom-design")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "custom-design" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Custom Design
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">QR Code Types</h3>
              
              {/* All QR Types Collapsible */}
              <button
                onClick={() => {
                  setShowQRTypes(!showQRTypes);
                  // scrollToSection("qr-types");
                }}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded text-sm ${activeSection === "qr-types" || activeSection.startsWith("type-") ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span>All Types (19)</span>
                <svg className={`w-4 h-4 transition-transform ${showQRTypes ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showQRTypes && (
                <div className="ml-4 space-y-1 mt-1">
                  <button onClick={() => scrollToSection("type-url")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-url" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → URL
                  </button>
                  <button onClick={() => scrollToSection("type-wifi")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-wifi" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → WiFi
                  </button>
                  <button onClick={() => scrollToSection("type-email")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-email" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Email
                  </button>
                  <button onClick={() => scrollToSection("type-phone")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-phone" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Phone
                  </button>
                  <button onClick={() => scrollToSection("type-sms")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-sms" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → SMS
                  </button>
                  <button onClick={() => scrollToSection("type-whatsapp")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-whatsapp" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → WhatsApp
                  </button>
                  <button onClick={() => scrollToSection("type-location")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-location" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Location
                  </button>
                  <button onClick={() => scrollToSection("type-contact")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-contact" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Contact
                  </button>
                  <button onClick={() => scrollToSection("type-event")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-event" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Event
                  </button>
                  <button onClick={() => scrollToSection("type-mecard")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-mecard" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → MeCard
                  </button>
                  <button onClick={() => scrollToSection("type-pdf")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-pdf" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → PDF
                  </button>
                  <button onClick={() => scrollToSection("type-video")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-video" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Video
                  </button>
                  <button onClick={() => scrollToSection("type-audio")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-audio" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Audio
                  </button>
                  <button onClick={() => scrollToSection("type-social-media")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-social-media" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Social Media
                  </button>
                  <button onClick={() => scrollToSection("type-google-review")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-google-review" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Google Review
                  </button>
                  <button onClick={() => scrollToSection("type-coupon")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-coupon" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Coupon
                  </button>
                  <button onClick={() => scrollToSection("type-feedback")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-feedback" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Feedback
                  </button>
                  <button onClick={() => scrollToSection("type-business-page")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-business-page" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Business Page
                  </button>
                  <button onClick={() => scrollToSection("type-text")} className={`block w-full text-left px-3 py-1.5 rounded text-xs ${activeSection === "type-text" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                    → Text
                  </button>
                </div>
              )}
              
              <button onClick={() => scrollToSection("type-examples")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "type-examples" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Code Examples
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Resources</h3>
              <button onClick={() => scrollToSection("errors")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "errors" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Error Handling
              </button>
              <button onClick={() => scrollToSection("rate-limits")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "rate-limits" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Rate Limits
              </button>
              <button onClick={() => scrollToSection("best-practices")} className={`block w-full text-left px-3 py-2 rounded text-sm ${activeSection === "best-practices" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                Best Practices
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow-sm p-8 max-w-4xl">
          {/* Overview Section */}
          <section id="overview" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-600 mb-4">
              The QR Code Public API allows developers to programmatically create, manage, and track QR codes from their applications.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Base URL</h3>
              <code className="text-sm bg-white px-3 py-1 rounded text-gray-900">http://qr.scanalyzr.com/api/v1/public</code>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-1 text-gray-900">Simplified Creation</h4>
                <p className="text-sm text-gray-600">Just provide a name and destination URL</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold mb-1 text-gray-900">Dynamic QR Codes</h4>
                <p className="text-sm text-gray-600">Update destinations without regenerating</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold mb-1 text-gray-900">IP-Based Tracking</h4>
                <p className="text-sm text-gray-600">Automatic scan tracking and analytics</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-2xl mb-2">🔗</div>
                <h4 className="font-semibold mb-1 text-gray-900">Custom Short Codes</h4>
                <p className="text-sm text-gray-600">Use your own branded short codes</p>
              </div>
            </div>
          </section>

          {/* Authentication Section */}
          <section id="authentication" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Authentication</h2>
            <p className="text-gray-600 mb-4">
              The API supports three authentication methods. We recommend using the X-API-Key header.
            </p>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-black">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Recommended</span>
                  Method 1: X-API-Key Header
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
  headers: {
    'X-API-Key': 'qr_live_your_api_key_here',
    'Content-Type': 'application/json'
  }
});`}
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-black">Method 2: Authorization Bearer Token</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
  headers: {
    'Authorization': 'Bearer qr_live_your_api_key_here',
    'Content-Type': 'application/json'
  }
});`}
                </pre>
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-black">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Not Recommended</span>
                  Method 3: Query Parameter
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`http://qr.scanalyzr.com/api/v1/public/qr?apiKey=qr_live_your_api_key_here`}
                </pre>
                <p className="text-sm text-yellow-700 mt-2">⚠️ Avoid in production - API keys may appear in server logs</p>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section id="quick-start" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Quick Start</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Step 1: Get Your API Key</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Log in to your QR Code dashboard</li>
                  <li>Navigate to <strong>Settings → API Keys</strong></li>
                  <li>Click <strong>"Create API Key"</strong></li>
                  <li>Copy your API key (starts with <code className="bg-gray-100 px-2 py-1 rounded">qr_live_</code>)</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Step 2: Make Your First Request</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`curl -X POST http://qr.scanalyzr.com/api/v1/public/qr \\
  -H "X-API-Key: qr_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My First QR Code",
    "destinationUrl": "https://example.com",
    "shortCode": "my-first-qr"
  }'`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Step 3: Response</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`{
  "success": true,
  "message": "QR code created successfully",
  "data": {
    "id": "cm5abc123xyz",
    "name": "My First QR Code",
    "shortCode": "my-first-qr",
    "shortUrl": "https://your-domain.com/q/my-first-qr",
    "qrCodeUrl": "https://res.cloudinary.com/.../my-first-qr.png",
    "destinationUrl": "https://example.com",
    "type": "URL",
    "scanCount": 0,
    "isActive": true,
    "createdAt": "2026-01-18T10:30:00.000Z"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Create QR Code Endpoint */}
          <section id="create-qr" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Create QR Code</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm font-semibold">POST</span>
              <code className="text-lg text-gray-900 bg-gray-100 px-2 py-1 rounded">/api/v1/public/qr</code>
            </div>

            <p className="text-gray-600 mb-4">Creates a new dynamic QR code with default settings.</p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Request Body</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Field</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Required</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">name</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">✅ Yes</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Descriptive name for your QR code</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">destinationUrl</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-green-600 font-semibold">✅ Yes</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Where the QR code should redirect</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">shortCode</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 font-semibold">❌ No</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Custom short code (auto-generated if omitted)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">type</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 font-semibold">❌ No</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">QR data type (default: "URL")</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-6">
              <pre className="text-sm">
{`const createQRCode = async () => {
  const response = await fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
    method: 'POST',
    headers: {
      'X-API-Key': 'qr_live_your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Product Launch Campaign',
      destinationUrl: 'https://example.com/product/launch',
      shortCode: 'launch24'
    })
  });
  
  const data = await response.json();
  console.log('QR Code Created:', data.data.qrCodeUrl);
  return data;
};`}
              </pre>
            </div>
          </section>

          {/* List QR Codes */}
          <section id="list-qr" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">List QR Codes</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm font-semibold">GET</span>
              <code className="text-lg text-gray-900 bg-gray-100 px-2 py-1 rounded">/api/v1/public/qr</code>
            </div>

            <p className="text-gray-600 mb-4">Retrieves all QR codes associated with your API key, with pagination support.</p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Query Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Parameter</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Default</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">page</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">number</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">1</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Page number</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">limit</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">number</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">10</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Items per page (max 100)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm">
{`const getQRCodes = async (page = 1, limit = 10) => {
  const response = await fetch(
    \`http://qr.scanalyzr.com/api/v1/public/qr?page=\${page}&limit=\${limit}\`,
    {
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  return await response.json();
};`}
              </pre>
            </div>
          </section>

          {/* Get Single QR Code */}
          <section id="get-qr" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Get Single QR Code</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm font-semibold">GET</span>
              <code className="text-lg text-gray-900 bg-gray-100 px-2 py-1 rounded">/api/v1/public/qr/:id</code>
            </div>

            <p className="text-gray-600 mb-4">Retrieves detailed information about a specific QR code.</p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">URL Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Parameter</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">id</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">QR code ID</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-6">
              <pre className="text-sm">
{`const getQRCode = async (qrCodeId) => {
  const response = await fetch(
    \`http://qr.scanalyzr.com/api/v1/public/qr/\${qrCodeId}\`,
    {
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  return await response.json();
};`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Response (200 OK)</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm">
{`{
  "success": true,
  "message": "QR code retrieved successfully",
  "data": {
    "id": "cm5abc123xyz",
    "name": "Product Launch Campaign",
    "shortCode": "launch24",
    "shortUrl": "https://your-domain.com/q/launch24",
    "qrCodeUrl": "https://res.cloudinary.com/.../launch24.png",
    "destinationUrl": "https://example.com/product/launch",
    "type": "URL",
    "scanCount": 42,
    "isActive": true,
    "createdAt": "2026-01-17T10:30:00.000Z"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Update QR Code */}
          <section id="update-qr" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Update QR Code</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-mono text-sm font-semibold">PATCH</span>
              <code className="text-lg text-gray-900 bg-gray-100 px-2 py-1 rounded">/api/v1/public/qr/:id</code>
            </div>

            <p className="text-gray-600 mb-4">Updates an existing QR code's name, destination URL, or active status.</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-blue-800">📝 <strong>Note:</strong> For dynamic QR codes, updating the destination URL will regenerate the QR image.</p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Request Body</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Field</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Required</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">name</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 font-semibold">❌ No</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">New name for the QR code</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">destinationUrl</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 font-semibold">❌ No</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">New destination URL</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">isActive</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">boolean</td>
                    <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 font-semibold">❌ No</span></td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Enable/disable the QR code</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-6">
              <pre className="text-sm">
{`const updateQRCode = async (qrCodeId, updates) => {
  const response = await fetch(
    \`http://qr.scanalyzr.com/api/v1/public/qr/\${qrCodeId}\`,
    {
      method: 'PATCH',
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );
  
  return await response.json();
};

// Usage
await updateQRCode('cm5abc123xyz', {
  destinationUrl: 'https://example.com/new-destination',
  isActive: true
});`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Response (200 OK)</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm">
{`{
  "success": true,
  "message": "QR code updated successfully",
  "data": {
    "id": "cm5abc123xyz",
    "name": "Updated Campaign Name",
    "shortCode": "launch24",
    "shortUrl": "https://your-domain.com/q/launch24",
    "qrCodeUrl": "https://res.cloudinary.com/.../launch24.png",
    "destinationUrl": "https://example.com/new-destination",
    "type": "URL",
    "scanCount": 42,
    "isActive": true,
    "createdAt": "2026-01-17T10:30:00.000Z"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Delete QR Code */}
          <section id="delete-qr" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Delete QR Code</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded font-mono text-sm font-semibold">DELETE</span>
              <code className="text-lg text-gray-900 bg-gray-100 px-2 py-1 rounded">/api/v1/public/qr/:id</code>
            </div>

            <p className="text-gray-600 mb-4">Permanently deletes a QR code and all its associated scan data.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-sm text-red-800">⚠️ <strong>Warning:</strong> This action cannot be undone! The QR code and all its analytics will be permanently deleted.</p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">URL Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Parameter</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-900">id</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">string</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">QR code ID to delete</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-6">
              <pre className="text-sm">
{`const deleteQRCode = async (qrCodeId) => {
  const response = await fetch(
    \`http://qr.scanalyzr.com/api/v1/public/qr/\${qrCodeId}\`,
    {
      method: 'DELETE',
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  return await response.json();
};`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Response (200 OK)</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm">
{`{
  "success": true,
  "message": "QR code deleted successfully",
  "data": {
    "message": "QR code deleted successfully"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Get Analytics */}
          <section id="analytics" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Get QR Code Analytics</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm font-semibold">GET</span>
              <code className="text-lg text-gray-900 bg-gray-100 px-2 py-1 rounded">/api/v1/public/qr/:id/analytics</code>
            </div>

            <p className="text-gray-600 mb-4">Retrieves comprehensive analytics for a specific QR code including total scans, unique scans, and scan breakdowns by date, location, and device.</p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-6">
              <pre className="text-sm">
{`const getAnalytics = async (qrCodeId) => {
  const response = await fetch(
    \`http://qr.scanalyzr.com/api/v1/public/qr/\${qrCodeId}/analytics\`,
    {
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  const data = await response.json();
  console.log('Total Scans:', data.data.analytics.totalScans);
  console.log('Unique Users:', data.data.analytics.uniqueScans);
  return data;
};`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Example Response (200 OK)</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm">
{`{
  "success": true,
  "message": "QR code analytics retrieved successfully",
  "data": {
    "qrCode": {
      "id": "cm5abc123xyz",
      "name": "Product Launch Campaign",
      "shortUrl": "https://your-domain.com/q/launch24",
      "destinationUrl": "https://example.com/product/launch"
    },
    "analytics": {
      "totalScans": 156,
      "uniqueScans": 89,
      "recentScans": 23,
      "scansByDate": {
        "2026-01-15": 45,
        "2026-01-16": 67,
        "2026-01-17": 44
      },
      "scansByLocation": {
        "United States": 89,
        "Canada": 34,
        "United Kingdom": 23,
        "Germany": 10
      },
      "scansByDevice": {
        "mobile": 112,
        "desktop": 34,
        "tablet": 10
      }
    }
  }
}`}
              </pre>
            </div>
          </section>

          {/* Advanced Features Section */}
          <section id="advanced-features" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">🔒 Advanced Features</h2>
            <p className="text-gray-600 mb-6">
              Enhance your QR codes with password protection, expiration dates, scan limits, and custom designs.
            </p>

            {/* Password Protection */}
            <div className="mb-8 p-6 bg-purple-50 border-l-4 border-purple-500 rounded" id="password-protection">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">🔐 Password Protection</h3>
              <p className="text-purple-800 mb-4">
                Restrict access to your QR code content with password protection. Users must enter the correct password before accessing the destination URL.
              </p>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-3">
                <pre className="text-sm">
{`{
  "name": "Private Document",
  "destinationUrl": "https://example.com/private/document.pdf",
  "password": "secure123"  // 4-50 characters
}`}
                </pre>
              </div>
              
              <div className="text-sm text-purple-800">
                <strong>Requirements:</strong>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Minimum length: 4 characters</li>
                  <li>Maximum length: 50 characters</li>
                  <li>Case-sensitive</li>
                </ul>
              </div>
            </div>

            {/* Expiration Date */}
            <div className="mb-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded" id="expiration-date">
              <h3 className="text-xl font-semibold mb-3 text-orange-900">⏰ Expiration Date</h3>
              <p className="text-orange-800 mb-4">
                Set an automatic expiration date for time-sensitive campaigns. QR code becomes inactive after the specified date.
              </p>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-3">
                <pre className="text-sm">
{`{
  "name": "Flash Sale",
  "destinationUrl": "https://example.com/flash-sale",
  "expiresAt": "2026-12-31T23:59:59Z"  // ISO 8601 format
}`}
                </pre>
              </div>
              
              <div className="text-sm text-orange-800">
                <strong>Format:</strong> ISO 8601 date-time (YYYY-MM-DDTHH:mm:ssZ)<br/>
                <strong>Behavior:</strong> After expiration, scans redirect to an "expired" message page
              </div>
            </div>

            {/* Scan Limit */}
            <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded" id="scan-limit">
              <h3 className="text-xl font-semibold mb-3 text-red-900">📊 Scan Limit</h3>
              <p className="text-red-800 mb-4">
                Control the maximum number of scans allowed. Perfect for limited offers, single-use tickets, or beta access codes.
              </p>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-3">
                <pre className="text-sm">
{`{
  "name": "Limited Offer",
  "destinationUrl": "https://example.com/offer",
  "scanLimit": 100  // Maximum number of scans
}`}
                </pre>
              </div>
              
              <div className="text-sm text-red-800">
                <strong>Behavior:</strong> Counter increments with each scan. Once limit is reached, QR code becomes inactive.<br/>
                <strong>Note:</strong> Limit can be increased by updating the QR code
              </div>
            </div>

            {/* Custom Design */}
            <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded" id="custom-design">
              <h3 className="text-xl font-semibold mb-3 text-blue-900">🎨 Custom Design</h3>
              <p className="text-blue-800 mb-4">
                Fully customize the appearance of your QR codes - colors, size, dots style, corners, gradients, and logos.
              </p>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-3">
                <pre className="text-sm">
{`{
  "name": "Branded QR",
  "destinationUrl": "https://example.com",
  "customDesign": {
    // Basic Options
    "backgroundColor": "#FFFFFF",
    "foregroundColor": "#000000",
    "margin": 4,
    "width": 500,
    "errorCorrectionLevel": "M",  // L, M, Q, H
    
    // Advanced Styling
    "dotsType": "rounded",  // rounded, dots, classy, square
    "dotsColor": "#FF6B35",
    "cornersSquareType": "extra-rounded",
    "cornersSquareColor": "#FF6B35",
    
    // Logo (optional)
    "imageUrl": "https://example.com/logo.png",
    "imageMargin": 10,
    "imageSize": 0.3
  }
}`}
                </pre>
              </div>
              
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Color Options:</strong> Use hex format (e.g., #FF6B35)</p>
                <p><strong>Size Range:</strong> 100-2000 pixels</p>
                <p><strong>Error Correction:</strong> L (7%), M (15%), Q (25%), H (30%)</p>
                <p><strong>Logo Size:</strong> 0.1-0.5 (relative to QR code size)</p>
              </div>
            </div>

            {/* Combined Example */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-green-500 rounded">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">🎯 Combined Features Example</h3>
              <p className="text-gray-700 mb-4">
                Use multiple advanced features together for maximum security and customization:
              </p>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">
{`{
  "name": "VIP Event Ticket",
  "destinationUrl": "https://example.com/event/checkin",
  
  // Security Features
  "password": "vip2024",
  "expiresAt": "2026-06-15T23:59:59Z",
  "scanLimit": 1,  // Single-use ticket
  
  // Custom Branding
  "customDesign": {
    "backgroundColor": "#1E3A8A",
    "foregroundColor": "#FBBF24",
    "margin": 6,
    "width": 800,
    "dotsType": "rounded",
    "errorCorrectionLevel": "H",
    "imageUrl": "https://example.com/event-logo.png",
    "imageSize": 0.25
  }
}`}
                </pre>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-gray-50 p-6 rounded border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">💡 Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Single-Use Tickets</h4>
                  <code className="text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded block">scanLimit: 1, expiresAt: event-date</code>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Beta Access Codes</h4>
                  <code className="text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded block">password + expiresAt</code>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Time-Limited Promos</h4>
                  <code className="text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded block">expiresAt only</code>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Branded Marketing</h4>
                  <code className="text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded block">customDesign with logo</code>
                </div>
              </div>
            </div>
          </section>

          {/* QR Code Types */}
          <section id="qr-types" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">QR Code Types (19 Available)</h2>
            <p className="text-gray-600 mb-6">
              The API supports 19 different QR code types. All types are fully functional in the application. Below are the data structures required for each type.
            </p>

            {/* Quick Navigation */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Quick Navigation - Jump to Type:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { id: "type-url", icon: "🌐", name: "URL" },
                  { id: "type-wifi", icon: "📶", name: "WIFI" },
                  { id: "type-email", icon: "📧", name: "EMAIL" },
                  { id: "type-phone", icon: "📱", name: "PHONE" },
                  { id: "type-sms", icon: "💬", name: "SMS" },
                  { id: "type-whatsapp", icon: "💚", name: "WhatsApp" },
                  { id: "type-location", icon: "📍", name: "LOCATION" },
                  { id: "type-contact", icon: "👤", name: "CONTACT" },
                  { id: "type-event", icon: "📅", name: "EVENT" },
                  { id: "type-mecard", icon: "💳", name: "MECARD" },
                  { id: "type-pdf", icon: "📄", name: "PDF" },
                  { id: "type-video", icon: "🎥", name: "VIDEO" },
                  { id: "type-audio", icon: "🎵", name: "AUDIO" },
                  { id: "type-social", icon: "📱", name: "SOCIAL" },
                  { id: "type-review", icon: "⭐", name: "REVIEW" },
                  { id: "type-coupon", icon: "🎫", name: "COUPON" },
                  { id: "type-feedback", icon: "📝", name: "FEEDBACK" },
                  { id: "type-business", icon: "🏢", name: "BUSINESS" },
                  { id: "type-text", icon: "📝", name: "TEXT" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      const element = document.getElementById(type.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-all text-left text-sm font-medium text-gray-700 hover:text-blue-700"
                  >
                    <span className="text-lg">{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Type 1: URL */}
            <div id="type-url" className="mb-8 border-l-4 border-green-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌐</span>
                <h3 className="text-xl font-semibold text-gray-900">1. URL - Website Links</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">API Ready</span>
              </div>
              <p className="text-gray-600 mb-3">Redirects users to a website or web page.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Company Website",
  "type": "URL",
  "destinationUrl": "https://example.com"
}`}</pre>
              </div>
            </div>

            {/* Type 2: WIFI */}
            <div id="type-wifi" className="mb-8 border-l-4 border-blue-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📶</span>
                <h3 className="text-xl font-semibold text-gray-900">2. WIFI - Network Credentials</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Shares WiFi network credentials. Automatically connects when scanned.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Office WiFi",
  "type": "WIFI",
  "qrData": {
    "ssid": "MyNetwork",
    "password": "SecurePassword123",
    "encryption": "WPA",  // Options: "WPA", "WEP", "nopass"
    "hidden": false       // true for hidden networks
  }
}`}</pre>
              </div>
            </div>

            {/* Type 3: EMAIL */}
            <div id="type-email" className="mb-8 border-l-4 border-purple-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📧</span>
                <h3 className="text-xl font-semibold text-gray-900">3. EMAIL - Pre-filled Email</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Composes a pre-filled email when scanned.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Support Email",
  "type": "EMAIL",
  "qrData": {
    "email": "support@example.com",
    "subject": "Customer Inquiry",
    "body": "Hello, I would like to know more about..."
  }
}`}</pre>
              </div>
            </div>

            {/* Type 4: PHONE */}
            <div id="type-phone" className="mb-8 border-l-4 border-green-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📱</span>
                <h3 className="text-xl font-semibold text-gray-900">4. PHONE - Phone Call</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Initiates a phone call when scanned.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Customer Service",
  "type": "PHONE",
  "qrData": {
    "phone": "+1-800-123-4567"
  }
}`}</pre>
              </div>
            </div>

            {/* Type 5: SMS */}
            <div id="type-sms" className="mb-8 border-l-4 border-yellow-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💬</span>
                <h3 className="text-xl font-semibold text-gray-900">5. SMS - Text Message</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Sends a pre-filled SMS message when scanned.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Text to Win",
  "type": "SMS",
  "qrData": {
    "phone": "+1234567890",
    "message": "JOIN to enter the contest"
  }
}`}</pre>
              </div>
            </div>

            {/* Type 6: WHATSAPP */}
            <div id="type-whatsapp" className="mb-8 border-l-4 border-green-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💚</span>
                <h3 className="text-xl font-semibold text-gray-900">6. WHATSAPP - WhatsApp Message</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Opens WhatsApp chat with pre-filled message.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "WhatsApp Support",
  "type": "WHATSAPP",
  "qrData": {
    "phone": "+1234567890",  // Include country code
    "message": "Hi! I'm interested in your services"
  }
}`}</pre>
              </div>
            </div>

            {/* Type 7: LOCATION */}
            <div id="type-location" className="mb-8 border-l-4 border-red-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📍</span>
                <h3 className="text-xl font-semibold text-gray-900">7. LOCATION - GPS Coordinates</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Opens map application with specific coordinates.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Office Location",
  "type": "LOCATION",
  "qrData": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 Main Street, New York, NY"  // Optional
  }
}`}</pre>
              </div>
            </div>

            {/* Type 8: CONTACT */}
            <div id="type-contact" className="mb-8 border-l-4 border-indigo-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">👤</span>
                <h3 className="text-xl font-semibold text-gray-900">8. CONTACT - vCard</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Shares complete contact information (vCard format).</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "John Doe Contact",
  "type": "CONTACT",
  "qrData": {
    "firstName": "John",
    "lastName": "Doe",
    "organization": "Acme Corp",
    "title": "CEO",
    "phone": "+1234567890",
    "email": "john@example.com",
    "website": "https://johndoe.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    }
  }
}`}</pre>
              </div>
            </div>

            {/* Type 9: EVENT */}
            <div id="type-event" className="mb-8 border-l-4 border-pink-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📅</span>
                <h3 className="text-xl font-semibold text-gray-900">9. EVENT - Calendar Event</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Adds an event to the user's calendar.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Conference Event",
  "type": "EVENT",
  "qrData": {
    "title": "Tech Conference 2026",
    "description": "Annual technology conference",
    "location": "Convention Center, NYC",
    "startDate": "2026-06-15T09:00:00Z",
    "endDate": "2026-06-15T17:00:00Z",
    "allDay": false
  }
}`}</pre>
              </div>
            </div>

            {/* Type 10: MECARD */}
            <div id="type-mecard" className="mb-8 border-l-4 border-teal-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💳</span>
                <h3 className="text-xl font-semibold text-gray-900">10. MECARD - Lightweight Contact</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Lightweight contact card format (alternative to vCard).</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Business Card",
  "type": "MECARD",
  "qrData": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "url": "https://johndoe.com",
    "address": "123 Main St, NYC"
  }
}`}</pre>
              </div>
            </div>

            {/* Type 11: PDF */}
            <div id="type-pdf" className="mb-8 border-l-4 border-red-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📄</span>
                <h3 className="text-xl font-semibold text-gray-900">11. PDF - Document Link</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Direct link to a PDF document.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Product Brochure",
  "type": "PDF",
  "destinationUrl": "https://example.com/brochure.pdf"
}`}</pre>
              </div>
            </div>

            {/* Type 12: VIDEO */}
            <div id="type-video" className="mb-8 border-l-4 border-red-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎥</span>
                <h3 className="text-xl font-semibold text-gray-900">12. VIDEO - Video Link</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Direct link to a video.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Product Demo",
  "type": "VIDEO",
  "destinationUrl": "https://youtube.com/watch?v=xxx"
}`}</pre>
              </div>
            </div>

            {/* Type 13: AUDIO */}
            <div id="type-audio" className="mb-8 border-l-4 border-purple-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎵</span>
                <h3 className="text-xl font-semibold text-gray-900">13. AUDIO - Audio Link</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Direct link to an audio file or podcast.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Podcast Episode",
  "type": "AUDIO",
  "destinationUrl": "https://example.com/podcast.mp3"
}`}</pre>
              </div>
            </div>

            {/* Type 14: SOCIAL_MEDIA */}
            <div id="type-social" className="mb-8 border-l-4 border-blue-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📱</span>
                <h3 className="text-xl font-semibold text-gray-900">14. SOCIAL_MEDIA - Social Profile</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Links to social media profiles.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Instagram Profile",
  "type": "SOCIAL_MEDIA",
  "destinationUrl": "https://instagram.com/yourcompany"
}`}</pre>
              </div>
            </div>

            {/* Type 15: GOOGLE_REVIEW */}
            <div id="type-review" className="mb-8 border-l-4 border-yellow-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⭐</span>
                <h3 className="text-xl font-semibold text-gray-900">15. GOOGLE_REVIEW - Review Link</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Direct link to Google Business review page.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Leave a Review",
  "type": "GOOGLE_REVIEW",
  "destinationUrl": "https://g.page/r/YOUR_PLACE_ID/review"
}`}</pre>
              </div>
            </div>

            {/* Type 16: COUPON */}
            <div id="type-coupon" className="mb-8 border-l-4 border-green-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎫</span>
                <h3 className="text-xl font-semibold text-gray-900">16. COUPON - Discount Code</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Displays a coupon or discount code.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "10% Off Coupon",
  "type": "COUPON",
  "destinationUrl": "https://example.com/redeem?code=SAVE10"
}`}</pre>
              </div>
            </div>

            {/* Type 17: FEEDBACK */}
            <div id="type-feedback" className="mb-8 border-l-4 border-orange-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📝</span>
                <h3 className="text-xl font-semibold text-gray-900">17. FEEDBACK - Feedback Form</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Direct link to feedback form.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Customer Feedback",
  "type": "FEEDBACK",
  "destinationUrl": "https://forms.google.com/yourform"
}`}</pre>
              </div>
            </div>

            {/* Type 18: BUSINESS_PAGE */}
            <div id="type-business" className="mb-8 border-l-4 border-blue-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏢</span>
                <h3 className="text-xl font-semibold text-gray-900">18. BUSINESS_PAGE - Business Profile</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Comprehensive business information page.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "Business Profile",
  "type": "BUSINESS_PAGE",
  "destinationUrl": "https://yourbusiness.com/profile"
}`}</pre>
              </div>
            </div>

            {/* Type 19: TEXT */}
            <div id="type-text" className="mb-8 border-l-4 border-gray-500 pl-6 scroll-mt-24">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📝</span>
                <h3 className="text-xl font-semibold text-gray-900">19. TEXT - Plain Text</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
              <p className="text-gray-600 mb-3">Displays plain text when scanned.</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <pre className="text-sm">{`{
  "name": "WiFi Password",
  "type": "TEXT",
  "destinationUrl": "Password: SecurePass123"
}`}</pre>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Using Advanced QR Types</h3>
              <p className="text-sm text-blue-800">
                All 19 QR types are fully functional in the application dashboard. Simply select the desired type in the "Create QR Code" tab and fill in the required fields. The system will automatically generate the appropriate QR code with the correct data format.
              </p>
            </div>
          </section>

          {/* Error Handling */}
          <section id="errors" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Error Handling</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900">HTTP Status Codes</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Code</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Meaning</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">200</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">OK</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Request successful</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">201</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Created</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">QR code created successfully</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">400</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Bad Request</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Invalid request parameters</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">401</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Unauthorized</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Invalid or missing API key</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">403</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Forbidden</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">QR code limit reached</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">404</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Not Found</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">QR code not found</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">409</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Conflict</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Short code already exists</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-gray-900">429</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Too Many Requests</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Rate limit exceeded</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">Error Response Format</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm">
{`{
  "success": false,
  "message": "QR code limit reached (10). Please upgrade your plan.",
  "errorMessages": [
    {
      "path": "",
      "message": "QR code limit reached (10). Please upgrade your plan."
    }
  ]
}`}
              </pre>
            </div>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Rate Limits & Quotas</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Plan</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">QR Codes</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">API Requests/Hour</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-900 font-semibold">Scans/QR</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Free</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">10</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">100</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">100</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Basic</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">50</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">500</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">1,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Pro</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">200</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">2,000</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-900">Business</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Unlimited</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">10,000</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Rate Limit Headers</h3>
              <p className="text-sm text-blue-800 mb-2">Every API response includes rate limit information:</p>
              <pre className="text-sm bg-white text-gray-900 px-3 py-2 rounded">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705492800`}
              </pre>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Best Practices</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">✅ Use Environment Variables</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`// ❌ Bad
const apiKey = 'qr_live_abc123...';

// ✅ Good
const apiKey = process.env.QR_API_KEY;`}
                  </pre>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">✅ Implement Proper Error Handling</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`async function createQRSafely(data) {
  try {
    const result = await client.createQR(data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to create QR:', error.message);
    return { success: false, error: error.message };
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">✅ Use Custom Short Codes for Branding</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`// ✅ Branded short code
await client.createQR({
  name: 'Product Page',
  destinationUrl: 'https://example.com/product',
  shortCode: 'product-2024'
});
// Result: https://your-domain.com/q/product-2024`}
                  </pre>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">✅ Implement Caching</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getQRCodeCached(id) {
  const cached = cache.get(id);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await client.getQRCode(id);
  cache.set(id, { data, timestamp: Date.now() });
  return data;
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t pt-8 mt-16 text-center text-sm text-gray-600">
            <p>Last Updated: January 18, 2026 • API Version: 1.0.0</p>
            <p className="mt-2">
              Need help? <a href="mailto:support@your-domain.com" className="text-blue-600 hover:underline">Contact Support</a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
