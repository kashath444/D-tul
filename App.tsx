import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import FirstContact from "./pages/FirstContact"
import Home from "./pages/Home"
import AiWorkflows from "./pages/AiWorkflows"
import Architecture from "./pages/Architecture"
import "./components/HomeStyles.css"
import "./components/MobileStyles.css"

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate reset
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/D-tul">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* DTUL/Product route removed as it was a dummy */}
        <Route path="/first-contact" element={<FirstContact />} />
        <Route path="/ai-workflows" element={<AiWorkflows />} />
        <Route path="/architecture" element={<Architecture />} />
      </Routes>
    </BrowserRouter>
  )
}
