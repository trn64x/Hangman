import { StrictMode,useContext } from 'react'
import { createRoot } from 'react-dom/client'
import Lose, { newLoseContext } from '../src/context/losecontextprovider.tsx';
import './index.css'
import App from './App.tsx'
import WinContextProvider from './wincontextprovider/wincontextprovider.tsx';

createRoot(document.getElementById('root')!).render(
  
<Lose>
  <WinContextProvider>
    <App />
    </WinContextProvider>
</Lose>

)
