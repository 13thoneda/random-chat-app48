import React, { createContext, useContext, useState, ReactNode } from "react";

interface ISocketContext {
  socket: any;
  setSocket: (socket: any) => void;
  mockMatching: any;
  isUsingMockMode: boolean;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isUsingMockMode] = useState(true);
  const mockMatching = {
    findMatch: () => Promise.resolve(),
    disconnect: () => {},
  };

  const value: ISocketContext = {
    socket,
    setSocket,
    mockMatching,
    isUsingMockMode,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
