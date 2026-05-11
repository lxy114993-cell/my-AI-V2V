import React, { useState } from 'react';
import { Lightbulb, RefreshCw, Bolt, Video as VideoIcon, CheckCircle2, Wand2, Info } from 'lucide-react';

export const VideoGenView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('veo');
  const [duration, setDuration] = useState('5s');

  const assets = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=300'
  ];

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-6 space-y-8">
      <div className="glass-panel rounded-2xl p-8 flex items-center gap-6 border-primary/20 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
          <Lightbulb size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface font-display mb-1">视频转换工作流</h2>
          <p className="text-on-surface-variant font-medium leading-relaxed">请先从下方素材库选择一张优秀图像，将其作为起始帧转换为视频。高质量的源图能极大提升最终生成效果。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="glass-panel rounded-2xl p-8 h-full shadow-sm relative border-white/40">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-[0.2em]">素材选择区</h3>
              <button className="text-primary text-xs font-bold flex items-center gap-1.5 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors">
                <RefreshCw size={14} /> 刷新素材库
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {assets.map((src, idx) => (
                <div 
                  key={idx} 
                  className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${idx === 0 ? 'ring-4 ring-primary ring-offset-4 ring-offset-background' : 'hover:ring-2 hover:ring-primary/40'}`}
                >
                  <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Asset" />
                  <div className={`absolute inset-0 flex items-center justify-center transition-all ${idx === 0 ? 'bg-primary/20 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'}`}>
                    <CheckCircle2 size={32} className={`text-white transition-transform duration-300 ${idx === 0 ? 'scale-100' : 'scale-50 group-hover:scale-100'}`} />
                  </div>
                  {idx === 0 && <div className="absolute bottom-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">当前选择</div>}
                </div>
              ))}
              <div className="aspect-square rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-bright hover:border-primary/40 transition-all cursor-pointer group shadow-inner">
                <Icons.Plus size={32} className="mb-2 group-hover:scale-110 group-hover:text-primary transition-all" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">重新生成素材</span>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col h-full space-y-6">
          <section className="glass-panel rounded-2xl p-6 shadow-sm border-outline-variant/30">
            <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-widest mb-4">视频模型选择</h3>
            <div className="space-y-3">
              {[
                { id: 'veo', name: 'Veo 3.1', desc: '极致流畅，电影级画质', icon: <Bolt size={20} />, color: 'primary' },
                { id: 'kling', name: 'Kling 3', desc: '精准细节，写实风格', icon: <VideoIcon size={20} />, color: 'tertiary' }
              ].map((model) => (
                <label 
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedModel === model.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-transparent bg-surface-container-low hover:border-outline-variant'}`}
                >
                  <div className="flex items-center gap-4 text-on-surface">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedModel === model.id ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      {model.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{model.name}</div>
                      <div className="text-[10px] font-medium text-on-surface-variant">{model.desc}</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedModel === model.id ? 'border-primary bg-primary' : 'border-outline-variant'}`}>
                    {selectedModel === model.id && <div className="w-1.5 h-1.5 rounded-full bg-on-primary" />}
                  </div>
                </label>
              ))}
            </div>
          </section>

          <div className="space-y-4">
            <button className="w-full bg-primary py-4 rounded-2xl text-white font-extrabold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all flex items-center justify-center gap-3">
              <Wand2 size={24} />
              立即转换视频
            </button>
            <div className="flex items-center justify-between px-3 text-[11px] font-bold uppercase tracking-wider">
              <div className="text-on-surface-variant">
                剩余算力: <span className="text-primary font-black">1,240</span>
              </div>
              <div className="text-on-surface-variant">
                消耗额度: <span className="text-on-surface font-black">5 点</span>
              </div>
            </div>
          </div>

          <section className="glass-panel rounded-2xl p-6 shadow-sm border-outline-variant/30 mt-auto mb-2">
            <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-widest mb-4">视频时长</h3>
            <div className="flex p-1.5 bg-surface-container-low rounded-xl">
              <button 
                onClick={() => setDuration('5s')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${duration === '5s' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                5 秒
              </button>
              <button 
                onClick={() => setDuration('10s')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${duration === '10s' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                10 秒
              </button>
            </div>
            <div className="mt-4 flex gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <Info size={14} className="text-primary shrink-0" />
              <p className="text-[10px] text-on-surface-variant leading-relaxed font-medium">10秒模式需要消耗更多算力点数，生成时间预计增加约 100%。</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const Icons = {
  Plus: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
};
