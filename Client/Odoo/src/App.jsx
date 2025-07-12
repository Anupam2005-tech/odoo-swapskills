import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RegisterForm from "./Components/Register";
import LoginForm from "./Components/Login";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import Dashboard from "./Components/Dashboard";
import SkillForm from "./Components/SkillForm";

// Wrapper for page transitions and scroll reset
const PageWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newswaps" element={<SkillForm />} />
        </Routes>
      </PageWrapper>

    </BrowserRouter>
  );
}
