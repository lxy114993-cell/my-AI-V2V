import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Eye, Play, MoreHorizontal, ChevronDown, Calendar, Database, Sparkles as SparklesIcon, Heart, RotateCcw, Copy, Check, X } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface HistoryItem {
  id: number;
  title: string;
  model: string;
  type: 'image' | 'video';
  duration?: string;
  image: string;
  prompt?: string;
  isFavorite?: boolean;
  credits?: number;
}

export const HistoryView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('最近 30 天');
  const [modelFilter, setModelFilter] = useState('所有模型');
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const timeOptions = [
    { value: '最近 30 天', label: '最近 30 天', icon: <Calendar size={18} /> },
    { value: '最近 7 天', label: '最近 7 天', icon: <Calendar size={18} /> },
    { value: '全部记录', label: '全部记录', icon: <Calendar size={18} /> },
  ];

  const modelFilterOptions = [
    { value: '所有模型', label: '所有模型', icon: <Database size={18} /> },
    { value: 'ArtMaster v4', label: 'ArtMaster v4', icon: <SparklesIcon size={18} /> },
    { value: 'DreamVideo Pro', label: 'DreamVideo Pro', icon: <Play size={18} /> },
    { value: 'HyperReal v2', label: 'HyperReal v2', icon: <SparklesIcon size={18} /> },
  ];
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: 1,
      title: '赛博朋克雨夜',
      model: 'DreamVideo Pro',
      type: 'video',
      duration: '00:08',
      image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=600',
      prompt: 'Cyberpunk city street at rainy night, neon signs reflecting on puddles, cinematic lighting, 8k',
      isFavorite: false,
      credits: 10
    },
    {
      id: 2,
      title: '流体艺术探索',
      model: 'ArtMaster v4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
      prompt: 'Abstract liquid art with vibrant colors, swirling motion, high contrast, glossy texture',
      isFavorite: true,
      credits: 2
    },
    {
      id: 3,
      title: '未来人像',
      model: 'HyperReal v2',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=600',
      prompt: 'Futuristic portrait of a woman with holographic implants, soft focused background, professional photography',
      isFavorite: false,
      credits: 2
    },
    {
      id: 4,
      title: '自然景观',
      model: 'DreamVideo Pro',
      type: 'video',
      duration: '00:15',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      prompt: 'Aerial view of majestic mountain range at sunrise, clouds rolling between peaks, highly detailed',
      isFavorite: false,
      credits: 15
    },
    {
      id: 5,
      title: 'AI 核心意识',
      model: 'HyperReal v2',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
      prompt: 'Intricate mechanical core glowing with blue light, representation of AI consciousness, dark background',
      isFavorite: true,
      credits: 2
    },
    {
      id: 6,
      title: '玻璃时装设计',
      model: 'ArtMaster v4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600',
      prompt: 'Avant-garde fashion design made of translucent glass-like material, model walking on catwalk, ethereal atmosphere',
      isFavorite: false,
      credits: 2
    },
    {
      id: 7,
      title: '极光之境',
      model: 'DreamVideo Pro',
      type: 'video',
      duration: '00:10',
      image: 'https://images.unsplash.com/photo-1531366930491-81523173d281?auto=format&fit=crop&q=80&w=600',
      prompt: 'Time-lapse of aurora borealis dancing over a frozen lake, stars visible in clear night sky',
      isFavorite: false,
      credits: 10
    },
    {
      id: 8,
      title: '森林秘境',
      model: 'ArtMaster v4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600',
      prompt: 'Sunlight filtering through ancient forest canopy, mystical fog, vibrant greenery, fairy-tale vibe',
      isFavorite: false,
      credits: 2
    },
    {
      id: 9,
      title: '宇宙航行',
      model: 'HyperReal v2',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
      prompt: 'Space station orbiting a blue planet, intricate details of the hull, distant nebula, cinematic composition',
      isFavorite: false,
      credits: 2
    },
    {
      id: 10,
      title: '复古未来派广场',
      model: 'ArtMaster v4',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
      prompt: 'Retro-futuristic city square, flying cars, sleek architecture, pastel color palette',
      isFavorite: false,
      credits: 2
    }
  ]);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = (id: number) => {
    setHistoryItems(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
    if (selectedItem?.id === id) {
      setSelectedItem(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const handleOpenDetail = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const filteredItems = historyItems.filter(item => {
    const matchesModel = modelFilter === '所有模型' || item.model === modelFilter;
    return matchesModel;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="flex-1 p-8 space-y-12">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-30">
        <div>
          <h1 className="text-4xl font-extrabold text-on-surface font-display mb-2">生成历史</h1>
          <p className="text-on-surface-variant font-medium">回顾并管理您过去所有的创意足迹</p>
        </div>

        <div className="glass-panel p-4 rounded-3xl flex flex-wrap gap-6 items-center shadow-md border-white/50 relative z-40">
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
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative glass-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-transparent hover:border-primary/20"
            onClick={() => handleOpenDetail(item)}
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
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/30" onClick={(e) => e.stopPropagation()}>
                    <Download size={18} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all border border-white/30">
                    <Eye size={18} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border border-white/30 transition-all ${item.isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500/40'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    <Heart size={18} className={item.isFavorite ? 'fill-current' : ''} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all border border-white/30" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal size={18} />
                  </button>
                </div>
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

      {visibleCount < filteredItems.length && (
        <div className="flex justify-center pt-8">
          <button 
            onClick={handleLoadMore}
            className="glass-panel px-10 py-3.5 rounded-full font-bold text-sm text-on-surface hover:bg-white hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 group border-primary/10"
          >
            加载更多历史记录
            <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* 详情弹窗 */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden group/media">
                {selectedItem.type === 'image' ? (
                  <div className="w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in group/zoom">
                    <motion.img 
                      src={selectedItem.image} 
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-150" 
                      alt={selectedItem.title}
                      drag
                      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                      whileTap={{ cursor: 'grabbing' }}
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold opacity-0 group-hover/zoom:opacity-100 transition-opacity flex items-center gap-2">
                       鼠标悬停放大，按住可拖拽
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative flex flex-col bg-slate-950">
                    <div className="flex-1 relative flex items-center justify-center">
                      <img 
                        src={selectedItem.image} 
                        className="w-full h-full object-contain opacity-60" 
                        alt={selectedItem.title} 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-white border border-primary/30 hover:scale-110 hover:bg-primary/40 transition-all group/play">
                          <Play size={40} className="fill-current ml-2 group-hover/play:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                    
                    {/* 视频控制条 */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-12">
                      <div className="space-y-4">
                        {/* 进度条 */}
                        <div className="relative h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer group/progress">
                          <div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <button className="text-white hover:text-primary transition-colors">
                              <Play size={20} className="fill-current" />
                            </button>
                            <div className="text-[10px] font-black text-white flex items-center gap-2">
                              <span>00:03</span>
                              <span className="text-white/40">/</span>
                              <span className="text-white/60">{selectedItem.duration}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <button className="text-white/60 hover:text-white transition-colors">
                              <SparklesIcon size={18} />
                            </button>
                            <div className="w-[1px] h-4 bg-white/10" />
                            <button className="text-white/60 hover:text-white transition-colors text-xs font-black">
                              1080P
                            </button>
                            <button className="text-white/60 hover:text-white transition-colors">
                              <MoreHorizontal size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full md:w-[350px] p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar font-sans">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-1">{selectedItem.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{selectedItem.model}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedItem.type === 'image' ? '图像' : '视频'}</span>
                    {selectedItem.credits && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">消耗 {selectedItem.credits} 积分</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">提示词</span>
                    <button 
                      onClick={() => handleCopyPrompt(selectedItem.prompt || '')}
                      className="flex items-center gap-1 text-[10px] font-black text-primary hover:bg-primary/5 px-2 py-1 rounded transition-all"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? '已复制' : '复制提示词'}
                    </button>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed italic">
                    "{selectedItem.prompt}"
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                    <Download size={18} />
                    下载内容
                  </button>
                  <button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    <RotateCcw size={18} />
                    点击重试
                  </button>
                </div>

                <button 
                  onClick={() => toggleFavorite(selectedItem.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 ${selectedItem.isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-transparent border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-400'}`}
                >
                  <Heart size={18} className={selectedItem.isFavorite ? 'fill-current' : ''} />
                  {selectedItem.isFavorite ? '已在收藏夹' : '加入收藏夹'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
