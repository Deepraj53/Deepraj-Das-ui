import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            <div className="max-w-xl">
                <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-none">
                    Let's make it <br/><span className="italic text-gray-500">happen.</span>
                </h2>
                <a href="mailto:hello@happening.design" className="font-mono text-xl md:text-2xl border-b border-gray-700 pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors">
                    hello@happening.design
                </a>
            </div>

            <div className="mt-12 md:mt-0 flex gap-12 md:gap-24">
                <div>
                    <h4 className="font-mono text-xs uppercase text-gray-500 mb-4">Social</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="font-sans text-sm hover:text-brand-accent">Instagram</a></li>
                        <li><a href="#" className="font-sans text-sm hover:text-brand-accent">Twitter / X</a></li>
                        <li><a href="#" className="font-sans text-sm hover:text-brand-accent">LinkedIn</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-mono text-xs uppercase text-gray-500 mb-4">Locations</h4>
                    <ul className="space-y-2">
                        <li className="font-sans text-sm text-gray-400">New York</li>
                        <li className="font-sans text-sm text-gray-400">Berlin</li>
                        <li className="font-sans text-sm text-gray-400">Remote</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
            <p className="font-mono text-xs text-gray-500">© 2024 Happening Design Studio.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="font-mono text-xs text-gray-500 hover:text-white">Privacy</a>
                <a href="#" className="font-mono text-xs text-gray-500 hover:text-white">Terms</a>
            </div>
        </div>
      </div>
    </footer>
  );
};