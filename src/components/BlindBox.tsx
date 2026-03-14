"use client";

import { useState } from "react";
import { MapPin, Star, RefreshCw, ChevronRight, Zap, Flame, Gift, Sparkles, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { restaurants, budgetOptions, distanceOptions, blindBoxFilters, Restaurant } from "@/data/mock";

// 简化的神秘盒子 - 与整体风格融合
function MysteryBox({ isRolling, onClick }: { isRolling: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isRolling}
      className="relative w-32 h-32 cursor-pointer disabled:cursor-not-allowed"
      whileHover={{ scale: isRolling ? 1 : 1.05 }}
      whileTap={{ scale: isRolling ? 1 : 0.95 }}
    >
      {/* 外层光晕 - 更柔和 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400/30 to-orange-400/30 rounded-3xl blur-xl"
        animate={{
          scale: isRolling ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: isRolling ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isRolling ? 0.5 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 盒子主体 */}
      <motion.div
        className="w-full h-full relative"
        animate={isRolling ? {
          rotate: [0, 10, -10, 10, -10, 0],
          scale: [1, 1.05, 1, 1.05, 1],
        } : {
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={isRolling ? {
          duration: 0.5,
          repeat: 4,
        } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-white to-neutral-50 rounded-3xl flex flex-col items-center justify-center border border-neutral-200 shadow-xl">
          <Gift size={40} className="text-primary-500 mb-2" />
          <span className="text-neutral-400 text-xs">点击开启</span>
        </div>
        
        {/* 装饰性丝带 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full">
          <div className="w-full h-full bg-gradient-to-b from-primary-200/50 to-orange-200/50" />
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8">
          <div className="w-full h-full bg-gradient-to-r from-primary-200/50 to-orange-200/50" />
        </div>
      </motion.div>
    </motion.button>
  );
}

// 粒子效果 - 更柔和
function ParticleEffect({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: "50%",
            top: "40%",
            background: ["#f59e0b", "#ef4444", "#fbbf24", "#f97316"][i % 4],
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1,
            delay: Math.random() * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function BlindBox() {
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [result, setResult] = useState<Restaurant | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    if (navigator.vibrate) {
      navigator.vibrate([50, 100, 50, 100, 50]);
    }
    
    setTimeout(() => {
      let filtered = [...restaurants];
      
      if (selectedBudget !== null) {
        const budget = budgetOptions.find(b => b.value === selectedBudget);
        if (budget) {
          filtered = filtered.filter(r => {
            if (budget.max && r.avgPrice > budget.max) return false;
            if (budget.min && r.avgPrice < budget.min) return false;
            return true;
          });
        }
      }
      
      if (selectedDistance !== null) {
        const distance = distanceOptions.find(d => d.value === selectedDistance);
        if (distance) {
          filtered = filtered.filter(r => {
            const distNum = parseInt(r.distance);
            return distNum <= distance.max;
          });
        }
      }
      
      if (selectedFilters.length > 0) {
        filtered = filtered.filter(r => 
          selectedFilters.some(f => r.tags.includes(f))
        );
      }
      
      if (filtered.length > 0) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        setResult(filtered[randomIndex]);
      } else {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        setResult(restaurants[randomIndex]);
      }
      
      setIsRolling(false);
      setShowResult(true);
      
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 200]);
      }
    }, 2000);
  };

  const handleRetry = () => {
    setShowResult(false);
    setResult(null);
  };

  // 计算步行时间
  const walkTime = result ? Math.ceil(parseInt(result.distance) / 83) : 0;

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <ParticleEffect isActive={showResult && !isRolling} />

      <div className="relative h-full flex flex-col pb-20">
        {/* 标题 - 与首页风格一致 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-14 px-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Gift size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">吃什么盲盒</h1>
              <p className="text-sm text-neutral-500">让命运为你决定今天的美食</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col px-6"
            >
              {/* 神秘盒子 - 主视觉 */}
              <div className="flex-[2] flex items-center justify-center">
                <MysteryBox isRolling={isRolling} onClick={handleRoll} />
              </div>

              {/* 筛选区域 - 与整体风格融合 */}
              <div className="flex-1 flex flex-col justify-end pb-8 space-y-3">
                {/* 预算 & 距离 */}
                <motion.div 
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Zap size={14} className="text-orange-500" />
                      <span className="text-xs font-medium text-neutral-600">预算范围</span>
                    </div>
                    <div className="flex gap-2">
                      {budgetOptions.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => setSelectedBudget(option.value)}
                          className={`flex-1 py-2 px-1 rounded-xl text-xs font-medium transition-all ${
                            selectedBudget === option.value
                              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          }`}
                        >
                          {option.label.replace("元以内", "").replace("元以上", "+").replace("元", "")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={14} className="text-green-500" />
                      <span className="text-xs font-medium text-neutral-600">距离范围</span>
                    </div>
                    <div className="flex gap-2">
                      {distanceOptions.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => setSelectedDistance(option.value)}
                          className={`flex-1 py-2 px-1 rounded-xl text-xs font-medium transition-all ${
                            selectedDistance === option.value
                              ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          }`}
                        >
                          {option.label.replace("500米", "500m").replace("1公里", "1km").replace("全校范围", "全校")}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 特殊需求 */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <Flame size={14} className="text-red-500" />
                    <span className="text-xs font-medium text-neutral-600">特殊需求</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blindBoxFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          selectedFilters.includes(filter)
                            ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* 说明文字 */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-neutral-400 text-xs pt-2"
                >
                  点击上方盲盒，让命运为你选择
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col px-6 pb-8"
            >
              {/* 结果展示 - 与首页卡片风格一致 */}
              <div className="flex-1 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="w-full bg-white rounded-3xl overflow-hidden shadow-lg border border-neutral-100"
                >
                  {/* 图片区域 */}
                  <div className="relative h-44">
                    <img
                      src={result?.image}
                      alt={result?.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full"
                    >
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <Sparkles size={12} />
                        今日推荐
                      </span>
                    </motion.div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-3 mb-2"
                      >
                        <span className="text-4xl">{result?.icon}</span>
                        <h2 className="text-2xl font-bold text-white">{result?.name}</h2>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4 text-sm text-white/90"
                      >
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {result?.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Navigation size={14} />
                          {walkTime}分钟
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          {result?.rating}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 mb-3"
                    >
                      <span className="text-lg font-bold text-neutral-900">¥{result?.avgPrice}</span>
                      <span className="text-neutral-400">/人</span>
                      <span className="mx-2 text-neutral-300">·</span>
                      <span className="text-green-600 text-sm font-medium">{result?.redListPercent}%好评</span>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-neutral-600 text-sm leading-relaxed mb-4 bg-neutral-50 p-3 rounded-xl"
                    >
                      "{result?.description}"
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap gap-2"
                    >
                      {result?.tags.map((tag, idx) => (
                        <motion.span
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 + idx * 0.05 }}
                          className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-xs rounded-lg"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-4 mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRetry}
                  className="py-4 bg-white text-neutral-700 font-semibold rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  换一个
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-4 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
                >
                  去这里
                  <ChevronRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
