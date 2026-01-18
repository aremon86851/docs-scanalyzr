"use client";

import React from "react";
import { QRCodeType } from "@/services/qr.service";

interface QRTypeInfo {
  type: QRCodeType;
  icon: string;
  name: string;
  description: string;
  useCases: string[];
  exampleData: any;
  apiSupport: "full" | "dashboard-only" | "coming-soon";
}

export const QRTypeGuide: React.FC = () => {
  const qrTypes: QRTypeInfo[] = [
    {
      type: "URL",
      icon: "🌐",
      name: "URL",
      description: "Redirects users to a website or web page",
      useCases: ["Product pages", "Campaign landing pages", "Social media links"],
      exampleData: { destinationUrl: "https://example.com" },
      apiSupport: "full",
    },
    {
      type: "WIFI",
      icon: "📶",
      name: "WiFi Network",
      description: "Shares WiFi credentials - auto-connects when scanned",
      useCases: ["Guest WiFi", "Office networks", "Event venues"],
      exampleData: { ssid: "MyNetwork", password: "SecurePass123", encryption: "WPA", hidden: false },
      apiSupport: "full",
    },
    {
      type: "EMAIL",
      icon: "📧",
      name: "Email",
      description: "Composes a pre-filled email",
      useCases: ["Customer support", "Feedback collection", "Newsletter signups"],
      exampleData: { email: "support@example.com", subject: "Inquiry", body: "Hello..." },
      apiSupport: "full",
    },
    {
      type: "PHONE",
      icon: "📱",
      name: "Phone Call",
      description: "Initiates a phone call",
      useCases: ["Customer service", "Emergency contacts", "Sales inquiries"],
      exampleData: { phone: "+1-800-123-4567" },
      apiSupport: "full",
    },
    {
      type: "SMS",
      icon: "💬",
      name: "SMS Message",
      description: "Sends a pre-filled SMS",
      useCases: ["Marketing campaigns", "Contests", "Text-to-vote"],
      exampleData: { phone: "+1234567890", message: "JOIN to enter" },
      apiSupport: "full",
    },
    {
      type: "WHATSAPP",
      icon: "💚",
      name: "WhatsApp",
      description: "Opens WhatsApp chat with pre-filled message",
      useCases: ["Customer support", "Sales inquiries", "Personal messaging"],
      exampleData: { phone: "+1234567890", message: "Hi! I'm interested" },
      apiSupport: "full",
    },
    {
      type: "LOCATION",
      icon: "📍",
      name: "Location",
      description: "Opens map with specific coordinates",
      useCases: ["Store locations", "Event venues", "Tourist attractions"],
      exampleData: { latitude: 40.7128, longitude: -74.0060, address: "NYC" },
      apiSupport: "full",
    },
    {
      type: "CONTACT",
      icon: "👤",
      name: "Contact (vCard)",
      description: "Saves complete contact information",
      useCases: ["Business cards", "Employee directories", "Networking"],
      exampleData: { firstName: "John", lastName: "Doe", organization: "Acme Corp", phone: "+1234567890", email: "john@acme.com" },
      apiSupport: "full",
    },
    {
      type: "EVENT",
      icon: "📅",
      name: "Calendar Event",
      description: "Adds event to calendar",
      useCases: ["Conferences", "Webinars", "Event tickets"],
      exampleData: { title: "Tech Conference", startDate: "2026-06-15T09:00:00Z", endDate: "2026-06-15T17:00:00Z", location: "NYC" },
      apiSupport: "full",
    },
    {
      type: "MECARD",
      icon: "💼",
      name: "MECARD Contact",
      description: "Simplified contact card format",
      useCases: ["Quick contact sharing", "Business cards", "Name badges"],
      exampleData: { name: "John Doe", phone: "+1234567890", email: "john@example.com" },
      apiSupport: "full",
    },
    {
      type: "PDF",
      icon: "📄",
      name: "PDF Document",
      description: "Links to PDF file for viewing/download",
      useCases: ["Menus", "Brochures", "Manuals", "Catalogs"],
      exampleData: { destinationUrl: "https://example.com/menu.pdf" },
      apiSupport: "full",
    },
    {
      type: "VIDEO",
      icon: "🎥",
      name: "Video Content",
      description: "Links to video content (YouTube, Vimeo, etc.)",
      useCases: ["Product demos", "Tutorials", "Marketing videos"],
      exampleData: { destinationUrl: "https://youtube.com/watch?v=example" },
      apiSupport: "full",
    },
    {
      type: "AUDIO",
      icon: "🎵",
      name: "Audio Content",
      description: "Links to audio files or streaming platforms",
      useCases: ["Podcasts", "Music", "Audio guides"],
      exampleData: { destinationUrl: "https://spotify.com/track/example" },
      apiSupport: "full",
    },
    {
      type: "SOCIAL_MEDIA",
      icon: "📲",
      name: "Social Media",
      description: "Links to social media profiles",
      useCases: ["Social marketing", "Influencer campaigns", "Follower growth"],
      exampleData: { destinationUrl: "https://instagram.com/yourcompany" },
      apiSupport: "full",
    },
    {
      type: "GOOGLE_REVIEW",
      icon: "⭐",
      name: "Google Review",
      description: "Direct link to leave a Google review",
      useCases: ["Customer feedback", "Reputation management", "Local SEO"],
      exampleData: { destinationUrl: "https://g.page/r/YOUR_PLACE_ID/review" },
      apiSupport: "full",
    },
    {
      type: "COUPON",
      icon: "🎟️",
      name: "Coupon",
      description: "Links to promotional offers and discount codes",
      useCases: ["Promotional campaigns", "Loyalty programs", "Special offers"],
      exampleData: { destinationUrl: "https://example.com/promo/SAVE10" },
      apiSupport: "full",
    },
    {
      type: "FEEDBACK",
      icon: "📝",
      name: "Feedback Form",
      description: "Links to feedback or survey forms",
      useCases: ["Customer satisfaction", "Product reviews", "Event feedback"],
      exampleData: { destinationUrl: "https://forms.example.com/feedback" },
      apiSupport: "full",
    },
    {
      type: "BUSINESS_PAGE",
      icon: "🏢",
      name: "Business Page",
      description: "Links to company website or business profile",
      useCases: ["Corporate branding", "About pages", "Contact info"],
      exampleData: { destinationUrl: "https://example.com/about" },
      apiSupport: "full",
    },
    {
      type: "TEXT",
      icon: "📝",
      name: "Plain Text",
      description: "Displays static text when scanned",
      useCases: ["Serial numbers", "Instructions", "Simple messages"],
      exampleData: { destinationUrl: "https://example.com/info" },
      apiSupport: "full",
    },
  ];

  const getSupportBadge = (support: string) => {
    return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">✅ Available</span>;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">QR Code Types Guide</h2>
        <p className="text-gray-600">
          The API supports 19 different QR code types. Below is a comprehensive overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qrTypes.map((qrType) => (
          <div
            key={qrType.type}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{qrType.icon}</span>
                <h3 className="font-bold text-lg text-gray-900">{qrType.name}</h3>
              </div>
              {getSupportBadge(qrType.apiSupport)}
            </div>

            <p className="text-sm text-gray-600 mb-3">{qrType.description}</p>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-1">Use Cases:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {qrType.useCases.map((useCase, idx) => (
                  <li key={idx}>• {useCase}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded p-2">
              <h4 className="text-xs font-semibold text-gray-700 mb-1">Example Data:</h4>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(qrType.exampleData, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-3">📚 All QR Types Available</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            ✅ All 19 QR code types are fully functional and ready to use.
          </p>
          <p>
            💡 <strong>Getting Started:</strong> Select a QR type from the "Create QR Code" tab and fill in the required fields. Each type shows relevant input fields based on what data it needs.
          </p>
          <p>
            📖 <strong>Need detailed API documentation?</strong> Visit the <a href="/docs" className="underline font-semibold">API Documentation</a> page for complete examples and field descriptions.
          </p>
        </div>
      </div>
    </div>
  );
};
