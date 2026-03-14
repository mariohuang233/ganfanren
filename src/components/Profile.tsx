"use client";

import { Settings, ChevronRight, Heart, MessageSquare, Users, MapPin, Award, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { icon: Heart, label: "我的收藏", count: 12, color: "text-rose-500", bgColor: "bg-rose-50" },
  { icon: MessageSquare, label: "我的评价", count: 8, color: "text-blue-500", bgColor: "bg-blue-50" },
  { icon: Users, label: "我的拼饭", count: 3, color: "text-primary-500", bgColor: "bg-primary-50" },
  { icon: MapPin, label: "地址管理", count: null, color: "text-green-500", bgColor: "bg-green-50" },
  { icon: Award, label: "成就徽章", count: 5, color: "text-purple-500", bgColor: "bg-purple-50" },
];

const stats = [
  { label: "探店", value: 23 },
  { label: "评价", value: 18 },
  { label: "获赞", value: 156 },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/10 pb-28">
      {/* 头部背景 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-rose-500 rounded-b-[2.5rem]" />
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative px-6 pt-14 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-white">我的</h1>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 glass rounded-full flex items-center justify-center"
            >
              <Settings size={20} className="text-white" />
            </motion.button>
          </div>

          {/* 用户信息 */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-white/20">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                  alt="用户头像"
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Crown size={14} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">干饭小王子</h2>
              <p className="text-white/80 text-sm mt-1">清华大学 · 计算机系</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-3 py-1 glass rounded-full text-xs font-medium text-white">
                  Lv.5 资深干饭人
                </span>
                <span className="px-3 py-1 glass rounded-full text-xs font-medium text-white">
                  已认证
                </span>
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="flex justify-around mt-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-6 -mt-12">
        {/* 信任度卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-5 mb-5 shadow-soft-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-primary-500 fill-primary-500" />
              <h3 className="font-semibold text-neutral-900">我的干饭信用</h3>
            </div>
            <span className="text-primary-500 text-sm font-bold">优秀</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                />
              </div>
            </div>
            <span className="text-2xl font-bold text-primary-600">92</span>
          </div>
          <p className="text-xs text-neutral-400 mt-3">信用分越高，拼饭成功率越高</p>
        </motion.div>

        {/* 菜单列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden mb-5"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${item.bgColor} rounded-2xl flex items-center justify-center`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <span className="font-semibold text-neutral-900">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count !== null && (
                    <span className="text-sm text-neutral-400 font-medium">{item.count}</span>
                  )}
                  <ChevronRight size={18} className="text-neutral-300" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* 最近浏览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-5 mb-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900">最近浏览</h3>
            <button className="text-sm text-primary-500 font-medium">查看全部</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {[
              { name: "老张麻辣烫", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200" },
              { name: "川味小炒", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200" },
              { name: "韩式炸鸡", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200" },
            ].map((item) => (
              <div key={item.name} className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-neutral-600 text-center mt-2 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 邀请好友 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`
            }}
          />
          <div className="relative p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg">邀请好友</h3>
              <p className="text-white/80 text-sm mt-1">一起干饭，各得10元红包</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white text-purple-600 font-bold text-sm rounded-xl shadow-lg"
            >
              立即邀请
            </motion.button>
          </div>
        </motion.div>

        {/* 版本信息 */}
        <div className="text-center py-8">
          <p className="text-xs text-neutral-400">干饭雷达 v1.0.0</p>
          <p className="text-xs text-neutral-300 mt-1">让每一顿饭都不踩雷</p>
        </div>
      </div>
    </div>
  );
}
