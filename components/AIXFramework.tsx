import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Sparkles, Brain, Image, Code, Aperture, Box, Cpu } from 'lucide-react';

// Configuration for the satellite tools
// Coordinates updated to push logos to the 'edge' of the extensions
const INTEGRATIONS = [
  { id: 1, name: "GPT-4o", icon: Aperture, x: 18, y: 15, color: "#10A37F" },
  { id: 2, name: "Claude 3.5", icon: Brain, x: 82, y: 15, color: "#D97757" },
  { id: 3, name: "Midjourney", icon: Image, x: 95, y: 50, color: "#475569" },
  { id: 4, name: "Llama 3", icon: Code, x: 82, y: 85, color: "#0467DF" },
  { id: 5, name: "Mistral", icon: Box, x: 18, y: 85, color: "#F59F0B" },
  { id: 6, name: "Gemini", icon: Sparkles, x: 5, y: 50, color: "#4285F4" },
];

export const AIXFramework: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
        className="relative w-full py-32 bg-white overflow-hidden flex flex-col items-center"
        onMouseMove={handleMouseMove}
    >
      
      {/* --- Interactive Grid Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
            className="absolute inset-0 opacity-[0.5]"
            style={{
                backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
                backgroundSize: '32px 32px'
            }}
        />
        <motion.div 
            className="absolute inset-0 opacity-100"
            style={{
                backgroundImage: 'radial-gradient(#3B82F6 1.5px, transparent 1.5px)',
                backgroundSize: '32px 32px',
                maskImage: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`
            }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(255,255,255,1)_85%)]" />
      </div>

      {/* --- Header Content --- */}
      <div className="relative z-20 text-center max-w-4xl px-6 mb-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
        >
            <span className="font-mono text-[10px] text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"/>
                Neural Interface Protocol
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-black mb-6 tracking-tight">
                The <span className="text-blue-600 relative inline-block px-2">
                    AIX
                    {/* Decorative Underline */}
                    <svg className="absolute bottom-1 left-0 w-full h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span> Framework
            </h2>
            <p className="font-sans text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                A unified architecture connecting your proprietary business logic to the world's most powerful generative models.
            </p>
        </motion.div>
      </div>

      {/* --- Diagram Container --- */}
      <div className="relative w-full max-w-7xl aspect-[4/3] md:aspect-[16/9] lg:h-[750px] flex items-center justify-center">
        
        {/* SVG Layer for Wires */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {INTEGRATIONS.map((tool) => (
                <ConnectionLine 
                    key={tool.id} 
                    startX={50} 
                    startY={50} 
                    endX={tool.x} 
                    endY={tool.y} 
                    color={tool.color} 
                />
            ))}
        </svg>

        {/* Central Chip */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
             <CentralChip />
        </div>

        {/* Satellite Nodes */}
        {INTEGRATIONS.map((tool, index) => (
            <motion.div 
                key={tool.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                className="absolute z-20"
                style={{ 
                    left: `${tool.x}%`, 
                    top: `${tool.y}%`, 
                    // Centers the container exactly on the coordinate point
                    transform: 'translate(-50%, -50%)' 
                }}
            >
                <ToolCard tool={tool} />
            </motion.div>
        ))}
      </div>

    </section>
  );
};

// --- Sub-Components ---

const ConnectionLine: React.FC<{startX: number, startY: number, endX: number, endY: number, color: string}> = ({ startX, startY, endX, endY, color }) => {
    return (
        <g>
            {/* Wire Path - Base */}
            <path 
                d={`M${startX},${startY} L${endX},${endY}`}
                stroke="#e2e8f0" 
                strokeWidth="0.08"
                fill="none"
            />
            
            {/* Moving Energy Pulse */}
            <motion.path 
                d={`M${startX},${startY} L${endX},${endY}`}
                stroke={color}
                strokeWidth="0.15"
                strokeLinecap="round"
                strokeDasharray="0 100" 
                fill="none"
                animate={{ 
                    strokeDasharray: ["0 100", "20 100", "0 100"], 
                    strokeDashoffset: [0, -40, -100]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: Math.random() + 1 // Slower, more organic pulses
                }}
                style={{ opacity: 0.8, filter: 'drop-shadow(0px 0px 1px rgba(59, 130, 246, 0.3))' }}
            />
        </g>
    )
}

const CentralChip: React.FC = () => {
    return (
        <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-50 blur-[100px] opacity-70" />
            
            {/* Rotating Rings - Clockwise */}
            <div className="absolute inset-[-10%] rounded-full border border-gray-200/60 opacity-60 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-[-20%] rounded-full border border-dashed border-gray-300/40 opacity-50 animate-[spin_50s_linear_infinite]" />

            {/* Core Box - Ceramic / White Tech Look */}
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative z-10 w-28 h-28 md:w-40 md:h-40 bg-white rounded-[2.5rem] border border-white flex flex-col items-center justify-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),0_10px_20px_-5px_rgba(0,0,0,0.04)] overflow-hidden group"
            >
                 {/* Inner Shadow for depth */}
                 <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.01)] rounded-[2.5rem] pointer-events-none" />

                 {/* Subtle Texture */}
                 <div className="absolute inset-0 opacity-[0.3]" 
                      style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}
                 />
                 
                 {/* Central Icon */}
                 <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-50 shadow-sm">
                        <Cpu className="text-blue-600 w-7 h-7 md:w-10 md:h-10" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-mono text-[9px] font-bold text-gray-400 tracking-[0.2em] mb-1">AIX CORE</span>
                        <div className="flex gap-1">
                             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                             <div className="w-1 h-1 bg-gray-200 rounded-full" />
                             <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                 </div>
                 
                 {/* Laser Scanline Effect */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-[scan_3s_ease-in-out_infinite]" />
            </motion.div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-10px); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(200px); opacity: 0; }
                }
            `}</style>
        </div>
    )
}

const ToolCard: React.FC<{ tool: any }> = ({ tool }) => {
    return (
        <div className="relative group cursor-pointer flex flex-col items-center justify-center">
            
            {/* The Icon Box - Centers on the grid point */}
            <div 
                className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-[0_15px_40px_-10px_rgba(59,130,246,0.15)] relative overflow-hidden z-20"
            >
                {/* Internal Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                     style={{ background: tool.color }} 
                />
                
                <tool.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-brand-black transition-colors z-10" strokeWidth={1.5} />
            </div>
            
            {/* Label - Absolute positioning to hang below without affecting center point */}
            <div className="absolute top-[120%] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm transform transition-all duration-300 group-hover:top-[130%] group-hover:border-blue-100 z-10">
                <span className="font-mono text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors whitespace-nowrap">
                    {tool.name}
                </span>
            </div>
        </div>
    )
}
