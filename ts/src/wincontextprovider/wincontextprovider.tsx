import React, { createContext, useState, ReactNode } from 'react';

type WinContextType = {
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
};
export const newWinContext = createContext<WinContextType | undefined>(undefined);

type LoseContextProviderProps = {
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