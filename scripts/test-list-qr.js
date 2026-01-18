const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";
const API_KEY = process.env.API_KEY;

async function testListQR() {
  console.log("🧪 Testing QR Code Listing...\n");

  try {
    const response = await axios.get(`${API_URL}/public/qr?limit=5`, {
      headers: {
        "X-API-Key": API_KEY,
      },
    });

    console.log("✅ SUCCESS!");
    console.log("Status:", response.status);
    console.log("\n📊 QR Codes Found:", response.data.meta.total);
    console.log("Page:", response.data.meta.page);
    console.log("Limit:", response.data.meta.limit);
    console.log("\n📋 QR Codes:");
    
    response.data.data.forEach((qr, index) => {
      console.log(`\n${index + 1}. ${qr.name}`);
      console.log(`   ID: ${qr.id}`);
      console.log(`   Type: ${qr.type}`);
      console.log(`   Short URL: ${qr.shortUrl}`);
      console.log(`   Scans: ${qr.scanCount}`);
      console.log(`   Active: ${qr.isActive ? "Yes" : "No"}`);
    });
  } catch (error) {
    console.error("❌ FAILED!");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Details:", error.response?.data);
  }
}

testListQR();
