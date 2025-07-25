import React, { createContext, useContext, useState, ReactNode } from "react";

interface Friend {
  id: string;
  username: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface FriendsContextType {
  friends: Friend[];
  isLoading: boolean;
  addFriend: (friendId: string) => Promise<boolean>;
  removeFriend: (friendId: string) => Promise<boolean>;
  getFriend: (friendId: string) => Friend | null;
}

const FriendsContext = createContext<FriendsContextType | null>(null);

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider");
  }
  return context;
};

interface FriendsProviderProps {
  children: ReactNode;
}

export const FriendsProvider: React.FC<FriendsProviderProps> = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addFriend = async (friendId: string): Promise<boolean> => {
    // Simplified friend addition
    const newFriend: Friend = {
      id: friendId,
      username: `User${friendId}`,
      isOnline: Math.random() > 0.5,
    };
    
    setFriends(prev => [...prev, newFriend]);
    return true;
  };

  const removeFriend = async (friendId: string): Promise<boolean> => {
    setFriends(prev => prev.filter(friend => friend.id !== friendId));
    return true;
  };

  const getFriend = (friendId: string): Friend | null => {
    return friends.find(friend => friend.id === friendId) || null;
  };

  const value: FriendsContextType = {
    friends,
    isLoading,
    addFriend,
    removeFriend,
    getFriend,
  };

  return (
    <FriendsContext.Provider value={value}>
      {children}
    </FriendsContext.Provider>
  );
};
