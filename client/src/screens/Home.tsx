import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageProvider";
import { Video, Mic, Users, Heart } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-25 via-cream-50 to-blush-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-peach-600 to-coral-600 mb-4">
            Welcome to AjnabiCam! 💕
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with amazing people around the world
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Video Chat */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-peach-500 to-coral-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Video Chat</h3>
              <p className="text-gray-600 mb-6">
                Start a random video chat with someone new
              </p>
              <Button 
                onClick={() => navigate('/video-chat')}
                className="w-full bg-gradient-to-r from-peach-500 to-coral-500 hover:from-peach-600 hover:to-coral-600 text-white font-semibold py-3 rounded-xl"
              >
                Start Video Chat
              </Button>
            </div>
          </div>

          {/* Voice Chat */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blush-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Voice Chat</h3>
              <p className="text-gray-600 mb-6">
                Have a voice conversation with new friends
              </p>
              <Button 
                onClick={() => navigate('/voice')}
                className="w-full bg-gradient-to-r from-blush-500 to-pink-500 hover:from-blush-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl"
              >
                Start Voice Chat
              </Button>
            </div>
          </div>

          {/* Text Chat */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Text Chat</h3>
              <p className="text-gray-600 mb-6">
                Chat with text messages and emojis
              </p>
              <Button 
                onClick={() => navigate('/chat')}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl"
              >
                Start Text Chat
              </Button>
            </div>
          </div>

          {/* Friends */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Friends</h3>
              <p className="text-gray-600 mb-6">
                Connect with your existing friends
              </p>
              <Button 
                onClick={() => navigate('/friends')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl"
              >
                View Friends
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-peach-600">10M+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-coral-600">50M+</div>
              <div className="text-gray-600">Connections</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blush-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
