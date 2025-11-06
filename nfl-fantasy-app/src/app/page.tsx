'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #1a5f1a 0%, #0d4f0d 50%, #1a5f1a 100%)',
    }}>
      {/* Football Field Yard Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t-4 border-white"
            style={{ top: `${(i + 1) * 10}%` }}
          >
            {/* Yard Numbers */}
            <div className="absolute left-8 -top-8 text-white text-4xl font-black opacity-50">
              {i * 10}
            </div>
            <div className="absolute right-8 -top-8 text-white text-4xl font-black opacity-50">
              {i * 10}
            </div>
          </div>
        ))}
        {/* Hash Marks */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`hash-${i}`}
            className="absolute w-8 border-t-2 border-white/50"
            style={{
              top: `${i * 2}%`,
              left: i % 2 === 0 ? '30%' : '60%'
            }}
          />
        ))}
      </div>

      {/* Grass Texture Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.1) 2px,
          rgba(0, 0, 0, 0.1) 4px
        )`
      }}></div>

      {/* Header - Scoreboard Style */}
      <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-2xl border-b-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-black text-yellow-300 text-center drop-shadow-lg" style={{
              textShadow: '3px 3px 6px rgba(0,0,0,0.8)'
            }}>
              🏈 NFL FANTASY HUB 🏈
            </h1>
            <p className="text-yellow-100 mt-2 text-lg font-bold text-center">
              2025-2026 SEASON • LIVE DATA
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
          <div className="inline-block mb-6 px-6 py-3 bg-red-600 rounded-lg shadow-2xl border-2 border-white animate-pulse">
            <span className="text-white font-black text-base uppercase tracking-wider">🔥 GAME ON!</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4" style={{
            textShadow: '4px 4px 8px rgba(0,0,0,0.9)'
          }}>
            DOMINATE YOUR LEAGUE
          </h2>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto font-semibold">
            Real-time stats • Advanced predictions • Championship strategies
          </p>
        </div>

        {/* Feature Cards - Football Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Fantasy Card - End Zone Style */}
          <Link href="/fantasy" className="group">
            <div className={`relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-2xl p-8 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border-4 border-yellow-400 h-full ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '300ms'}}>
              {/* End Zone Pattern */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-blue-800 opacity-50" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)'
              }}></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500 border-2 border-white">
                    <span className="text-4xl">📊</span>
                  </div>
                  <h3 className="text-3xl font-black text-yellow-300 ml-4 group-hover:text-yellow-200 transition-colors">
                    FANTASY TOOLS
                  </h3>
                </div>

                <p className="text-yellow-100 mb-6 text-base font-semibold">
                  Professional-grade analysis to win it all
                </p>

                <ul className="space-y-3 text-white mb-6">
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold">
                    <span className="text-2xl mr-3">⭐</span>
                    <span>Team Ratings: S to F Tier</span>
                  </li>
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold" style={{transitionDelay: '75ms'}}>
                    <span className="text-2xl mr-3">🔄</span>
                    <span>Trade Analyzer</span>
                  </li>
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold" style={{transitionDelay: '150ms'}}>
                    <span className="text-2xl mr-3">💪</span>
                    <span>Position Strength</span>
                  </li>
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold" style={{transitionDelay: '225ms'}}>
                    <span className="text-2xl mr-3">🎯</span>
                    <span>Value Calculator</span>
                  </li>
                </ul>

                <div className="flex items-center text-yellow-300 font-black text-base group-hover:gap-4 gap-2 transition-all">
                  <span>ANALYZE NOW</span>
                  <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Predictions Card - Red Zone Style */}
          <Link href="/predictions" className="group">
            <div className={`relative bg-gradient-to-br from-red-900 to-red-700 rounded-2xl shadow-2xl p-8 hover:shadow-red-500/50 transition-all duration-500 hover:scale-105 border-4 border-yellow-400 h-full ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`} style={{transitionDelay: '300ms'}}>
              {/* End Zone Pattern */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-red-800 opacity-50" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)'
              }}></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500 border-2 border-white">
                    <span className="text-4xl">🔮</span>
                  </div>
                  <h3 className="text-3xl font-black text-yellow-300 ml-4 group-hover:text-yellow-200 transition-colors">
                    PREDICTIONS
                  </h3>
                </div>

                <p className="text-yellow-100 mb-6 text-base font-semibold">
                  AI-powered forecasts for the season
                </p>

                <ul className="space-y-3 text-white mb-6">
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold">
                    <span className="text-2xl mr-3">🎮</span>
                    <span>Game Predictions</span>
                  </li>
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold" style={{transitionDelay: '75ms'}}>
                    <span className="text-2xl mr-3">📈</span>
                    <span>Division Standings</span>
                  </li>
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold" style={{transitionDelay: '150ms'}}>
                    <span className="text-2xl mr-3">🏆</span>
                    <span>Playoff Bracket</span>
                  </li>
                  <li className="flex items-center text-base group-hover:translate-x-2 transition-transform duration-300 font-semibold" style={{transitionDelay: '225ms'}}>
                    <span className="text-2xl mr-3">👑</span>
                    <span>Super Bowl Winner</span>
                  </li>
                </ul>

                <div className="flex items-center text-yellow-300 font-black text-base group-hover:gap-4 gap-2 transition-all">
                  <span>VIEW PREDICTIONS</span>
                  <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section - Scoreboard Style */}
        <div className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border-4 border-yellow-400 shadow-2xl ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '500ms'}}>
          <h3 className="text-2xl font-black text-yellow-300 mb-8 text-center">PLATFORM STATS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-black text-yellow-400 mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                100+
              </div>
              <div className="text-white text-sm font-bold">NFL PLAYERS</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-black text-yellow-400 mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                32
              </div>
              <div className="text-white text-sm font-bold">NFL TEAMS</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-black text-yellow-400 mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                18
              </div>
              <div className="text-white text-sm font-bold">WEEKS</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl font-black text-red-500 mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                LIVE
              </div>
              <div className="text-white text-sm font-bold">REAL DATA</div>
            </div>
          </div>
        </div>

        {/* Call to Action - Touchdown Buttons */}
        <div className={`text-center mt-12 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '700ms'}}>
          <p className="text-xl text-yellow-100 mb-6 font-bold">READY TO WIN?</p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/fantasy"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 font-black text-lg text-white overflow-hidden border-2 border-yellow-400"
            >
              <span className="relative z-10">🔥 ANALYZE TEAMS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/predictions"
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 font-black text-lg text-white overflow-hidden border-2 border-yellow-400"
            >
              <span className="relative z-10">⚡ SEE FUTURE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - Stadium Style */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 mt-16 border-t-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-300 text-base font-bold">NFL FANTASY & PREDICTIONS HUB</p>
          <p className="text-gray-400 text-sm mt-1">2025-2026 Season • Live ESPN Data</p>
        </div>
      </footer>
    </div>
  );
}
