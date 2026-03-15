"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Clock, MapPin, Package, CheckCircle, BadgeCheck, Users, Plus, X, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews, groupOrders, deliveryHelps, addGroupOrder, addDeliveryHelp, restaurants, GroupOrder, DeliveryHelp } from "@/data/mock";

const tabs = [
  { id: "reviews", label: "最新避雷/种草" },
  { id: "group", label: "AA拼饭" },
  { id: "delivery", label: "顺手带饭" },
];

export default function Square() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreateDelivery, setShowCreateDelivery] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/10 pb-28">
      {/* 页面标题 */}
      <div className="px-6 pt-14 pb-4 sticky top-0 z-10 bg-gradient-to-b from-neutral-50 to-transparent">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-neutral-900"
        >
          干饭广场
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-neutral-500 mt-1"
        >
          看看大家都在吃什么
        </motion.p>
      </div>

      {/* Tab 切换 */}
      <div className="px-6 pb-3 sticky top-[100px] z-10">
        <div className="glass-card rounded-2xl p-1.5 flex gap-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-6 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {reviews.map((review, idx) => (
                <ReviewCard key={review.id} review={review} index={idx} />
              ))}
            </motion.div>
          )}

          {activeTab === "group" && (
            <motion.div
              key="group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* 创建按钮 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateGroup(true)}
                className="w-full py-4 btn-primary rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                发起拼饭
              </motion.button>
              
              {groupOrders.map((order, idx) => (
                <GroupOrderCard key={order.id} order={order} index={idx} />
              ))}
            </motion.div>
          )}

          {activeTab === "delivery" && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* 创建按钮 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateDelivery(true)}
                className="w-full py-4 btn-primary rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                发布带饭
              </motion.button>
              
              {deliveryHelps.map((help, idx) => (
                <DeliveryCard key={help.id} help={help} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 创建拼饭弹窗 */}
      <AnimatePresence>
        {showCreateGroup && (
          <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
        )}
      </AnimatePresence>

      {/* 创建带饭弹窗 */}
      <AnimatePresence>
        {showCreateDelivery && (
          <CreateDeliveryModal onClose={() => setShowCreateDelivery(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// 创建拼饭弹窗
function CreateGroupModal({ onClose }: { onClose: () => void }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [time, setTime] = useState("");
  const [targetCount, setTargetCount] = useState(3);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ["AA制", "满减优惠", "立即出发", "占位", "健身餐", "聚餐"];

  const handleSubmit = () => {
    if (!restaurantName || !time || !description) return;

    const newOrder: GroupOrder = {
      id: Date.now().toString(),
      initiator: {
        name: "我",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        school: "清华大学"
      },
      restaurantName,
      time,
      currentCount: 1,
      targetCount,
      description,
      tags: selectedTags
    };

    addGroupOrder(newOrder);
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-[60] max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">发起拼饭</h2>
            <button onClick={onClose} className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center z-20">
              <X size={20} className="text-neutral-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">餐厅名称</label>
              <select
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full p-4 bg-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">选择餐厅</option>
                {restaurants.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">时间</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="如：今晚18:00"
                className="w-full p-4 bg-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">目标人数</label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setTargetCount(num)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                      targetCount === num
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {num}人
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">标签</label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      );
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">描述</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="说说拼饭详情..."
                rows={3}
                className="w-full p-4 bg-neutral-100 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!restaurantName || !time || !description}
              className="w-full py-4 btn-primary rounded-2xl font-semibold disabled:opacity-50"
            >
              发布拼饭
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// 创建带饭弹窗
function CreateDeliveryModal({ onClose }: { onClose: () => void }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [item, setItem] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    if (!fromLocation || !toLocation || !item || !reward || !deadline) return;

    const newHelp: DeliveryHelp = {
      id: Date.now().toString(),
      initiator: {
        name: "我",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        school: "清华大学"
      },
      fromLocation,
      toLocation,
      item,
      reward,
      deadline,
      status: "pending"
    };

    addDeliveryHelp(newHelp);
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-[60] max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">发布带饭</h2>
            <button onClick={onClose} className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center z-20">
              <X size={20} className="text-neutral-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">取餐地点</label>
              <select
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full p-4 bg-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">选择餐厅</option>
                {restaurants.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">送达地点</label>
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="如：图书馆东门"
                className="w-full p-4 bg-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">物品</label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="如：一份麻辣烫+可乐"
                className="w-full p-4 bg-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">报酬</label>
              <div className="flex gap-2">
                {["5元跑腿费", "8元跑腿费", "请喝奶茶", "请喝咖啡"].map(r => (
                  <button
                    key={r}
                    onClick={() => setReward(r)}
                    className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all ${
                      reward === r
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">截止时间</label>
              <div className="flex gap-2">
                {["现在", "30分钟内", "1小时内", "2小时内"].map(d => (
                  <button
                    key={d}
                    onClick={() => setDeadline(d)}
                    className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all ${
                      deadline === d
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!fromLocation || !toLocation || !item || !reward || !deadline}
              className="w-full py-4 btn-primary rounded-2xl font-semibold disabled:opacity-50"
            >
              发布带饭
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// 评价卡片
function ReviewCard({ review, index }: { review: any; index: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-3xl p-5 card-shine"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
          />
          {review.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
              <BadgeCheck size={8} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">{review.userName}</span>
            {review.isVerified && (
              <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full font-medium border border-primary-100">
                {review.school}
              </span>
            )}
          </div>
          <span className="text-xs text-neutral-400">{review.time}</span>
        </div>
        <div className="flex items-center gap-0.5 bg-yellow-50 px-2 py-1 rounded-lg">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill={i < review.rating ? "#fbbf24" : "#e5e7eb"}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <span className="inline-flex items-center px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs rounded-xl font-medium">
          {review.restaurantName}
        </span>
      </div>

      <p className="text-neutral-700 text-sm leading-relaxed mb-4">{review.content}</p>

      {review.images.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
          {review.images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt=""
              className="w-24 h-24 rounded-2xl object-cover shadow-sm flex-shrink-0"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-6 pt-4 border-t border-neutral-100">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            liked ? "text-red-500" : "text-neutral-400"
          }`}
        >
          <Heart size={18} className={liked ? "fill-red-500" : ""} />
          <span className="font-medium">{review.likes + (liked ? 1 : 0)}</span>
        </motion.button>
        <button className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
          <MessageCircle size={18} />
          <span>评论</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
          <Share2 size={18} />
          <span>分享</span>
        </button>
      </div>
    </motion.div>
  );
}

// 拼饭卡片
function GroupOrderCard({ order, index }: { order: GroupOrder; index: number }) {
  const progress = (order.currentCount / order.targetCount) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-3xl p-5 overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src={order.initiator.avatar}
          alt={order.initiator.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">{order.initiator.name}</span>
            <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full font-medium border border-primary-100">
              {order.initiator.school}
            </span>
          </div>
          <span className="text-xs text-neutral-400">刚刚发起</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary-50/80 to-orange-50/50 rounded-2xl p-4 mb-4 border border-primary-100/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-neutral-900 text-lg">{order.restaurantName}</h3>
          <span className="flex items-center gap-1 text-sm text-primary-600 font-medium bg-white/80 px-3 py-1 rounded-full">
            <Clock size={14} />
            {order.time}
          </span>
        </div>
        <p className="text-sm text-neutral-600 mb-4">{order.description}</p>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-500">拼单进度</span>
            <span className="font-semibold text-primary-600">
              {order.currentCount}/{order.targetCount}人
            </span>
          </div>
          <div className="h-2.5 bg-white/80 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {order.tags.map((tag) => (
          <span key={tag} className="tag-secondary">{tag}</span>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 btn-primary rounded-2xl font-semibold"
      >
        一键上车
      </motion.button>
    </motion.div>
  );
}

// 顺手带卡片
function DeliveryCard({ help, index }: { help: DeliveryHelp; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-3xl p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src={help.initiator.avatar}
          alt={help.initiator.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">{help.initiator.name}</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium border border-blue-100">
              {help.initiator.school}
            </span>
          </div>
          <span className="text-xs text-neutral-400">{help.deadline}</span>
        </div>
        {help.status === "accepted" ? (
          <span className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 text-xs rounded-full font-medium border border-green-100">
            <CheckCircle size={12} />
            已接单
          </span>
        ) : (
          <span className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs rounded-full font-medium border border-orange-100">
            待接单
          </span>
        )}
      </div>

      <div className="bg-neutral-50/80 rounded-2xl p-4 mb-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <MapPin size={16} className="text-red-500" />
          </div>
          <div>
            <span className="text-xs text-neutral-400">取餐地点</span>
            <p className="text-sm font-semibold text-neutral-900">{help.fromLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Package size={16} className="text-blue-500" />
          </div>
          <div>
            <span className="text-xs text-neutral-400">配送物品</span>
            <p className="text-sm font-semibold text-neutral-900">{help.item}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <MapPin size={16} className="text-green-500" />
          </div>
          <div>
            <span className="text-xs text-neutral-400">送达地点</span>
            <p className="text-sm font-semibold text-neutral-900">{help.toLocation}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">报酬</span>
          <span className="font-bold text-primary-600 text-lg">{help.reward}</span>
        </div>
        {help.status === "pending" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 btn-primary rounded-xl font-semibold text-sm"
          >
            接单
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
