import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, CreditCard, Bell, Key, MapPin } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-on-surface">个人资料</h2>
        <p className="text-on-surface-variant">管理您的账号设置、偏好与安全选项。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="bg-surface p-8 rounded-[2.5rem] border border-outline-variant shadow-sm text-center">
            <div className="w-32 h-32 rounded-full border-4 border-primary/10 p-1 mx-auto mb-6 relative group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtdv98ZsHffu3_3XYeVZ4aVdqwtHx69OP6nNv23rv09fD17MVL-m1wDVc_92ndC2kqAXZ5cmHB2Rq0ID-ogp0QUbcvIUdmWsf01cZfC6o_Ms7UOQYqi-lJ6yWnD55QRL0N-bb99MzONG2-2WjeTDwpd1seMtW-QsnKMSsL5pwRRcAI74VVeWceT9oPRVIenzDd4TgL9c6CN4oyxAv833uJsI6-VMVE6B2nFVozlA4o0uARLtyEo2KqBi2RlxKaeNPyadX-yFbWbtA" 
                className="w-full h-full rounded-full object-cover shadow-inner"
                alt="Profile"
              />
              <button className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-black">
                更换头像
              </button>
            </div>
            <h3 className="text-xl font-black mb-1 text-on-surface">用户 9527</h3>
            <p className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded-full inline-block">专业版会员</p>
          </div>

          <div className="bg-surface p-6 rounded-[2rem] border border-outline-variant shadow-sm">
            <h4 className="text-sm font-black mb-4 flex items-center gap-2 text-on-surface">
              <Shield size={16} className="text-primary" />
              账号状态
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">实名认证</span>
                <span className="font-bold text-emerald-500 text-xs text-on-surface">已认证</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">注册时间</span>
                <span className="font-bold text-xs text-on-surface">2026-05-09</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Sections */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface p-8 rounded-[2.5rem] border border-outline-variant shadow-sm"
          >
            <h4 className="text-lg font-black mb-8 flex items-center gap-2 text-on-surface">
              <User size={20} className="text-primary" />
              基本信息
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">用户名</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant">
                  <User size={18} className="text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">用户 9527</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">电子邮箱</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant">
                  <Mail size={18} className="text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">lxy114***@gmail.com</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">联系地址</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant">
                  <MapPin size={18} className="text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface-variant/60 italic">未设置</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">账号密钥</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant">
                  <Key size={18} className="text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">••••••••••••••</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface p-8 rounded-[2.5rem] border border-outline-variant shadow-sm"
          >
            <h4 className="text-lg font-black mb-8 flex items-center gap-2 text-on-surface">
              <CreditCard size={20} className="text-primary" />
              财务与通知
            </h4>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container rounded-2xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-on-surface/5 rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <CreditCard size={18} className="text-on-surface" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-on-surface">支付方式</div>
                    <p className="text-[10px] text-on-surface-variant font-medium">管理您的会员扣费与充值渠道</p>
                  </div>
                </div>
                <div className="text-xs font-black text-primary">管理</div>
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container rounded-2xl transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-on-surface/5 rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <Bell size={18} className="text-on-surface" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-on-surface">通知设置</div>
                    <p className="text-[10px] text-on-surface-variant font-medium">配置系统公告、活动与生成提醒</p>
                  </div>
                </div>
                <div className="text-xs font-black text-primary">配置</div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
