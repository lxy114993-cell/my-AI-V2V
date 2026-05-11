import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  dark?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  icon,
  label,
  placeholder = '请选择...',
  dark = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      {label && (
        <label className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 ${dark ? 'text-slate-500' : 'text-on-surface-variant'}`}>
          {label}
        </label>
      )}
      <div className="relative group">
        {/* Hover Border Effect */}
        <div className={`absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 border-2 border-primary/20 transition-all duration-300 pointer-events-none scale-105 ${isOpen ? 'opacity-100' : ''}`} />
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full border rounded-2xl py-4 pl-12 pr-10 flex items-center justify-between font-bold text-sm transition-all shadow-sm relative z-10 outline-none ${
            dark 
            ? `bg-slate-800/50 ${isOpen ? 'border-primary ring-4 ring-primary/10' : 'border-white/10 group-hover:border-primary/40'}` 
            : `${isOpen ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant group-hover:border-primary/40'} bg-surface`
          }`}
        >
          {/* 左侧图标容器 */}
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors flex items-center gap-2 ${dark ? 'text-slate-500 group-hover:text-primary' : 'text-outline group-hover:text-primary'}`}>
            {selectedOption?.icon || icon}
          </div>
          
          {/* 文字内容：选中状态与 placeholder 颜色的切换 */}
          <span className={`${selectedOption ? (dark ? 'text-white' : 'text-on-surface') : (dark ? 'text-slate-600' : 'text-outline-variant font-medium')}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-300 group-hover:text-primary ${isOpen ? 'rotate-180' : ''} ${dark ? 'text-slate-500' : 'text-outline'}`} 
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`absolute top-full mt-3 left-0 right-0 border rounded-2xl p-2 shadow-2xl z-[70] max-h-60 overflow-y-auto custom-scrollbar ${dark ? 'bg-slate-800 border-white/10' : 'bg-surface border-outline-variant'}`}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1 last:mb-0 ${
                    value === option.value 
                      ? 'bg-primary/10 text-primary' 
                      : (dark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-primary/5 text-on-surface-variant')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={value === option.value ? 'text-primary' : (dark ? 'text-slate-500' : 'text-outline')}>
                      {option.icon}
                    </div>
                    <span className="font-bold text-sm">{option.label}</span>
                  </div>
                  {value === option.value && <Check size={16} className="text-primary" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
