import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Palette, 
  Globe, 
  ShieldCheck, 
  HelpCircle,
  ChevronRight,
  Smartphone,
  Mail,
  Type
} from 'lucide-react';

// 设置分组的静态配置数据
const SETTINGS_GROUPS = [
  {
    title: '账户设置',
    items: [
      { id: 'profile', icon: User, label: '个人资料', description: '修改头像、用户名及个人简介', color: 'bg-blue-500' },
      { id: 'security', icon: Lock, label: '安全与密码', description: '更改密码及二步验证', color: 'bg-red-500' },
      { id: 'notifications', icon: Bell, label: '通知设置', description: '管理邮件及推送通知推送', color: 'bg-amber-500' },
    ]
  },
  {
    title: '偏好设置',
    items: [
      { id: 'appearance', icon: Palette, label: '外观展示', description: '切换深色模式及强调色', color: 'bg-purple-500' },
      { id: 'language', icon: Globe, label: '语言与地区', description: '更改界面语言及时间格式', color: 'bg-emerald-500' },
      { id: 'typography', icon: Type, label: '字体设置', description: '调整系统字体大小及样式', color: 'bg-cyan-500' },
    ]
  },
  {
    title: '系统与隐私',
    items: [
      { id: 'privacy', icon: Eye, label: '隐私管理', description: '管理数据权限及可见性设置', color: 'bg-indigo-500' },
      { id: 'devices', icon: Smartphone, label: '登录设备', description: '查看及管理已登录的设备', color: 'bg-slate-500' },
      { id: 'verification', icon: ShieldCheck, label: '实名认证', description: '完成认证以解锁高级功能', color: 'bg-teal-500' },
    ]
  }
];

/**
 * 系统设置页面组件
 */
export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* 头部标题区 */}
      <header className="mb-12">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-on-surface">系统设置</h2>
        <p className="text-on-surface-variant font-bold text-sm">管理您的个人账户、系统偏好及安全选项</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 左侧导航切换卡 */}
        <aside className="md:col-span-1 space-y-2">
          {['account', 'preference', 'privacy', 'support'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-4 rounded-2xl font-black text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {tab === 'account' && '账户管理'}
              {tab === 'preference' && '个性化'}
              {tab === 'privacy' && '隐私保护'}
              {tab === 'support' && '帮助与支持'}
            </button>
          ))}
          
          {/* 帮助中心入口卡片 */}
          <div className="p-5 mt-8 bg-surface-container rounded-[2rem] border border-outline-variant">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle size={20} className="text-primary" />
              <span className="text-xs font-black text-on-surface">需要帮助？</span>
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed mb-4">
              如果您在设置过程中遇到任何困难，请随时联系我们的技术支持。
            </p>
            <button className="w-full py-2.5 bg-on-surface text-surface rounded-xl text-[10px] font-black hover:bg-primary transition-all">
              在线客服
            </button>
          </div>
        </aside>

        {/* 右侧主设置列表内容区域 */}
        <div className="md:col-span-3 space-y-10">
          {SETTINGS_GROUPS.map((group, groupIdx) => (
            <motion.section 
              key={groupIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
            >
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6 px-1">
                {group.title}
              </h3>
              <div className="grid gap-3">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className="group w-full flex items-center justify-between p-5 bg-surface-container-low hover:bg-surface border border-outline-variant/30 rounded-[1.5rem] transition-all hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`p-3 rounded-2xl text-white ${item.color} shadow-lg shadow-black/5`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-on-surface mb-0.5">{item.label}</h4>
                        <p className="text-[11px] font-bold text-on-surface-variant leading-none">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-outline transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </motion.section>
          ))}

          {/* Quick Contact Info */}
          <div className="pt-8 border-t border-outline-variant flex flex-col sm:flex-row gap-6">
            <div className="flex-1 flex items-center gap-4 p-5 bg-surface-container rounded-2xl">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">官方邮箱</p>
                <p className="text-sm font-black text-on-surface">contact@ai-studio.com</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-4 p-5 bg-surface-container rounded-2xl">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-emerald-500">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">官方网站</p>
                <p className="text-sm font-black text-on-surface">www.ai-studio.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
