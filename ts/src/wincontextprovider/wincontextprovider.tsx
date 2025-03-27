import React, { createContext, useState, ReactNode } from 'react';
interface WinContextType {
  win: boolean,
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const newWinContext = createContext<WinContextType | undefined>(undefined);

interface LoseContextProviderProps {
  children: ReactNode;
};

function WinContextProvider({ children }: LoseContextProviderProps) {
  const [win, setWin] = useState(false);

  return (
    <newWinContext.Provider value={{ win, setWin}}>
      {children}
    </newWinContext.Provider>
  );
}

export default WinContextProvider;