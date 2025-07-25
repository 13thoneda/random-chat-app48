import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import SplashScreen from "./components/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomePage from "./screens/HomePage";

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-25 via-cream-50 to-blush-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-peach-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading AjnabiCam...</p>
      </div>
    </div>
  );
}


function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<OnboardingScreen />} />
      </Routes>
    </div>
  );
}

export default App;
