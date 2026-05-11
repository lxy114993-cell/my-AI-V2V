import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff } from 'lucide-react';

interface RegisterViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * 注册账号悬浮窗口组件
 * 按照提供图片的布局重新设计：
 * - 字段：手机号/邮箱、密码、验证码
 * - 样式：柔和的浅色玻璃背景，橙色主按钮
 */
export const RegisterView: React.FC<RegisterViewProps> = ({ isOpen, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    code: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* 背景遮罩 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-[420px] bg-[#f5f5f5] rounded-[2rem] p-8 pb-10 shadow-2xl relative z-10 overflow-hidden"
          >
            {/* 背景装饰光晕 (模仿图片中的柔和感) */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/10 blur-3xl rounded-full -mr-20 -mt-20" />
            
            {/* 关闭按钮 */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-[28px] font-bold text-slate-800 mb-2">账号注册</h2>
              <p className="text-slate-500 text-sm font-medium">加入 AI 创意工坊，开启您的出海生图之旅</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* 手机号 / 邮箱 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 px-1">手机号 / 邮箱</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#ebebeb] border-none rounded-2xl py-4 px-5 text-slate-800 placeholder:text-slate-400 font-medium outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="请输入您的手机号或邮箱地址"
                  value={formData.identifier}
                  onChange={e => setFormData({...formData, identifier: e.target.value})}
                />
              </div>

              {/* 设置密码 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 px-1">设置密码</label>
                <div className="relative group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    className="w-full bg-[#ebebeb] border-none rounded-2xl py-4 px-5 pr-12 text-slate-800 placeholder:text-slate-400 font-medium outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-sans"
                    placeholder="请输入密码"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* 验证码 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 px-1">验证码</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    required
                    className="flex-1 bg-[#ebebeb] border-none rounded-2xl py-4 px-5 text-slate-800 placeholder:text-slate-400 font-medium outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                    placeholder="请输入验证码"
                    value={formData.code}
                    onChange={e => setFormData({...formData, code: e.target.value})}
                  />
                  <button 
                    type="button"
                    className="bg-[#ebebeb] text-[#c0734e] px-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors whitespace-nowrap"
                  >
                    获取验证码
                  </button>
                </div>
              </div>

              {/* 用户协议 */}
              <div className="flex items-center gap-2 px-1">
                <input 
                  type="checkbox" 
                  required 
                  className="w-4 h-4 rounded border-slate-300 bg-white text-orange-500 focus:ring-orange-500/20 cursor-pointer" 
                  id="terms" 
                />
                <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer select-none font-medium">
                  我已阅读并同意 <span className="text-[#c0734e] hover:brightness-90 transition-all">用户协议</span> 和 <span className="text-[#c0734e] hover:brightness-90 transition-all">隐私政策</span>
                </label>
              </div>

              {/* 立即注册按钮 */}
              <button 
                type="submit"
                className="w-full bg-[#ff6c37] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all mt-2"
              >
                立即注册
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-slate-400 text-sm font-medium">
                已有账号？ <span className="text-[#c0734e] font-bold hover:underline cursor-pointer ml-1">立即登录</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
