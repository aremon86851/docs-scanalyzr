"use client";

import React, { useState } from "react";
import axios from "axios";
import { useApi } from "@/context/ApiContext";

export const ApiKeyTester: React.FC = () => {
  const { apiKey, baseUrl, setApiKey, setBaseUrl } = useApi();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrl);

  const testAndSaveApiKey = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      const response = await axios.get(`${tempBaseUrl}/public/qr`, {
        headers: {
          "X-API-Key": tempApiKey,
        },
      });

      setTestResult({
        status: "success",
        message: "✅ API Key is valid!",
        data: response.data,
      });

      // Save the API key and base URL
      setApiKey(tempApiKey);
      setBaseUrl(tempBaseUrl);
    } catch (err: any) {
      setTestResult({
        status: "error",
        message: "❌ API Key test failed",
        error: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">🔑 API Key Configuration</h2>
        <p className="text-gray-600 mt-2">
          Set your API key here to use it across all tabs (Create, List, etc.)
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>How it works:</strong> Test your API key here, and once validated, it will be
          automatically used in the Create and List tabs.
        </p>
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">
            API Base URL
          </label>
          <input
            type="text"
            value={tempBaseUrl}
            onChange={(e) => setTempBaseUrl(e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="http://qr.scanalyzr.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">
            API Key *
          </label>
          <input
            type="text"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            className="w-full p-3 border rounded font-mono text-sm"
            placeholder="qr_live_..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Get your API key from your dashboard or backend
          </p>
        </div>

        <button
          onClick={testAndSaveApiKey}
          disabled={loading || !tempApiKey}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? "Testing..." : "🧪 Test & Save API Key"}
        </button>
      </div>

      {testResult && (
        <div
          className={`border rounded-lg p-6 ${
            testResult.status === "success"
              ? "bg-green-50 border-green-300"
              : "bg-red-50 border-red-300"
          }`}
        >
          <h3
            className={`font-bold text-lg mb-3 ${
              testResult.status === "success" ? "text-green-900" : "text-red-900"
            }`}
          >
            {testResult.message}
          </h3>

          {testResult.status === "success" && (
            <div className="space-y-2">
              <p className="text-green-800">
                Your API key has been saved and will be used automatically in:
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-1">
                <li>✅ Create QR Code tab</li>
                <li>✅ List QR Codes tab</li>
              </ul>
              <div className="mt-4 bg-white rounded p-3">
                <p className="text-sm font-medium text-gray-900 mb-2">Response Preview:</p>
                <pre className="text-xs overflow-auto max-h-48 text-gray-700">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {testResult.status === "error" && (
            <div className="space-y-2">
              <p className="text-red-800 mb-2">
                <strong>Error:</strong> {testResult.error}
              </p>
              <p className="text-sm text-red-700">
                Please check:
              </p>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                <li>Is your API key correct?</li>
                <li>Is the base URL correct?</li>
                <li>Is your backend server running?</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {apiKey && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">📋 Current Configuration</h4>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700">
              <strong>Base URL:</strong> <code className="bg-white px-2 py-1 rounded">{baseUrl}</code>
            </p>
            <p className="text-gray-700">
              <strong>API Key:</strong>{" "}
              <code className="bg-white px-2 py-1 rounded">
                {apiKey.substring(0, 15)}...
              </code>
            </p>
            <p className="text-green-700 text-xs mt-2">
              ✅ Ready to use in Create and List tabs
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
