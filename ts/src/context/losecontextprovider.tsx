import React, { createContext, useState, ReactNode } from 'react';

// Definicja typu dla kontekstu
type LoseContextType = {
  lose: boolean;
  setLose: React.Dispatch<React.SetStateAction<boolean>>;
};

// Tworzymy kontekst z domyślną wartością (która będzie musiała być zaktualizowana później)
export const newLoseContext = createContext<LoseContextType | undefined>(undefined);

type LoseContextProviderProps = {
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