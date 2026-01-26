const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "https://qr.scanalyzr.com/api/v1";
const API_KEY = process.env.API_KEY;

const QR_CODE_ID = process.argv[2];

async function testUpdate() {
  if (!QR_CODE_ID) {
    console.error("❌ Please provide a QR code ID as argument");
    console.log("Usage: node scripts/test-update-qr.js <qr-code-id>");
    process.exit(1);
  }

  console.log("🧪 Testing QR Code Update...\n");
  console.log("QR Code ID:", QR_CODE_ID);

  try {
    const response = await axios.patch(
      `${API_URL}/public/qr/${QR_CODE_ID}`,
      {
        name: "Updated Test QR Code",
        destinationUrl: "https://updated-example.com",
      },
      {
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("\n✅ SUCCESS!");
    console.log("Status:", response.status);
    console.log("\n📊 Updated QR Code:");
    console.log("  Name:", response.data.data.name);
    console.log("  URL:", response.data.data.destinationUrl);
    console.log("  Short URL:", response.data.data.shortUrl);
  } catch (error) {
    console.error("\n❌ FAILED!");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Details:", error.response?.data);
  }
}

testUpdate();
