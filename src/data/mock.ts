// 菜单项
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

// 菜单分类
export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

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
  // 新增字段
  officialImages: string[]; // 官方图片
  menu: MenuCategory[]; // 菜单
  businessHours: string; // 营业时间
  phone?: string; // 电话
  address: string; // 具体地址
}

// 生成官方图片
const generateOfficialImages = (baseImage: string): string[] => {
  const foodImages = [
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600",
    "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600",
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
  ];
  
  // 随机选择3张不同的图片
  const shuffled = [...foodImages].sort(() => 0.5 - Math.random());
  return [baseImage.replace('w=400', 'w=600'), ...shuffled.slice(0, 2)];
};

// 生成默认菜单
const generateDefaultMenu = (type: string): MenuCategory[] => {
  const menus: Record<string, MenuCategory[]> = {
    '麻辣烫': [
      {
        id: 'cat1',
        name: '超值套餐',
        items: [
          { id: 'm1', name: '穷鬼套餐', price: 15, description: '10串素菜+5串荤菜+主食', isPopular: true },
          { id: 'm2', name: '豪华套餐', price: 25, description: '15串混搭+饮料+主食', isPopular: true },
          { id: 'm3', name: '单人畅享', price: 20, description: '自选20串+主食' },
        ]
      },
      {
        id: 'cat2',
        name: '荤菜',
        items: [
          { id: 'm4', name: '牛肉串', price: 3, isSpicy: true },
          { id: 'm5', name: '羊肉串', price: 3, isSpicy: true },
          { id: 'm6', name: '鱼丸', price: 2 },
          { id: 'm7', name: '虾饺', price: 2.5 },
        ]
      },
      {
        id: 'cat3',
        name: '素菜',
        items: [
          { id: 'm8', name: '土豆片', price: 1 },
          { id: 'm9', name: '金针菇', price: 1.5 },
          { id: 'm10', name: '豆腐皮', price: 1 },
          { id: 'm11', name: '青菜', price: 1 },
        ]
      }
    ],
    '拉面': [
      {
        id: 'cat1',
        name: '招牌面食',
        items: [
          { id: 'r1', name: '牛肉拉面', price: 12, description: '手工拉面+牛肉片+香菜', isPopular: true },
          { id: 'r2', name: '羊肉面', price: 15, description: '羊肉片+手工面', isPopular: true },
          { id: 'r3', name: '刀削面', price: 13, description: '现削面条+牛肉' },
        ]
      },
      {
        id: 'cat2',
        name: '小菜',
        items: [
          { id: 'r4', name: '凉拌黄瓜', price: 6 },
          { id: 'r5', name: '拍黄瓜', price: 6 },
          { id: 'r6', name: '卤蛋', price: 2 },
        ]
      }
    ],
    '炸鸡': [
      {
        id: 'cat1',
        name: '炸鸡套餐',
        items: [
          { id: 'c1', name: '单人套餐', price: 28, description: '炸鸡半只+薯条+可乐', isPopular: true },
          { id: 'c2', name: '双人套餐', price: 48, description: '整只炸鸡+薯条+2杯可乐', isPopular: true },
          { id: 'c3', name: '炸鸡桶', price: 68, description: '炸鸡+鸡翅+薯条+3杯可乐' },
        ]
      },
      {
        id: 'cat2',
        name: '单点',
        items: [
          { id: 'c4', name: '原味炸鸡', price: 25 },
          { id: 'c5', name: '甜辣炸鸡', price: 28, isSpicy: true },
          { id: 'c6', name: '蒜香炸鸡', price: 28 },
          { id: 'c7', name: '薯条', price: 10 },
        ]
      }
    ],
    '川菜': [
      {
        id: 'cat1',
        name: '招牌菜',
        items: [
          { id: 's1', name: '回锅肉', price: 32, description: '肥瘦相间，蒜苗爆香', isPopular: true, isSpicy: true },
          { id: 's2', name: '宫保鸡丁', price: 28, description: '花生香脆，鸡肉嫩滑', isPopular: true },
          { id: 's3', name: '麻婆豆腐', price: 18, description: '麻辣鲜香', isSpicy: true },
        ]
      },
      {
        id: 'cat2',
        name: '主食',
        items: [
          { id: 's4', name: '米饭', price: 2 },
          { id: 's5', name: '蛋炒饭', price: 12 },
          { id: 's6', name: '担担面', price: 15, isSpicy: true },
        ]
      }
    ],
    '日料': [
      {
        id: 'cat1',
        name: '定食',
        items: [
          { id: 'j1', name: '咖喱饭套餐', price: 32, description: '浓郁咖喱+炸鸡排+汤', isPopular: true },
          { id: 'j2', name: '照烧鸡排饭', price: 30, description: '嫩滑鸡排+酱汁', isPopular: true },
          { id: 'j3', name: '豚骨拉面', price: 35, description: '8小时熬制汤底' },
        ]
      },
      {
        id: 'cat2',
        name: '小食',
        items: [
          { id: 'j4', name: '章鱼小丸子', price: 15 },
          { id: 'j5', name: '日式煎饺', price: 18 },
          { id: 'j6', name: '味增汤', price: 8 },
        ]
      }
    ],
    '沙县': [
      {
        id: 'cat1',
        name: '经典',
        items: [
          { id: 'x1', name: '蒸饺', price: 6, description: '皮薄馅大', isPopular: true },
          { id: 'x2', name: '拌面', price: 5, description: '花生酱香浓', isPopular: true },
          { id: 'x3', name: '炖罐', price: 12, description: '营养滋补' },
        ]
      },
      {
        id: 'cat2',
        name: '套餐',
        items: [
          { id: 'x4', name: 'A套餐', price: 12, description: '拌面+蒸饺+汤' },
          { id: 'x5', name: 'B套餐', price: 15, description: '炒饭+炖罐' },
        ]
      }
    ],
    '轻食': [
      {
        id: 'cat1',
        name: '沙拉',
        items: [
          { id: 'l1', name: '鸡胸肉沙拉', price: 32, description: '低脂高蛋白', isPopular: true },
          { id: 'l2', name: '金枪鱼沙拉', price: 35, description: '深海金枪鱼', isPopular: true },
          { id: 'l3', name: '素食沙拉', price: 28, description: '新鲜蔬菜' },
        ]
      },
      {
        id: 'cat2',
        name: '主食',
        items: [
          { id: 'l4', name: '藜麦饭', price: 8 },
          { id: 'l5', name: '全麦三明治', price: 22 },
          { id: 'l6', name: '蔬菜卷', price: 18 },
        ]
      }
    ],
    '黄焖鸡': [
      {
        id: 'cat1',
        name: '黄焖系列',
        items: [
          { id: 'h1', name: '黄焖鸡小份', price: 18, description: '鸡肉+土豆+青椒', isPopular: true },
          { id: 'h2', name: '黄焖鸡大份', price: 25, description: '更多鸡肉', isPopular: true },
          { id: 'h3', name: '黄焖排骨', price: 28, description: '精选排骨' },
          { id: 'h4', name: '黄焖猪蹄', price: 30, description: '胶原蛋白满满' },
        ]
      },
      {
        id: 'cat2',
        name: '加料',
        items: [
          { id: 'h5', name: '米饭', price: 2 },
          { id: 'h6', name: '加鸡肉', price: 8 },
          { id: 'h7', name: '加蔬菜', price: 5 },
        ]
      }
    ],
    '小面': [
      {
        id: 'cat1',
        name: '面食',
        items: [
          { id: 'v1', name: '豌杂面', price: 14, description: '豌豆软糯+肉酱香', isPopular: true, isSpicy: true },
          { id: 'v2', name: '重庆小面', price: 12, description: '麻辣鲜香', isPopular: true, isSpicy: true },
          { id: 'v3', name: '牛肉面', price: 16, description: '大块牛肉' },
        ]
      },
      {
        id: 'cat2',
        name: '小菜',
        items: [
          { id: 'v4', name: '酸辣粉', price: 12, isSpicy: true },
          { id: 'v5', name: '凉糕', price: 6 },
          { id: 'v6', name: '卤蛋', price: 2 },
        ]
      }
    ],
    '饺子': [
      {
        id: 'cat1',
        name: '水饺',
        items: [
          { id: 'd1', name: '酸菜猪肉饺', price: 18, description: '东北特色', isPopular: true },
          { id: 'd2', name: '韭菜鸡蛋饺', price: 15, description: '经典口味', isPopular: true },
          { id: 'd3', name: '三鲜饺', price: 20, description: '虾仁+猪肉+韭菜' },
        ]
      },
      {
        id: 'cat2',
        name: '煎饺',
        items: [
          { id: 'd4', name: '锅贴', price: 16 },
          { id: 'd5', name: '煎饺', price: 16 },
        ]
      }
    ],
    '烧腊': [
      {
        id: 'cat1',
        name: '烧腊',
        items: [
          { id: 'b1', name: '烧鹅饭', price: 38, description: '皮脆肉嫩', isPopular: true },
          { id: 'b2', name: '叉烧饭', price: 32, description: '肥瘦相间', isPopular: true },
          { id: 'b3', name: '烧鸭饭', price: 28, description: '配酸梅酱' },
          { id: 'b4', name: '双拼饭', price: 42, description: '烧鹅+叉烧' },
        ]
      },
      {
        id: 'cat2',
        name: '单点',
        items: [
          { id: 'b5', name: '白切鸡', price: 35 },
          { id: 'b6', name: '卤水拼盘', price: 28 },
        ]
      }
    ],
    '螺蛳粉': [
      {
        id: 'cat1',
        name: '螺蛳粉',
        items: [
          { id: 'p1', name: '原味螺蛳粉', price: 15, description: '经典口味', isPopular: true, isSpicy: true },
          { id: 'p2', name: '加蛋螺蛳粉', price: 17, description: '配卤蛋', isSpicy: true },
          { id: 'p3', name: '全家福', price: 22, description: '加腐竹+鸭脚+蛋', isSpicy: true },
        ]
      },
      {
        id: 'cat2',
        name: '加料',
        items: [
          { id: 'p4', name: '腐竹', price: 3 },
          { id: 'p5', name: '鸭脚', price: 5 },
          { id: 'p6', name: '酸笋', price: 2 },
        ]
      }
    ],
    '披萨': [
      {
        id: 'cat1',
        name: '披萨',
        items: [
          { id: 'z1', name: '超级至尊', price: 58, description: '多种肉类+蔬菜', isPopular: true },
          { id: 'z2', name: '海鲜至尊', price: 62, description: '虾仁+鱿鱼', isPopular: true },
          { id: 'z3', name: '榴莲披萨', price: 55, description: '浓郁榴莲' },
          { id: 'z4', name: '水果披萨', price: 48, description: '清新水果' },
        ]
      },
      {
        id: 'cat2',
        name: '小食',
        items: [
          { id: 'z5', name: '意面', price: 28 },
          { id: 'z6', name: '鸡翅', price: 22 },
          { id: 'z7', name: '沙拉', price: 18 },
        ]
      }
    ],
    '粥': [
      {
        id: 'cat1',
        name: '砂锅粥',
        items: [
          { id: 'g1', name: '皮蛋瘦肉粥', price: 12, description: '经典养胃', isPopular: true },
          { id: 'g2', name: '海鲜粥', price: 18, description: '鲜虾+鱼片' },
          { id: 'g3', name: '排骨粥', price: 15, description: '营养滋补' },
        ]
      },
      {
        id: 'cat2',
        name: '配菜',
        items: [
          { id: 'g4', name: '油条', price: 3 },
          { id: 'g5', name: '咸菜', price: 2 },
          { id: 'g6', name: '卤蛋', price: 2 },
        ]
      }
    ],
  };
  
  return menus[type] || menus['麻辣烫'];
};

// 上海五角场大学城商业街地址列表
const universityAddresses = [
  "淞沪路8号百联又一城购物中心B1层美食街A12",
  "政通路189号万达广场C座2层205室",
  "国宾路36号五角场万达广场B1层108号",
  "翔殷路1099号合生汇L5层美食广场",
  "淞沪路303号创智天地广场3期B1层",
  "政民路485号国定路菜市场2楼A03",
  "国定路333号三号湾广场1层K15",
  "邯郸路399号财富大酒店B1层",
  "淞沪路234号创智天地1号楼2层",
  "政立路775号东方商厦B1层",
  "国和路777号中原城市广场2期1层",
  "翔殷路1128号沪东金融大厦3层",
  "黄兴路2228号上海合生国际广场B2层",
  "国定东路200号创业者公共实训基地1层",
  "政通路240号复旦大学科技园大厦B1层",
  "淞沪路388号创智天地企业中心7号楼"
];

// 餐厅基础数据
const restaurantBaseData = [
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
    iconBg: "from-red-500 to-orange-500",
    menuType: "麻辣烫",
    businessHours: "10:00-02:00",
    phone: "138-0000-0001",
    address: "淞沪路8号百联又一城购物中心B1层美食街A12"
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
    iconBg: "from-amber-500 to-yellow-500",
    menuType: "拉面",
    businessHours: "06:00-22:00",
    phone: "138-0000-0002",
    address: "政通路189号万达广场C座2层205室"
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
    iconBg: "from-orange-500 to-red-500",
    menuType: "炸鸡",
    businessHours: "11:00-23:00",
    phone: "138-0000-0003",
    address: "国宾路36号五角场万达广场B1层108号"
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
    iconBg: "from-red-600 to-red-500",
    menuType: "川菜",
    businessHours: "10:30-21:30",
    phone: "138-0000-0004",
    address: "翔殷路1099号合生汇L5层美食广场"
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
    iconBg: "from-yellow-600 to-amber-500",
    menuType: "日料",
    businessHours: "11:00-21:00",
    phone: "138-0000-0005",
    address: "淞沪路303号创智天地广场3期B1层"
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
    iconBg: "from-neutral-500 to-neutral-600",
    menuType: "沙县",
    businessHours: "06:30-22:00",
    phone: "138-0000-0006",
    address: "政民路485号国定路菜市场2楼A03"
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
    iconBg: "from-green-500 to-emerald-500",
    menuType: "轻食",
    businessHours: "09:00-20:00",
    phone: "138-0000-0007",
    address: "国定路333号三号湾广场1层K15"
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
    iconBg: "from-amber-600 to-yellow-600",
    menuType: "黄焖鸡",
    businessHours: "10:00-22:00",
    phone: "138-0000-0008",
    address: "邯郸路399号财富大酒店B1层"
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
    iconBg: "from-red-500 to-orange-600",
    menuType: "小面",
    businessHours: "07:00-21:00",
    phone: "138-0000-0009",
    address: "淞沪路234号创智天地1号楼2层"
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
    iconBg: "from-yellow-500 to-amber-500",
    menuType: "饺子",
    businessHours: "10:00-22:00",
    phone: "138-0000-0010",
    address: "政立路775号东方商厦B1层"
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
    iconBg: "from-red-400 to-red-500",
    menuType: "烧腊",
    businessHours: "10:30-20:30",
    phone: "138-0000-0011",
    address: "国和路777号中原城市广场2期1层"
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
    iconBg: "from-yellow-600 to-yellow-700",
    menuType: "螺蛳粉",
    businessHours: "09:00-22:00",
    phone: "138-0000-0012",
    address: "翔殷路1128号沪东金融大厦3层"
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
    iconBg: "from-orange-300 to-yellow-400",
    menuType: "拉面",
    businessHours: "11:00-21:30",
    phone: "138-0000-0013",
    address: "黄兴路2228号上海合生国际广场B2层"
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
    iconBg: "from-red-500 to-red-600",
    menuType: "川菜",
    businessHours: "10:00-22:00",
    phone: "138-0000-0014",
    address: "国定东路200号创业者公共实训基地1层"
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
    iconBg: "from-yellow-400 to-orange-400",
    menuType: "披萨",
    businessHours: "10:00-22:00",
    phone: "138-0000-0015",
    address: "政通路240号复旦大学科技园大厦B1层"
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
    iconBg: "from-neutral-300 to-neutral-400",
    menuType: "粥",
    businessHours: "06:00-21:00",
    phone: "138-0000-0016",
    address: "淞沪路388号创智天地企业中心7号楼"
  }
];

// 生成完整的餐厅数据
export const restaurants: Restaurant[] = restaurantBaseData.map(r => ({
  ...r,
  officialImages: generateOfficialImages(r.image),
  menu: generateDefaultMenu(r.menuType),
}));

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
    school: "复旦大学",
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
    school: "同济大学",
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
    school: "上海大学",
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
    userName: "奶茶续命选手",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    school: "上海财经大学",
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
    school: "上海理工大学",
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
    school: "上海外国语大学",
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
    school: "上海海洋大学",
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
    school: "上海体育学院",
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
    school: "上海政法学院",
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
    school: "复旦大学",
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
    school: "华东理工大学",
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
    school: "东华大学",
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
    school: "上海中医药大学",
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
    school: "上海师范大学",
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
    school: "上海海事大学",
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
    school: "上海体育学院",
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
    school: "上海对外经贸大学",
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
      school: "复旦大学"
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
      school: "同济大学"
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
      school: "上海财经大学"
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
      school: "上海大学"
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
      school: "东华大学"
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
      school: "上海海洋大学"
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
      school: "华东理工大学"
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
      school: "上海对外经贸大学"
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
      school: "复旦大学"
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
      school: "同济大学"
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
      school: "上海理工大学"
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
      school: "上海大学"
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
      school: "上海财经大学"
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
      school: "上海外国语大学"
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
      school: "上海体育学院"
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
      school: "华东政法大学"
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
