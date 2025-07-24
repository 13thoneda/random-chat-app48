import React from "react";
import {
  Home as HomeIcon,
  MessageCircle,
  User,
  Users,
  Bot,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";

// Updated with modern dating app colors - Cache bust 2024-07-18

const iconSize = 18; // Base size for mobile, will be responsive

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.home"), icon: HomeIcon, path: "/" },
    {
      label: t("nav.chat"),
      icon: MessageCircle,
      path: "/chat",
    },
    { label: "AI Chat", icon: Bot, path: "/ai-chatbot" },
    {
      label: t("nav.friends"),
      icon: Users,
      path: "/friends",
    },
    {
      label: t("nav.profile"),
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav
      style={{
        background: "linear-gradient(to right, #fdf2f8, #fce7f3, #fff1f2)",
        borderTop: "3px solid #ec4899",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 15px 35px -12px rgba(236, 72, 153, 0.3)",
      }}
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md flex justify-around items-center h-16 sm:h-18 lg:h-20 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto"
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            className={`relative flex flex-col items-center justify-center flex-1 py-2 sm:py-3 px-2 focus:outline-none transition-all duration-300 transform ${
              isActive ? "scale-110 sm:scale-115" : "hover:scale-105"
            }`}
            onClick={() => navigate(item.path)}
          >
            {/* Active background glow */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-dating-pink-200/40 via-dating-rose-100/30 to-dating-pink-200/40 rounded-2xl blur-sm" />
            )}

            {/* Icon container with beautiful styling */}
            <div
              className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-dating-pink-200 via-dating-rose-200 to-dating-pink-200 shadow-lg shadow-dating-pink-200/40"
                  : "bg-gradient-to-br from-white/90 to-dating-pink-50/80 hover:from-dating-pink-100/90 hover:to-dating-rose-100/80"
              }`}
            >
              <IconComponent
                size={18}
                style={{
                  color: isActive ? "#ffffff" : "#ec4899",
                  filter: "drop-shadow(0 1px 2px rgba(236, 72, 153, 0.2))",
                }}
                className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors duration-300"
              />
            </div>

            {/* Label with beautiful styling */}
            <span
              style={{
                color: isActive ? "#be185d" : "#ec4899",
                textShadow: "0 1px 2px rgba(236, 72, 153, 0.2)",
              }}
              className="text-[10px] sm:text-xs lg:text-sm font-semibold leading-none mt-1 transition-colors duration-300"
            >
              {item.label}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <div className="absolute -top-1 right-1/2 transform translate-x-1/2 w-2 h-2 bg-gradient-to-r from-dating-pink-400 to-dating-rose-400 rounded-full shadow-sm animate-pulse" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
