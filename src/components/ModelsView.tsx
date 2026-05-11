import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Sparkles, Image, Video, ShieldCheck, MessagesSquare, Film } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'image',
    name: '图像大模型',
    description: '顶尖的视觉生成能力，覆盖艺术创作、写实摄影及创意设计。',
    icon: <Image size={20} />,
    models: [
      {
        id: 'sdxl-turbo',
        name: 'SDXL Turbo v2.0',
        type: '实时生成',
        description: '采用最先进的对抗性训练技术，实现极速实时图像生成。捕捉灵感，就在一瞬之间。',
        features: ['实时生成', '高质量构图', '512-1024px分辨率'],
        price: '0.05 积分 / 张',
        icon: <Sparkles className="text-amber-500" />,
        color: 'border-amber-500/20 bg-amber-500/5'
      },
      {
        id: 'midjourney-v6',
        name: 'Midjourney V6.1',
        type: '艺术生成',
        description: '业界顶级的艺术风格还原，极高的光影处理能力，为您打造电影级的视觉大片。',
        features: ['电影级渲染', '极精细纹理', '强大的语义理解'],
        price: '0.2 积分 / 张',
        icon: <Image className="text-purple-500" />,
        color: 'border-purple-500/20 bg-purple-500/5'
      },
      {
        id: 'dalle-3',
        name: 'DALL-E 3',
        type: '创意生成',
        description: '由 OpenAI 驱动，极强的指令遵循能力，精准还原提示词中的每一个细节。',
        features: ['极致文字渲染', '复杂场景构筑', '极简交互'],
        price: '0.1 积分 / 张',
        icon: <Zap className="text-cyan-500" />,
        color: 'border-cyan-500/20 bg-cyan-500/5'
      }
    ]
  },
  {
    id: 'llm',
    name: '大语言模型',
    description: '卓越的逻辑推理、文本创作及跨领域知识问答能力。',
    icon: <MessagesSquare size={20} />,
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o (Omni)',
        type: '全能旗舰',
        description: 'OpenAI 最强模型，支持文本、音频和图像的实时推理，具备人类级别的响应速度。',
        features: ['全模态互动', '极速响应', '世界级知识储备'],
        price: '0.01 积分 / 1k Token',
        icon: <MessagesSquare className="text-emerald-500" />,
        color: 'border-emerald-500/20 bg-emerald-500/5'
      },
      {
        id: 'claude-3-5',
        name: 'Claude 3.5 Sonnet',
        type: '逻辑之王',
        description: '在编程、逻辑分析及自然语气创作方面表现卓越，是效率办公的最佳伙伴。',
        features: ['深度逻辑分析', '自然语言理解', '超长上下文'],
        price: '0.008 积分 / 1k Token',
        icon: <Zap className="text-orange-500" />,
        color: 'border-orange-500/20 bg-orange-500/5'
      }
    ]
  },
  {
    id: 'video',
    name: '视频大模型',
    description: '将想象力转化为高画质动态影像，重新定义内容创作。',
    icon: <Film size={20} />,
    models: [
      {
        id: 'sora',
        name: 'OpenAI Sora',
        type: '物理模拟',
        description: '理解物理世界的动态规律，生成长达一分钟的高保真视频片段。',
        features: ['真实物理模拟', '多角色互动', '长视频一致性'],
        price: '10.0 积分 / 秒',
        icon: <Video className="text-rose-500" />,
        color: 'border-rose-500/20 bg-rose-500/5'
      },
      {
        id: 'runway-gen3',
        name: 'Runway Gen-3 Alpha',
        type: '创意视频',
        description: '提供无与伦比的精细控制，精准把握视频的运镜、光影与叙事节奏。',
        features: ['精准视角控制', '4K 电影画质', '艺术风格定制'],
        price: '8.0 积分 / 秒',
        icon: <Film className="text-indigo-500" />,
        color: 'border-indigo-500/20 bg-indigo-500/5'
      }
    ]
  }
];

export const ModelsView: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Cpu size={24} />
          </div>
          <h2 className="text-3xl font-black tracking-tight">AI 模型库</h2>
        </div>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          我们整合了全球最先进的 AI 生成模型，分为图像、文本与视频三大领域，为您提供全方位的创作支持与精准定价。
        </p>
      </header>

      <div className="space-y-24">
        {CATEGORIES.map((category, catIdx) => (
          <section key={category.id}>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-on-surface text-surface rounded-2xl">
                {category.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-on-surface">{category.name}</h3>
                <p className="text-on-surface-variant text-sm font-medium">{category.description}</p>
              </div>
              <div className="flex-1 h-[1px] bg-outline-variant ml-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.models.map((model, idx) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-8 rounded-[2.5rem] border-2 ${model.color} flex flex-col h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                     {React.cloneElement(model.icon as React.ReactElement, { size: 120 })}
                  </div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-surface-bright shadow-sm ring-1 ring-black/5">
                      {React.cloneElement(model.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <span className="px-4 py-1 rounded-full bg-surface-bright text-[10px] font-black uppercase tracking-widest ring-1 ring-black/5 text-on-surface">
                      {model.type}
                    </span>
                  </div>

                  <h4 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors text-on-surface">{model.name}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-1">
                    {model.description}
                  </p>

                  <div className="mb-8 p-4 bg-surface-container/50 rounded-2xl border border-black/5 backdrop-blur-sm">
                    <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">模型定价</div>
                    <div className="text-xl font-black text-primary">{model.price}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">核心能力</div>
                    {model.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs font-bold text-on-surface/80">
                        <ShieldCheck size={14} className="text-primary" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 p-12 bg-surface-container-low rounded-[3rem] border border-outline-variant flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left">
          <h4 className="text-xl font-black mb-2">想要部署私有模型？</h4>
          <p className="text-on-surface-variant text-sm font-medium">我们提供灵活的企业级 API 解决方案，支持私有化部署与定向调优。</p>
        </div>
        <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap">
          联系我们
        </button>
      </footer>
    </div>
  );
};
