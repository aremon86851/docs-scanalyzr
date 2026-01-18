"use client";

import React, { useState } from "react";
import { CreateQRPayload, QRCodeType } from "@/services/qr.service";
import { useApi } from "@/context/ApiContext";
import axios from "axios";

export const QRCodeGenerator: React.FC = () => {
  const { apiKey, baseUrl } = useApi();
  const [formData, setFormData] = useState<CreateQRPayload>({
    name: "",
    destinationUrl: "",
    shortCode: "",
    type: "URL",
    qrData: {},
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Advanced features state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [scanLimit, setScanLimit] = useState("");
  const [customDesign, setCustomDesign] = useState({
    backgroundColor: "#FFFFFF",
    foregroundColor: "#000000",
    margin: 4,
    width: 500,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey) {
      setError("Please set your API key in the 'Test API Key' tab first");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Build request payload with optional advanced features
      const payload: any = { ...formData };
      
      if (password) payload.password = password;
      if (expiresAt) payload.expiresAt = expiresAt;
      if (scanLimit) payload.scanLimit = parseInt(scanLimit);
      if (showAdvanced) payload.customDesign = customDesign;
      
      const response = await axios.post(
        `${baseUrl}/public/qr`,
        payload,
        {
          headers: {
            "X-API-Key": apiKey,
          },
        }
      );
      setResult(response.data);
      console.log("✅ QR Code Created:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create QR code");
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQRData = (field: string, value: any) => {
    setFormData({
      ...formData,
      qrData: { ...formData.qrData, [field]: value },
    });
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case "URL":
      case "PDF":
      case "VIDEO":
      case "AUDIO":
      case "SOCIAL_MEDIA":
      case "GOOGLE_REVIEW":
      case "COUPON":
      case "FEEDBACK":
      case "BUSINESS_PAGE":
      case "TEXT":
        return (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Destination URL *</label>
            <input
              type="url"
              value={formData.destinationUrl}
              onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://example.com"
              required
            />
          </div>
        );

      case "WIFI":
        return (
          <div className="space-y-3 p-4 bg-purple-50 rounded border border-purple-200">
            <h4 className="font-semibold text-purple-900">📶 WiFi Network Details</h4>
            <input
              type="text"
              placeholder="Network Name (SSID) *"
              onChange={(e) => updateQRData("ssid", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Password *"
              onChange={(e) => updateQRData("password", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <select
              onChange={(e) => updateQRData("encryption", e.target.value)}
              className="w-full p-2 border rounded"
              defaultValue="WPA"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => updateQRData("hidden", e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-purple-900">Hidden Network</span>
            </label>
          </div>
        );

      case "EMAIL":
        return (
          <div className="space-y-3 p-4 bg-green-50 rounded border border-green-200">
            <h4 className="font-semibold text-green-900">📧 Email Details</h4>
            <input
              type="email"
              placeholder="Email Address *"
              onChange={(e) => updateQRData("email", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              onChange={(e) => updateQRData("subject", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Email Body"
              onChange={(e) => updateQRData("body", e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        );

      case "PHONE":
        return (
          <div className="space-y-3 p-4 bg-yellow-50 rounded border border-yellow-200">
            <h4 className="font-semibold text-yellow-900">📱 Phone Details</h4>
            <input
              type="tel"
              placeholder="+1-800-123-4567 *"
              onChange={(e) => updateQRData("phone", e.target.value)}
              className="w-full p-2 border rounded font-mono"
              required
            />
            <p className="text-xs text-gray-600">Include country code (e.g., +1 for US)</p>
          </div>
        );

      case "SMS":
        return (
          <div className="space-y-3 p-4 bg-indigo-50 rounded border border-indigo-200">
            <h4 className="font-semibold text-indigo-900">💬 SMS Details</h4>
            <input
              type="tel"
              placeholder="Phone Number *"
              onChange={(e) => updateQRData("phone", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Message"
              onChange={(e) => updateQRData("message", e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
        );

      case "WHATSAPP":
        return (
          <div className="space-y-3 p-4 bg-green-50 rounded border border-green-200">
            <h4 className="font-semibold text-green-900">💚 WhatsApp Details</h4>
            <input
              type="tel"
              placeholder="Phone Number (with country code) *"
              onChange={(e) => updateQRData("phone", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Pre-filled Message"
              onChange={(e) => updateQRData("message", e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
            />
            <p className="text-xs text-gray-600">Example: +1234567890</p>
          </div>
        );

      case "LOCATION":
        return (
          <div className="space-y-3 p-4 bg-red-50 rounded border border-red-200">
            <h4 className="font-semibold text-red-900">📍 Location Details</h4>
            <input
              type="number"
              step="any"
              placeholder="Latitude (e.g., 40.7128) *"
              onChange={(e) => updateQRData("latitude", parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude (e.g., -74.0060) *"
              onChange={(e) => updateQRData("longitude", parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Address (optional)"
              onChange={(e) => updateQRData("address", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );

      case "CONTACT":
        return (
          <div className="space-y-3 p-4 bg-indigo-50 rounded border border-indigo-200">
            <h4 className="font-semibold text-indigo-900">👤 Contact Details (vCard)</h4>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name *"
                onChange={(e) => updateQRData("firstName", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name *"
                onChange={(e) => updateQRData("lastName", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Organization"
              onChange={(e) => updateQRData("organization", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Title/Position"
              onChange={(e) => updateQRData("title", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone"
              onChange={(e) => updateQRData("phone", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => updateQRData("email", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="url"
              placeholder="Website"
              onChange={(e) => updateQRData("website", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );

      case "EVENT":
        return (
          <div className="space-y-3 p-4 bg-pink-50 rounded border border-pink-200">
            <h4 className="font-semibold text-pink-900">📅 Event Details</h4>
            <input
              type="text"
              placeholder="Event Title *"
              onChange={(e) => updateQRData("title", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              onChange={(e) => updateQRData("description", e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
            />
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => updateQRData("location", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              placeholder="Start Date & Time *"
              onChange={(e) => updateQRData("startDate", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="datetime-local"
              placeholder="End Date & Time *"
              onChange={(e) => updateQRData("endDate", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => updateQRData("allDay", e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-pink-900">All Day Event</span>
            </label>
          </div>
        );

      case "MECARD":
        return (
          <div className="space-y-3 p-4 bg-teal-50 rounded border border-teal-200">
            <h4 className="font-semibold text-teal-900">💼 MECARD Contact Details</h4>
            <input
              type="text"
              placeholder="Name *"
              onChange={(e) => updateQRData("name", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              onChange={(e) => updateQRData("phone", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => updateQRData("email", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="url"
              placeholder="Website URL"
              onChange={(e) => updateQRData("url", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Address"
              onChange={(e) => updateQRData("address", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Test QR Code Creation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="My Test QR Code"
            required
          />
        </div>

        {/* Only show Destination URL for URL-based types */}
        {/* {["URL", "PDF", "VIDEO", "AUDIO", "FEEDBACK", "SOCIAL_MEDIA", "GOOGLE_REVIEW", "COUPON", "BUSINESS_PAGE", "TEXT"].includes(formData.type || "") && (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Destination URL *</label>
            <input
              type="url"
              value={formData.destinationUrl}
              onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://example.com"
              required
            />
          </div>
        )} */}

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">QR Code Type *</label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as QRCodeType,
                qrData: {},
              })
            }
            className="w-full p-2 border rounded"
          >
            <optgroup label="Basic">
              <option value="URL">🌐 URL - Website Link</option>
              <option value="TEXT">📝 Text - Plain Text</option>
            </optgroup>
            <optgroup label="Contact & Communication">
              <option value="CONTACT">👤 Contact - vCard</option>
              <option value="MECARD">💼 MECARD - Simple Contact</option>
              <option value="EMAIL">📧 Email - Send Email</option>
              <option value="PHONE">📱 Phone - Make Call</option>
              <option value="SMS">💬 SMS - Send Message</option>
              <option value="WHATSAPP">💚 WhatsApp - Chat</option>
            </optgroup>
            <optgroup label="Location & Events">
              <option value="LOCATION">📍 Location - GPS/Maps</option>
              <option value="EVENT">📅 Event - Calendar</option>
            </optgroup>
            <optgroup label="Network">
              <option value="WIFI">📶 WiFi - Network Credentials</option>
            </optgroup>
            <optgroup label="Media">
              <option value="PDF">📄 PDF - Document</option>
              <option value="VIDEO">🎥 Video - Media Link</option>
              <option value="AUDIO">🎵 Audio - Podcast/Music</option>
            </optgroup>
            <optgroup label="Business & Marketing">
              <option value="SOCIAL_MEDIA">📲 Social Media - Profile</option>
              <option value="GOOGLE_REVIEW">⭐ Google Review</option>
              <option value="COUPON">🎟️ Coupon - Discount</option>
              <option value="FEEDBACK">📊 Feedback - Survey</option>
              <option value="BUSINESS_PAGE">🏢 Business Page - Company Info</option>
            </optgroup>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            💡 Note: Advanced types require specific data fields. URL type is recommended for API testing.
          </p>
        </div>

        {/* Dynamic Fields Based on Type */}
        {renderTypeSpecificFields()}

        {/* Advanced Features */}
        <div className="border-t pt-4 mt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
          >
            <span className="font-semibold text-gray-900">
              ⚙️ Advanced Features (Optional)
            </span>
            <span className="text-gray-600">{showAdvanced ? "▲" : "▼"}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded border border-gray-200">
              {/* Password Protection */}
              <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                <label className="block text-sm font-medium mb-1 text-purple-900">
                  🔐 Password Protection
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter password (4-50 characters)"
                  minLength={4}
                  maxLength={50}
                />
                <p className="text-xs text-purple-700 mt-1">
                  Users must enter this password before accessing the QR code
                </p>
              </div>

              {/* Expiration Date */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded">
                <label className="block text-sm font-medium mb-1 text-orange-900">
                  ⏰ Expiration Date
                </label>
                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value ? new Date(e.target.value).toISOString() : "")}
                  className="w-full p-2 border rounded"
                />
                <p className="text-xs text-orange-700 mt-1">
                  QR code will automatically expire after this date
                </p>
              </div>

              {/* Scan Limit */}
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <label className="block text-sm font-medium mb-1 text-red-900">
                  📊 Scan Limit
                </label>
                <input
                  type="number"
                  value={scanLimit}
                  onChange={(e) => setScanLimit(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 100"
                  min="1"
                />
                <p className="text-xs text-red-700 mt-1">
                  Maximum number of scans allowed (leave empty for unlimited)
                </p>
              </div>

              {/* Custom Design */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 className="text-sm font-medium mb-3 text-blue-900">🎨 Custom Design</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-blue-800">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={customDesign.backgroundColor}
                        onChange={(e) => setCustomDesign({ ...customDesign, backgroundColor: e.target.value })}
                        className="w-12 h-9 border rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customDesign.backgroundColor}
                        onChange={(e) => setCustomDesign({ ...customDesign, backgroundColor: e.target.value })}
                        className="flex-1 p-2 border rounded text-xs font-mono"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-blue-800">
                      Foreground Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={customDesign.foregroundColor}
                        onChange={(e) => setCustomDesign({ ...customDesign, foregroundColor: e.target.value })}
                        className="w-12 h-9 border rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customDesign.foregroundColor}
                        onChange={(e) => setCustomDesign({ ...customDesign, foregroundColor: e.target.value })}
                        className="flex-1 p-2 border rounded text-xs font-mono"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-blue-800">
                      Margin
                    </label>
                    <input
                      type="number"
                      value={customDesign.margin}
                      onChange={(e) => setCustomDesign({ ...customDesign, margin: parseInt(e.target.value) })}
                      className="w-full p-2 border rounded text-sm"
                      min="0"
                      max="20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-blue-800">
                      Size (px)
                    </label>
                    <input
                      type="number"
                      value={customDesign.width}
                      onChange={(e) => setCustomDesign({ ...customDesign, width: parseInt(e.target.value) })}
                      className="w-full p-2 border rounded text-sm"
                      min="100"
                      max="2000"
                      step="50"
                    />
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  Customize QR code appearance with your brand colors
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create QR Code"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 bg-green-100 border border-green-400 rounded space-y-3">
          <h3 className="font-bold text-green-900">✅ Success!</h3>
          <div className="space-y-2 text-sm">
            <p><strong>ID:</strong> {result.id}</p>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Short Code:</strong> <code className="bg-gray-200 px-2 py-1 rounded">{result.shortCode}</code></p>
            <p><strong>Short URL:</strong> <a href={result.shortUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{result.shortUrl}</a></p>
            <p><strong>Destination:</strong> {result.destinationUrl}</p>
            <p><strong>Scans:</strong> {result.scanCount}</p>
            <p><strong>Status:</strong> <span className={result.isActive ? "text-green-600" : "text-red-600"}>{result.isActive ? "Active" : "Inactive"}</span></p>
          </div>
          <div className="flex gap-2">
            <a
              href={result.qrCodeUrl}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View QR Code
            </a>
            <a
              href={result.qrCodeUrl}
              download
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
