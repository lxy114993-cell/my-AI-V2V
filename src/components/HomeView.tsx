import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HomeViewProps {
  onRegister: () => void;
}

const DotNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dots: Dot[] = [];

    /**
     * 单个点阵点类
     */
    class Dot {
      x: number = 0;
      y: number = 0;
      vx: number = 0; // x轴运动速度
      vy: number = 0; // y轴运动速度

      constructor() {
        this.reset();
      }

      /**
       * 随机初始化点的位置和速度
       */
      reset() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      }

      /**
       * 更新点的位置，处理边缘反弹逻辑
       */
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
      }

      /**
       * 在画布上绘制点本身
       */
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /**
     * 初始化画布大小和点阵数组
     */
    const init = () => {
      dots = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000); // 根据屏幕面积动态计算点数量
      for (let i = 0; i < count; i++) {
        dots.push(new Dot());
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < dots.length; i++) {
        dots[i].update();
        dots[i].draw();

        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.3 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-50"
    />
  );
};

export const HomeView: React.FC<HomeViewProps> = ({ onRegister }) => {
  return (
    <section className="h-full w-full bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Static Dot Grid Base */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial Gradient Highlight (Spotlight) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-cyan-500/10 via-transparent to-transparent z-0 pointer-events-none" />

      <DotNetwork />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center px-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8 shadow-xl">
          <Sparkles className="text-cyan-400 animate-spin-slow" size={20} />
          <span className="text-white font-bold tracking-widest text-sm uppercase">欢迎来到 AI 创意空间</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
          无限可能的<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-white">视觉盛宴</span>
        </h1>
        
        <p className="text-white/70 text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          在这里，您的灵感将转化为触手可及的艺术。探索最先进性 AI 图像与视频生成技术，开启您的创作之旅。
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={onRegister}
            className="px-10 py-5 bg-cyan-500 text-white rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-cyan-400"
          >
            立即开始
          </button>
          <button 
            onClick={onRegister}
            className="px-10 py-5 bg-white/5 backdrop-blur-lg text-white border-2 border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all duration-300 hover:border-white/20"
          >
            注册账号
          </button>
        </div>
      </motion.div>
    </section>
  );
};
