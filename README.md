# QR Code API - Testing Repository

A comprehensive testing environment for the QR Code Generator API, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.local` file and update with your API credentials:

```env
API_URL=https://qr.scanalyzr.com/
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit [https://qr.scanalyzr.com/](https://qr.scanalyzr.com/)

## 📁 Project Structure

```
qr-api-testing/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Main dashboard
│   │   ├── qr-test/          # QR code testing page
│   │   └── api-test/         # API key testing page
│   │
│   ├── components/            # React components
│   │   ├── QRCodeGenerator.tsx
│   │   ├── QRCodeList.tsx
│   │   └── ApiKeyTester.tsx
│   │
│   ├── lib/                   # Core utilities
│   │   └── api-client.ts     # Axios configuration
│   │
│   ├── services/              # API service layer
│   │   ├── qr.service.ts
│   │   └── apiKey.service.ts
│   │
│   ├── hooks/                 # React hooks
│   │   ├── useQRCodes.ts
│   │   └── useApiKeys.ts
│   │
│   └── tests/                 # Jest tests
│       ├── qr.test.ts
│       └── apiKey.test.ts
│
├── scripts/                   # CLI testing scripts
│   ├── test-create-qr.js
│   ├── test-list-qr.js
│   ├── test-analytics.js
│   ├── test-update-qr.js
│   └── test-delete-qr.js
│
├── .env.local                 # Environment variables
├── package.json
└── README.md
```

## 🧪 Testing Options

### Option 1: Web Dashboard (Recommended)

Run the Next.js development server:

```bash
npm run dev
```

Features:
- ✅ Create QR codes with live preview
- ✅ Support for 19 different QR code types
- ✅ List and manage all QR codes
- ✅ Test API key authentication
- ✅ Interactive QR Type Guide with examples
- ✅ **📚 Full API Documentation Page** - Beautiful docs-style interface
- ✅ Interactive UI with real-time feedback

### Option 2: CLI Scripts

Test individual endpoints from the command line:

**Create QR Code:**
```bash
npm run test:cli
# or
node scripts/test-create-qr.js
```

**List QR Codes:**
```bash
npm run test:list
# or
node scripts/test-list-qr.js
```

**Get Analytics:**
```bash
npm run test:analytics
# or
node scripts/test-analytics.js <qr-code-id>
```

**Update QR Code:**
```bash
node scripts/test-update-qr.js <qr-code-id>
```

**Delete QR Code:**
```bash
node scripts/test-delete-qr.js <qr-code-id>
```

### Option 3: Unit Tests

Run Jest tests:

```bash
npm test
# or watch mode
npm run test:watch
```

### Option 4: cURL Commands

Direct API testing:

```bash
# Create QR Code
curl -X POST https://qr.scanalyzr.com//public/qr \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test QR",
    "url": "https://example.com",
    "type": "URL"
  }'

# List QR Codes
curl -X GET "https://qr.scanalyzr.com//public/qr?limit=5" \
  -H "X-API-Key: your_api_key"

# Get QR Code
curl -X GET https://qr.scanalyzr.com//public/qr/{id} \
  -H "X-API-Key: your_api_key"

# Update QR Code
curl -X PATCH https://qr.scanalyzr.com//public/qr/{id} \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'

# Delete QR Code
curl -X DELETE https://qr.scanalyzr.com//public/qr/{id} \
  -H "X-API-Key: your_api_key"

# Get Analytics
curl -X GET https://qr.scanalyzr.com//public/qr/{id}/analytics \
  -H "X-API-Key: your_api_key"
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cli` | Test QR creation via CLI |
| `npm run test:list` | Test QR listing via CLI |
| `npm run test:analytics` | Test analytics via CLI |

## 📝 Testing Scenarios

### Test Case 1: Create QR Code ✅

**Expected Result:**
- Status: 201 Created
- Response includes: `id`, `shortUrl`, `qrCodeUrl`, `destinationUrl`

### Test Case 2: List QR Codes ✅

**Expected Result:**
- Status: 200 OK
- Response includes: `data` array and `meta` pagination info

### Test Case 3: Get Single QR Code ✅

**Expected Result:**
- Status: 200 OK
- Response includes full QR code details

### Test Case 4: Update QR Code ✅

**Expected Result:**
- Status: 200 OK
- Response includes updated QR code data

### Test Case 5: Delete QR Code ✅

**Expected Result:**
- Status: 204 No Content or 200 OK

### Test Case 6: Get Analytics ✅

**Expected Result:**
- Status: 200 OK
- Response includes scan count and analytics data

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Testing:** Jest + React Testing Library
- **UI Components:** React + Lucide Icons

## 🔑 API Key Setup

1. Generate an API key from your main QR Code dashboard
2. Copy the key (format: `qr_live_...` or `qr_test_...`)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_API_KEY=qr_live_your_key_here
   ```
4. Restart the dev server

## 🐛 Troubleshooting

### Issue: API Key Not Working

**Solution:**
- Verify API key is active in dashboard
- Check header format: `X-API-Key: qr_live_...`
- Ensure no extra spaces in `.env.local`

### Issue: CORS Errors

**Solution:**
- Backend must allow your test domain
- Add to `FRONTEND_URL` in backend `.env`

### Issue: 404 Errors

**Solution:**
- Verify base URL is correct
- Ensure backend is running
- Check API endpoints match documentation

### Issue: Environment Variables Not Loading

**Solution:**
- Restart the dev server after changing `.env.local`
- Verify file is named exactly `.env.local`
- Check that variables start with `NEXT_PUBLIC_`

## 📚 Documentation

For complete API documentation, refer to:
- `TESTING_REPOSITORY_GUIDE.md` - Full testing guide
- API Documentation (from main project)

## ✅ Pre-Testing Checklist

Before running tests, ensure:

- ✅ API key is generated from main dashboard
- ✅ API key is stored in `.env.local`
- ✅ Backend server is running
- ✅ CORS is configured for your test domain
- ✅ Dependencies are installed (`npm install`)
- ✅ Environment variables are loaded

## 🎯 Testing Workflow

1. **Generate API Key** - From main dashboard
2. **Configure Environment** - Update `.env.local`
3. **Start Dev Server** - `npm run dev`
4. **Read the Docs** - Visit https://qr.scanalyzr.com//docs for complete API documentation
5. **Explore QR Types** - Check the "QR Types Guide" tab
6. **Test in Browser** - Visit https://qr.scanalyzr.com/
7. **Create Test QR Code** - Use the web dashboard (try different types!)
8. **Verify Results** - Check console logs
9. **Test All Endpoints** - Use different tabs
10. **Run CLI Tests** - Optional automated testing
11. **Run Unit Tests** - `npm test`

## 📚 Documentation Pages

The testing repository includes multiple documentation resources:

### 1. **Interactive API Docs** (`/docs`)
A beautiful, comprehensive documentation page with:
- 📖 Complete API reference for all endpoints
- 🔐 Authentication methods and examples
- 🚀 Quick start guide
- 📊 Rate limits and error handling
- ✨ Code examples in multiple languages
- 🎨 Clean, organized sidebar navigation

**Access at**: https://qr.scanalyzr.com//docs

### 2. **QR Types Guide** (Dashboard Tab)
Interactive guide showcasing all 19 QR code types with:
- Visual cards with icons and descriptions
- Use cases for each type
- Example data formats
- API support status badges

**Access at**: Main dashboard → "📚 QR Types Guide" tab

## 📋 Supported QR Code Types

The testing repository now supports **19 different QR code types**:

### ✅ Fully Supported (API Ready)
- **URL** - Website links (recommended for API testing)

### 🔜 Coming Soon to API
- **WiFi** - Network credentials
- **Email** - Pre-filled emails
- **Phone** - Phone calls
- **SMS** - Text messages
- **WhatsApp** - WhatsApp chats
- **Location** - GPS coordinates
- **Social Media** - Profile links

### 📱 Dashboard Only (Advanced Types)
- **Contact (vCard)** - Complete contact cards
- **Event** - Calendar events
- **MECARD** - Simple contact cards
- **PDF** - Document links
- **Video** - Media links
- **Audio** - Podcast/music links
- **Google Review** - Review pages
- **Coupon** - Discount codes
- **Feedback** - Survey forms
- **Business Page** - Company profiles

> 💡 **Note**: Use the "QR Types Guide" tab in the dashboard to explore all types with examples and use cases.

## 📊 Expected Response Format

### Create QR Code Response

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Test QR Code",
    "shortUrl": "https://qr.app/abc123",
    "qrCodeUrl": "https://api.qr.app/qr/abc123.png",
    "destinationUrl": "https://example.com",
    "type": "URL",
    "scanCount": 0,
    "isActive": true,
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

### List QR Codes Response

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
```

## 🤝 Support

- **Documentation:** See `TESTING_REPOSITORY_GUIDE.md`
- **Issues:** Report on GitHub
- **API Support:** api-support@yourapp.com

## 📄 License

MIT License - See main project for details

---

**Last Updated:** January 15, 2026

Made with ❤️ for testing the QR Code Generator API
