import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, MessageCircle, User, Settings, Video, Mic } from "lucide-react";

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Heart,
      label: "Home",
      path: "/home",
      activeColor: "text-peach-600",
      inactiveColor: "text-gray-400"
    },
    {
      icon: Video,
      label: "Video",
      path: "/video-chat",
      activeColor: "text-coral-600",
      inactiveColor: "text-gray-400"
    },
    {
      icon: MessageCircle,
      label: "Chat",
      path: "/chat",
      activeColor: "text-purple-600",
      inactiveColor: "text-gray-400"
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
      activeColor: "text-blue-600",
      inactiveColor: "text-gray-400"
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === "/home" && (location.pathname === "/" || location.pathname === "/home"));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[60px] ${
                active ? item.activeColor : item.inactiveColor
              } hover:bg-gray-50 active:bg-gray-100`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {active && (
                <div className="w-4 h-0.5 bg-current rounded-full mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
