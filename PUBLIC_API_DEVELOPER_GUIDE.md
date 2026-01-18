# QR Code API - Developer Integration Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
5. [QR Code Customization](#qr-code-customization)
6. [Security & Access Control](#security--access-control)
7. [QR Code Types & Data Formats](#qr-code-types--data-formats)
8. [Code Examples](#code-examples)
9. [Error Handling](#error-handling)
10. [Rate Limits & Quotas](#rate-limits--quotas)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The QR Code Public API allows developers to programmatically create, manage, and track QR codes from their applications. This API is designed for:

- **E-commerce platforms** - Generate product QR codes dynamically
- **Marketing automation** - Create campaign-specific QR codes
- **Event management** - Generate event tickets and check-in codes
- **Mobile apps** - Integrate QR code generation into your app
- **SaaS platforms** - Embed QR code functionality into your product

### Key Features

✅ **Simplified QR Creation** - Just provide a name and destination URL  
✅ **Dynamic QR Codes** - Update destinations without regenerating codes  
✅ **IP-Based Tracking** - Automatic scan tracking and analytics  
✅ **Custom Short Codes** - Use your own branded short codes  
✅ **Auto-Upload to CDN** - QR images stored on Cloudinary  
✅ **Subscription-Based Limits** - Fair usage based on your plan  
✅ **Full Customization** - Control colors, margins, dots style, and more  
✅ **Password Protection** - Optional password security for sensitive QR codes  
✅ **Expiration Dates** - Set automatic expiry for time-limited campaigns  
✅ **Scan Limits** - Control maximum number of scans per QR code  

### Default Behavior

When you create a QR code with **only required fields** (name and destinationUrl), the API applies these defaults:

- **Type**: `DYNAMIC` - Editable destination URL
- **Design**: Black QR code on white background (500px, margin: 4)
- **Tracking**: IP-based tracking enabled
- **Security**: No password protection
- **Expiration**: Never expires
- **Scan Limit**: Unlimited (subject to your subscription tier)
- **Short Code**: Auto-generated unique code

You can **override any default** by including optional parameters in your request.  

---

## 🚀 Getting Started

### Step 1: Get Your API Key

1. Log in to your QR Code dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Give it a descriptive name (e.g., "Production API", "Development")
5. Copy your API key - it starts with `qr_live_` or `qr_test_`

> ⚠️ **Important**: Store your API key securely. Never commit it to version control!

### Step 2: Test Authentication

```bash
curl -X GET http://qr.scanalyzr.com/api/v1/public/qr \
  -H "X-API-Key: qr_live_your_api_key_here"
```

If successful, you'll receive a list of your QR codes (or an empty array if you haven't created any yet).

---

## 🔐 Authentication

The API supports **three authentication methods**:

### Method 1: X-API-Key Header (Recommended)

```javascript
fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
  headers: {
    'X-API-Key': 'qr_live_your_api_key_here',
    'Content-Type': 'application/json'
  }
});
```

### Method 2: Authorization Bearer Token

```javascript
fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
  headers: {
    'Authorization': 'Bearer qr_live_your_api_key_here',
    'Content-Type': 'application/json'
  }
});
```

### Method 3: Query Parameter (Not Recommended for Production)

```bash
http://qr.scanalyzr.com/api/v1/public/qr?apiKey=qr_live_your_api_key_here
```

> 🔒 **Security Best Practice**: Use headers (Method 1 or 2) to avoid API keys appearing in server logs.

---

## 📡 API Endpoints

### Base URL

```
http://qr.scanalyzr.com/api/v1/public
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/qr` | Create a new QR code |
| `GET` | `/qr` | List all your QR codes |
| `GET` | `/qr/:id` | Get a single QR code |
| `PATCH` | `/qr/:id` | Update a QR code |
| `DELETE` | `/qr/:id` | Delete a QR code |
| `GET` | `/qr/:id/analytics` | Get QR code analytics |

---

## 🛠️ API Endpoints - Detailed Documentation

### 1. Create QR Code

**Endpoint:** `POST /api/v1/public/qr`

Creates a new dynamic QR code with default settings (black on white, 500px, IP tracking).

**Request Body:**

```json
{
  "name": "Product Launch Campaign",
  "destinationUrl": "https://example.com/product/launch",
  "shortCode": "launch24",  // Optional: custom short code
  "type": "URL",            // Optional: default is "URL"
  "password": "secret123",  // Optional: password protect your QR
  "expiresAt": "2026-12-31T23:59:59Z",  // Optional: expiration date
  "scanLimit": 1000,        // Optional: max number of scans
  "customDesign": {         // Optional: customize QR appearance
    "backgroundColor": "#FFFFFF",
    "foregroundColor": "#000000",
    "margin": 4
  }
}
```

**Request Parameters:**

| Field | Type | Required | Description | Default |
|-------|------|----------|-------------|---------|
| `name` | string | ✅ Yes | Descriptive name for your QR code | - |
| `destinationUrl` | string | ✅ Yes | Where the QR code should redirect | - |
| `shortCode` | string | ❌ No | Custom short code | Auto-generated |
| `type` | string | ❌ No | QR data type | `"URL"` |
| `password` | string | ❌ No | Password protection (4-50 chars) | No password |
| `expiresAt` | string | ❌ No | Expiration date (ISO 8601 format) | Never expires |
| `scanLimit` | number | ❌ No | Maximum number of scans allowed | Unlimited |
| `customDesign` | object | ❌ No | QR code appearance customization | Default design |

**Response (201 Created):**

```json
{
  "success": true,
  "message": "QR code created successfully",
  "data": {
    "id": "cm5abc123xyz",
    "name": "Product Launch Campaign",
    "shortCode": "launch24",
    "shortUrl": "https://your-domain.com/q/launch24",
    "qrCodeUrl": "https://res.cloudinary.com/your-cloud/image/upload/qr-codes/launch24.png",
    "destinationUrl": "https://example.com/product/launch",
    "type": "URL",
    "scanCount": 0,
    "isActive": true,
    "createdAt": "2026-01-17T10:30:00.000Z"
  }
}
```

**Example Request (JavaScript):**

```javascript
// Basic QR Code (minimal required fields)
const createBasicQRCode = async () => {
  const response = await fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
    method: 'POST',
    headers: {
      'X-API-Key': 'qr_live_your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Product Launch Campaign',
      destinationUrl: 'https://example.com/product/launch'
    })
  });
  
  const data = await response.json();
  console.log('QR Code Created:', data.data.qrCodeUrl);
  return data;
};

// Advanced QR Code with all optional parameters
const createAdvancedQRCode = async () => {
  const response = await fetch('http://qr.scanalyzr.com/api/v1/public/qr', {
    method: 'POST',
    headers: {
      'X-API-Key': 'qr_live_your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'VIP Product Launch',
      destinationUrl: 'https://example.com/product/launch',
      shortCode: 'launch24',
      password: 'vip2024',
      expiresAt: '2026-12-31T23:59:59Z',
      scanLimit: 500,
      customDesign: {
        backgroundColor: '#FFFFFF',
        foregroundColor: '#FF6B35',
        margin: 4,
        width: 800,
        errorCorrectionLevel: 'H'
      }
    })
  });
  
  const data = await response.json();
  console.log('QR Code Created:', data.data.qrCodeUrl);
  return data;
};
```

---

### 2. List All QR Codes

**Endpoint:** `GET /api/v1/public/qr`

Retrieves all QR codes associated with your API key, with pagination support.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page (max 100) |

**Example Request:**

```bash
GET /api/v1/public/qr?page=1&limit=20
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "QR codes retrieved successfully",
  "data": [
    {
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
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

**Example Request (JavaScript):**

```javascript
const getQRCodes = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://qr.scanalyzr.com/api/v1/public/qr?page=${page}&limit=${limit}`,
    {
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  const data = await response.json();
  return data;
};
```

---

### 3. Get Single QR Code

**Endpoint:** `GET /api/v1/public/qr/:id`

Retrieves detailed information about a specific QR code.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | QR code ID |

**Response (200 OK):**

```json
{
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
}
```

**Example Request (JavaScript):**

```javascript
const getQRCode = async (qrCodeId) => {
  const response = await fetch(
    `http://qr.scanalyzr.com/api/v1/public/qr/${qrCodeId}`,
    {
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  return await response.json();
};
```

---

### 4. Update QR Code

**Endpoint:** `PATCH /api/v1/public/qr/:id`

Updates an existing QR code's name, destination URL, or active status.

> 📝 **Note**: For dynamic QR codes, updating the destination URL will regenerate the QR image.

**Request Body:**

```json
{
  "name": "Updated Campaign Name",
  "destinationUrl": "https://example.com/new-destination",
  "isActive": true
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ❌ No | New name for the QR code |
| `destinationUrl` | string | ❌ No | New destination URL |
| `isActive` | boolean | ❌ No | Enable/disable the QR code |

**Response (200 OK):**

```json
{
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
}
```

**Example Request (JavaScript):**

```javascript
const updateQRCode = async (qrCodeId, updates) => {
  const response = await fetch(
    `http://qr.scanalyzr.com/api/v1/public/qr/${qrCodeId}`,
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

// Usage Examples:

// Update destination URL only
await updateQRCode('cm5abc123xyz', {
  destinationUrl: 'https://example.com/new-destination'
});

// Update QR design
await updateQRCode('cm5abc123xyz', {
  customDesign: {
    backgroundColor: '#1E3A8A',
    foregroundColor: '#FBBF24',
    margin: 6
  }
});

// Add password protection
await updateQRCode('cm5abc123xyz', {
  password: 'secure123',
  expiresAt: '2027-06-30T23:59:59Z'
});

// Update multiple fields
await updateQRCode('cm5abc123xyz', {
  name: 'Updated Campaign',
  destinationUrl: 'https://example.com/new-url',
  scanLimit: 5000,
  isActive: true
});
```

---

### 5. Delete QR Code

**Endpoint:** `DELETE /api/v1/public/qr/:id`

Permanently deletes a QR code and all its associated scan data.

> ⚠️ **Warning**: This action cannot be undone!

**Response (200 OK):**

```json
{
  "success": true,
  "message": "QR code deleted successfully",
  "data": {
    "message": "QR code deleted successfully"
  }
}
```

**Example Request (JavaScript):**

```javascript
const deleteQRCode = async (qrCodeId) => {
  const response = await fetch(
    `http://qr.scanalyzr.com/api/v1/public/qr/${qrCodeId}`,
    {
      method: 'DELETE',
      headers: {
        'X-API-Key': 'qr_live_your_api_key_here'
      }
    }
  );
  
  return await response.json();
};
```

---

### 6. Get QR Code Analytics

**Endpoint:** `GET /api/v1/public/qr/:id/analytics`

Retrieves comprehensive analytics for a specific QR code.

**Response (200 OK):**

```json
{
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
}
```

**Example Request (JavaScript):**

```javascript
const getAnalytics = async (qrCodeId) => {
  const response = await fetch(
    `http://qr.scanalyzr.com/api/v1/public/qr/${qrCodeId}/analytics`,
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
};
```

---

## 🎨 QR Code Customization

The Public API allows you to fully customize the appearance of your QR codes through the `customDesign` object. All customization options are **optional** and will use sensible defaults if not provided.

### Basic Customization Options

```json
{
  "customDesign": {
    "backgroundColor": "#FFFFFF",    // Background color (hex format)
    "foregroundColor": "#000000",    // QR code color (hex format)
    "margin": 4,                     // White border margin (0-20)
    "width": 500,                    // QR code size in pixels (100-2000)
    "errorCorrectionLevel": "M"      // Error correction: L, M, Q, H
  }
}
```

### Advanced Customization Options

For more control over your QR code appearance:

```json
{
  "customDesign": {
    // Basic Options
    "backgroundColor": "#FFFFFF",
    "foregroundColor": "#000000",
    "margin": 4,
    "width": 800,
    "errorCorrectionLevel": "H",
    
    // Dot Style
    "dotsType": "rounded",           // Options: rounded, dots, classy, classy-rounded, square, extra-rounded
    "dotsColor": "#FF6B35",
    
    // Dot Gradients (optional)
    "dotsGradientType": "linear",    // Options: linear, radial
    "dotsGradientColorStart": "#FF6B35",
    "dotsGradientColorEnd": "#FFA07A",
    
    // Corner Squares
    "cornersSquareType": "extra-rounded",  // Options: dot, square, extra-rounded
    "cornersSquareColor": "#FF6B35",
    
    // Corner Dots
    "cornersDotType": "dot",         // Options: dot, square
    "cornersDotColor": "#FF6B35",
    
    // Background Gradients (optional)
    "backgroundOptionsColor": "#FFFFFF",
    "backgroundGradientType": "linear",
    "backgroundGradientColorStart": "#FFFFFF",
    "backgroundGradientColorEnd": "#F0F0F0",
    
    // Logo/Image (optional)
    "imageUrl": "https://example.com/logo.png",
    "imageMargin": 10,               // Margin around logo (0-20)
    "imageSize": 0.3                 // Logo size relative to QR (0.1-0.5)
  }
}
```

### Customization Parameters Reference

| Parameter | Type | Range/Options | Default | Description |
|-----------|------|---------------|---------|-------------|
| `backgroundColor` | string | Hex color | `#FFFFFF` | Background color |
| `foregroundColor` | string | Hex color | `#000000` | Main QR code color |
| `margin` | number | 0-20 | `4` | White border size |
| `width` | number | 100-2000 | `500` | QR code size in pixels |
| `errorCorrectionLevel` | string | L, M, Q, H | `M` | Error correction level¹ |
| `dotsType` | string | rounded, dots, classy, classy-rounded, square, extra-rounded | `square` | Shape of QR dots |
| `dotsColor` | string | Hex color | `#000000` | Color of QR dots |
| `dotsGradientType` | string | linear, radial | - | Gradient type for dots |
| `dotsGradientColorStart` | string | Hex color | - | Gradient start color |
| `dotsGradientColorEnd` | string | Hex color | - | Gradient end color |
| `cornersSquareType` | string | dot, square, extra-rounded | `square` | Corner square style |
| `cornersSquareColor` | string | Hex color | `#000000` | Corner square color |
| `cornersDotType` | string | dot, square | `square` | Corner dot style |
| `cornersDotColor` | string | Hex color | `#000000` | Corner dot color |
| `backgroundOptionsColor` | string | Hex color | `#FFFFFF` | Background solid color |
| `backgroundGradientType` | string | linear, radial | - | Background gradient type |
| `backgroundGradientColorStart` | string | Hex color | - | Background gradient start |
| `backgroundGradientColorEnd` | string | Hex color | - | Background gradient end |
| `imageUrl` | string | Valid URL | - | Logo/image URL |
| `imageMargin` | number | 0-20 | `0` | Space around logo |
| `imageSize` | number | 0.1-0.5 | `0.3` | Logo size ratio |

¹ **Error Correction Levels:**
- **L (Low)**: ~7% error recovery - use for large, clean QR codes
- **M (Medium)**: ~15% error recovery - **recommended default**
- **Q (Quartile)**: ~25% error recovery - use with logos/images
- **H (High)**: ~30% error recovery - use for small or damaged QR codes

### Customization Examples

#### 1. Brand Colors QR Code

```javascript
{
  "name": "Branded QR",
  "destinationUrl": "https://example.com",
  "customDesign": {
    "backgroundColor": "#1E3A8A",    // Navy blue
    "foregroundColor": "#FBBF24",    // Gold
    "margin": 6,
    "width": 600,
    "errorCorrectionLevel": "Q"
  }
}
```

#### 2. Gradient Style QR Code

```javascript
{
  "name": "Gradient QR",
  "destinationUrl": "https://example.com",
  "customDesign": {
    "backgroundColor": "#FFFFFF",
    "dotsType": "rounded",
    "dotsGradientType": "linear",
    "dotsGradientColorStart": "#667EEA",
    "dotsGradientColorEnd": "#764BA2",
    "cornersSquareType": "extra-rounded",
    "cornersSquareColor": "#667EEA",
    "margin": 4,
    "width": 800
  }
}
```

#### 3. QR Code with Logo

```javascript
{
  "name": "Logo QR",
  "destinationUrl": "https://example.com",
  "customDesign": {
    "backgroundColor": "#FFFFFF",
    "foregroundColor": "#000000",
    "dotsType": "classy-rounded",
    "errorCorrectionLevel": "H",     // High correction for logo
    "imageUrl": "https://example.com/logo.png",
    "imageMargin": 10,
    "imageSize": 0.25,
    "width": 1000
  }
}
```

#### 4. Minimalist Black & White

```javascript
{
  "name": "Simple QR",
  "destinationUrl": "https://example.com",
  "customDesign": {
    "backgroundColor": "#FFFFFF",
    "foregroundColor": "#000000",
    "margin": 2,
    "width": 400,
    "dotsType": "square"
  }
}
```

#### 5. High-Visibility Event QR

```javascript
{
  "name": "Event QR",
  "destinationUrl": "https://example.com/event",
  "customDesign": {
    "backgroundColor": "#1F2937",    // Dark gray
    "foregroundColor": "#10B981",    // Bright green
    "dotsType": "dots",
    "cornersSquareType": "extra-rounded",
    "cornersSquareColor": "#34D399",
    "margin": 8,
    "width": 1200,
    "errorCorrectionLevel": "H"
  }
}
```

### Best Practices for QR Code Design

✅ **Do:**
- Use high contrast between background and foreground colors
- Set `errorCorrectionLevel` to `H` when using logos
- Keep `margin` at least 4 for better scanning
- Use `width` of 500-1000px for print materials
- Test QR codes before mass distribution

❌ **Don't:**
- Use similar colors for background and foreground (low contrast)
- Make QR codes smaller than 200px
- Use logos larger than 30% of QR size (`imageSize: 0.3`)
- Remove margin completely (`margin: 0`)
- Use very light colors on light backgrounds

### Color Scheme Ideas

| Theme | Background | Foreground | Use Case |
|-------|------------|------------|----------|
| Classic | `#FFFFFF` | `#000000` | Print materials |
| Ocean | `#E0F2FE` | `#0369A1` | Beach/travel events |
| Forest | `#F0FDF4` | `#15803D` | Eco-friendly products |
| Sunset | `#FFF7ED` | `#C2410C` | Food/restaurants |
| Royal | `#F5F3FF` | `#6B21A8` | Premium/luxury |
| Tech | `#F1F5F9` | `#0F172A` | Technology products |
| Vibrant | `#FFFFFF` | `#DC2626` | Sales/promotions |

---

## 🔒 Security & Access Control

The Public API provides optional security features to protect your QR codes and control access.

### Password Protection

Add password protection to restrict access to your QR code content:

```javascript
{
  "name": "Private Document",
  "destinationUrl": "https://example.com/private/document.pdf",
  "password": "secure123"
}
```

**Password Requirements:**
- Minimum length: 4 characters
- Maximum length: 50 characters
- Case-sensitive

**User Experience:**
When scanning a password-protected QR code, users will be prompted to enter the password before accessing the destination URL.

### Expiration Dates

Set an automatic expiration date for time-sensitive campaigns:

```javascript
{
  "name": "Flash Sale",
  "destinationUrl": "https://example.com/flash-sale",
  "expiresAt": "2026-06-30T23:59:59Z"
}
```

**Format**: ISO 8601 date-time format (YYYY-MM-DDTHH:mm:ssZ)

**Behavior After Expiration:**
- QR code becomes inactive automatically
- Scans redirect to an "expired" message page
- Can be reactivated by updating the `expiresAt` date

### Scan Limits

Control the maximum number of scans allowed:

```javascript
{
  "name": "Limited Offer",
  "destinationUrl": "https://example.com/offer",
  "scanLimit": 100
}
```

**Behavior:**
- Counter increments with each scan
- Once limit is reached, QR code becomes inactive
- Limit can be increased by updating the QR code

**Subscription-Based Limits:**
Individual scan limits are separate from your subscription tier's QR creation limits.

### Combined Security Features

For maximum security, combine multiple features:

```javascript
{
  "name": "VIP Event Ticket",
  "destinationUrl": "https://example.com/event/checkin",
  "password": "vip2024",
  "expiresAt": "2026-06-15T23:59:59Z",
  "scanLimit": 1
}
```

**Use Cases:**
- **Single-use tickets**: scanLimit: 1, expiresAt: event date
- **Beta access codes**: password protection + expiration
- **Time-limited promotions**: expiresAt only
- **Exclusive content**: password + custom expiration

### Security Best Practices

✅ **Do:**
- Use strong passwords (mix of letters and numbers)
- Set realistic expiration dates for campaigns
- Monitor scan counts via analytics
- Update or delete expired/inactive QR codes
- Use HTTPS URLs for destination links

❌ **Don't:**
- Share passwords in QR code names or metadata
- Set scan limits too low for public campaigns
- Use easily guessable passwords (e.g., "1234")
- Forget to update expiration dates for recurring campaigns

---

## 📋 QR Code Types & Data Formats

The API supports **19 different QR code types**. While the Public API creates basic URL-based dynamic QR codes by default, understanding all available types can help you plan future integrations.

### Currently Supported in Public API

The API supports **19 different QR code types**. While the Public API creates basic URL-based dynamic QR codes by default, understanding all available types can help you plan future integrations.

### Currently Supported in Public API

✅ **URL** - Simple URL redirection (default for Public API)

### All Available QR Code Types

> 💡 **Note**: Advanced QR types (WiFi, Contact, Email, etc.) are available through the main application interface. Contact support if you need API access to these types.

---

### 1. URL (Default)

Redirects users to a website or web page.

**Type**: `"URL"`

**Request Body**:
```json
{
  "name": "Website Link",
  "destinationUrl": "https://example.com",
  "type": "URL"
}
```

**Use Cases**:
- Product pages
- Campaign landing pages
- Social media links
- Documentation

---

### 2. WIFI

Shares WiFi network credentials. When scanned, automatically connects to the network.

**Type**: `"WIFI"`

**Required Data**:
```json
{
  "name": "Office WiFi",
  "type": "WIFI",
  "qrData": {
    "ssid": "MyNetwork",
    "password": "SecurePassword123",
    "encryption": "WPA",  // Options: "WPA", "WEP", "nopass"
    "hidden": false       // true for hidden networks
  }
}
```

**Use Cases**:
- Guest WiFi access
- Office networks
- Event venues
- Hotels/Restaurants

---

### 3. CONTACT (vCard)

Shares complete contact information that can be saved to phone contacts.

**Type**: `"CONTACT"`

**Required Data**:
```json
{
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
}
```

**Use Cases**:
- Business cards
- Employee directories
- Networking events
- Contact sharing

---

### 4. EMAIL

Composes a pre-filled email when scanned.

**Type**: `"EMAIL"`

**Required Data**:
```json
{
  "name": "Support Email",
  "type": "EMAIL",
  "qrData": {
    "email": "support@example.com",
    "subject": "Customer Inquiry",
    "body": "Hello, I would like to know more about..."
  }
}
```

**Use Cases**:
- Customer support
- Feedback collection
- Contact forms
- Newsletter signups

---

### 5. PHONE

Initiates a phone call when scanned.

**Type**: `"PHONE"`

**Required Data**:
```json
{
  "name": "Customer Service",
  "type": "PHONE",
  "qrData": {
    "phone": "+1-800-123-4567"
  }
}
```

**Use Cases**:
- Customer service hotlines
- Emergency contacts
- Sales inquiries
- Appointment booking

---

### 6. SMS

Sends a pre-filled SMS message when scanned.

**Type**: `"SMS"`

**Required Data**:
```json
{
  "name": "Text to Win",
  "type": "SMS",
  "qrData": {
    "phone": "+1234567890",
    "message": "JOIN to enter the contest"
  }
}
```

**Use Cases**:
- Marketing campaigns
- Contests/Giveaways
- Text-to-vote
- SMS alerts signup

---

### 7. LOCATION (GPS)

Opens map application with specific coordinates or address.

**Type**: `"LOCATION"`

**Required Data**:
```json
{
  "name": "Office Location",
  "type": "LOCATION",
  "qrData": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 Main Street, New York, NY"  // Optional
  }
}
```

**Use Cases**:
- Store locations
- Event venues
- Delivery addresses
- Tourist attractions

---

### 8. EVENT (Calendar)

Adds an event to the user's calendar.

**Type**: `"EVENT"`

**Required Data**:
```json
{
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
}
```

**Use Cases**:
- Conference schedules
- Webinar registrations
- Appointment reminders
- Event tickets

---

### 9. MECARD

Lightweight contact card format (alternative to vCard).

**Type**: `"MECARD"`

**Required Data**:
```json
{
  "name": "Business Card",
  "type": "MECARD",
  "qrData": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "url": "https://johndoe.com",
    "address": "123 Main St, NYC"
  }
}
```

**Use Cases**:
- Simple business cards
- Quick contact sharing
- Name badges
- Directory listings

---

### 10. WHATSAPP

Opens WhatsApp chat with pre-filled message.

**Type**: `"WHATSAPP"`

**Required Data**:
```json
{
  "name": "WhatsApp Support",
  "type": "WHATSAPP",
  "qrData": {
    "phone": "+1234567890",  // Include country code
    "message": "Hi! I'm interested in your services"
  }
}
```

**Use Cases**:
- Customer support
- Sales inquiries
- Order confirmations
- Personal messaging

---

### 11. PDF

Direct link to a PDF document.

**Type**: `"PDF"`

**Required Data**:
```json
{
  "name": "Product Brochure",
  "type": "PDF",
  "qrData": {
    "url": "https://example.com/brochure.pdf",
    "title": "Product Catalog 2026"  // Optional
  }
}
```

**Use Cases**:
- Product catalogs
- Menus (restaurants)
- User manuals
- Instruction guides

---

### 12. VIDEO

Direct link to a video.

**Type**: `"VIDEO"`

**Required Data**:
```json
{
  "name": "Product Demo",
  "type": "VIDEO",
  "qrData": {
    "url": "https://youtube.com/watch?v=xxx",
    "title": "Product Demo Video"  // Optional
  }
}
```

**Use Cases**:
- Product demonstrations
- Tutorial videos
- Marketing content
- Event recordings

---

### 13. AUDIO

Direct link to an audio file or podcast.

**Type**: `"AUDIO"`

**Required Data**:
```json
{
  "name": "Podcast Episode",
  "type": "AUDIO",
  "qrData": {
    "url": "https://example.com/podcast.mp3",
    "title": "Episode 42: The Future"  // Optional
  }
}
```

**Use Cases**:
- Podcast episodes
- Music tracks
- Audio guides
- Language learning

---

### 14. SOCIAL_MEDIA

Links to social media profiles.

**Type**: `"SOCIAL_MEDIA"`

**Required Data**:
```json
{
  "name": "Social Media Links",
  "type": "SOCIAL_MEDIA",
  "qrData": {
    "platform": "instagram",  // facebook, twitter, linkedin, instagram, tiktok
    "username": "yourcompany",
    "url": "https://instagram.com/yourcompany"
  }
}
```

**Use Cases**:
- Social media marketing
- Influencer campaigns
- Brand awareness
- Follower growth

---

### 15. GOOGLE_REVIEW

Direct link to Google Business review page.

**Type**: `"GOOGLE_REVIEW"`

**Required Data**:
```json
{
  "name": "Leave a Review",
  "type": "GOOGLE_REVIEW",
  "qrData": {
    "placeId": "ChIJN1t_tDeuEmsRUsoyG83frY4"  // Google Place ID
  }
}
```

**Use Cases**:
- Restaurant reviews
- Service feedback
- Business reputation
- Local SEO

---

### 16. COUPON

Displays a coupon or discount code.

**Type**: `"COUPON"`

**Required Data**:
```json
{
  "name": "10% Off Coupon",
  "type": "COUPON",
  "qrData": {
    "title": "Special Discount",
    "code": "SAVE10",
    "discount": "10% OFF",
    "validUntil": "2026-12-31",
    "termsUrl": "https://example.com/terms"  // Optional
  }
}
```

**Use Cases**:
- Promotional campaigns
- Loyalty programs
- Special offers
- Event discounts

---

### 17. FEEDBACK

Direct link to feedback form.

**Type**: `"FEEDBACK"`

**Required Data**:
```json
{
  "name": "Customer Feedback",
  "type": "FEEDBACK",
  "qrData": {
    "url": "https://forms.google.com/yourform",
    "title": "How did we do?"  // Optional
  }
}
```

**Use Cases**:
- Customer satisfaction surveys
- Product feedback
- Event evaluations
- Service reviews

---

### 18. BUSINESS_PAGE

Comprehensive business information page.

**Type**: `"BUSINESS_PAGE"`

**Required Data**:
```json
{
  "name": "Business Profile",
  "type": "BUSINESS_PAGE",
  "qrData": {
    "businessName": "Acme Corporation",
    "description": "Leading provider of innovative solutions",
    "phone": "+1234567890",
    "email": "info@acme.com",
    "website": "https://acme.com",
    "address": "123 Business Ave, NYC",
    "hours": "Mon-Fri: 9AM-6PM",
    "socialMedia": {
      "facebook": "acmecorp",
      "instagram": "acmecorp",
      "linkedin": "acme-corporation"
    }
  }
}
```

**Use Cases**:
- Company profiles
- Store information
- Service providers
- Local businesses

---

### QR Type Comparison Table

| Type | Best For | Scan Action | Data Complexity |
|------|----------|-------------|-----------------|
| URL | Websites | Opens browser | ⭐ Simple |
| WIFI | Network sharing | Connects to WiFi | ⭐⭐ Medium |
| CONTACT | Business cards | Saves contact | ⭐⭐⭐ Complex |
| EMAIL | Support/Feedback | Opens email app | ⭐⭐ Medium |
| PHONE | Calls/Support | Initiates call | ⭐ Simple |
| SMS | Campaigns | Opens SMS app | ⭐⭐ Medium |
| LOCATION | Directions | Opens maps | ⭐⭐ Medium |
| EVENT | Calendars | Adds to calendar | ⭐⭐⭐ Complex |
| MECARD | Quick contact | Saves contact | ⭐⭐ Medium |
| WHATSAPP | Messaging | Opens WhatsApp | ⭐⭐ Medium |
| PDF | Documents | Opens PDF | ⭐ Simple |
| VIDEO | Media | Plays video | ⭐ Simple |
| AUDIO | Podcasts | Plays audio | ⭐ Simple |
| SOCIAL_MEDIA | Social links | Opens app/browser | ⭐ Simple |
| GOOGLE_REVIEW | Reviews | Opens review page | ⭐ Simple |
| COUPON | Discounts | Shows coupon | ⭐⭐ Medium |
| FEEDBACK | Surveys | Opens form | ⭐ Simple |
| BUSINESS_PAGE | Profiles | Shows info page | ⭐⭐⭐ Complex |

---

### Public API Type Support

**Currently Supported**:
- ✅ **URL** - Full support via Public API

**Coming Soon**:
- 🔜 EMAIL, SMS, PHONE (Simple types)
- 🔜 WHATSAPP, SOCIAL_MEDIA (Popular types)

**Available in Dashboard**:
- ✅ All 19 types supported
- ✅ Advanced customization
- ✅ Custom designs & logos

> 💡 **Need advanced types?** Use the dashboard UI or contact support for custom API access.

---

## 💻 Code Examples

### Complete Node.js Example

```javascript
// qr-code-client.js
const axios = require('axios');

class QRCodeClient {
  constructor(apiKey, baseUrl = 'http://qr.scanalyzr.com/api/v1/public') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    };
  }

  async createQR({ name, destinationUrl, shortCode }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/qr`,
        { name, destinationUrl, shortCode },
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async listQRCodes(page = 1, limit = 10) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/qr?page=${page}&limit=${limit}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getQRCode(id) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/qr/${id}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateQRCode(id, updates) {
    try {
      const response = await axios.patch(
        `${this.baseUrl}/qr/${id}`,
        updates,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteQRCode(id) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/qr/${id}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAnalytics(id) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/qr/${id}/analytics`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      return new Error(`API Error (${status}): ${data.message || 'Unknown error'}`);
    }
    return error;
  }
}

// Usage
const client = new QRCodeClient('qr_live_your_api_key_here');

async function main() {
  // Create a basic QR code (minimal fields)
  const basicQR = await client.createQR({
    name: 'My Product',
    destinationUrl: 'https://example.com/product'
  });
  console.log('Created:', basicQR.data.qrCodeUrl);

  // Create an advanced QR code with customization
  const advancedQR = await client.createQR({
    name: 'VIP Campaign',
    destinationUrl: 'https://example.com/vip',
    shortCode: 'vip2024',
    password: 'secret123',
    expiresAt: '2026-12-31T23:59:59Z',
    scanLimit: 1000,
    customDesign: {
      backgroundColor: '#1E3A8A',
      foregroundColor: '#FBBF24',
      margin: 6,
      width: 800,
      dotsType: 'rounded',
      errorCorrectionLevel: 'H'
    }
  });
  console.log('Advanced QR Created:', advancedQR.data.qrCodeUrl);

  // Update QR code design
  const updated = await client.updateQRCode(basicQR.data.id, {
    customDesign: {
      backgroundColor: '#F0F0F0',
      foregroundColor: '#FF6B35'
    }
  });
  console.log('Updated:', updated.data.qrCodeUrl);

  // Get analytics
  const analytics = await client.getAnalytics(basicQR.data.id);
  console.log('Total Scans:', analytics.data.analytics.totalScans);
}

main();
```

---

### Python Example

```python
import requests
import json

class QRCodeClient:
    def __init__(self, api_key, base_url='http://qr.scanalyzr.com/api/v1/public'):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'X-API-Key': api_key,
            'Content-Type': 'application/json'
        }
    
    def create_qr(self, name, destination_url, short_code=None, password=None, 
                  expires_at=None, scan_limit=None, custom_design=None):
        """Create a new QR code"""
        payload = {
            'name': name,
            'destinationUrl': destination_url
        }
        if short_code:
            payload['shortCode'] = short_code
        if password:
            payload['password'] = password
        if expires_at:
            payload['expiresAt'] = expires_at
        if scan_limit:
            payload['scanLimit'] = scan_limit
        if custom_design:
            payload['customDesign'] = custom_design
        
        response = requests.post(
            f'{self.base_url}/qr',
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def list_qr_codes(self, page=1, limit=10):
        """List all QR codes"""
        response = requests.get(
            f'{self.base_url}/qr?page={page}&limit={limit}',
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_qr_code(self, qr_id):
        """Get a single QR code"""
        response = requests.get(
            f'{self.base_url}/qr/{qr_id}',
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def update_qr_code(self, qr_id, **updates):
        """Update a QR code"""
        response = requests.patch(
            f'{self.base_url}/qr/{qr_id}',
            headers=self.headers,
            json=updates
        )
        response.raise_for_status()
        return response.json()
    
    def delete_qr_code(self, qr_id):
        """Delete a QR code"""
        response = requests.delete(
            f'{self.base_url}/qr/{qr_id}',
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_analytics(self, qr_id):
        """Get QR code analytics"""
        response = requests.get(
            f'{self.base_url}/qr/{qr_id}/analytics',
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

# Usage
if __name__ == '__main__':
    client = QRCodeClient('qr_live_your_api_key_here')
    
    # Create a basic QR code
    qr = client.create_qr(
        name='Product Launch',
        destination_url='https://example.com/launch'
    )
    print(f"QR Code URL: {qr['data']['qrCodeUrl']}")
    
    # Create QR with customization and options
    custom_qr = client.create_qr(
        name='VIP Campaign',
        destination_url='https://example.com/vip',
        short_code='vip2024',
        password='secret123',
        expires_at='2026-12-31T23:59:59Z',
        scan_limit=1000,
        custom_design={
            'backgroundColor': '#1E3A8A',
            'foregroundColor': '#FBBF24',
            'margin': 6,
            'width': 800,
            'dotsType': 'rounded'
        }
    )
    print(f"Custom QR URL: {custom_qr['data']['qrCodeUrl']}")
    
    # Update QR design
    updated = client.update_qr_code(
        qr['data']['id'],
        customDesign={
            'backgroundColor': '#F0F0F0',
            'foregroundColor': '#FF6B35'
        }
    )
    
    # Get analytics
    analytics = client.get_analytics(qr['data']['id'])
    print(f"Total Scans: {analytics['data']['analytics']['totalScans']}")
```

---

### PHP Example

```php
<?php

class QRCodeClient {
    private $apiKey;
    private $baseUrl;
    
    public function __construct($apiKey, $baseUrl = 'http://qr.scanalyzr.com/api/v1/public') {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
    }
    
    private function makeRequest($method, $endpoint, $data = null) {
        $ch = curl_init();
        $url = $this->baseUrl . $endpoint;
        
        $headers = [
            'X-API-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ];
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } elseif ($method === 'PATCH') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode >= 400) {
            throw new Exception("API Error: " . $response);
        }
        
        return json_decode($response, true);
    }
    
    public function createQR($name, $destinationUrl, $shortCode = null) {
        $data = [
            'name' => $name,
            'destinationUrl' => $destinationUrl
        ];
        if ($shortCode) {
            $data['shortCode'] = $shortCode;
        }
        return $this->makeRequest('POST', '/qr', $data);
    }
    
    public function listQRCodes($page = 1, $limit = 10) {
        return $this->makeRequest('GET', "/qr?page=$page&limit=$limit");
    }
    
    public function getQRCode($id) {
        return $this->makeRequest('GET', "/qr/$id");
    }
    
    public function updateQRCode($id, $updates) {
        return $this->makeRequest('PATCH', "/qr/$id", $updates);
    }
    
    public function deleteQRCode($id) {
        return $this->makeRequest('DELETE', "/qr/$id");
    }
    
    public function getAnalytics($id) {
        return $this->makeRequest('GET', "/qr/$id/analytics");
    }
}

// Usage
$client = new QRCodeClient('qr_live_your_api_key_here');

$qrCode = $client->createQR(
    'Product Launch',
    'https://example.com/launch',
    'launch24'
);

echo "QR Code URL: " . $qrCode['data']['qrCodeUrl'] . "\n";
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Status Code | Meaning | Description |
|-------------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | QR code created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Invalid or missing API key |
| 403 | Forbidden | QR code limit reached or permission denied |
| 404 | Not Found | QR code not found |
| 409 | Conflict | Short code already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Error Response Format

```json
{
  "success": false,
  "message": "QR code limit reached (10). Please upgrade your plan.",
  "errorMessages": [
    {
      "path": "",
      "message": "QR code limit reached (10). Please upgrade your plan."
    }
  ],
  "stack": "Error: QR code limit reached..."
}
```

### Common Errors & Solutions

#### 1. Invalid API Key (401)

```json
{
  "success": false,
  "message": "Invalid API key"
}
```

**Solution**: Check that your API key is correct and starts with `qr_live_` or `qr_test_`.

#### 2. QR Code Limit Reached (403)

```json
{
  "success": false,
  "message": "QR code limit reached (10). Please upgrade your plan."
}
```

**Solution**: Upgrade your subscription plan or delete unused QR codes.

#### 3. Short Code Conflict (409)

```json
{
  "success": false,
  "message": "Short code already exists. Please provide a different one."
}
```

**Solution**: Use a different short code or omit the `shortCode` field to auto-generate one.

#### 4. QR Code Not Found (404)

```json
{
  "success": false,
  "message": "QR code not found"
}
```

**Solution**: Verify the QR code ID exists and belongs to your account.

---

## 📊 Rate Limits & Quotas

### Subscription Tiers

| Plan | QR Codes | API Requests/Hour | Scans/QR (Free) | Scans/QR (Basic) | Scans/QR (Pro+) |
|------|----------|-------------------|-----------------|------------------|-----------------|
| **Free** | 10 | 100 | 100 | - | - |
| **Basic** | 50 | 500 | - | 1,000 | - |
| **Pro** | 200 | 2,000 | - | - | Unlimited |
| **Business** | Unlimited | 10,000 | - | - | Unlimited |

### Rate Limit Headers

Every API response includes rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705492800
```

### Handling Rate Limits

```javascript
async function createQRWithRetry(client, data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.createQR(data);
    } catch (error) {
      if (error.response?.status === 429) {
        const resetTime = error.response.headers['x-ratelimit-reset'];
        const waitTime = (resetTime * 1000) - Date.now();
        
        console.log(`Rate limited. Waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

## ✅ Best Practices

### 1. Use Environment Variables

```javascript
// ❌ Bad
const apiKey = 'qr_live_abc123...';

// ✅ Good
const apiKey = process.env.QR_API_KEY;
```

### 2. Implement Proper Error Handling

```javascript
async function createQRSafely(data) {
  try {
    const result = await client.createQR(data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to create QR:', error.message);
    return { success: false, error: error.message };
  }
}
```

### 3. Use Custom Short Codes for Branding

```javascript
// ❌ Generic auto-generated
await client.createQR({
  name: 'Product Page',
  destinationUrl: 'https://example.com/product'
});
// Result: https://your-domain.com/q/a7b8c9d0

// ✅ Branded short code
await client.createQR({
  name: 'Product Page',
  destinationUrl: 'https://example.com/product',
  shortCode: 'product-2024'
});
// Result: https://your-domain.com/q/product-2024
```

### 4. Implement Caching

```javascript
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getQRCodeCached(id) {
  const cached = cache.get(id);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await client.getQRCode(id);
  cache.set(id, { data, timestamp: Date.now() });
  return data;
}
```

### 5. Batch Operations

```javascript
// ❌ Sequential (slow)
for (const item of items) {
  await client.createQR(item);
}

// ✅ Parallel (fast)
await Promise.all(
  items.map(item => client.createQR(item))
);
```

### 6. Monitor Your Usage

```javascript
async function monitorAPIUsage() {
  const qrCodes = await client.listQRCodes(1, 1);
  const totalQRs = qrCodes.meta.total;
  
  console.log(`Using ${totalQRs} of your QR code quota`);
  
  if (totalQRs > 0.9 * YOUR_PLAN_LIMIT) {
    console.warn('Approaching QR code limit!');
  }
}
```

---

## 🔧 Troubleshooting

### Issue: "Invalid API key" Error

**Symptoms**: 401 Unauthorized responses

**Solutions**:
1. Verify API key starts with `qr_live_` or `qr_test_`
2. Check for extra spaces or newlines in the key
3. Ensure the API key hasn't been deleted or revoked
4. Verify you're using the correct authentication header

### Issue: QR Code Images Not Loading

**Symptoms**: `qrCodeUrl` returns 404

**Solutions**:
1. Check if Cloudinary is configured correctly
2. Verify the QR code was created successfully (check `imageUrl` field)
3. Try regenerating the QR code by updating the destination URL
4. Contact support if the issue persists

### Issue: Scans Not Tracking

**Symptoms**: Analytics show 0 scans despite actual usage

**Solutions**:
1. Ensure QR code `isActive` is `true`
2. Check that users are scanning the correct short URL
3. Verify tracking method is set to 'IP' (default)
4. Check if QR code has reached its scan limit

### Issue: Rate Limit Exceeded

**Symptoms**: 429 Too Many Requests

**Solutions**:
1. Implement exponential backoff retry logic
2. Reduce request frequency
3. Consider upgrading your plan for higher limits
4. Cache frequently accessed data

---

## 📞 Support & Resources

### Need Help?

- **Documentation**: [https://docs.your-domain.com](https://docs.your-domain.com)
- **Email Support**: support@your-domain.com
- **Community Forum**: [https://community.your-domain.com](https://community.your-domain.com)

### Additional Resources

- [API Changelog](https://docs.your-domain.com/changelog)
- [Status Page](https://status.your-domain.com)
- [SDKs & Libraries](https://github.com/your-org/qr-sdks)
- [Postman Collection](https://www.postman.com/your-workspace)

---

## 📝 Quick Reference

### Minimal QR Code Creation

```javascript
{
  "name": "My QR",
  "destinationUrl": "https://example.com"
}
```

**Defaults Applied:**
- Type: DYNAMIC (editable)
- Design: Black on white, 500px, margin 4
- Tracking: IP-based
- Security: None
- Expiration: Never
- Scans: Unlimited

### All Optional Parameters

```javascript
{
  "name": "string",              // Required
  "destinationUrl": "string",    // Required (valid URL)
  "shortCode": "string",         // Optional: custom short code
  "password": "string",          // Optional: 4-50 chars
  "expiresAt": "ISO8601",        // Optional: future date
  "scanLimit": number,           // Optional: positive integer
  "customDesign": {              // Optional: all fields optional
    "backgroundColor": "#FFFFFF",
    "foregroundColor": "#000000",
    "margin": 4,
    "width": 500,
    "errorCorrectionLevel": "M",
    "dotsType": "square",
    "dotsColor": "#000000",
    "cornersSquareType": "square",
    "cornersSquareColor": "#000000",
    "cornersDotType": "square",
    "cornersDotColor": "#000000",
    "imageUrl": "string",
    "imageMargin": 0,
    "imageSize": 0.3
  }
}
```

### Common Use Cases

**Password-Protected QR:**
```json
{ "name": "Private", "destinationUrl": "...", "password": "secret" }
```

**Time-Limited Campaign:**
```json
{ "name": "Flash Sale", "destinationUrl": "...", "expiresAt": "2026-12-31T23:59:59Z" }
```

**Single-Use Ticket:**
```json
{ "name": "Ticket", "destinationUrl": "...", "scanLimit": 1 }
```

**Branded QR:**
```json
{
  "name": "Brand QR",
  "destinationUrl": "...",
  "customDesign": {
    "backgroundColor": "#1E3A8A",
    "foregroundColor": "#FBBF24"
  }
}
```

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.1 | 2026-01-18 | Added customization & security features documentation |
| 1.0.0 | 2026-01-17 | Initial API release |

---

## 📄 License & Terms

By using this API, you agree to our [Terms of Service](https://your-domain.com/terms) and [Privacy Policy](https://your-domain.com/privacy).

---

**Last Updated**: January 18, 2026  
**API Version**: 1.0.1
