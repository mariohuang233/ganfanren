"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TabBar from "@/components/TabBar";
import RadarMap from "@/components/RadarMap";
import BlindBox from "@/components/BlindBox";
import Square from "@/components/Square";
import Profile from "@/components/Profile";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("radar");

  const renderContent = () => {
    switch (activeTab) {
      case "radar":
        return (
          <motion.div
            key="radar"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <RadarMap />
          </motion.div>
        );
      case "blindbox":
        return (
          <motion.div
            key="blindbox"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <BlindBox />
          </motion.div>
        );
      case "square":
        return (
          <motion.div
            key="square"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Square />
          </motion.div>
        );
      case "profile":
        return (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Profile />
          </motion.div>
        );
      default:
        return null;
    }
  };

  // 点击帮我选，直接跳转到盲盒页面
  const handleQuickDecision = () => {
    setActiveTab("blindbox");
  };

  // 仅在首页（雷达页面）显示帮我选按钮
  const showQuickDecision = activeTab === "radar";

  return (
    <main className="relative min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      
      {/* 帮我选按钮 - 仅在首页显示，样式更低调 */}
      <AnimatePresence>
        {showQuickDecision && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-0 right-0 z-40 flex justify-center pointer-events-none"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleQuickDecision}
              className="pointer-events-auto bg-white/90 backdrop-blur-sm text-neutral-600 px-4 py-2 rounded-full shadow-sm border border-neutral-200 flex items-center gap-1.5 text-sm"
            >
              <Sparkles size={14} className="text-primary-500" />
              <span>帮我选</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
