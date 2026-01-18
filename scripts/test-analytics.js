const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "http://qr.scanalyzr.com";
const API_KEY = process.env.API_KEY;

// Replace with an actual QR code ID from your system
const QR_CODE_ID = process.argv[2];

async function testAnalytics() {
  if (!QR_CODE_ID) {
    console.error("❌ Please provide a QR code ID as argument");
    console.log("Usage: node scripts/test-analytics.js <qr-code-id>");
    process.exit(1);
  }

  console.log("🧪 Testing QR Code Analytics...\n");
  console.log("QR Code ID:", QR_CODE_ID);

  try {
    const response = await axios.get(
      `${API_URL}/public/qr/${QR_CODE_ID}/analytics`,
      {
        headers: {
          "X-API-Key": API_KEY,
        },
      }
    );

    console.log("\n✅ SUCCESS!");
    console.log("Status:", response.status);
    console.log("\n📊 Analytics Data:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("\n❌ FAILED!");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Details:", error.response?.data);
  }
}

testAnalytics();
