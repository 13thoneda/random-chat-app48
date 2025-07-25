import React, { createContext, useContext, useState, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  premiumExpiry: Date | null;
  premiumPlan: string | null;
  loading: boolean;
  setPremium: (premium: boolean, expiry?: Date, plan?: string) => Promise<boolean>;
  checkPremiumStatus: () => boolean;
  syncPremiumStatus: () => Promise<void>;
  isUltraPremium: () => boolean;
  isProMonthly: () => boolean;
}

const PremiumContext = createContext<PremiumContextType | null>(null);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
};

interface PremiumProviderProps {
  children: ReactNode;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState<Date | null>(null);
  const [premiumPlan, setPremiumPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setPremium = async (premium: boolean, expiry?: Date, plan?: string): Promise<boolean> => {
    setIsPremium(premium);
    setPremiumExpiry(expiry || null);
    setPremiumPlan(plan || null);
    return true;
  };

  const checkPremiumStatus = (): boolean => {
    if (!isPremium || !premiumExpiry) return false;
    return new Date() < premiumExpiry;
  };

  const syncPremiumStatus = async (): Promise<void> => {
    // Simplified sync - will be implemented later
  };

  const isUltraPremium = (): boolean => {
    return isPremium && premiumPlan === 'ultra';
  };

  const isProMonthly = (): boolean => {
    return isPremium && premiumPlan === 'pro_monthly';
  };

  const value: PremiumContextType = {
    isPremium,
    premiumExpiry,
    premiumPlan,
    loading,
    setPremium,
    checkPremiumStatus,
    syncPremiumStatus,
    isUltraPremium,
    isProMonthly,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};
