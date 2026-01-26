const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "https://qr.scanalyzr.com/api/v1";
const API_KEY = process.env.API_KEY;

async function testCreateQR() {
  console.log("🧪 Testing QR Code Creation...\n");

  try {
    const response = await axios.post(
      `${API_URL}/public/qr`,
      {
        name: "Test QR Code",
        destinationUrl: "https://example.com",
        shortCode: "test-qr-" + Date.now(),
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
    console.log("  Short Code:", response.data.data.shortCode);
    console.log("  Short URL:", response.data.data.shortUrl);
    console.log("  Destination:", response.data.data.destinationUrl);
    console.log("  QR Image:", response.data.data.qrCodeUrl);
  } catch (error) {
    console.error("❌ FAILED!");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Details:", error.response?.data);
  }
}

testCreateQR();
