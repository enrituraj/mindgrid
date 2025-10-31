import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DownloadPage from "./NewDownload.tsx"
import { Routes, Route,BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/download" element={<DownloadPage />} />
          </Routes>
        </BrowserRouter>
  </StrictMode>,
)
