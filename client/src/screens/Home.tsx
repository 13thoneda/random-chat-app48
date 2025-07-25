import { useCallback, useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { playSound } from "../lib/audio";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Crown,
  Coins,
  Mic,
  Video,
  Users,
  Sparkles,
  Heart,
  Zap,
  Shield,
  Star,
  Play,
  Globe,
  User,
  Gem,
  Settings,
  Bot,
} from "lucide-react";
// Problematic components temporarily removed
import { usePremium } from "../context/PremiumProvider";
import { useCoin } from "../context/CoinProvider";
import { useLanguage } from "../context/LanguageProvider";
// Additional problematic components removed

// Ad unit IDs for scrollable banner ads
const adUnitIds = [
  import.meta.env.VITE_ADMOB_BANNER_ID || 'ca-app-pub-1776596266948987/2770517385',
  'ca-app-pub-1776596266948987/7315217300',
  'ca-app-pub-1776596266948987/2468099206',
];

const testimonials = [
  {
    name: "Priya",
    text: "Found my perfect match here! So grateful 💕",
    rating: 5,
  },
  {
    name: "Arjun", 
    text: "Every chat is a new adventure, truly amazing!",
    rating: 5,
  },
  {
    name: "Sneha",
    text: "Safe, fun, and full of romantic possibilities 🌟",
    rating: 5,
  },
];

const stats = [
  { number: "10M+", label: "Happy Users", icon: Users },
  { number: "50M+", label: "Connections Made", icon: Heart },
  { number: "99.9%", label: "Uptime", icon: Shield },
];

export default function Home() {
  const { socket, isUsingMockMode } = useSocket();
  const navigate = useNavigate();
  const { isPremium, isUltraPremium, isProMonthly, premiumPlan } = usePremium();
  const { coins, claimDailyBonus, canClaimDailyBonus, currentUser, hasCompletedOnboarding } = useCoin();
  const { t } = useLanguage();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showTreasureChest, setShowTreasureChest] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(12847);

  // Cycle through banner ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adUnitIds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStartChat = useCallback(async (type: 'video' | 'voice' | 'text') => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      await playSound('swipe');
      navigate(`/${type === 'text' ? 'chat' : type === 'voice' ? 'voice' : 'video-chat'}`);
    } catch (error) {
      console.error(`Error starting ${type} chat:`, error);
    } finally {
      setTimeout(() => setIsConnecting(false), 1000);
    }
  }, [isConnecting, navigate]);

  const handleClaimBonus = async () => {
    if (canClaimDailyBonus()) {
      const success = await claimDailyBonus();
      if (success) {
        await playSound('match');
        setShowTreasureChest(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-25 via-cream-50 to-blush-50 pb-20">
      <Helmet>
        <title>AjnabiCam - Connect with Amazing People</title>
        <meta name="description" content="Find your perfect match with AjnabiCam's romantic video chat platform" />
      </Helmet>

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-peach-100">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💕</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-peach-600 to-coral-600 bg-clip-text text-transparent">
              AjnabiCam
            </h1>
            {isPremium && <span className="text-xs bg-gold-100 text-gold-800 px-2 py-1 rounded-full">PREMIUM</span>}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full">
              <Coins className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">{coins}</span>
            </div>
            <button onClick={() => navigate('/profile')} className="p-2 rounded-full bg-peach-100 hover:bg-peach-200 transition-colors">
              <User className="w-5 h-5 text-peach-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Daily Bonus */}
        {canClaimDailyBonus() && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Daily Bonus Available!</h3>
                <p className="text-sm opacity-90">Claim your free coins</p>
              </div>
              <button
                onClick={handleClaimBonus}
                className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Claim +50 <Coins className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Banner Ad Placeholder */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 text-center">
          <p className="text-gray-600 text-sm">Advertisement Space</p>
        </div>

        {/* Online Users Counter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-peach-100">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">
              <span className="font-bold text-green-600">{onlineUsers.toLocaleString()}</span> people online now
            </span>
          </div>
        </div>

        {/* Main Chat Buttons */}
        <div className="grid grid-cols-1 gap-4">
          {/* Video Chat */}
          <button
            onClick={() => handleStartChat('video')}
            disabled={isConnecting}
            className="bg-gradient-to-r from-peach-500 to-coral-500 hover:from-peach-600 hover:to-coral-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Video Chat</h3>
                  <p className="text-white/80 text-sm">Face-to-face conversations</p>
                </div>
              </div>
              <Play className="w-6 h-6" />
            </div>
          </button>

          {/* Voice Chat */}
          <button
            onClick={() => handleStartChat('voice')}
            disabled={isConnecting}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Voice Chat</h3>
                  <p className="text-white/80 text-sm">Voice-only conversations</p>
                </div>
              </div>
              <Play className="w-6 h-6" />
            </div>
          </button>

          {/* Text Chat */}
          <button
            onClick={() => handleStartChat('text')}
            disabled={isConnecting}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Text Chat</h3>
                  <p className="text-white/80 text-sm">Message and emoji fun</p>
                </div>
              </div>
              <Play className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Gender Filter Placeholder */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Connect with</h3>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-100 text-blue-800 py-2 px-4 rounded-xl text-sm font-medium">
              Everyone
            </button>
            <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-xl text-sm">
              Customize
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/friends')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Heart className="w-6 h-6 text-pink-500 mb-2" />
            <div className="text-sm font-medium text-gray-800">Friends</div>
          </button>
          
          <button
            onClick={() => navigate('/ai-chatbot')}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Bot className="w-6 h-6 text-blue-500 mb-2" />
            <div className="text-sm font-medium text-gray-800">AI Chat</div>
          </button>
        </div>

        {/* Rewarded Ad Placeholder */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 text-white text-center">
          <h3 className="font-bold mb-2">🎁 Watch & Earn</h3>
          <p className="text-sm opacity-90 mb-3">Watch a short video to earn coins</p>
          <button className="bg-white text-emerald-600 px-6 py-2 rounded-xl font-semibold">
            Earn +25 Coins
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <stat.icon className="w-6 h-6 text-peach-500 mx-auto mb-2" />
              <div className="font-bold text-lg text-gray-800">{stat.number}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg text-center mb-4 text-gray-800">What People Say</h3>
          <div className="text-center">
            <p className="text-gray-600 italic mb-3">"{testimonials[currentTestimonial].text}"</p>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="font-semibold text-peach-600">- {testimonials[currentTestimonial].name}</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <button className="flex flex-col items-center p-2 text-peach-600">
            <Heart className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Chat</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>

      {/* Treasure Chest Modal Placeholder */}
      {showTreasureChest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center m-4">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-2">Bonus Claimed!</h3>
            <p className="text-gray-600 mb-4">You earned 50 coins!</p>
            <button
              onClick={() => setShowTreasureChest(false)}
              className="bg-peach-500 text-white px-6 py-2 rounded-xl"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
