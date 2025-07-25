import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// Analytics temporarily removed

import VideoChat from "./screens/VideoChat";
import SplashScreen from "./components/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import ReferToUnlock from "./screens/ReferToUnlock";
import ReferralCodeScreen from "./screens/ReferralCode";
import GenderSelect from "./screens/GenderSelect";
import ChatPage from "./screens/ChatPage";
import VoicePage from "./screens/VoicePage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import StorageDebugPage from "./screens/StorageDebugPage";
import FirebaseDebugPage from "./screens/FirebaseDebugPage";
import UserSetup from "./screens/UserSetup";
import PersonalChat from "./screens/PersonalChat";
import FriendsPage from "./screens/FriendsPage";
import AIChatbotPage from "./screens/AIChatbotPage";
import AdTestingPage from "./screens/AdTestingPage";
import PremiumPage from "./screens/PremiumPage";
import PrivacyPolicyPage from "./screens/PrivacyPolicyPage";
import TermsOfServicePage from "./screens/TermsOfServicePage";
import AdminPanelPage from "./screens/AdminPanelPage";
import SpinWheel from "./components/SpinWheel";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
// Complex components temporarily removed to fix React issues

import { useNavigate } from "react-router-dom";

// Firebase imports temporarily removed to fix React issues

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
    <AppStartupCheck>
      <UltraAppWrapper>
        <Suspense fallback={<LoadingScreen />}>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/user-setup" element={<UserSetup />} />
            <Route path="/premium-trial" element={<ReferToUnlock />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/gender-select" element={<GenderSelect />} />
            <Route path="/video-chat" element={<VideoChat />} />
            <Route path="/voice" element={<VoicePage />} />
            <Route path="/personal-chat" element={<PersonalChat />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/refer" element={<ReferToUnlock />} />
            <Route path="/referral-code" element={<ReferralCodeScreen />} />
            <Route path="/ai-chatbot" element={<AIChatbotPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/spin-wheel" element={<SpinWheel />} />
            <Route path="/storage-debug" element={<StorageDebugPage />} />
            <Route path="/firebase-debug" element={<FirebaseDebugPage />} />
            <Route path="/ad-testing" element={<AdTestingPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>

          <PWAInstallPrompt />
          <CookieConsent />
          <LegalFooter />
        </div>
        </Suspense>
      </UltraAppWrapper>
    </AppStartupCheck>
  );
}

export default App;
