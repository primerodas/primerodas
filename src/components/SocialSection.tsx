import React from 'react';
import { INSTAGRAM_POSTS } from '../data/primeRodasData';
import { BrandAsterisk } from './BrandAsterisk';
import { Instagram, Facebook, Youtube, Globe, Heart } from 'lucide-react';

export const SocialSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#E30613] tracking-widest uppercase mb-4">
            <BrandAsterisk size={12} />
            <span>REDES SOCIAIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Acompanhe a Prime Rodas.
          </h2>

          {/* Glass Social Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://instagram.com/primerodasrn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#E30613] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-white/12 backdrop-blur-md transition-all duration-300 shadow-md"
            >
              <Instagram className="w-4 h-4" />
              <span>@primerodasrn</span>
            </a>

            <a
              href="https://facebook.com/primerodasrn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#E30613] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-white/12 backdrop-blur-md transition-all duration-300 shadow-md"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>

            <a
              href="https://youtube.com/@primerodasrn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#E30613] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-white/12 backdrop-blur-md transition-all duration-300 shadow-md"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </a>

            <a
              href="#hero"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#E30613] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-white/12 backdrop-blur-md transition-all duration-300 shadow-md"
            >
              <Globe className="w-4 h-4" />
              <span>Site Oficial</span>
            </a>
          </div>
        </div>

        {/* 6 Post Grid Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/primerodasrn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg"
            >
              <img
                src={post.imageUrl}
                alt="Publicação Instagram Prime Rodas"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-left">
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <Instagram className="w-3.5 h-3.5 text-[#E30613]" />
                  <span>Prime Rodas</span>
                </div>
                <p className="text-[11px] text-gray-200 line-clamp-3 leading-tight">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-gray-300">
                  <Heart className="w-3 h-3 text-[#E30613] fill-[#E30613]" />
                  <span>{post.likes} curtidas</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
