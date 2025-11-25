import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

const SERVICES: ServiceItem[] = [
  {
    title: "Strategic Foresight",
    description: "Mapping the trajectory of your brand through data-driven insight and creative intuition.",
    tags: ["Market Analysis", "Brand Positioning", "Roadmapping"]
  },
  {
    title: "Interface Architecture",
    description: "Building robust, scalable design systems that serve as the foundation for rapid product evolution.",
    tags: ["Design Systems", "UI/UX", "Component Libraries"]
  },
  {
    title: "Immersive Engineering",
    description: "Bridging the gap between static design and fluid interaction using modern frontend technologies.",
    tags: ["React/Next.js", "WebGL", "Micro-interactions"]
  },
  {
    title: "AI Integration",
    description: "Weaving generative capabilities into user flows to create magical, anticipatory experiences.",
    tags: ["LLM Integration", "Prompt Engineering", "Adaptive UI"]
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-gray-100 pb-8">
        <div>
            <span className="font-mono text-xs uppercase text-gray-400 mb-2 block">01 — Capabilities</span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-black">Our Expertise</h2>
        </div>
        <p className="font-sans text-gray-500 max-w-md mt-6 md:mt-0">
            We don't just build websites; we construct digital behaviors that align with your business logic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {SERVICES.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-brand-black group-hover:text-brand-accent transition-colors">
                    {service.title}
                </h3>
                <ArrowUpRight className="text-gray-300 group-hover:text-brand-accent transition-colors opacity-0 group-hover:opacity-100" />
            </div>
            <p className="font-sans text-gray-600 leading-relaxed mb-6 max-w-sm">
                {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] uppercase border border-gray-200 px-2 py-1 rounded text-gray-500">
                        {tag}
                    </span>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};