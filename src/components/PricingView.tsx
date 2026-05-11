import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Crown, Rocket, Star } from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: '免费版',
    price: '0',
    description: '适合初学者体验 AI 创作的魅力。',
    features: [
      '每日 50 免费积分',
      '基础模型访问权',
      '标准生成速度',
      '单次生成 1 张图片',
      '社区支持'
    ],
    icon: <Star className="text-slate-400" />,
    buttonText: '当前方案',
    highlight: false
  },
  {
    id: 'pro',
    name: '专业版',
    price: '99',
    description: '为创作者量身定制，释放无限创意潜能。',
    features: [
      '每月 5,000 积分',
      '解锁所有顶级大模型',
      '极速优先生成',
      '单次生成 4 张图片',
      '无水印导出',
      '一对一技术支持'
    ],
    icon: <Zap className="text-amber-500" />,
    buttonText: '立即升级',
    highlight: true
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '599',
    description: '针对团队协作与大规模生产的专业方案。',
    features: [
      '每月 50,000 积分',
      '私有化模型微调',
      '多账号协作管理',
      'API 高级接入权限',
      '专属客户经理',
      '定制化 SLA 保障'
    ],
    icon: <Crown className="text-purple-500" />,
    buttonText: '联系销售',
    highlight: false
  }
];

export const PricingView: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
          <Rocket size={14} />
          选择您的创作动力
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-on-surface">灵活的订阅方案</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
          无论您是个人爱好者还是企业团队，我们都有完美的方案助您将愿景转化为现实。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {PLANS.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-[3rem] border-2 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              plan.highlight 
                ? 'border-primary bg-primary/5 ring-4 ring-primary/5 scale-105 z-10' 
                : 'border-outline-variant bg-surface'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-xl">
                最受欢迎
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-4 rounded-2xl ${plan.highlight ? 'bg-primary text-on-primary' : 'bg-surface-container'}`}>
                {React.cloneElement(plan.icon as React.ReactElement, { size: 28 })}
              </div>
              <div>
                <h3 className="text-xl font-black text-on-surface">{plan.name}</h3>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{plan.id === 'enterprise' ? '定制方案' : '月付套餐'}</p>
              </div>
            </div>

            <div className="mb-8 pl-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-on-surface">¥{plan.price}</span>
                <span className="text-on-surface-variant font-bold text-sm">/月</span>
              </div>
              <p className="text-on-surface-variant text-xs font-medium mt-2 leading-relaxed">
                {plan.description}
              </p>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-primary text-on-primary' : 'bg-emerald-100 text-emerald-600'}`}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold text-on-surface/80">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${
                plan.highlight 
                  ? 'bg-primary text-on-primary shadow-xl shadow-primary/25 hover:scale-105 active:scale-95' 
                  : 'bg-on-surface text-surface hover:bg-primary transition-colors'
              } ${plan.id === 'free' ? 'opacity-50 cursor-default hover:bg-on-surface' : ''}`}
            >
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h4 className="text-xl font-black mb-2 text-on-surface">需要更多积分？</h4>
          <p className="text-on-surface-variant font-medium text-sm">您可以随时购买额外的加餐包，积分永久有效，按需取用。</p>
        </div>
        <button className="px-8 py-4 bg-surface border border-outline-variant rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all shadow-sm text-on-surface">
          前往充值中心
        </button>
      </div>
    </div>
  );
};
