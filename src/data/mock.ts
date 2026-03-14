// 餐厅数据
export interface Restaurant {
  id: string;
  name: string;
  distance: string;
  avgPrice: number;
  rating: number;
  redListPercent: number;
  blackListPercent: number;
  tags: string[];
  hasDiscount: boolean;
  hasGroup: boolean;
  position: { x: number; y: number };
  image: string;
  description: string;
  icon: string;
  iconBg: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "张记麻辣烫",
    distance: "280m",
    avgPrice: 18,
    rating: 4.5,
    redListPercent: 78,
    blackListPercent: 22,
    tags: ["穷鬼套餐", "深夜食堂"],
    hasDiscount: true,
    hasGroup: true,
    position: { x: 30, y: 40 },
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    description: "老板人超好，给料很足，穷鬼套餐15块吃到撑",
    icon: "🍲",
    iconBg: "from-red-500 to-orange-500"
  },
  {
    id: "2",
    name: "兰州正宗牛肉面",
    distance: "150m",
    avgPrice: 15,
    rating: 4.2,
    redListPercent: 65,
    blackListPercent: 35,
    tags: ["清真", "面食"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 60, y: 30 },
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
    description: "正宗兰州师傅，拉面劲道，汤头鲜美",
    icon: "🍜",
    iconBg: "from-amber-500 to-yellow-500"
  },
  {
    id: "3",
    name: "首尔炸鸡啤酒屋",
    distance: "420m",
    avgPrice: 35,
    rating: 3.8,
    redListPercent: 45,
    blackListPercent: 55,
    tags: ["适合多人", "外卖热门"],
    hasDiscount: true,
    hasGroup: true,
    position: { x: 45, y: 60 },
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400",
    description: "甜辣口味不错，但有时候炸得有点老",
    icon: "🍗",
    iconBg: "from-orange-500 to-red-500"
  },
  {
    id: "4",
    name: "蜀香园川菜馆",
    distance: "380m",
    avgPrice: 28,
    rating: 4.6,
    redListPercent: 82,
    blackListPercent: 18,
    tags: ["下饭神器", "辣度可选"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 20, y: 55 },
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400",
    description: "回锅肉绝了，米饭随便加，干饭人必去",
    icon: "🥘",
    iconBg: "from-red-600 to-red-500"
  },
  {
    id: "5",
    name: "和风食堂",
    distance: "520m",
    avgPrice: 32,
    rating: 4.3,
    redListPercent: 70,
    blackListPercent: 30,
    tags: ["情侣约会", "环境好"],
    hasDiscount: true,
    hasGroup: false,
    position: { x: 70, y: 45 },
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    description: "环境很安静，适合约会，咖喱味道浓郁",
    icon: "🍛",
    iconBg: "from-yellow-600 to-amber-500"
  },
  {
    id: "6",
    name: "福建沙县小吃",
    distance: "100m",
    avgPrice: 12,
    rating: 4.0,
    redListPercent: 60,
    blackListPercent: 40,
    tags: ["穷鬼套餐", "出餐快"],
    hasDiscount: false,
    hasGroup: true,
    position: { x: 50, y: 25 },
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400",
    description: "经典沙县，蒸饺和拌面永远的神",
    icon: "🥟",
    iconBg: "from-neutral-500 to-neutral-600"
  },
  {
    id: "7",
    name: "GreenFit轻食",
    distance: "600m",
    avgPrice: 38,
    rating: 4.1,
    redListPercent: 68,
    blackListPercent: 32,
    tags: ["健身餐", "低脂"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 35, y: 70 },
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    description: "减脂期首选，食材新鲜，酱料好吃",
    icon: "🥗",
    iconBg: "from-green-500 to-emerald-500"
  },
  {
    id: "8",
    name: "杨铭宇黄焖鸡",
    distance: "250m",
    avgPrice: 20,
    rating: 3.9,
    redListPercent: 55,
    blackListPercent: 45,
    tags: ["国民美食", "外卖热门"],
    hasDiscount: true,
    hasGroup: true,
    position: { x: 75, y: 65 },
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    description: "全国连锁味道，中规中矩不会踩雷",
    icon: "🍚",
    iconBg: "from-amber-600 to-yellow-600"
  },
  {
    id: "9",
    name: "重庆小面王",
    distance: "320m",
    avgPrice: 16,
    rating: 4.4,
    redListPercent: 75,
    blackListPercent: 25,
    tags: ["面食", "辣度可选"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 25, y: 35 },
    image: "https://images.unsplash.com/photo-1617622141675-d227c5d6eb91?w=400",
    description: "麻辣鲜香，豌杂面是招牌，花生碎很香",
    icon: "🍜",
    iconBg: "from-red-500 to-orange-600"
  },
  {
    id: "10",
    name: "老边饺子馆",
    distance: "480m",
    avgPrice: 22,
    rating: 4.3,
    redListPercent: 72,
    blackListPercent: 28,
    tags: ["适合多人", "家常味道"],
    hasDiscount: true,
    hasGroup: true,
    position: { x: 65, y: 55 },
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400",
    description: "饺子皮薄馅大，酸菜猪肉馅必点，老板东北人很热情",
    icon: "🥟",
    iconBg: "from-yellow-500 to-amber-500"
  },
  {
    id: "11",
    name: "深井烧鹅皇",
    distance: "550m",
    avgPrice: 42,
    rating: 4.5,
    redListPercent: 80,
    blackListPercent: 20,
    tags: ["烧腊", "正宗"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 40, y: 75 },
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
    description: "烧鹅皮脆肉嫩，叉烧肥瘦相间，配酸梅酱绝了",
    icon: "🍖",
    iconBg: "from-red-400 to-red-500"
  },
  {
    id: "12",
    name: "柳州螺蛳粉",
    distance: "380m",
    avgPrice: 19,
    rating: 3.7,
    redListPercent: 48,
    blackListPercent: 52,
    tags: ["重口味", "广西特色"],
    hasDiscount: true,
    hasGroup: true,
    position: { x: 15, y: 65 },
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400",
    description: "味道正宗但真的很臭，建议打包带走吃，腐竹和酸笋给很多",
    icon: "🍜",
    iconBg: "from-yellow-600 to-yellow-700"
  },
  {
    id: "13",
    name: "一兰拉面",
    distance: "620m",
    avgPrice: 45,
    rating: 4.4,
    redListPercent: 76,
    blackListPercent: 24,
    tags: ["日式", "汤浓"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 80, y: 40 },
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400",
    description: "豚骨汤底熬了8小时，溏心蛋完美，叉烧入口即化",
    icon: "🍜",
    iconBg: "from-orange-300 to-yellow-400"
  },
  {
    id: "14",
    name: "成都冒菜馆",
    distance: "290m",
    avgPrice: 25,
    rating: 4.1,
    redListPercent: 68,
    blackListPercent: 32,
    tags: ["麻辣", "自选"],
    hasDiscount: true,
    hasGroup: true,
    position: { x: 55, y: 50 },
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
    description: "一个人的火锅，毛肚和鸭血必点，辣度可以选微辣",
    icon: "🍲",
    iconBg: "from-red-500 to-red-600"
  },
  {
    id: "15",
    name: "必胜客",
    distance: "750m",
    avgPrice: 55,
    rating: 4.2,
    redListPercent: 70,
    blackListPercent: 30,
    tags: ["西餐", "适合多人"],
    hasDiscount: false,
    hasGroup: true,
    position: { x: 85, y: 70 },
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    description: "薄底披萨很正宗，芝士拉丝很长，适合宿舍聚餐",
    icon: "🍕",
    iconBg: "from-yellow-400 to-orange-400"
  },
  {
    id: "16",
    name: "潮汕砂锅粥",
    distance: "180m",
    avgPrice: 14,
    rating: 4.0,
    redListPercent: 62,
    blackListPercent: 38,
    tags: ["清淡", "养胃"],
    hasDiscount: false,
    hasGroup: false,
    position: { x: 45, y: 20 },
    image: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=400",
    description: "生病或者胃不舒服时的救星，皮蛋瘦肉粥熬得很稠",
    icon: "🥣",
    iconBg: "from-neutral-300 to-neutral-400"
  }
];

// 评价数据
export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  school: string;
  restaurantName: string;
  rating: number;
  content: string;
  images: string[];
  likes: number;
  time: string;
  isVerified: boolean;
  type: "recommend" | "avoid";
}

export let reviews: Review[] = [
  {
    id: "1",
    userName: "干饭小王",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    school: "清华大学",
    restaurantName: "张记麻辣烫",
    rating: 5,
    content: "太香了！15块钱吃到撑，老板还送了我一瓶可乐，穷鬼狂喜！",
    images: ["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"],
    likes: 128,
    time: "2小时前",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "2",
    userName: "食堂在逃人员",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    school: "北京大学",
    restaurantName: "首尔炸鸡啤酒屋",
    rating: 2,
    content: "疯狂踩雷！炸鸡炸得太老了，酱料还齁甜，吃完嗓子疼了一晚上，别来！",
    images: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400"],
    likes: 89,
    time: "5小时前",
    isVerified: true,
    type: "avoid"
  },
  {
    id: "3",
    userName: "碳水教父",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    school: "人民大学",
    restaurantName: "蜀香园川菜馆",
    rating: 5,
    content: "回锅肉yyds！肥瘦相间，蒜苗爆香，米饭随便加，我干了三碗！",
    images: [
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
    ],
    likes: 256,
    time: "昨天",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "4",
    userName: "减肥中的猫",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    school: "北航",
    restaurantName: "GreenFit轻食",
    rating: 4,
    content: "减脂期救星，鸡胸肉不柴，蔬菜很新鲜，就是价格对学生党不太友好",
    images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"],
    likes: 67,
    time: "昨天",
    isVerified: false,
    type: "recommend"
  },
  {
    id: "5",
    userName: "深夜干饭人",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    school: "北理工",
    restaurantName: "兰州正宗牛肉面",
    rating: 4,
    content: "凌晨两点还在营业，救了我这条狗命，汤头很鲜，就是肉有点少",
    images: [],
    likes: 45,
    time: "2天前",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "6",
    userName: "重庆辣妹子",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    school: "重庆大学",
    restaurantName: "重庆小面王",
    rating: 5,
    content: "正宗！跟我在重庆吃的味道一样，麻辣鲜香，豌杂面绝了！",
    images: ["https://images.unsplash.com/photo-1617622141675-d227c5d6eb91?w=400"],
    likes: 189,
    time: "3小时前",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "7",
    userName: "东北大汉",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    school: "哈工大",
    restaurantName: "老边饺子馆",
    rating: 5,
    content: "老乡开的店，饺子皮薄馅大，酸菜猪肉馅有家里那味儿了",
    images: [],
    likes: 134,
    time: "昨天",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "8",
    userName: "广东靓仔",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    school: "中山大学",
    restaurantName: "深井烧鹅皇",
    rating: 4,
    content: "烧鹅皮脆肉嫩，叉烧肥瘦相间，就是价格有点贵，偶尔吃一次",
    images: ["https://images.unsplash.com/photo-1555126634-323283e090fa?w=400"],
    likes: 78,
    time: "4小时前",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "9",
    userName: "螺蛳粉战士",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    school: "广西大学",
    restaurantName: "柳州螺蛳粉",
    rating: 4,
    content: "虽然臭但是真的好吃！腐竹和酸笋给超多，汤底浓郁",
    images: [],
    likes: 92,
    time: "昨天",
    isVerified: false,
    type: "recommend"
  },
  {
    id: "10",
    userName: "隔壁宿舍小李",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    school: "清华大学",
    restaurantName: "柳州螺蛳粉",
    rating: 1,
    content: "太臭了！吃完衣服都是那个味道，被室友赶出宿舍了，千万别在宿舍吃",
    images: [],
    likes: 245,
    time: "1天前",
    isVerified: true,
    type: "avoid"
  },
  {
    id: "11",
    userName: "日料爱好者",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    school: "复旦大学",
    restaurantName: "一兰拉面",
    rating: 5,
    content: "豚骨汤底很浓郁，溏心蛋完美，就是排队人太多了",
    images: ["https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400"],
    likes: 156,
    time: "5小时前",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "12",
    userName: "冒菜小公主",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    school: "四川大学",
    restaurantName: "成都冒菜馆",
    rating: 4,
    content: "一个人的火锅，毛肚和鸭血必点，微辣刚刚好",
    images: [],
    likes: 88,
    time: "昨天",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "13",
    userName: "披萨控",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    school: "浙江大学",
    restaurantName: "必胜客",
    rating: 4,
    content: "宿舍聚餐首选，薄底披萨很正宗，芝士拉丝很长",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"],
    likes: 112,
    time: "2天前",
    isVerified: false,
    type: "recommend"
  },
  {
    id: "14",
    userName: "养生达人",
    userAvatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
    school: "中医药大学",
    restaurantName: "潮汕砂锅粥",
    rating: 5,
    content: "胃炎犯了，喝了三天皮蛋瘦肉粥，胃舒服多了，老板人很好",
    images: [],
    likes: 67,
    time: "昨天",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "15",
    userName: "黄焖鸡信徒",
    userAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    school: "武汉大学",
    restaurantName: "杨铭宇黄焖鸡",
    rating: 3,
    content: "中规中矩，全国连锁的味道，不会踩雷但也没有惊喜",
    images: [],
    likes: 34,
    time: "3天前",
    isVerified: false,
    type: "recommend"
  },
  {
    id: "16",
    userName: "沙县小王子",
    userAvatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100",
    school: "厦门大学",
    restaurantName: "福建沙县小吃",
    rating: 4,
    content: "蒸饺和拌面永远的神，便宜又好吃，出餐还快",
    images: [],
    likes: 178,
    time: "昨天",
    isVerified: true,
    type: "recommend"
  },
  {
    id: "17",
    userName: "健身狂魔",
    userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    school: "北体",
    restaurantName: "GreenFit轻食",
    rating: 3,
    content: "食材新鲜但分量太少，男生吃不饱，而且太贵了",
    images: [],
    likes: 56,
    time: "昨天",
    isVerified: true,
    type: "avoid"
  },
  {
    id: "18",
    userName: "约会达人",
    userAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100",
    school: "复旦大学",
    restaurantName: "和风食堂",
    rating: 5,
    content: "带女朋友来约会，环境很安静，咖喱味道浓郁，她很喜欢",
    images: ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400"],
    likes: 89,
    time: "昨天",
    isVerified: false,
    type: "recommend"
  }
];

// 添加评价的函数
export function addReview(review: Review) {
  reviews.unshift(review);
}

// 拼饭数据
export interface GroupOrder {
  id: string;
  initiator: {
    name: string;
    avatar: string;
    school: string;
  };
  restaurantName: string;
  time: string;
  currentCount: number;
  targetCount: number;
  description: string;
  tags: string[];
}

export let groupOrders: GroupOrder[] = [
  {
    id: "1",
    initiator: {
      name: "爱吃肉的兔子",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      school: "清华大学"
    },
    restaurantName: "首尔炸鸡啤酒屋",
    time: "今晚18:00",
    currentCount: 2,
    targetCount: 4,
    description: "拼单满100减20，目前已有2人，还差2人，来的dd！",
    tags: ["满减优惠", "AA制"]
  },
  {
    id: "2",
    initiator: {
      name: "麻辣烫战士",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      school: "北京大学"
    },
    restaurantName: "张记麻辣烫",
    time: "现在",
    currentCount: 1,
    targetCount: 3,
    description: "一个人吃不过瘾，求组队，我可以帮大家占位！",
    tags: ["立即出发", "占位"]
  },
  {
    id: "3",
    initiator: {
      name: "健身达人",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      school: "北航"
    },
    restaurantName: "GreenFit轻食",
    time: "明天中午12:00",
    currentCount: 3,
    targetCount: 5,
    description: "健身小分队集合，拼单免配送费，健康餐吃起来！",
    tags: ["健身餐", "免配送费"]
  },
  {
    id: "4",
    initiator: {
      name: "干饭协会会长",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100",
      school: "人民大学"
    },
    restaurantName: "蜀香园川菜馆",
    time: "今晚19:30",
    currentCount: 4,
    targetCount: 6,
    description: "部门聚餐，还能加2人，来的都是兄弟姐妹！",
    tags: ["聚餐", "人多热闹"]
  },
  {
    id: "5",
    initiator: {
      name: "披萨控",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      school: "浙江大学"
    },
    restaurantName: "必胜客",
    time: "周六晚上",
    currentCount: 3,
    targetCount: 5,
    description: "宿舍聚餐，拼个大披萨，人均30左右，来的私我",
    tags: ["宿舍聚餐", "AA制"]
  },
  {
    id: "6",
    initiator: {
      name: "东北大汉",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      school: "哈工大"
    },
    restaurantName: "老边饺子馆",
    time: "今晚",
    currentCount: 2,
    targetCount: 4,
    description: "冬至吃饺子，东北老乡集合！酸菜猪肉馅管够",
    tags: ["老乡聚会", "传统节日"]
  },
  {
    id: "7",
    initiator: {
      name: "冒菜小公主",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      school: "四川大学"
    },
    restaurantName: "成都冒菜馆",
    time: "现在",
    currentCount: 1,
    targetCount: 2,
    description: "一个人吃冒菜太孤单了，求个饭搭子，我请客喝饮料",
    tags: ["饭搭子", "立即出发"]
  },
  {
    id: "8",
    initiator: {
      name: "日料爱好者",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      school: "复旦大学"
    },
    restaurantName: "一兰拉面",
    time: "明天午餐",
    currentCount: 2,
    targetCount: 3,
    description: "拉面第二份半价，求组队，排队我可以先去",
    tags: ["优惠", "占位"]
  }
];

// 添加拼饭订单的函数
export function addGroupOrder(order: GroupOrder) {
  groupOrders.unshift(order);
}

// 顺手带数据
export interface DeliveryHelp {
  id: string;
  initiator: {
    name: string;
    avatar: string;
    school: string;
  };
  fromLocation: string;
  toLocation: string;
  item: string;
  reward: string;
  deadline: string;
  status: "pending" | "accepted";
}

export let deliveryHelps: DeliveryHelp[] = [
  {
    id: "1",
    initiator: {
      name: "图书馆钉子户",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
      school: "清华大学"
    },
    fromLocation: "张记麻辣烫",
    toLocation: "图书馆东门",
    item: "一份麻辣烫+可乐",
    reward: "5元跑腿费",
    deadline: "30分钟内",
    status: "pending"
  },
  {
    id: "2",
    initiator: {
      name: "宿舍宅女",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
      school: "北京大学"
    },
    fromLocation: "福建沙县小吃",
    toLocation: "3号楼502",
    item: "两份蒸饺+拌面",
    reward: "请喝奶茶",
    deadline: "1小时内",
    status: "pending"
  },
  {
    id: "3",
    initiator: {
      name: "实验室打工人",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
      school: "北理工"
    },
    fromLocation: "杨铭宇黄焖鸡",
    toLocation: "实验楼A座",
    item: "大份黄焖鸡+米饭",
    reward: "8元跑腿费",
    deadline: "现在",
    status: "accepted"
  },
  {
    id: "4",
    initiator: {
      name: "考研党",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      school: "人民大学"
    },
    fromLocation: "潮汕砂锅粥",
    toLocation: "自习室3楼",
    item: "皮蛋瘦肉粥+油条",
    reward: "6元跑腿费",
    deadline: "20分钟内",
    status: "pending"
  },
  {
    id: "5",
    initiator: {
      name: "生病的小明",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      school: "北航"
    },
    fromLocation: "潮汕砂锅粥",
    toLocation: "5号楼301",
    item: "白粥+咸菜",
    reward: "请喝奶茶",
    deadline: "1小时内",
    status: "pending"
  },
  {
    id: "6",
    initiator: {
      name: "熬夜冠军",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      school: "复旦大学"
    },
    fromLocation: "兰州正宗牛肉面",
    toLocation: "宿舍2号楼",
    item: "牛肉拉面+鸡蛋",
    reward: "5元跑腿费",
    deadline: "现在",
    status: "pending"
  },
  {
    id: "7",
    initiator: {
      name: "健身达人",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      school: "北体"
    },
    fromLocation: "GreenFit轻食",
    toLocation: "体育馆更衣室",
    item: "鸡胸肉沙拉",
    reward: "10元跑腿费",
    deadline: "30分钟内",
    status: "accepted"
  },
  {
    id: "8",
    initiator: {
      name: "写论文的学姐",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      school: "清华大学"
    },
    fromLocation: "和风食堂",
    toLocation: "图书馆4楼",
    item: "咖喱饭+味增汤",
    reward: "请喝咖啡",
    deadline: "40分钟内",
    status: "pending"
  }
];

// 添加顺手带订单的函数
export function addDeliveryHelp(help: DeliveryHelp) {
  deliveryHelps.unshift(help);
}

// 筛选标签
export const filterTags = [
  { label: "20元吃饱", icon: "💰" },
  { label: "适合多人", icon: "👥" },
  { label: "情侣约会", icon: "💕" },
  { label: "深夜食堂", icon: "🌙" },
  { label: "清真", icon: "🕌" },
  { label: "不吃辣", icon: "🌶️" },
  { label: "健身餐", icon: "💪" },
  { label: "外卖热门", icon: "🔥" },
  { label: "穷鬼套餐", icon: "🍱" },
  { label: "出餐快", icon: "⚡" }
];

// 盲盒预算选项
export const budgetOptions = [
  { label: "20元以内", value: 20, max: 20 },
  { label: "20-50元", value: 35, min: 20, max: 50 },
  { label: "50元以上", value: 60, min: 50, max: 100 }
];

// 盲盒距离选项
export const distanceOptions = [
  { label: "500米内", value: 500, max: 500 },
  { label: "1公里内", value: 800, max: 1000 },
  { label: "全校范围", value: 1500, max: 2000 }
];

// 盲盒筛选选项
export const blindBoxFilters = [
  "不吃辣",
  "清真",
  "健身餐",
  "适合多人",
  "情侣约会"
];
