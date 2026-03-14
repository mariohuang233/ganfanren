"use client";

import { MapPin, Gift, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "radar", label: "雷达", icon: MapPin },
  { id: "blindbox", label: "盲盒", icon: Gift },
  { id: "square", label: "广场", icon: MessageSquare },
  { id: "profile", label: "我的", icon: User },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 简洁背景 */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-neutral-100" />
      
      {/* 内容 */}
      <div className="relative max-w-md mx-auto px-4 py-2 pb-safe">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center gap-1 py-2 px-6"
              >
                {/* 图标 */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Icon
                    size={22}
                    className={`transition-all duration-200 ${
                      isActive 
                        ? "text-primary-500" 
                        : "text-neutral-300"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  
                  {/* 激活指示器 */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.div>
                
                {/* 标签文字 */}
                <span
                  className={`text-[10px] transition-colors duration-200 ${
                    isActive 
                      ? "text-primary-500 font-medium" 
                      : "text-neutral-300"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
