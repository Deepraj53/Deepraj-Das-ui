import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Work } from './components/Work';
import { AIXFramework } from './components/AIXFramework';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="antialiased bg-white selection:bg-brand-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Work />
        <AIXFramework />
      </main>
      <Footer />
    </div>
  );
};

export default App;