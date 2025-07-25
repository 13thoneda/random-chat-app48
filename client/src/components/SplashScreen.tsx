import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    console.log("SplashScreen rendered");
    
    // Show splash for 2 seconds then complete
    const timer = setTimeout(() => {
      console.log("SplashScreen: hiding splash after timeout");
      setIsVisible(false);
      setTimeout(() => {
        console.log("SplashScreen: calling onComplete");
        onComplete();
      }, 300); // Smooth transition
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-peach-25 via-cream-50 to-blush-50">
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-peach-500 via-coral-500 to-blush-500 mb-4">
            AjnabiCam
          </h1>
          <p className="text-gray-600 text-lg">Finding your perfect match...</p>
        </div>

        {/* Loading animation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-3 h-3 bg-peach-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-coral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-blush-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        <p className="text-peach-600 font-medium">💕 Welcome to your romantic journey</p>
      </div>
    </div>
  );
}
