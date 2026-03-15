"use client";

import { useState } from "react";
import { Search, MapPin, Star, Navigation, X, ThumbsUp, ThumbsDown, Sparkles, Camera, Send, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { restaurants, filterTags, reviews, Restaurant } from "@/data/mock";
import OptimizedRestaurantCard from "./OptimizedRestaurantCard";

export default function RadarMap() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewType, setReviewType] = useState<"recommend" | "avoid">("recommend");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [showList, setShowList] = useState(false);

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredRestaurants = restaurants.filter((r) => {
    if (activeFilters.length > 0 && !activeFilters.some((tag) => r.tags.includes(tag))) {
      return false;
    }
    if (searchQuery && !r.name.includes(searchQuery)) {
      return false;
    }
    return true;
  });

  const restaurantReviews = selectedRestaurant
    ? reviews.filter((r) => r.restaurantName === selectedRestaurant.name)
    : [];

  const handleSubmitReview = () => {
    if (!reviewContent.trim() || !selectedRestaurant) return;
    
    const newReview = {
      id: Date.now().toString(),
      userName: "我",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      school: "清华大学",
      restaurantName: selectedRestaurant.name,
      rating: reviewRating,
      content: reviewContent,
      images: [],
      likes: 0,
      time: "刚刚",
      isVerified: true,
      type: reviewType
    };
    
    reviews.unshift(newReview);
    setShowReviewForm(false);
    setReviewContent("");
    setReviewRating(5);
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* 顶部搜索区 */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="glass-card rounded-3xl p-4 shadow-soft-lg">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="搜索食堂、菜系或商家"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 bg-neutral-100/80 rounded-2xl text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
            {/* 视图切换按钮 */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowList(!showList)}
                className={`p-2 rounded-xl transition-colors ${
                  showList ? "bg-primary-500 text-white" : "bg-white text-neutral-600"
                }`}
                title={showList ? "切换到地图" : "切换到列表"}
              >
                {showList ? <MapPin size={18} /> : <List size={18} />}
              </motion.button>
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
            {filterTags.map((tag) => (
              <motion.button
                key={tag.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter(tag.label)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeFilters.includes(tag.label)
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : "bg-white text-neutral-600 shadow-sm border border-neutral-100 hover:border-primary-200"
                }`}
              >
                <span>{tag.icon}</span>
                <span>{tag.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

      </div>

      {/* 主内容区域 */}
      <div className="h-full w-full relative pt-32">
        <AnimatePresence mode="wait">
          {showList ? (
            // 列表视图
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto px-4 pb-32"
            >
              <div className="space-y-3">
                {filteredRestaurants.map((restaurant, index) => (
                  <OptimizedRestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    index={index}
                  />
                ))}
              </div>
              
              {filteredRestaurants.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-neutral-400" />
                  </div>
                  <p className="text-neutral-500">没有找到匹配的餐厅</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilters([]);
                    }}
                    className="mt-3 text-primary-500 font-medium"
                  >
                    清除筛选条件
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            // 地图视图
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full w-full"
            >
              <SimulatedMap
                filteredRestaurants={filteredRestaurants}
                onRestaurantSelect={setSelectedRestaurant}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部抽屉 */}
      <AnimatePresence>
        {selectedRestaurant && (
          <RestaurantDrawer
            restaurant={selectedRestaurant}
            reviews={restaurantReviews}
            showReviewForm={showReviewForm}
            reviewType={reviewType}
            reviewContent={reviewContent}
            reviewRating={reviewRating}
            onClose={() => {
              setSelectedRestaurant(null);
              setShowReviewForm(false);
            }}
            onReviewTypeChange={setReviewType}
            onReviewContentChange={setReviewContent}
            onReviewRatingChange={setReviewRating}
            onShowReviewForm={setShowReviewForm}
            onSubmitReview={handleSubmitReview}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// 模拟地图组件
function SimulatedMap({
  filteredRestaurants,
  onRestaurantSelect,
}: {
  filteredRestaurants: Restaurant[];
  onRestaurantSelect: (r: Restaurant) => void;
}) {
  return (
    <div className="absolute inset-0">
      {/* 网格背景 */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="4 4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#e8e8e8" strokeWidth="12" strokeLinecap="round" />
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#e8e8e8" strokeWidth="12" strokeLinecap="round" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#f0f0f0" strokeWidth="8" strokeLinecap="round" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#f0f0f0" strokeWidth="8" strokeLinecap="round" />
        <rect x="5%" y="10%" width="12%" height="18%" fill="#f5f5f5" rx="8" stroke="#e8e8e8" strokeWidth="1" />
        <rect x="30%" y="50%" width="18%" height="12%" fill="#f5f5f5" rx="8" stroke="#e8e8e8" strokeWidth="1" />
        <rect x="65%" y="20%" width="14%" height="14%" fill="#f5f5f5" rx="8" stroke="#e8e8e8" strokeWidth="1" />
        <rect x="75%" y="60%" width="16%" height="18%" fill="#f5f5f5" rx="8" stroke="#e8e8e8" strokeWidth="1" />
        <circle cx="45%" cy="35%" r="40" fill="#fff8f5" opacity="0.5" />
        <circle cx="85%" cy="45%" r="30" fill="#f0f7ff" opacity="0.5" />
      </svg>

      {/* 商家定位标记 */}
      {filteredRestaurants.map((restaurant, index) => (
        <motion.button
          key={restaurant.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRestaurantSelect(restaurant)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${restaurant.position.x}%`, top: `${restaurant.position.y}%` }}
        >
          <div className="relative flex flex-col items-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg text-lg border-2 border-white ${
              restaurant.hasDiscount || restaurant.hasGroup ? "ring-2 ring-white" : ""
            }`}>
              <div className={`w-full h-full rounded-xl flex items-center justify-center bg-gradient-to-br ${restaurant.iconBg}`}>
                <span className="text-white text-lg">{restaurant.icon}</span>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="bg-white/95 backdrop-blur px-2 py-0.5 rounded-lg text-xs font-medium text-neutral-700 whitespace-nowrap max-w-[80px] truncate shadow-sm">
                {restaurant.name}
              </span>
              {restaurant.hasDiscount && (
                <span className="w-4 h-4 bg-red-500 rounded text-[8px] text-white flex items-center justify-center font-bold">折</span>
              )}
              {restaurant.hasGroup && (
                <span className="w-4 h-4 bg-primary-500 rounded text-[8px] text-white flex items-center justify-center font-bold">拼</span>
              )}
            </div>
          </div>
        </motion.button>
      ))}

      {/* 定位按钮 */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-32 right-5 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg"
      >
        <Navigation size={20} className="text-neutral-600" />
      </motion.button>
    </div>
  );
}

// 餐厅详情抽屉组件
function RestaurantDrawer({
  restaurant,
  reviews,
  showReviewForm,
  reviewType,
  reviewContent,
  reviewRating,
  onClose,
  onReviewTypeChange,
  onReviewContentChange,
  onReviewRatingChange,
  onShowReviewForm,
  onSubmitReview,
}: {
  restaurant: Restaurant;
  reviews: any[];
  showReviewForm: boolean;
  reviewType: "recommend" | "avoid";
  reviewContent: string;
  reviewRating: number;
  onClose: () => void;
  onReviewTypeChange: (type: "recommend" | "avoid") => void;
  onReviewContentChange: (content: string) => void;
  onReviewRatingChange: (rating: number) => void;
  onShowReviewForm: (show: boolean) => void;
  onSubmitReview: () => void;
}) {
  // 计算步行时间
  const distanceNum = parseInt(restaurant.distance);
  const walkTime = Math.ceil(distanceNum / 83);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm z-[55]"
      />
      
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-[60] max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        <div className="w-full flex justify-center pt-4 pb-3 sticky top-0 bg-white z-10">
          <div className="w-10 h-1 bg-neutral-200 rounded-full" />
        </div>

        <div className="px-6 pb-24">
          <button
            onClick={onClose}
            className="absolute top-4 right-5 w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors z-20"
          >
            <X size={16} className="text-neutral-500" />
          </button>

          {/* 优化后的商家信息头部 */}
          <div className="mb-5">
            {/* 第一行：店名 + 距离 */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{restaurant.icon}</span>
                <h3 className="text-2xl font-bold text-neutral-900">{restaurant.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-primary-600 font-semibold">
                <MapPin size={16} />
                <span>{restaurant.distance}</span>
              </div>
            </div>

            {/* 第二行：价格 + 评分 + 步行时间 */}
            <div className="flex items-center gap-4 mb-3 text-sm">
              <span className="flex items-center gap-1 font-semibold text-neutral-900">
                <span className="text-lg">¥{restaurant.avgPrice}</span>
                <span className="text-neutral-400 font-normal">/人</span>
              </span>
              <span className="flex items-center gap-1 text-neutral-600">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {restaurant.rating}分
              </span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Navigation size={14} />
                步行{walkTime}分钟
              </span>
            </div>

            {/* 第三行：一句话评价 */}
            <p className="text-sm text-neutral-600 mb-4 leading-relaxed bg-neutral-50 p-3 rounded-xl">
              "{restaurant.description}"
            </p>

            {/* 第四行：信任度 + 标签 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Sparkles size={12} className="text-primary-500" />
                    干饭人信任度
                  </span>
                  <span className="text-green-600 font-medium">{restaurant.redListPercent}%好评</span>
                </div>
                <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden p-0.5">
                  <div className="h-full rounded-full flex overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${restaurant.redListPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-green-400 to-green-500"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${restaurant.blackListPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full bg-neutral-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-xs rounded-lg font-medium">
                  {tag}
                </span>
              ))}
              {restaurant.hasDiscount && (
                <span className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg font-bold">有优惠</span>
              )}
              {restaurant.hasGroup && (
                <span className="px-3 py-1.5 bg-primary-500 text-white text-xs rounded-lg font-bold">可拼单</span>
              )}
            </div>
          </div>

          {/* 推荐/避雷按钮 */}
          {!showReviewForm && (
            <div className="grid grid-cols-2 gap-3 mb-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onReviewTypeChange("recommend");
                  onShowReviewForm(true);
                }}
                className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
              >
                <ThumbsUp size={18} />
                推荐
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onReviewTypeChange("avoid");
                  onShowReviewForm(true);
                }}
                className="py-3 bg-gradient-to-r from-neutral-600 to-neutral-700 text-white font-semibold rounded-2xl shadow-lg shadow-neutral-500/30 flex items-center justify-center gap-2"
              >
                <ThumbsDown size={18} />
                避雷
              </motion.button>
            </div>
          )}

          {/* 评价表单 */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
              >
                <div className="bg-neutral-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-neutral-900">
                      {reviewType === "recommend" ? "推荐这家餐厅" : "避雷这家餐厅"}
                    </span>
                    <button 
                      onClick={() => onShowReviewForm(false)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* 评分 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-neutral-500">评分</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => onReviewRatingChange(i + 1)}
                          className="p-1"
                        >
                          <Star
                            size={20}
                            className={i < reviewRating ? "text-yellow-400 fill-yellow-400" : "text-neutral-200"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 评价内容 */}
                  <textarea
                    value={reviewContent}
                    onChange={(e) => onReviewContentChange(e.target.value)}
                    placeholder={reviewType === "recommend" ? "说说这家店的优点..." : "说说这家店的问题..."}
                    className="w-full p-3 bg-white rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 border border-neutral-200"
                    rows={3}
                  />
                  
                  {/* 添加图片按钮 */}
                  <div className="flex items-center gap-3 mt-3">
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl text-sm text-neutral-600 border border-neutral-200">
                      <Camera size={16} />
                      添加图片
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onSubmitReview}
                      disabled={!reviewContent.trim()}
                      className="flex-1 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      发布评价
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 最新评价 */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary-500 rounded-full" />
              最新评价
            </h4>
            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.slice(0, 2).map((review, idx) => (
                  <motion.div 
                    key={review.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-neutral-50 rounded-2xl p-4"
                  >
                    <div className="flex gap-3">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-neutral-900">{review.userName}</span>
                          <span className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                            review.type === "recommend" 
                              ? "bg-green-50 text-green-600" 
                              : "bg-neutral-100 text-neutral-600"
                          }`}>
                            {review.type === "recommend" ? "推荐" : "避雷"}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{review.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-neutral-50 rounded-2xl p-6 text-center">
                <p className="text-sm text-neutral-400">暂无评价，快来成为第一个评价的人吧！</p>
              </div>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl text-base font-semibold shadow-lg shadow-primary-500/30"
          >
            去这里吃饭
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
