const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";
const API_KEY = process.env.API_KEY;

const QR_CODE_ID = process.argv[2];

async function testDelete() {
  if (!QR_CODE_ID) {
    console.error("❌ Please provide a QR code ID as argument");
    console.log("Usage: node scripts/test-delete-qr.js <qr-code-id>");
    process.exit(1);
  }

  console.log("🧪 Testing QR Code Deletion...\n");
  console.log("QR Code ID:", QR_CODE_ID);
  console.log("⚠️  This will permanently delete the QR code!");

  try {
    const response = await axios.delete(
      `${API_URL}/public/qr/${QR_CODE_ID}`,
      {
        headers: {
          "X-API-Key": API_KEY,
        },
      }
    );

    console.log("\n✅ SUCCESS!");
    console.log("Status:", response.status);
    console.log("QR Code deleted successfully");
  } catch (error) {
    console.error("\n❌ FAILED!");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Details:", error.response?.data);
  }
}

testDelete();
