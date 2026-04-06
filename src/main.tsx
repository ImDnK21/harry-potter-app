import 'normalize.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Home } from './home/Home'
import { Header } from './shared/header/Header'
import { Footer } from './shared/footer/Footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Home />
    <Footer />
  </StrictMode>
)
