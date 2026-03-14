import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import FirstContact from "./pages/FirstContact"
import Home from "./pages/Home"
import AiWorkflows from "./pages/AiWorkflows"
import Architecture from "./pages/Architecture"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import Licensing from "./pages/Licensing"
import Documentation from "./pages/Documentation"
import VersionLogs from "./pages/VersionLogs"
import "./components/HomeStyles.css"
import "./components/MobileStyles.css"

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first-contact" element={<FirstContact />} />
        <Route path="/ai-workflows" element={<AiWorkflows />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/licensing" element={<Licensing />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/version-logs" element={<VersionLogs />} />
      </Routes>
    </BrowserRouter>
  )
}
