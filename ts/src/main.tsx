import { StrictMode,useContext } from 'react'
import { createRoot } from 'react-dom/client'
import Lose from '../src/context/losecontextprovider.tsx';
import './index.css'
import App from './App.tsx'
import WinContextProvider from './wincontextprovider/wincontextprovider.tsx';
import Coin from './coins/Coincontext.tsx';

createRoot(document.getElementById('root')!).render(
<Coin>
<Lose>
<WinContextProvider>
<App />
</WinContextProvider>
</Lose>
</Coin>

)
