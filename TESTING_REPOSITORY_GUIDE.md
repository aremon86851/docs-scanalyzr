# QR Code API - External Testing Repository Setup

## 🧪 Complete Testing Repository Guide

This guide will help you create a separate testing project to integrate and test the QR Code Generator API.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Environment Configuration](#environment-configuration)
3. [Installation](#installation)
4. [Project Structure](#project-structure)
5. [Testing Scenarios](#testing-scenarios)
6. [Sample Code](#sample-code)
7. [Running Tests](#running-tests)

---

## Project Setup

### 1. Create New Project

Choose your preferred framework:

#### Option A: Next.js (Recommended)

```bash
npx create-next-app@latest qr-api-testing
cd qr-api-testing
```

**Configuration:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ App Router: Yes
- ✅ Import alias (@/*): Yes

#### Option B: Vite + React

```bash
npm create vite@latest qr-api-testing -- --template react-ts
cd qr-api-testing
npm install
```

#### Option C: Node.js CLI (For Backend Testing)

```bash
mkdir qr-api-testing
cd qr-api-testing
npm init -y
```

---

## Environment Configuration

### Create `.env.local` (Next.js/Vite)

```env
# QR Code API Configuration
API_URL=https://api.yourapp.com/api/v1
NEXT_PUBLIC_API_KEY=your_api_key_here

# Optional: For testing multiple environments
NEXT_PUBLIC_DEV_API_URL=http://qr.scanalyzr.com
NEXT_PUBLIC_STAGING_API_URL=https://staging-api.yourapp.com/api/v1
```

### Create `.env` (Node.js)

```env
API_URL=https://api.yourapp.com/api/v1
API_KEY=your_api_key_here
```

### Add to `.gitignore`

```gitignore
.env
.env.local
.env.*.local
node_modules/
dist/
.next/
```

---

## Installation

### Install Dependencies

```bash
# Core dependencies
npm install axios

# For TypeScript (if not already installed)
npm install -D typescript @types/node @types/react

# For testing
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest

# Optional: UI Components (if using React)
npm install react-hot-toast
npm install lucide-react
```

---

## Project Structure

### Recommended Structure

```
qr-api-testing/
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
│
├── src/
│   ├── lib/
│   │   └── api-client.ts          # Axios configuration
│   │
│   ├── services/
│   │   ├── qr.service.ts          # QR Code API methods
│   │   └── apiKey.service.ts      # API Key management
│   │
│   ├── hooks/
│   │   ├── useQRCodes.ts          # React hook for QR operations
│   │   └── useApiKeys.ts          # React hook for API keys
│   │
│   ├── components/
│   │   ├── QRCodeGenerator.tsx    # Test QR creation
│   │   ├── QRCodeList.tsx         # Test QR listing
│   │   └── ApiKeyTester.tsx       # Test API key auth
│   │
│   ├── pages/ (or app/)
│   │   ├── index.tsx              # Main testing dashboard
│   │   ├── qr-test.tsx            # QR code testing page
│   │   └── api-test.tsx           # API endpoint testing
│   │
│   └── tests/
│       ├── qr.test.ts             # QR code tests
│       └── apiKey.test.ts         # API key tests
│
└── scripts/
    ├── test-create-qr.js          # CLI test script
    ├── test-list-qr.js            # CLI test script
    └── test-analytics.js          # CLI test script
```

---

## Sample Code

### 1. API Client Setup

**File: `src/lib/api-client.ts`**

```typescript
import axios, { AxiosInstance, AxiosError } from "axios";

const BASE_URL = process.env.API_URL || "http://qr.scanalyzr.com";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// Create axios instance for public API (with API Key)
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  },
});

// Request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log("📤 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    console.error("❌ API Error:", {
      status: error.response?.status,
      message: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

### 2. QR Code Service

**File: `src/services/qr.service.ts`**

```typescript
import apiClient from "@/lib/api-client";

export interface QRCode {
  id: string;
  name: string;
  shortUrl: string;
  qrCodeUrl: string;
  destinationUrl: string;
  type: string;
  scanCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQRPayload {
  name: string;
  url: string;
  type: "URL" | "TEXT" | "VCARD" | "EMAIL" | "SMS" | "WIFI";
  customization?: {
    fgColor?: string;
    bgColor?: string;
    logo?: string;
    size?: number;
  };
}

export const qrService = {
  // Create QR Code
  async create(data: CreateQRPayload): Promise<QRCode> {
    const response = await apiClient.post("/public/qr", data);
    return response.data.data;
  },

  // Get all QR codes
  async getAll(params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<{
    data: QRCode[];
    meta: { page: number; limit: number; total: number };
  }> {
    const response = await apiClient.get("/public/qr", { params });
    return response.data;
  },

  // Get single QR code
  async getById(id: string): Promise<QRCode> {
    const response = await apiClient.get(`/public/qr/${id}`);
    return response.data.data;
  },

  // Update QR code
  async update(id: string, data: Partial<CreateQRPayload>): Promise<QRCode> {
    const response = await apiClient.patch(`/public/qr/${id}`, data);
    return response.data.data;
  },

  // Delete QR code
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/public/qr/${id}`);
  },

  // Get analytics
  async getAnalytics(id: string): Promise<any> {
    const response = await apiClient.get(`/public/qr/${id}/analytics`);
    return response.data.data;
  },
};
```

---

### 3. React Component for Testing

**File: `src/components/QRCodeGenerator.tsx`**

```typescript
"use client";

import React, { useState } from "react";
import { qrService, CreateQRPayload } from "@/services/qr.service";

export const QRCodeGenerator: React.FC = () => {
  const [formData, setFormData] = useState<CreateQRPayload>({
    name: "",
    url: "",
    type: "URL",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const qrCode = await qrService.create(formData);
      setResult(qrCode);
      console.log("✅ QR Code Created:", qrCode);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create QR code");
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Test QR Code Creation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="My Test QR Code"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as CreateQRPayload["type"],
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="URL">URL</option>
            <option value="TEXT">Text</option>
            <option value="VCARD">vCard</option>
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="WIFI">WiFi</option>
          </select>
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
            <p><strong>Short URL:</strong> <a href={result.shortUrl} className="text-blue-600 underline" target="_blank">{result.shortUrl}</a></p>
            <p><strong>Destination:</strong> {result.destinationUrl}</p>
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
```

---

### 4. CLI Testing Script

**File: `scripts/test-create-qr.js`**

```javascript
const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "http://qr.scanalyzr.com";
const API_KEY = process.env.API_KEY;

async function testCreateQR() {
  console.log("🧪 Testing QR Code Creation...\n");

  try {
    const response = await axios.post(
      `${API_URL}/public/qr`,
      {
        name: "Test QR Code",
        url: "https://example.com",
        type: "URL",
      },
      {
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ SUCCESS!");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data, null, 2));
    console.log("\n📊 QR Code Details:");
    console.log("  ID:", response.data.data.id);
    console.log("  Short URL:", response.data.data.shortUrl);
    console.log("  QR Image:", response.data.data.qrCodeUrl);
  } catch (error) {
    console.error("❌ FAILED!");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Details:", error.response?.data);
  }
}

testCreateQR();
```

**Run:**
```bash
node scripts/test-create-qr.js
```

---

## Testing Scenarios

### Test Case 1: Create QR Code
```bash
curl -X POST http://qr.scanalyzr.com/public/qr \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test QR",
    "url": "https://example.com",
    "type": "URL"
  }'
```

### Test Case 2: List QR Codes
```bash
curl -X GET "http://qr.scanalyzr.com/public/qr?limit=5" \
  -H "X-API-Key: your_api_key"
```

### Test Case 3: Update QR Code
```bash
curl -X PATCH http://qr.scanalyzr.com/public/qr/{id} \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "url": "https://new-url.com"
  }'
```

### Test Case 4: Delete QR Code
```bash
curl -X DELETE http://qr.scanalyzr.com/public/qr/{id} \
  -H "X-API-Key: your_api_key"
```

### Test Case 5: Get Analytics
```bash
curl -X GET http://qr.scanalyzr.com/public/qr/{id}/analytics \
  -H "X-API-Key: your_api_key"
```

---

## Running Tests

### Option 1: Jest Unit Tests

**File: `src/tests/qr.test.ts`**

```typescript
import { qrService } from "@/services/qr.service";

describe("QR Code Service", () => {
  it("should create a QR code", async () => {
    const result = await qrService.create({
      name: "Test QR",
      url: "https://example.com",
      type: "URL",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("qrCodeUrl");
    expect(result.name).toBe("Test QR");
  });

  it("should list QR codes", async () => {
    const result = await qrService.getAll({ limit: 10 });

    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("meta");
    expect(Array.isArray(result.data)).toBe(true);
  });
});
```

**Run:**
```bash
npm test
```

### Option 2: Manual Testing Dashboard

Create a testing dashboard page:

**File: `src/pages/index.tsx`**

```typescript
import { QRCodeGenerator } from "@/components/QRCodeGenerator";

export default function TestingDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          QR Code API Testing Dashboard
        </h1>
        
        <QRCodeGenerator />
      </div>
    </div>
  );
}
```

**Run:**
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Checklist

Before testing, ensure:

- ✅ API key is generated from main dashboard
- ✅ API key is stored in `.env.local`
- ✅ Backend server is running
- ✅ CORS is configured for your test domain
- ✅ Dependencies are installed
- ✅ Environment variables are loaded

---

## Common Issues

### Issue 1: API Key Not Working
- Verify API key is active in dashboard
- Check header format: `X-API-Key: qr_live_...`
- Ensure no extra spaces in `.env` file

### Issue 2: CORS Errors
- Backend must allow your test domain
- Add to `FRONTEND_URL` in backend `.env`

### Issue 3: 404 Errors
- Verify base URL is correct
- Check API endpoints match documentation
- Ensure backend is running

---

## Next Steps

1. ✅ Set up testing repository
2. ✅ Configure environment variables
3. ✅ Install dependencies
4. ✅ Copy sample code
5. ✅ Run test scripts
6. ✅ Test all endpoints
7. ✅ Build integration

---

## Support

- 📧 API Support: api-support@yourapp.com
- 📚 Full Documentation: See `API_DOCUMENTATION.md`
- 🐛 Report Issues: GitHub Issues

---

*Last updated: January 15, 2026*
