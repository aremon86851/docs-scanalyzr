import apiClient from "@/lib/api-client";

export interface QRCode {
  id: string;
  name: string;
  shortCode: string;
  shortUrl: string;
  qrCodeUrl: string;
  destinationUrl: string;
  type: string;
  scanCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type QRCodeType = 
  | "URL" 
  | "WIFI" 
  | "CONTACT" 
  | "EMAIL" 
  | "PHONE" 
  | "SMS" 
  | "LOCATION" 
  | "EVENT" 
  | "MECARD" 
  | "WHATSAPP" 
  | "PDF" 
  | "VIDEO" 
  | "AUDIO" 
  | "SOCIAL_MEDIA" 
  | "GOOGLE_REVIEW" 
  | "COUPON" 
  | "FEEDBACK" 
  | "BUSINESS_PAGE" 
  | "TEXT";

export interface CreateQRPayload {
  name: string;
  destinationUrl?: string;
  shortCode?: string;
  type?: QRCodeType;
  qrData?: any; // Flexible object for type-specific data
  customization?: {
    fgColor?: string;
    bgColor?: string;
    logo?: string;
    size?: number;
  };
}

export const qrService = {
  // Create QR Code
  async create(data: CreateQRPayload): Promise<QRCode> {
    const response = await apiClient.post("/public/qr", data);
    return response.data.data;
  },

  // Get all QR codes
  async getAll(params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<{
    data: QRCode[];
    meta: { page: number; limit: number; total: number };
  }> {
    const response = await apiClient.get("/public/qr", { params });
    return response.data;
  },

  // Get single QR code
  async getById(id: string): Promise<QRCode> {
    const response = await apiClient.get(`/public/qr/${id}`);
    return response.data.data;
  },

  // Update QR code
  async update(id: string, data: Partial<CreateQRPayload>): Promise<QRCode> {
    const response = await apiClient.patch(`/public/qr/${id}`, data);
    return response.data.data;
  },

  // Delete QR code
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/public/qr/${id}`);
  },

  // Get analytics
  async getAnalytics(id: string): Promise<any> {
    const response = await apiClient.get(`/public/qr/${id}/analytics`);
    return response.data.data;
  },
};
