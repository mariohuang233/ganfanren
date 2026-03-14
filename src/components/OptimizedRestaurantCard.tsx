"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ThumbsUp, Clock, Navigation, Banknote } from "lucide-react";
import { Restaurant } from "@/data/mock";

interface OptimizedRestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  index?: number;
}

export default function OptimizedRestaurantCard({ 
  restaurant, 
  onClick, 
  index = 0 
}: OptimizedRestaurantCardProps) {
  // 计算步行时间（假设步行速度 5km/h）
  const distanceNum = parseInt(restaurant.distance);
  const walkTime = Math.ceil(distanceNum / 83); // 约 83m/分钟

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* 第一行：店名 + 距离（最重要决策信息） */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-2xl">{restaurant.icon}</span>
          <h3 className="font-bold text-lg text-neutral-900 truncate">
            {restaurant.name}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-primary-600 font-semibold text-sm shrink-0">
          <MapPin size={14} />
          {restaurant.distance}
        </div>
      </div>

      {/* 第二行：价格 + 评分 + 步行时间 */}
      <div className="flex items-center gap-4 mb-3 text-sm">
        <span className="flex items-center gap-1 font-semibold text-neutral-900">
          <Banknote size={14} className="text-green-500" />
          ¥{restaurant.avgPrice}/人
        </span>
        <span className="flex items-center gap-1 text-neutral-600">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          {restaurant.rating}
        </span>
        <span className="flex items-center gap-1 text-neutral-500">
          <Navigation size={14} />
          {walkTime}分钟
        </span>
      </div>

      {/* 第三行：一句话评价（最关键决策因素） */}
      <p className="text-sm text-neutral-600 mb-3 line-clamp-2 leading-relaxed">
        "{restaurant.description}"
      </p>

      {/* 第四行：信任度可视化 + 标签 */}
      <div className="flex items-center gap-3">
        {/* 好评度进度条 */}
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${restaurant.redListPercent}%` }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
            />
          </div>
          <span className="text-xs text-green-600 font-medium whitespace-nowrap">
            <ThumbsUp size={10} className="inline mr-0.5" />
            {restaurant.redListPercent}%好评
          </span>
        </div>

        {/* 优惠/拼单标签 */}
        <div className="flex gap-1 shrink-0">
          {restaurant.hasDiscount && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] rounded font-bold">
              优惠
            </span>
          )}
          {restaurant.hasGroup && (
            <span className="px-2 py-0.5 bg-primary-500 text-white text-[10px] rounded font-bold">
              可拼
            </span>
          )}
        </div>
      </div>

      {/* 底部标签 */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {restaurant.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded-lg"
          >
            {tag}
          </span>
        ))}
        {restaurant.tags.length > 3 && (
          <span className="px-2 py-0.5 text-neutral-400 text-xs">
            +{restaurant.tags.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// 简化版卡片 - 用于列表展示
export function CompactRestaurantCard({ 
  restaurant, 
  onClick, 
  index = 0 
}: OptimizedRestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-colors"
    >
      {/* 图标 */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${restaurant.iconBg} flex items-center justify-center text-xl shrink-0`}>
        {restaurant.icon}
      </div>

      {/* 信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h4 className="font-semibold text-neutral-900 truncate">{restaurant.name}</h4>
          <span className="text-sm text-primary-600 font-medium">{restaurant.distance}</span>
        </div>
        <p className="text-xs text-neutral-500 truncate mb-1">{restaurant.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-700">¥{restaurant.avgPrice}</span>
          <span className="text-xs text-green-600">{restaurant.redListPercent}%好评</span>
        </div>
      </div>

      {/* 箭头 */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-300 shrink-0">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}

// 详情卡片 - 用于底部抽屉
export function DetailRestaurantCard({ 
  restaurant, 
  onClick 
}: Omit<OptimizedRestaurantCardProps, 'index'>) {
  const distanceNum = parseInt(restaurant.distance);
  const walkTime = Math.ceil(distanceNum / 83);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
    >
      {/* 图片区域 */}
      <div className="relative h-32">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* 顶部信息 */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">{restaurant.icon}</span>
            <h3 className="font-bold text-xl text-white">{restaurant.name}</h3>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/90">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {restaurant.distance}
            </span>
            <span>·</span>
            <span>¥{restaurant.avgPrice}/人</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              {restaurant.rating}
            </span>
          </div>
        </div>

        {/* 优惠标签 */}
        {(restaurant.hasDiscount || restaurant.hasGroup) && (
          <div className="absolute top-3 right-3 flex gap-1">
            {restaurant.hasDiscount && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg font-bold">
                优惠
              </span>
            )}
            {restaurant.hasGroup && (
              <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded-lg font-bold">
                可拼单
              </span>
            )}
          </div>
        )}
      </div>

      {/* 信息区域 */}
      <div className="p-4">
        {/* 一句话评价 */}
        <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
          "{restaurant.description}"
        </p>

        {/* 好评度 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-neutral-500">干饭人信任度</span>
              <span className="text-green-600 font-medium">{restaurant.redListPercent}%好评</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${restaurant.redListPercent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5">
          {restaurant.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-lg font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
