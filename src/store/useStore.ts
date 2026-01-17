// 修改：把 settings 的默认值扩展，添加新的字段并保证被持久化
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import Papa from 'papaparse';
import type { Participant, Winner, Prize, Settings } from '../lib/types';
import { drawWinners } from '../lib/lottery-logic';

interface LotteryState {
  participants: Participant[];
  winners: Winner[]; // 历史所有中奖记录
  prizes: Prize[];
  
  // 实时状态（用于多屏同步）
  currentPrizeId: string | null;
  isRolling: boolean;
  roundWinners: Participant[]; // 当前轮次已计算出的中奖者（等待展示）
  viewMode: 'welcome' | 'lottery' | 'prize';  // prize: 奖项展示页
  
  settings: Settings;
  
  // Actions
  importParticipants: (csvText: string, includeControlledFields?: boolean) => { success: boolean; count: number; error?: string };
  addPrize: (name: string, count: number) => void;
  updatePrize: (id: string, updates: Partial<Prize>) => void;
  removePrize: (id: string) => void;
  /* ... 其它 action 声明 ... */
}

export const useLotteryStore = create<LotteryState>()(
  persist(
    (set, get) => ({
      participants: [],
      winners: [],
      prizes: [
        { id: '1', name: '三等奖', count: 5 },
        { id: '2', name: '二等奖', count: 3 },
        { id: '3', name: '一等奖', count: 1 },
      ],
      currentPrizeId: '1',
      isRolling: false,
      roundWinners: [],
      viewMode: 'welcome',
      
      settings: {
        title: 'Lucky Draw 2026',
        password: 'admin',
        welcomeTitle: 'ANNUAL PARTY',
        welcomeSubtitle: 'Welcome',
        prizePageTitle: '今日奖项',
        logo: '',
        // 新增默认值
        bgImage: '',
        bgOverlayOpacity: 0.6,
        winAnimation: 'scale',
        welcomeFontSize: 72, // px，默认数值可调整
        lotteryFontSize: 56, // px
      },

      // ... actions implementation ...
      setSettings: (updates: Partial<Settings>) => {
        set(state => ({ settings: { ...state.settings, ...updates } }));
      },

      // 其余实现保持不变 ...
    }),
    {
      name: 'lucky-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
