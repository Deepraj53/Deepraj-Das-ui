import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { StepItem } from '../types';
import { ArrowRight } from 'lucide-react';

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We don't just ask what you want; we uncover what you need. Through deep stakeholder interviews and market forensic analysis, we map the invisible territories of your opportunity.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200" // Tech/Planning
  },
  {
    number: "02",
    title: "Architecture",
    description: "Form follows function, but magic follows logic. We construct rigourous information systems and user flows that serve as the indestructible skeleton of your digital presence.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" // Architecture/Structure
  },
  {
    number: "03",
    title: "Synthesis",
    description: "The alchemical phase. We merge the strategic skeleton with the soul of your brand, applying visual languages that evoke emotion, trust, and undeniable authority.",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200" // Design/Art
  },
  {
    number: "04",
    title: "Evolution",
    description: "Launch is not the end; it's the first breath. We deploy scalable, living systems using React and WebGL that adapt, learn, and grow alongside your business.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200" // Future/Tech
  }
];

export const Process: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth out the scroll value for a "luxury" feel (Lenis inspiration)
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Map scroll to horizontal movement
  // We move from 10% to -85% to ensure all cards are viewed
  const x = useTransform(smoothProgress, [0, 1], ["10%", "-85%"]);

  return (
    <section ref={targetRef} id="method" className="relative h-[350vh] bg-[#f2f2f2]">
      
      {/* Interactive Background Elements */}
      <InteractiveBackground />
      
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Section Header (Stays fixed visually until cards scroll past) */}
        <div className="absolute top-12 left-6 md:left-16 z-20 pointer-events-none mix-blend-difference text-white md:text-brand-black md:mix-blend-normal">
             <span className="font-mono text-xs uppercase tracking-widest text-brand-black/50 mb-2 block">
                The Protocol
             </span>
             <h2 className="font-serif text-4xl md:text-6xl text-brand-black">
                Methodology
             </h2>
        </div>

        {/* Horizontal Track */}
        <motion.div 
            style={{ x }} 
            className="flex gap-12 md:gap-32 pl-[5vw] pr-[20vw] items-center"
        >
          {STEPS.map((step, index) => (
            <HorizontalCard key={index} step={step} index={index} />
          ))}
        </motion.div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-16 right-16 z-20 hidden md:block">
            <div className="w-full h-[1px] bg-gray-300 relative overflow-hidden">
                <motion.div 
                    style={{ scaleX: smoothProgress, transformOrigin: "0%" }} 
                    className="absolute inset-0 bg-brand-black h-full w-full" 
                />
            </div>
            <div className="flex justify-between mt-4 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                <span>Start</span>
                <span>Finish</span>
            </div>
        </div>

      </div>
    </section>
  );
};

const InteractiveBackground: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.8),
        transparent 80%
    )`;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dot Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />
            
            {/* Mouse Spotlight */}
            <motion.div 
                className="absolute inset-0 opacity-100"
                style={{ background }}
            />
        </div>
    );
}

const HorizontalCard: React.FC<{ step: StepItem, index: number }> = ({ step, index }) => {
    return (
        <div className="relative group w-[85vw] md:w-[60vw] max-w-[900px] flex-shrink-0">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                
                {/* Image Area */}
                <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] overflow-hidden relative shadow-2xl shadow-gray-200/50">
                     <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder loading state visually */}
                     <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-110 grayscale group-hover:grayscale-0"
                     />
                     
                     {/* Overlay Badge */}
                     <div className="absolute top-0 left-0 bg-brand-black text-white px-6 py-4">
                        <span className="font-serif text-3xl md:text-4xl italic">
                            {step.number}
                        </span>
                     </div>
                </div>

                {/* Content Area */}
                <div className="w-full md:w-2/5 flex flex-col items-start pr-8 md:pr-0">
                    <span className="font-mono text-xs text-brand-accent uppercase tracking-wider mb-4 border border-brand-accent/20 px-3 py-1 rounded-full">
                        Phase {step.number}
                    </span>
                    
                    <h3 className="font-serif text-4xl md:text-6xl text-brand-black mb-8 leading-none">
                        {step.title}
                    </h3>
                    
                    <p className="font-sans text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
                        {step.description}
                    </p>

                    <button className="flex items-center gap-4 group/btn">
                        <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover/btn:bg-brand-black group-hover/btn:border-brand-black transition-colors duration-300">
                             <ArrowRight className="w-5 h-5 text-brand-black group-hover/btn:text-white transition-colors" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover/btn:text-brand-black transition-colors">
                            Learn more
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
};
