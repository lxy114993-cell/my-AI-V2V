import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wand2, UploadCloud, Download, Share2, ZoomIn, ChevronDown, Crop, Cpu, Zap, Layers } from 'lucide-react';
import { ViewType } from '../types';
import { CustomSelect } from './CustomSelect';

interface ImageGenViewProps {
  onViewChange?: (view: ViewType) => void;
}

export const ImageGenView: React.FC<ImageGenViewProps> = ({ onViewChange }) => {
  const [currentModel, setCurrentModel] = useState('SDXL Turbo v2.0');
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState('2K');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isAspectRatioOpen, setIsAspectRatioOpen] = useState(false);
  const [ratioFilter, setRatioFilter] = useState<'all' | 'portrait' | 'landscape' | 'square'>('all');
  
  const modelOptions = [
    { value: 'SDXL Turbo v2.0', label: 'SDXL Turbo v2.0', icon: <Cpu size={18} /> },
    { value: 'Midjourney v6.0 Adapt', label: 'Midjourney v6.0 Adapt', icon: <Zap size={18} /> },
    { value: 'Stable Diffusion XL', label: 'Stable Diffusion XL', icon: <Layers size={18} /> },
  ];

  const aspectRatios = [
    { label: '1:1', w: 24, h: 24, type: 'square' },
    { label: '9:16', w: 18, h: 32, type: 'portrait' },
    { label: '16:9', w: 32, h: 18, type: 'landscape' },
    { label: '4:5', w: 24, h: 30, type: 'portrait' },
    { label: '5:4', w: 30, h: 24, type: 'landscape' },
    { label: '2:3', w: 18, h: 27, type: 'portrait' },
    { label: '3:2', w: 27, h: 18, type: 'landscape' },
    { label: '21:9', w: 36, h: 16, type: 'landscape' }
  ];

  const filteredRatios = aspectRatios.filter(ar => ratioFilter === 'all' || ar.type === ratioFilter);

  const recentGenerations = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?auto=format&fit=crop&q=80&w=200'
  ];

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* 左侧工具面板：用于配置 AI 生成参数，采用深色 (Slate 900) 风格以突出中间成品区域 */}
      <section className="w-[350px] shrink-0 h-full bg-slate-900 border-r border-white/5 p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        {/* 模型切换：支持深色模式的自定义选择器 */}
        <CustomSelect
          label="模型选择"
          options={modelOptions}
          value={currentModel}
          onChange={setCurrentModel}
          icon={<Cpu size={18} />}
          dark={true}
        />

        {/* 参考图图片文件上传区域 */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">参考图</label>
          <div className="w-full border-2 border-dashed border-white/10 rounded-2xl h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer group shadow-inner">
            <UploadCloud size={24} className="text-slate-500 group-hover:text-primary transition-all group-hover:-translate-y-1" />
            <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest group-hover:text-white transition-colors">上传或拖拽图片文件</span>
          </div>
        </div>

        {/* 核心提示词：包含字数统计与 AI 优化按钮 */}
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">提示词</label>
            <button className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:bg-white/5 px-2 py-1 rounded-md transition-all uppercase tracking-wider">
              <Sparkles size={12} className="text-cyan-400" />
              优化提示词
            </button>
          </div>
          <div className="relative group">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-5 h-36 font-medium text-sm leading-relaxed resize-y min-h-[144px] max-h-[400px] focus:ring-4 focus:ring-primary/20 focus:border-primary/50 outline-none shadow-sm transition-all placeholder:text-slate-600 text-white" 
              placeholder="请详细描述您想要生成的画面细节、光影与艺术风格..."
            />
            <span className="absolute bottom-4 right-5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">{prompt.length} / 500</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">生成清晰度</label>
          <div className="flex gap-2 p-1 bg-slate-800 rounded-xl border border-white/5 text-white">
            {['1K', '2K', '4K'].map((res) => (
              <button
                key={res}
                onClick={() => setResolution(res)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${resolution === res ? 'bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">比例选择</label>
          <div className="relative">
            <button 
              onClick={() => setIsAspectRatioOpen(!isAspectRatioOpen)}
              className={`w-full bg-slate-800/50 border rounded-2xl px-5 py-4 flex items-center justify-between font-bold text-sm transition-all shadow-sm outline-none ${isAspectRatioOpen ? 'border-primary ring-4 ring-primary/10' : 'border-white/10 hover:border-primary/40'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Crop size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider leading-none mb-0.5">当前比例</span>
                  <span className="block text-white">{aspectRatio}</span>
                </div>
              </div>
              <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isAspectRatioOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isAspectRatioOpen && (
                <>
                  <div className="fixed inset-0 z-[60]" onClick={() => setIsAspectRatioOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute bottom-full mb-3 left-0 right-0 bg-slate-800 border border-white/10 rounded-2xl p-4 shadow-2xl z-[70] flex flex-col gap-4 text-white"
                  >
                    <div className="flex gap-1 p-1 bg-slate-900 rounded-xl">
                      {[
                        { id: 'all', label: '全部' },
                        { id: 'square', label: '1:1' },
                        { id: 'portrait', label: '竖版' },
                        { id: 'landscape', label: '横版' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setRatioFilter(f.id as any)}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${ratioFilter === f.id ? 'bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {filteredRatios.map((ar) => (
                        <button
                          key={ar.label}
                          onClick={() => {
                            setAspectRatio(ar.label);
                            setIsAspectRatioOpen(false);
                          }}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${aspectRatio === ar.label ? 'bg-primary text-white shadow-md' : 'hover:bg-white/5 text-slate-400'}`}
                        >
                           <div 
                            className={`border-2 rounded-[2px] mb-1.5 ${aspectRatio === ar.label ? 'border-white' : 'border-slate-600'}`} 
                            style={{ width: ar.w/2, height: ar.h/2 }} 
                          />
                          <span className="text-[9px] font-bold">{ar.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-base uppercase tracking-[0.1em] mt-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all flex items-center justify-center gap-3">
          <Wand2 size={24} />
          立即开始生成
        </button>
      </section>

      {/* Preview Panel */}
      <section className="flex-1 h-full bg-surface relative flex flex-col p-10 overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
          <div className="bg-surface-container-low/50 rounded-[2.5rem] p-10 mb-8 flex items-center justify-center relative">
            <div className="glass-panel w-full max-w-2xl aspect-square rounded-[32px] overflow-hidden shadow-2xl relative group border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Main Preview"
              />
              
              <div className="absolute inset-x-0 bottom-0 py-12 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex gap-4">
                  {[
                    { icon: <Download size={22} />, label: '下载' },
                    { icon: <Share2 size={22} />, label: '分享' },
                    { icon: <ZoomIn size={22} />, label: '放大' }
                  ].map((act) => (
                    <button key={act.label} className="w-14 h-14 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border border-white">
                      {act.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-8 glass-panel p-6 rounded-3xl max-w-[280px] shadow-xl border-white/40 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Sparkles size={14} className="fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">智能提示词解析</span>
              </div>
              <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed italic">
                一个流动的超 surrealism 抽象艺术品，充满活力的橙色和琥珀色丝绸质感，柔和的高亮光影，4k极致清晰度。
              </p>
            </div>
          </div>

          <div className="flex-1" />

          <div className="bg-surface-container-low/50 rounded-[2rem] p-8 mt-4">
            <div className="flex justify-between items-center px-1 mb-6">
              <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">最近生成</h4>
              <button 
                onClick={() => onViewChange?.('history')}
                className="bg-primary/10 text-primary px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary/20 hover:scale-105 active:scale-95"
              >
                历史记录
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
              {recentGenerations.map((src, idx) => (
                <div 
                  key={idx} 
                  className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden relative border-2 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md ${idx === 0 ? 'border-primary ring-4 ring-primary/20' : 'border-transparent hover:border-primary/40'}`}
                >
                  <img src={src} className="w-full h-full object-cover" alt="Recent" />
                  {idx === 0 && (
                    <div className="absolute inset-0 bg-primary/10 border-2 border-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
