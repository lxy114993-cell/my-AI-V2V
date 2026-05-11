import React, { useState } from 'react';
import { ViewType } from './types';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { ImageGenView } from './components/ImageGenView';
import { VideoGenView } from './components/VideoGenView';
import { HistoryView } from './components/HistoryView';
import { AnnouncementView } from './components/AnnouncementView';
import { ChangelogView } from './components/ChangelogView';
import { HomeView } from './components/HomeView';
import { ModelsView } from './components/ModelsView';
import { ProfileView } from './components/ProfileView';
import { PricingView } from './components/PricingView';
import { SettingsView } from './components/SettingsView';
import { RegisterView } from './components/RegisterView';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  /**
   * 视图渲染引擎
   * 根据当前 currentView 状态返回对应的功能组件
   */
  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onRegister={() => setIsRegisterModalOpen(true)} />;
      case 'image-gen': return <ImageGenView onViewChange={setCurrentView} />;
      case 'video-gen': return <VideoGenView />;
      case 'history': return <HistoryView />;
      case 'announcements': return <AnnouncementView />;
      case 'changelog': return <ChangelogView />;
      case 'models': return <ModelsView />;
      case 'profile': return <ProfileView />;
      case 'pricing': return <PricingView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView onRegister={() => setIsRegisterModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* 全局顶部导航栏 */}
      <TopNav 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isRegistered={isRegistered} 
        onRegister={() => setIsRegisterModalOpen(true)}
      />
      <div className="flex pt-16 h-screen overflow-hidden">
        {/* 
            侧边栏控制：
            在特定的全局页面（如首页、定价、个人资料、模型展示等）隐藏侧边栏，
            以获得更沉浸式的视觉体验。
        */}
        {!['home', 'models', 'profile', 'pricing', 'settings'].includes(currentView) && <Sidebar currentView={currentView} onViewChange={setCurrentView} />}
        
        {/* 主内容区域：根据侧边栏是否存在动态调整边距 (ml-[72px]) */}
        <main className={`flex-1 ${!['home', 'models', 'profile', 'pricing', 'settings'].includes(currentView) ? 'ml-[72px]' : ''} overflow-y-auto custom-scrollbar relative`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
          
          {/* 装饰性背景光晕元素 - 增强界面的科技感和层次感 */}
          <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none transition-all" />
          <div className="fixed bottom-0 left-[300px] -z-10 w-[500px] h-[500px] bg-secondary-container/5 blur-[100px] rounded-full pointer-events-none transition-all" />
        </main>
      </div>

      {/* 注册账号悬浮窗口 */}
      <RegisterView 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={() => {
          setIsRegistered(true);
          if (currentView === 'home') setCurrentView('image-gen');
        }}
      />
    </div>
  );
}
