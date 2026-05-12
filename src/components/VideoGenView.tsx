import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wand2, UploadCloud, Download, Share2, Play, ChevronDown, Crop, Cpu, Zap, Layers, Flame, Clock } from 'lucide-react';
import { ViewType } from '../types';
import { CustomSelect } from './CustomSelect';

interface VideoGenViewProps {
  onViewChange?: (view: ViewType) => void;
}

export const VideoGenView: React.FC<VideoGenViewProps> = ({ onViewChange }) => {
  const [selectedModel, setSelectedModel] = useState('Veo 3.1 Cinema');
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('5s');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isAspectRatioOpen, setIsAspectRatioOpen] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState('Medium');
  
  const modelOptions = [
    { value: 'Veo 3.1 Cinema', label: 'Veo 3.1 Cinema', icon: <Cpu size={18} /> },
    { value: 'Kling 3.0 Pro', label: 'Kling 3.0 Pro', icon: <Zap size={18} /> },
    { value: 'Sora Evolution', label: 'Sora Evolution', icon: <Layers size={18} /> },
  ];

  const aspectRatios = [
    { label: '16:9', w: 32, h: 18, type: 'landscape' },
    { label: '9:16', w: 18, h: 32, type: 'portrait' },
    { label: '1:1', w: 24, h: 24, type: 'square' },
    { label: '21:9', w: 36, h: 16, type: 'landscape' },
    { label: '4:3', w: 28, h: 21, type: 'landscape' },
  ];

  const recentVideos = [
    { thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200', duration: '5s' },
    { thumb: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=200', duration: '10s' },
    { thumb: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200', duration: '5s' },
    { thumb: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=200', duration: '5s' },
  ];

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* 左侧工具面板 */}
      <section className="w-[350px] shrink-0 h-full bg-slate-900 border-r border-white/5 p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        {/* 视频模型选择 */}
        <CustomSelect
          label="视频模型"
          options={modelOptions}
          value={selectedModel}
          onChange={setSelectedModel}
          icon={<Cpu size={18} />}
          dark={true}
        />

        {/* 起始参考图 */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">起始帧参考图</label>
          <div className="w-full border-2 border-dashed border-white/10 rounded-2xl h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer group shadow-inner">
            <UploadCloud size={24} className="text-slate-500 group-hover:text-primary transition-all group-hover:-translate-y-1" />
            <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest group-hover:text-white transition-colors">上传起始帧图像</span>
          </div>
        </div>

        {/* 核心提示词与 AI 优化按钮 */}
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">视频动态描述</label>
            <button className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:bg-white/5 px-2 py-1 rounded-md transition-all uppercase tracking-wider">
              <Sparkles size={12} className="text-cyan-400" />
              优化动态描述
            </button>
          </div>
          <div className="relative group">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-5 h-36 font-medium text-sm leading-relaxed resize-y min-h-[144px] max-h-[400px] focus:ring-4 focus:ring-primary/20 focus:border-primary/50 outline-none shadow-sm transition-all placeholder:text-slate-600 text-white" 
              placeholder="描述镜头运动轨迹、光影变幻说明等..."
            />
            <span className="absolute bottom-4 right-5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">{prompt.length} / 500</span>
          </div>
        </div>

        {/* 视频时长 */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">生成时长</label>
          <div className="flex gap-2 p-1 bg-slate-800 rounded-xl border border-white/5 text-white">
            {['5s', '10s'].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-2 ${duration === d ? 'bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Clock size={14} />
                {d === '5s' ? '5 秒' : '10 秒'}
              </button>
            ))}
          </div>
        </div>

        {/* 动态强度 */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">动态强度</label>
          <div className="flex gap-2 p-1 bg-slate-800 rounded-xl border border-white/5 text-white">
            {['Low', 'Medium', 'High'].map((m) => (
              <button
                key={m}
                onClick={() => setMotionIntensity(m)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${motionIntensity === m ? 'bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Flame size={14} />
                {m === 'Low' ? '低' : m === 'Medium' ? '中' : '高'}
              </button>
            ))}
          </div>
        </div>

        {/* 视频比例 */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">画面比例</label>
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
                    className="absolute bottom-full mb-3 left-0 right-0 bg-slate-800 border border-white/10 rounded-2xl p-4 shadow-2xl z-[70] grid grid-cols-5 gap-2 text-white"
                  >
                    {aspectRatios.map((ar) => (
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
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-base uppercase tracking-[0.1em] mt-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all flex items-center justify-center gap-3">
          <Wand2 size={24} />
          开始生成视频
        </button>
      </section>

      {/* 预览面板 */}
      <section className="flex-1 h-full bg-surface relative flex flex-col p-10 overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
          <div className="bg-surface-container-low/50 rounded-[2.5rem] p-10 mb-8 flex items-center justify-center relative">
            <div className="glass-panel w-full max-w-4xl aspect-video rounded-[32px] overflow-hidden shadow-2xl relative group border-white/50 bg-black">
              {/* 模拟视频播放预览 */}
              <img 
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[20s]" 
                alt="Video Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 cursor-pointer hover:scale-110 active:scale-90 transition-all group-hover:bg-primary/40 group-hover:border-primary/40">
                  <Play size={40} className="ml-2 fill-current" />
                </div>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 py-8 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex gap-4">
                  {[
                    { icon: <Download size={20} />, label: '下载' },
                    { icon: <Share2 size={20} />, label: '分享' },
                    { icon: <Sparkles size={20} />, label: '重新生成' }
                  ].map((act) => (
                    <button key={act.label} className="w-12 h-12 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border border-white">
                      {act.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-8 glass-panel p-6 rounded-3xl max-w-[280px] shadow-xl border-white/40 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Sparkles size={14} className="fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">动态分析引擎</span>
              </div>
              <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed italic">
                检测到高度动态的流体运动，自动匹配 60fps 渲染。当前采用 Veo 3.1 Cinema 核心算法。
              </p>
            </div>
          </div>

          <div className="flex-1" />

          {/* 最近生成 */}
          <div className="bg-surface-container-low/50 rounded-[2rem] p-8 mt-4">
            <div className="flex justify-between items-center px-1 mb-6">
              <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">最近生成视频</h4>
              <button 
                onClick={() => onViewChange?.('history')}
                className="bg-primary/10 text-primary px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary/20 hover:scale-105"
              >
                全部视频
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
              {recentVideos.map((video, idx) => (
                <div 
                  key={idx} 
                  className={`flex-shrink-0 w-48 aspect-video rounded-2xl overflow-hidden relative border-2 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md ${idx === 0 ? 'border-primary ring-4 ring-primary/20' : 'border-transparent hover:border-primary/40'}`}
                >
                  <img src={video.thumb} className="w-full h-full object-cover" alt="Recent Video" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded-lg border border-white/10">
                    {video.duration}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80">
                    <Play size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
