import React, { useState } from 'react';
import { Download, Eye, Play, MoreHorizontal, ChevronDown, Calendar, Database, Sparkles as SparklesIcon } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

export const HistoryView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('最近 30 天');
  const [modelFilter, setModelFilter] = useState('所有模型');

  const timeOptions = [
    { value: '最近 30 天', label: '最近 30 天', icon: <Calendar size={18} /> },
    { value: '最近 7 天', label: '最近 7 天', icon: <Calendar size={18} /> },
    { value: '全部记录', label: '全部记录', icon: <Calendar size={18} /> },
  ];

  const modelFilterOptions = [
    { value: '所有模型', label: '所有模型', icon: <Database size={18} /> },
    { value: 'ArtMaster v4', label: 'ArtMaster v4', icon: <SparklesIcon size={18} /> },
    { value: 'DreamVideo Pro', label: 'DreamVideo Pro', icon: <Play size={18} /> },
  ];
  const historyItems = [
    {
      id: 1,
      title: '赛博朋克雨夜',
      model: 'DreamVideo Pro',
      type: 'video',
      duration: '00:08',
      image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      title: '流体艺术探索',
      model: 'ArtMaster v4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      title: '未来人像',
      model: 'HyperReal v2',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 4,
      title: '自然景观',
      model: 'DreamVideo Pro',
      type: 'video',
      duration: '00:15',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 5,
      title: 'AI 核心意识',
      model: 'HyperReal v2',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 6,
      title: '玻璃时装设计',
      model: 'ArtMaster v4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="flex-1 p-8 space-y-12">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-extrabold text-on-surface font-display mb-2">生成历史</h1>
          <p className="text-on-surface-variant font-medium">回顾并管理您过去所有的创意足迹</p>
        </div>

        <div className="glass-panel p-4 rounded-3xl flex flex-wrap gap-6 items-center shadow-md border-white/50">
          <div className="w-[180px]">
            <CustomSelect
              label="时间范围"
              options={timeOptions}
              value={timeRange}
              onChange={setTimeRange}
              icon={<Calendar size={18} />}
            />
          </div>
          <div className="w-px h-12 bg-outline-variant/30 hidden md:block mt-6"></div>
          <div className="w-[200px]">
            <CustomSelect
              label="生成模型"
              options={modelFilterOptions}
              value={modelFilter}
              onChange={setModelFilter}
              icon={<Database size={18} />}
            />
          </div>
          <div className="w-px h-12 bg-outline-variant/30 hidden md:block mt-6"></div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">内容类型</span>
            <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <button className="bg-white text-primary px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight shadow-sm transition-all hover:scale-105 active:scale-95">全部</button>
              <button className="text-on-surface-variant hover:text-on-surface px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all active:scale-95">图片</button>
              <button className="text-on-surface-variant hover:text-on-surface px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all active:scale-95">视频</button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {historyItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative glass-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-transparent hover:border-primary/20"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={item.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {item.type === 'video' && (
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/20">
                  <Play size={12} className="text-white fill-current" />
                  <span className="text-white text-[10px] font-bold tracking-wider">{item.duration}</span>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/30">
                    <Download size={18} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all border border-white/30">
                    <Eye size={18} />
                  </button>
                </div>
                <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all border border-white/30">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
            <div className="p-5 flex justify-between items-center bg-white/40 relative z-10 border-t border-white/20">
              <div>
                <p className="text-sm font-bold text-on-surface truncate w-32 font-display">{item.title}</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mt-0.5">{item.model}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button className="glass-panel px-10 py-3.5 rounded-full font-bold text-sm text-on-surface hover:bg-white hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 group border-primary/10">
          加载更多历史记录
          <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
