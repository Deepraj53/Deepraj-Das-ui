import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import * as THREE from 'three';

// Custom Three.js Component for the Background
const ThreeLandscape: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.03);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 3;
    camera.rotation.x = -0.3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles / Terrain Geometry
    // We create a plane of particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000; // Number of particles
    
    const posArray = new Float32Array(particlesCount * 3);
    
    // Create a spread of particles
    for(let i = 0; i < particlesCount * 3; i+=3) {
      // x: -15 to 15
      posArray[i] = (Math.random() - 0.5) * 30;
      // y: flat plane initially (will be animated)
      posArray[i+1] = (Math.random() - 0.5) * 2; 
      // z: -10 to 10
      posArray[i+2] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x3B82F6, // Brand accent blue
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Additional "Grid" floor for landscape feel
    const gridHelper = new THREE.GridHelper(40, 40, 0x333333, 0x111111);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Animation Loop
    let time = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Animate particles to simulate a wave
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        
        // Simple sine wave animation based on position and time
        // Create a flowing landscape effect
        positions[i * 3 + 1] = Math.sin(x * 0.5 + time) * 0.5 + Math.sin(z * 0.5 + time) * 0.5;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Rotate slightly
      particlesMesh.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" />;
};

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 md:px-12 w-full overflow-hidden bg-brand-black text-white">
      
      {/* 3D Background */}
      <ThreeLandscape />
      
      {/* Radial Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-black opacity-80 z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-12">
        
        {/* Badge - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Badge theme="dark" />
        </motion.div>

        {/* Main H1 - Centered */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 tracking-tight"
        >
          User Experiences that make your business a <span className="italic font-light text-brand-accent">happening</span> business.
        </motion.h1>

        {/* H2 Subhead - Centered */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans font-light text-lg md:text-2xl text-gray-400 mb-10 max-w-3xl leading-snug"
        >
          We craft digital ecosystems where innovation meets creativity, transforming silence into noise.
        </motion.h2>

        {/* Description Body - Centered */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono text-xs md:text-sm text-gray-500 max-w-xl leading-relaxed mb-12"
        >
          ( 1rem : 16px | Aeonik ) Artificial Intelligence is transforming industries by automating tasks, enhancing decision-making, and creating innovative solutions.
        </motion.p>

        {/* Action - Centered */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
        >
            <a href="#services" className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-brand-black rounded-full font-mono text-xs uppercase tracking-wider hover:bg-brand-accent hover:text-white transition-all duration-300">
                Discover the future
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <div className="mt-4 flex flex-col items-center gap-1">
                 <span className="w-px h-12 bg-gray-800"></span>
                 <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">Scroll</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
};