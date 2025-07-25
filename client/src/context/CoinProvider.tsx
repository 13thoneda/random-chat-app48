import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  uid: string;
  email?: string;
  displayName?: string;
}

interface CoinContextType {
  coins: number;
  isLoading: boolean;
  currentUser: User | null;
  hasCompletedOnboarding: boolean;
  claimDailyBonus: () => Promise<boolean>;
  canClaimDailyBonus: () => boolean;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
}

const CoinContext = createContext<CoinContextType | null>(null);

export const useCoin = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("useCoin must be used within a CoinProvider");
  }
  return context;
};

interface CoinProviderProps {
  children: ReactNode;
}

export const CoinProvider: React.FC<CoinProviderProps> = ({ children }) => {
  const [coins, setCoins] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [lastDailyBonus, setLastDailyBonus] = useState<Date | null>(null);

  const claimDailyBonus = async (): Promise<boolean> => {
    if (!canClaimDailyBonus()) return false;
    
    setCoins(prev => prev + 50);
    setLastDailyBonus(new Date());
    return true;
  };

  const canClaimDailyBonus = (): boolean => {
    if (!lastDailyBonus) return true;
    
    const now = new Date();
    const diff = now.getTime() - lastDailyBonus.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    return hours >= 24;
  };

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount: number): boolean => {
    if (coins < amount) return false;
    setCoins(prev => prev - amount);
    return true;
  };

  const value: CoinContextType = {
    coins,
    isLoading,
    currentUser,
    hasCompletedOnboarding,
    claimDailyBonus,
    canClaimDailyBonus,
    addCoins,
    spendCoins,
  };

  return (
    <CoinContext.Provider value={value}>
      {children}
    </CoinContext.Provider>
  );
};
