import { useState, useCallback } from "react";
import { apiKeyService, ApiKey, CreateApiKeyPayload } from "@/services/apiKey.service";

export const useApiKeys = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const createApiKey = useCallback(async (data: CreateApiKeyPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiKeyService.create(data);
      setApiKeys((prev) => [result, ...prev]);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to create API key";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApiKeys = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiKeyService.getAll();
      setApiKeys(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch API keys";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const revokeApiKey = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiKeyService.revoke(id);
      setApiKeys((prev) => prev.filter((key) => key.id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to revoke API key";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    apiKeys,
    createApiKey,
    fetchApiKeys,
    revokeApiKey,
  };
};
