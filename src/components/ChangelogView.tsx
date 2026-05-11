import React from 'react';
import { Rocket, History as HistoryIcon, Flag, CheckCircle2, TrendingUp, Bug } from 'lucide-react';

export const ChangelogView: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto py-12 px-8">
      <header className="mb-16">
        <h1 className="text-5xl font-extrabold text-on-background font-display mb-3 tracking-tight">更新日志</h1>
        <p className="text-xl text-on-surface-variant font-medium max-w-2xl">探索 AI图片工作室 的进化历程，我们致力于不断优化您的创作体验。</p>
      </header>

      <div className="relative pl-12 space-y-24 before:content-[''] before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary-container before:to-surface-container">
        
        {/* Version 3.0 */}
        <section className="relative">
          <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg z-10">
            <Rocket size={20} />
          </div>
          <div className="glass-card rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-bold text-primary font-display">v3.0.0 重大版本更新</h3>
                <p className="text-sm font-semibold text-on-surface-variant mt-1 uppercase tracking-widest">发布日期：2024年10月24日</p>
              </div>
              <span className="bg-secondary-container/20 text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold uppercase">当前版本</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">新增功能</span>
                </div>
                <ul className="space-y-2.5 text-on-surface-variant text-sm leading-relaxed">
                  <li className="flex gap-2"><span>•</span> <span>全新自研 FLUX.1 Pro 模型支持，生成画质大幅提升。</span></li>
                  <li className="flex gap-2"><span>•</span> <span>新增 AI 扩图功能，支持 2x 到 4x 的无损画面延展。</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-secondary">
                  <TrendingUp size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">优化改进</span>
                </div>
                <ul className="space-y-2.5 text-on-surface-variant text-sm leading-relaxed">
                  <li className="flex gap-2"><span>•</span> <span>重构后端架构，图像生成速度提升 40%。</span></li>
                  <li className="flex gap-2"><span>•</span> <span>优化移动端响应式布局，Pad 体验更佳。</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-error">
                  <Bug size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">修复问题</span>
                </div>
                <ul className="space-y-2.5 text-on-surface-variant text-sm leading-relaxed">
                  <li className="flex gap-2"><span>•</span> <span>修复了极端尺寸下图片边缘出现伪影的问题。</span></li>
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl h-48 relative group">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Update Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <span className="text-white text-sm font-bold tracking-wide">全新渲染引擎视觉演示</span>
              </div>
            </div>
          </div>
        </section>

        {/* Version 2.0 */}
        <section className="relative">
          <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-surface-container-high border-2 border-primary-fixed-dim flex items-center justify-center text-primary-fixed-dim z-10 bg-surface">
            <HistoryIcon size={20} />
          </div>
          <div className="glass-card rounded-2xl p-8 border-dashed opacity-80 shadow-inner">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-on-surface font-display">v2.0.0 多模态生态构建</h3>
                <p className="text-sm font-semibold text-on-surface-variant mt-1 uppercase tracking-widest">发布日期：2024年06月15日</p>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">
              首发“文生视频”模块，支持 4 秒高清视频生成。上线个人画廊系统，支持作品分类与公开分享。引入完整 API 文档，赋能开发者生态。
            </p>
          </div>
        </section>

        {/* Version 1.0 */}
        <section className="relative">
          <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-surface-container-high border-2 border-outline-variant flex items-center justify-center text-outline z-10 bg-surface">
            <Flag size={20} />
          </div>
          <div className="glass-card rounded-2xl p-8 border-dashed opacity-60 shadow-inner">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-on-surface font-display">v1.0.0 破晓首发</h3>
                <p className="text-sm font-semibold text-on-surface-variant mt-1 uppercase tracking-widest">发布日期：2024年01月01日</p>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              AI图片工作室正式上线。首推核心“文生图”引擎，内置 10 种经典风格模型，支持多种画布比例选择。开启 AI 驱动的视觉创作新时代。
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-32 pt-12 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center text-on-surface-variant gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest">© 2024 AI图片工作室. All rights reserved.</p>
        <div className="flex gap-8">
          {['隐私政策', '服务条款', '联系我们'].map(link => (
            <a key={link} href="#" className="hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};
