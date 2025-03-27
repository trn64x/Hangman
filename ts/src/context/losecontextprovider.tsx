import React, { createContext, useState, ReactNode } from 'react';

interface LoseContextType {
  lose: boolean;
  setLose: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const newLoseContext = createContext<LoseContextType | undefined>(undefined);

interface LoseContextProviderProps {
  children: ReactNode;
};

function LoseContextProvider({ children }: LoseContextProviderProps) {
  const [lose, setLose] = useState(false);

  return (
    <newLoseContext.Provider value={{ lose, setLose }}>
      {children}
    </newLoseContext.Provider>
  );
}

export default LoseContextProvider;