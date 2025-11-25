import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { ProjectItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    client: "Nebula Finance",
    title: "Institutional Trading Engine",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1600",
    year: "2024",
    category: "FinTech"
  },
  {
    id: 2,
    client: "Artemis Health",
    title: "AI Diagnostic Interface",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600",
    year: "2023",
    category: "HealthTech"
  },
  {
    id: 3,
    client: "Velocita Global",
    title: "Logistics Visualization System",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600",
    year: "2024",
    category: "Infrastructure"
  },
  {
    id: 4,
    client: "Echo Spatial",
    title: "AR Architecture Platform",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600",
    year: "2023",
    category: "Spatial Computing"
  }
];

// --- 3D SCENE: Liquid Gradient Blob ---
const Scene3D: React.FC<{ scrollProgress: MotionValue<number> }> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Geometry - High resolution sphere for vertex displacement
    const geometry = new THREE.SphereGeometry(1.6, 128, 128); 
    
    // Store original positions for calculating noise offset
    const originalPositions = geometry.attributes.position.array.slice();

    // 3. Material - High Gloss White to catch colored lights
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0, 
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // 4. Lighting - The "Gradient" Creator
    // We use 3 strong colored lights to paint the white blob
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Light 1: Bright Magenta/Pink
    const light1 = new THREE.PointLight(0xFF00FF, 2, 20);
    light1.position.set(-5, 5, 5);
    scene.add(light1);

    // Light 2: Bright Cyan/Blue
    const light2 = new THREE.PointLight(0x00FFFF, 2, 20);
    light2.position.set(5, -5, 5);
    scene.add(light2);

    // Light 3: Bright Yellow/Orange
    const light3 = new THREE.PointLight(0xFFD700, 2, 20);
    light3.position.set(0, 5, -5);
    scene.add(light3);

    // 5. Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0015; // Speed of undulation
      const currentScroll = scrollProgress.get();

      // --- VERTEX DISPLACEMENT (The "Liquid" Effect) ---
      // We modify the vertices based on sine waves to create blobs
      
      const positions = geometry.attributes.position.array;
      const count = geometry.attributes.position.count;
      
      // Interaction: Turbulence increases with scroll
      const turbulence = 0.4 + (currentScroll * 0.4); 

      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Normalize to get direction
        const vector = new THREE.Vector3(ox, oy, oz).normalize();

        // Noise function (Simulated with sin/cos layers)
        const noise = 
            Math.sin(vector.x * 2.5 + time) * 
            Math.cos(vector.y * 2.0 + time) * 
            Math.sin(vector.z * 2.5 + time) * turbulence;
        
        // Apply noise to radius
        const scalar = 1.6 + noise;
        
        positions[i * 3] = vector.x * scalar;
        positions[i * 3 + 1] = vector.y * scalar;
        positions[i * 3 + 2] = vector.z * scalar;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals(); // Essential for lighting updates on the changing shape

      // --- SCROLL INTERACTION ---
      
      // 1. Rotation: Spins faster with scroll
      blob.rotation.y = time * 0.2 + (currentScroll * Math.PI * 2);
      blob.rotation.z = currentScroll * Math.PI * 0.5;

      // 2. Light Orbit: Lights move around to shift the gradient colors
      light1.position.x = Math.sin(time + currentScroll) * 6;
      light1.position.z = Math.cos(time + currentScroll) * 6;
      
      light2.position.y = Math.sin(time * 0.8 + currentScroll) * 6;
      light2.position.x = Math.cos(time * 0.8 + currentScroll) * 6;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

const DarkSimpleBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 bg-[#050505]">
            {/* Very subtle noise texture for realism */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
            
            {/* Subtle center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
        </div>
    )
}

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative mb-40 last:mb-0 w-full"
        >
            {/* Image Container - Dark Glass Effect */}
            <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] mb-8 rounded-sm bg-gray-900 border border-white/10 shadow-2xl group-hover:border-white/20 transition-all duration-500">
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative z-0"
                >
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                    />
                </motion.div>
                
                <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono uppercase tracking-widest rounded-full">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Typography - Minimal and Clean */}
            <div className="flex flex-col border-t border-white/10 pt-6">
                <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">{project.client} — {project.year}</span>
                    <ArrowUpRight className="text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={18} />
                </div>
                <h3 className="font-serif text-4xl md:text-6xl text-white group-hover:text-brand-accent transition-colors duration-300">
                    {project.title}
                </h3>
            </div>
        </motion.div>
    )
}

export const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.2,
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} id="work" className="relative bg-[#050505] text-white min-h-[350vh]">
        
        {/* Fixed Background */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
            <DarkSimpleBackground />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row z-10 pointer-events-none">
            
            {/* Sticky Left Column: Title + 3D Artifact */}
            <div className="w-full md:w-5/12 h-[50vh] md:h-screen sticky top-0 flex flex-col justify-center py-12 md:py-0 pointer-events-auto">
                
                {/* 3D Wrapper */}
                <div className="absolute top-0 left-[-20%] md:left-[-15%] w-[140%] md:w-[130%] h-full z-[-1] opacity-100 pointer-events-none">
                     <Scene3D scrollProgress={smoothProgress} />
                </div>
                
                {/* Section Title Info */}
                <div className="relative pl-4 border-l border-white/10 backdrop-blur-sm bg-black/10 p-6 rounded-r-2xl mt-48 md:mt-0">
                    <span className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6 block flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_10px_#3B82F6]"></span>
                        Selected Works (04)
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-8 tracking-tighter text-white">
                        Liquid <br/> <span className="italic font-light text-gray-500">Intelligence.</span>
                    </h2>
                    <p className="font-sans text-gray-400 max-w-sm leading-relaxed text-sm">
                        Fluid interfaces that adapt to user intent. We craft digital organisms that live and breathe on the web.
                    </p>
                    
                    <div className="mt-12">
                        <a href="#" className="inline-block border-b border-gray-700 pb-1 font-mono text-xs uppercase hover:text-brand-accent hover:border-brand-accent transition-colors">
                            View Full Archive
                        </a>
                    </div>
                </div>
            </div>

            {/* Scrollable Right Column: Project Feed */}
            <div className="w-full md:w-7/12 pt-[10vh] md:pt-[20vh] pb-32 md:pl-24 pointer-events-auto">
                <div className="flex flex-col">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>

        </div>
    </section>
  );
};