"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, RefreshCw, MapPin, Clock, Utensils, Wallet, Users } from "lucide-react";
import { restaurants, Restaurant } from "@/data/mock";

interface QuickDecisionProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export default function QuickDecision({ onSelectRestaurant }: QuickDecisionProps) {
  const [show, setShow] = useState(false);
  const [recommendation, setRecommendation] = useState<Restaurant | null>(null);
  const [context, setContext] = useState({
    timeScene: "",
    budget: "all",
    people: 1,
  });

  // 根据时间自动判断场景
  useEffect(() => {
    const hour = new Date().getHours();
    let timeScene = "";
    let icon = "";
    
    if (hour < 10) {
      timeScene = "早餐";
      icon = "🌅";
    } else if (hour < 14) {
      timeScene = "午餐";
      icon = "☀️";
    } else if (hour < 17) {
      timeScene = "下午茶";
      icon = "🍵";
    } else if (hour < 21) {
      timeScene = "晚餐";
      icon = "🌆";
    } else {
      timeScene = "夜宵";
      icon = "🌙";
    }
    
    setContext(prev => ({ ...prev, timeScene }));
  }, []);

  // 智能推荐算法
  const getSmartRecommendation = () => {
    const hour = new Date().getHours();
    let filtered = [...restaurants];

    // 时间场景筛选
    if (hour < 10) {
      // 早餐：出餐快、清淡
      filtered = filtered.filter(r => 
        r.tags.includes("出餐快") || r.tags.includes("清淡") || r.avgPrice <= 15
      );
    } else if (hour > 21) {
      // 夜宵：深夜食堂
      filtered = filtered.filter(r => 
        r.tags.includes("深夜食堂") || r.tags.includes("穷鬼套餐")
      );
    }

    // 预算筛选
    if (context.budget === "low") {
      filtered = filtered.filter(r => r.avgPrice <= 20);
    } else if (context.budget === "medium") {
      filtered = filtered.filter(r => r.avgPrice <= 35);
    }

    // 人数筛选
    if (context.people >= 3) {
      filtered = filtered.filter(r => r.tags.includes("适合多人"));
    }

    // 如果筛选后没有结果，使用全部
    if (filtered.length === 0) {
      filtered = restaurants;
    }

    // 按红榜百分比排序，优先推荐好评高的
    filtered.sort((a, b) => b.redListPercent - a.redListPercent);
    
    // 前5名中随机选择，增加多样性
    const top5 = filtered.slice(0, 5);
    const random = top5[Math.floor(Math.random() * top5.length)];
    
    setRecommendation(random);
  };

  // 打开时立即推荐
  const handleOpen = () => {
    setShow(true);
    getSmartRecommendation();
  };

  // 选择这家餐厅
  const handleSelect = () => {
    if (recommendation) {
      onSelectRestaurant(recommendation);
      setShow(false);
    }
  };

  if (!show) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="fixed top-28 right-4 z-30 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-2"
      >
        <Zap size={18} className="fill-white" />
        <span className="font-semibold text-sm">帮我选</span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
        >
          {/* 头部 - 场景感知 */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white relative">
            <button 
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="opacity-80" />
              <span className="text-sm opacity-90">现在是 {context.timeScene}时间</span>
            </div>
            <h2 className="text-2xl font-bold">不知道吃什么？</h2>
            <p className="text-sm opacity-80 mt-1">AI 根据时间、预算智能推荐</p>
          </div>

          <div className="p-5">
            {/* 快速筛选 - 预算 */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={16} className="text-neutral-400" />
                <span className="text-sm font-medium text-neutral-700">预算范围</span>
              </div>
              <div className="flex gap-2">
                {[
                  { key: "low", label: "20元内", desc: "省钱模式" },
                  { key: "medium", label: "35元内", desc: "正常吃" },
                  { key: "all", label: "不限", desc: "想吃好点" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setContext({ ...context, budget: item.key });
                      setTimeout(getSmartRecommendation, 100);
                    }}
                    className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all border-2 ${
                      context.budget === item.key
                        ? "bg-orange-50 border-orange-500 text-orange-700"
                        : "bg-white border-neutral-100 text-neutral-600 hover:border-neutral-200"
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-xs opacity-60 font-normal mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 快速筛选 - 人数 */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-neutral-400" />
                <span className="text-sm font-medium text-neutral-700">就餐人数</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setContext({ ...context, people: num });
                      setTimeout(getSmartRecommendation, 100);
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      context.people === num
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {num}人
                  </button>
                ))}
              </div>
            </div>

            {/* 推荐结果 */}
            {recommendation && (
              <motion.div
                key={recommendation.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 mb-5 border border-orange-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-3xl shadow-lg">
                    {recommendation.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-neutral-900 truncate">{recommendation.name}</h3>
                      {recommendation.hasDiscount && (
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded font-bold">折</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-orange-500" />
                        {recommendation.distance}
                      </span>
                      <span className="font-semibold text-neutral-700">¥{recommendation.avgPrice}/人</span>
                    </div>
                    
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      "{recommendation.description}"
                    </p>
                    
                    {/* 好评度 */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: `${recommendation.redListPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        {recommendation.redListPercent}%好评
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={getSmartRecommendation}
                className="flex-1 py-3.5 bg-neutral-100 rounded-xl font-semibold text-neutral-700 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                <RefreshCw size={18} />
                换一个
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSelect}
                className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30"
              >
                就这家了
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
