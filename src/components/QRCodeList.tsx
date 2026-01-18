"use client";

import React, { useState, useEffect } from "react";
import { QRCode } from "@/services/qr.service";
import { useApi } from "@/context/ApiContext";
import axios from "axios";

export const QRCodeList: React.FC = () => {
  const { apiKey, baseUrl } = useApi();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchQRCodes = async () => {
    if (!apiKey) {
      setError("Please set your API key in the 'Test API Key' tab first");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/public/qr?page=${page}&limit=${limit}`, {
        headers: {
          "X-API-Key": apiKey,
        },
      });
      setQrCodes(response.data.data);
      setTotal(response.data.meta.total);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch QR codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;

    try {
      await axios.delete(`${baseUrl}/public/qr/${id}`, {
        headers: {
          "X-API-Key": apiKey,
        },
      });
      setQrCodes((prev) => prev.filter((qr) => qr.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete QR code");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">QR Codes List</h2>
        <button
          onClick={fetchQRCodes}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading QR codes...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {!loading && !error && qrCodes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No QR codes found. Create one to get started!
        </div>
      )}

      {!loading && qrCodes.length > 0 && (
        <div className="space-y-4">
          {qrCodes.map((qr) => (
            <div
              key={qr.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{qr.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Type:</strong> {qr.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Short URL:</strong>{" "}
                    <a
                      href={qr.shortUrl}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {qr.shortUrl}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Destination:</strong> {qr.destinationUrl}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Scans:</strong> {qr.scanCount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        qr.isActive ? "text-green-600" : "text-red-600"
                      }
                    >
                      {qr.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={qr.qrCodeUrl}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(qr.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {total > limit && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / limit)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
