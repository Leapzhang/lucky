// updated Settings interface with new fields
export interface Participant {
  id: string;
  name: string;
  dept: string;
  mustWinPrizeId: string | null; // 内定中特定奖项 ID，null 为无内定
  banned: boolean;
  weight: number;
}

export interface Winner extends Participant {
  prizeId: string;
  roundId: string;
  wonAt: number;
}

export interface Prize {
  id: string;
  name: string;
  count: number;
  description?: string;  // 奖品描述（如：iPhone 16 Pro）
  image?: string;
}

export interface Settings {
  title: string;
  password: string; // simple local password
  welcomeTitle: string;
  welcomeSubtitle: string;
  prizePageTitle: string;  // 奖项页标题
  logo?: string;  // 公司 logo (base64)

  // 新增设置
  bgImage?: string; // 自定义背景（base64 或 URL）
  bgOverlayOpacity?: number; // 遮罩透明度，0 ~ 1（默认 0.6）
  winAnimation?: 'none' | 'scale' | 'flash' | 'confetti'; // 中奖展示动画效果
  welcomeFontSize?: number; // 欢迎页主标题字体大小（px）
  lotteryFontSize?: number; // 抽奖页主标题字体大小（px）
}
