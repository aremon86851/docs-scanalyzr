import { useState, useCallback } from "react";
import { qrService, QRCode, CreateQRPayload } from "@/services/qr.service";

export const useQRCodes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);

  const createQRCode = useCallback(async (data: CreateQRPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await qrService.create(data);
      setQrCodes((prev) => [result, ...prev]);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to create QR code";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQRCodes = useCallback(async (params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await qrService.getAll(params);
      setQrCodes(result.data);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch QR codes";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQRCode = useCallback(async (id: string, data: Partial<CreateQRPayload>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await qrService.update(id, data);
      setQrCodes((prev) =>
        prev.map((qr) => (qr.id === id ? result : qr))
      );
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update QR code";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteQRCode = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await qrService.delete(id);
      setQrCodes((prev) => prev.filter((qr) => qr.id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to delete QR code";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAnalytics = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await qrService.getAnalytics(id);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch analytics";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    qrCodes,
    createQRCode,
    fetchQRCodes,
    updateQRCode,
    deleteQRCode,
    getAnalytics,
  };
};
