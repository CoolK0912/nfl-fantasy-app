'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md shadow-2xl border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              🏈 NFL Fantasy Hub
            </h1>
            <p className="text-gray-300 mt-3 text-xl font-semibold">
              Your Ultimate 2025-2026 Season Command Center
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Section with Animation */}
        <div className={`text-center mb-20 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg animate-bounce">
            <span className="text-black font-bold text-sm uppercase tracking-wider">🔥 Live for 2025-2026 Season</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Dominate Your League
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powered by <span className="text-blue-400 font-bold">advanced algorithms</span> and{' '}
            <span className="text-purple-400 font-bold">AI predictions</span> to give you the edge
          </p>
        </div>

        {/* Feature Cards with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Fantasy Card */}
          <Link href="/fantasy" className="group">
            <div className={`relative bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-md rounded-3xl shadow-2xl p-10 hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 border border-green-500/30 hover:border-green-400 h-full ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '300ms'}}>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                    <span className="text-5xl">📊</span>
                  </div>
                  <h3 className="text-4xl font-black text-white ml-6 group-hover:text-green-300 transition-colors">
                    Fantasy Tools
                  </h3>
                </div>

                <p className="text-gray-300 mb-6 text-lg">
                  Dominate your league with professional-grade analysis tools
                </p>

                <ul className="space-y-4 text-gray-200 mb-6">
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-3xl mr-3">⭐</span>
                    <span><strong className="text-green-300">Team Ratings</strong> - S tier to F tier analysis</span>
                  </li>
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: '75ms'}}>
                    <span className="text-3xl mr-3">🔄</span>
                    <span><strong className="text-green-300">Trade Analyzer</strong> - Win every trade</span>
                  </li>
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: '150ms'}}>
                    <span className="text-3xl mr-3">💪</span>
                    <span><strong className="text-green-300">Position Power</strong> - Deep roster insights</span>
                  </li>
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: '225ms'}}>
                    <span className="text-3xl mr-3">🎯</span>
                    <span><strong className="text-green-300">Value Calculator</strong> - Never overpay</span>
                  </li>
                </ul>

                <div className="flex items-center text-green-300 font-bold text-lg group-hover:gap-4 gap-2 transition-all">
                  <span>Launch Fantasy Tools</span>
                  <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Predictions Card */}
          <Link href="/predictions" className="group">
            <div className={`relative bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-3xl shadow-2xl p-10 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border border-blue-500/30 hover:border-blue-400 h-full ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`} style={{transitionDelay: '300ms'}}>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                    <span className="text-5xl">🔮</span>
                  </div>
                  <h3 className="text-4xl font-black text-white ml-6 group-hover:text-blue-300 transition-colors">
                    Predictions
                  </h3>
                </div>

                <p className="text-gray-300 mb-6 text-lg">
                  See the future with AI-powered season forecasts
                </p>

                <ul className="space-y-4 text-gray-200 mb-6">
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-3xl mr-3">🎮</span>
                    <span><strong className="text-blue-300">Game Predictions</strong> - Every matchup scored</span>
                  </li>
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: '75ms'}}>
                    <span className="text-3xl mr-3">📈</span>
                    <span><strong className="text-blue-300">Division Standings</strong> - Final rankings</span>
                  </li>
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: '150ms'}}>
                    <span className="text-3xl mr-3">🏆</span>
                    <span><strong className="text-blue-300">Playoff Bracket</strong> - Complete simulation</span>
                  </li>
                  <li className="flex items-center text-lg group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: '225ms'}}>
                    <span className="text-3xl mr-3">👑</span>
                    <span><strong className="text-blue-300">Super Bowl</strong> - Champion revealed</span>
                  </li>
                </ul>

                <div className="flex items-center text-blue-300 font-bold text-lg group-hover:gap-4 gap-2 transition-all">
                  <span>View Predictions</span>
                  <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section with Animation */}
        <div className={`bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20 shadow-2xl ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '500ms'}}>
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Platform Power</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 animate-pulse">
                100+
              </div>
              <div className="text-gray-300 text-lg font-semibold">NFL Players</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-2 animate-pulse">
                32
              </div>
              <div className="text-gray-300 text-lg font-semibold">NFL Teams</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2 animate-pulse">
                18
              </div>
              <div className="text-gray-300 text-lg font-semibold">Weeks</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mb-2 animate-pulse">
                ∞
              </div>
              <div className="text-gray-300 text-lg font-semibold">Possibilities</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '700ms'}}>
          <p className="text-2xl text-gray-300 mb-8">Ready to dominate?</p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/fantasy"
              className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 font-bold text-xl text-white overflow-hidden"
            >
              <span className="relative z-10">🔥 Analyze Teams</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/predictions"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 font-bold text-xl text-white overflow-hidden"
            >
              <span className="relative z-10">⚡ See Future</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md text-white py-8 mt-20 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-lg">NFL Fantasy & Predictions Hub - 2025-2026 Season</p>
          <p className="text-gray-500 text-sm mt-2">Powered by Advanced Analytics & AI</p>
        </div>
      </footer>
    </div>
  );
}
