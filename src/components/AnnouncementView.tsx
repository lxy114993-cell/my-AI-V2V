import React from 'react';
import { Megaphone, Filter, Search, ArrowRight } from 'lucide-react';

export const AnnouncementView: React.FC = () => {
  const announcements = [
    {
      id: 1,
      date: '2023-12-24 10:00',
      title: '「创意之巅」AI 绘画大赛正式开启！',
      content: '各位创作者，我们诚挚邀请您参加本年度规模最大的 AI 艺术盛典。本次大赛设有超过 50,000 元的奖金池，并有机会获得官方认证的艺术家勋章以及平台算力终身特权。无论你是写实派还是抽象派，这里都有你的舞台...',
      tags: ['置顶', '活动'],
      featured: true
    },
    {
      id: 2,
      date: '2023-12-20 15:30',
      title: 'V3.5 版本更新：新增多模型融合功能',
      content: '本次更新重点引入了“混合渲染”引擎，支持同时调用 Stable Diffusion 与 Midjourney 风格包进行深度融合。同时，我们优化了生成的排队算法，VIP 用户的平均出图时间将缩短 30%...',
      tags: ['系统'],
      featured: false
    },
    {
      id: 3,
      date: '2023-12-15 09:00',
      title: '关于算力系统维护的通知',
      content: '为了提供更稳定的生成服务，我们将于本周六凌晨 02:00 - 04:00 对核心集群进行硬件升级维护。维护期间生成功能将不可用，请各位用户提前做好创作安排。对于给您带来的不便我们深表歉意...',
      tags: ['通知'],
      featured: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-on-background font-display mb-2">平台公告</h1>
          <p className="text-on-surface-variant font-medium">关注最新动态与官方通知</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors shadow-sm">
            <Filter size={20} />
          </button>
          <button className="p-2.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors shadow-sm">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            className={`glass-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all cursor-pointer relative group border-l-4 ${item.featured ? 'border-primary' : 'border-transparent'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-semibold text-outline tracking-wider uppercase">{item.date}</span>
                <h2 className="text-2xl font-bold text-on-background mt-1 group-hover:text-primary transition-colors font-display">
                  {item.title}
                </h2>
              </div>
              <div className="flex gap-2">
                {item.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      tag === '置顶' ? 'bg-primary text-white' : 
                      tag === '活动' ? 'bg-secondary-container/20 text-secondary' : 
                      tag === '通知' ? 'bg-error-container text-on-error-container' :
                      'bg-tertiary-container/20 text-tertiary'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed line-clamp-2 mb-6">
              {item.content}
            </p>
            <div className="flex items-center text-primary font-bold gap-1 text-sm group-hover:translate-x-1 transition-transform">
              <span>查看全文</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
