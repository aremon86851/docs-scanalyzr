"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ApiContextType {
  apiKey: string;
  baseUrl: string;
  setApiKey: (key: string) => void;
  setBaseUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState("");
  const [baseUrl, setBaseUrlState] = useState("https://qr.scanalyzr.com//api/v1");

  // Load from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("qr_api_key");
    const savedBaseUrl = localStorage.getItem("qr_base_url");
    
    if (savedApiKey) setApiKeyState(savedApiKey);
    if (savedBaseUrl) setBaseUrlState(savedBaseUrl);
  }, []);

  // Save to localStorage when changed
  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem("qr_api_key", key);
  };

  const setBaseUrl = (url: string) => {
    setBaseUrlState(url);
    localStorage.setItem("qr_base_url", url);
  };

  return (
    <ApiContext.Provider value={{ apiKey, baseUrl, setApiKey, setBaseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return context;
};
