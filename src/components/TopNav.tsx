import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Megaphone, Repeat, Bell, Settings, LogOut, Palette, ChevronRight, Zap, History, User, Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopNavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isRegistered?: boolean;
  onRegister?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ currentView, onViewChange, isRegistered, onRegister }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: 'light' | 'dark' | 'system') => {
      if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme('system');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const handleProfileClick = () => {
    onViewChange('profile');
    setShowProfileMenu(false);
  };

  const handleUpgradeClick = () => {
    onViewChange('pricing');
    setShowProfileMenu(false);
  };

  const handleSettingsClick = () => {
    onViewChange('settings');
    setShowProfileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm z-50 flex items-center justify-between px-8">
      <div className="flex items-center gap-12">
        <span className="text-2xl font-extrabold text-primary font-display tracking-tight">AI图片工作室</span>
        <nav className="hidden lg:flex items-center gap-2">
          <button 
            onClick={() => onViewChange('home')}
            className={`px-4 py-2 rounded-xl transition-all text-sm font-bold ${
              currentView === 'home' 
                ? 'bg-on-surface text-surface dark:bg-surface-container-highest dark:text-on-surface' 
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            首页
          </button>
          <button 
            onClick={() => onViewChange('image-gen')}
            className={`px-4 py-2 rounded-xl transition-all text-sm font-bold ${
              ['image-gen', 'video-gen', 'history'].includes(currentView) 
                ? 'bg-on-surface text-surface dark:bg-surface-container-highest dark:text-on-surface' 
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            工作台
          </button>
          <button 
            onClick={() => onViewChange('models')}
            className={`px-4 py-2 rounded-xl transition-all text-sm font-bold whitespace-nowrap ${
              currentView === 'models' 
                ? 'bg-on-surface text-surface dark:bg-surface-container-highest dark:text-on-surface' 
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            模型
          </button>
          {['功能', '教程', '关于我们'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all text-sm font-bold whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 mr-4">
          <button 
            onClick={() => onViewChange('changelog')}
            className={`p-2 rounded-xl transition-all relative group ${currentView === 'changelog' ? 'bg-on-surface text-surface dark:bg-surface-container-highest dark:text-on-surface' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <Repeat size={20} />
            <div className="absolute top-full mt-2 right-0 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">更新日志</div>
          </button>
          
          <button 
            onClick={() => onViewChange('announcements')}
            className={`p-2 rounded-xl transition-all relative group ${currentView === 'announcements' ? 'bg-on-surface text-surface dark:bg-surface-container-highest dark:text-on-surface' : 'text-on-surface-variant hover:bg-surface-container'}`}
          >
            <Bell size={20} />
            <div className="absolute top-full mt-2 right-0 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">公告通知</div>
          </button>
        </div>

        <div className="relative group flex items-center gap-4">
           {!isRegistered && (
             <button 
               onClick={onRegister}
               className="bg-primary-container text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
             >
              立即体验
            </button>
           )}
          <div 
            className="relative z-50"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 cursor-pointer hover:border-primary transition-all overflow-hidden shrink-0 shadow-sm"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtdv98ZsHffu3_3XYeVZ4aVdqwtHx69OP6nNv23rv09fD17MVL-m1wDVc_92ndC2kqAXZ5cmHB2Rq0ID-ogp0QUbcvIUdmWsf01cZfC6o_Ms7UOQYqi-lJ6yWnD55QRL0N-bb99MzONG2-2WjeTDwpd1seMtW-QsnKMSsL5pwRRcAI74VVeWceT9oPRVIenzDd4TgL9c6CN4oyxAv833uJsI6-VMVE6B2nFVozlA4o0uARLtyEo2KqBi2RlxKaeNPyadX-yFbWbtA" 
                className="w-full h-full rounded-full object-cover"
                alt="Profile"
              />
            </div>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-80 bg-surface rounded-3xl border border-outline-variant shadow-2xl overflow-hidden p-6"
                >
                  {/* User Info Header - Clickable */}
                  <div 
                    onClick={handleProfileClick}
                    className="flex items-center gap-4 mb-6 cursor-pointer group/header"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden group-hover/header:border-primary transition-all">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtdv98ZsHffu3_3XYeVZ4aVdqwtHx69OP6nNv23rv09fD17MVL-m1wDVc_92ndC2kqAXZ5cmHB2Rq0ID-ogp0QUbcvIUdmWsf01cZfC6o_Ms7UOQYqi-lJ6yWnD55QRL0N-bb99MzONG2-2WjeTDwpd1seMtW-QsnKMSsL5pwRRcAI74VVeWceT9oPRVIenzDd4TgL9c6CN4oyxAv833uJsI6-VMVE6B2nFVozlA4o0uARLtyEo2KqBi2RlxKaeNPyadX-yFbWbtA" 
                        className="w-full h-full rounded-full object-cover"
                        alt="Profile Large"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight leading-tight group-hover/header:text-primary transition-colors text-on-surface">用户 9527</h4>
                      <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                        账号设置 <ChevronRight size={12} />
                      </p>
                    </div>
                  </div>

                  {/* Personal Info Quick Link - Clickable */}
                  <div className="mb-6">
                    <button 
                      onClick={handleProfileClick}
                      className="w-full flex items-center justify-between p-4 bg-surface-container rounded-2xl hover:bg-primary hover:text-on-primary transition-all group/item"
                    >
                      <div className="flex items-center gap-3">
                        <User size={18} className="group-hover/item:text-on-primary" />
                        <span className="text-sm font-black">个人信息</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Points Section */}
                  <div className="mb-6 space-y-4">
                    <div className="p-5 bg-primary/5 rounded-[1.5rem] border border-primary/10">
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">剩余积分</div>
                      <div className="text-3xl font-black text-primary">2,500 <span className="text-sm font-bold opacity-60">PTS</span></div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <button 
                          onClick={handleUpgradeClick}
                          className="flex items-center justify-center gap-2 py-3 bg-primary text-on-primary rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                          <Zap size={14} />
                          升级
                        </button>
                        <button 
                          onClick={() => {
                            onViewChange('history');
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center justify-center gap-2 py-3 bg-surface border border-outline-variant rounded-xl text-xs font-black hover:bg-on-surface hover:text-white transition-all"
                        >
                          <History size={14} />
                          使用详情
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    <div className="w-full flex items-center justify-between p-4 bg-surface-container/50 rounded-2xl transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-on-surface/5 rounded-xl text-primary">
                          <Palette size={18} />
                        </div>
                        <span className="text-sm font-bold text-on-surface">主题颜色</span>
                      </div>
                      <div className="flex bg-surface-container rounded-xl border border-outline-variant p-1 shadow-inner">
                        <button 
                          onClick={() => setTheme('light')}
                          title="浅色"
                          className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                        >
                          <Sun size={14} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => setTheme('dark')}
                          title="深色"
                          className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                        >
                          <Moon size={14} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => setTheme('system')}
                          title="跟随系统"
                          className={`p-2 rounded-lg transition-all ${theme === 'system' ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                        >
                          <Monitor size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={handleSettingsClick}
                      className="w-full flex items-center justify-between p-4 hover:bg-surface-container rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-on-surface/5 rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-all">
                          <Settings size={18} />
                        </div>
                        <span className="text-sm font-bold text-on-surface">设置</span>
                      </div>
                      <ChevronRight size={16} className="text-on-surface-variant" />
                    </button>
                    <div className="h-px bg-outline-variant my-2 px-4" />
                    <button className="w-full flex items-center justify-between p-4 hover:bg-rose-500/10 text-rose-600 rounded-2xl transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-500/10 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                          <LogOut size={18} />
                        </div>
                        <span className="text-sm font-black">退出登录</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

