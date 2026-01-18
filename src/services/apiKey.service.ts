import apiClient from "@/lib/api-client";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
}

export interface CreateApiKeyPayload {
  name: string;
  expiresAt?: string;
}

export const apiKeyService = {
  // Create API Key
  async create(data: CreateApiKeyPayload): Promise<ApiKey> {
    const response = await apiClient.post("/api-keys", data);
    return response.data.data;
  },

  // Get all API keys
  async getAll(): Promise<ApiKey[]> {
    const response = await apiClient.get("/api-keys");
    return response.data.data;
  },

  // Get single API key
  async getById(id: string): Promise<ApiKey> {
    const response = await apiClient.get(`/api-keys/${id}`);
    return response.data.data;
  },

  // Revoke API key
  async revoke(id: string): Promise<void> {
    await apiClient.delete(`/api-keys/${id}`);
  },

  // Update API key
  async update(id: string, data: Partial<CreateApiKeyPayload>): Promise<ApiKey> {
    const response = await apiClient.patch(`/api-keys/${id}`, data);
    return response.data.data;
  },
};
