import React from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, NavItem, NAV_ITEMS } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-[72px] flex flex-col py-8 z-40 bg-slate-950/95 backdrop-blur-xl shadow-2xl items-center border-r border-white/5 transition-all duration-500">
      {/* 左侧侧边栏组件 - 采用深色背景以突显专业感，宽度固定为 72px */}
      <nav className="flex-1 flex flex-col gap-5 w-full items-center">
        {/* 循环渲染导航项 */}
        {NAV_ITEMS.map((item) => {
          const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ElementType;
          const isActive = currentView === item.id;

          return (
            <div key={item.id} className="relative group w-full flex justify-center">
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-primary/20 text-white border-l-[3px] border-primary shadow-lg shadow-primary/10' 
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <IconComponent size={24} strokeWidth={isActive ? 2.5 : 2} />
              </button>
              {/* 悬浮标签提示 (Tooltip) */}
              <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1 bg-inverse-surface text-inverse-on-surface text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            </div>
          );
        })}
      </nav>

      {/* 底部固定功能区域 */}
      <div className="mt-auto flex flex-col items-center gap-6 pb-4">
        {/* 算力显示模块：点击可跳转至定价充值预览页面 */}
        <div className="relative group">
          <Icons.Zap 
            size={20} 
            className="text-slate-400 cursor-pointer hover:text-primary transition-colors" 
            onClick={() => onViewChange('pricing')}
          />
          <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1 bg-inverse-surface text-inverse-on-surface text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            算力: 1500 / 2000
          </div>
        </div>
        {/* 系统设置：图标在悬浮时具有 90 度旋转动画 */}
        <div className="relative group">
          <Icons.Settings 
            size={20} 
            className="text-slate-400 cursor-pointer hover:rotate-90 hover:text-primary transition-all duration-500" 
            onClick={() => onViewChange('settings')}
          />
          <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1 bg-inverse-surface text-inverse-on-surface text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            系统设置
          </div>
        </div>
      </div>
    </aside>
  );
};
