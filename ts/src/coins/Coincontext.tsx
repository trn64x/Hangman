import React, { useState, Children, createContext, ReactNode } from "react";
interface stateCoins{
    coins: number,
    setCoins: React.Dispatch<React.SetStateAction<number>>
}
interface CoinsChildren {
    children: ReactNode,
}
// eslint-disable-next-line react-refresh/only-export-components
export const coinContext = createContext< stateCoins | undefined>(undefined);
const Coin = ({children}: CoinsChildren) =>{
    const [coins, setCoins] = useState(0);
    return(
        <coinContext.Provider value={{coins,setCoins}}>
            {children}
        </coinContext.Provider>
    )
}
export default Coin;