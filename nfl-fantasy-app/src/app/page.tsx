'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-900">
      {/* Header */}
      <header className="bg-nfl-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-white">NFL Fantasy & Predictions Hub</h1>
          <p className="text-gray-300 mt-2">2025-2026 Season Analysis</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            Your Complete NFL Toolkit
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Analyze fantasy teams, evaluate trades, and predict the entire NFL season
            with advanced algorithms and real-time data
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Fantasy Features */}
          <Link href="/fantasy" className="group">
            <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-shadow h-full border-4 border-transparent hover:border-green-500">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 ml-4">Fantasy Tools</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive fantasy football analysis tools
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Team Skill Rating (S, A, B, C, D, F tiers)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Trade Analyzer with value differential</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Position strength breakdown</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Roster depth & upside analysis</span>
                </li>
              </ul>
            </div>
          </Link>

          {/* NFL Predictions */}
          <Link href="/predictions" className="group">
            <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-shadow h-full border-4 border-transparent hover:border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 ml-4">NFL Predictions</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Advanced predictions for the rest of the season
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Weekly game predictions with win probabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Projected final division standings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Complete playoff bracket simulation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Super Bowl champion prediction</span>
                </li>
              </ul>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400">100+</div>
              <div className="text-gray-300">NFL Players</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">32</div>
              <div className="text-gray-300">NFL Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">18</div>
              <div className="text-gray-300">Week Season</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400">Real-Time</div>
              <div className="text-gray-300">Analysis</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-nfl-blue text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">NFL Fantasy & Predictions Hub - 2025-2026 Season</p>
          <p className="text-gray-400 text-sm mt-2">Built with Next.js, TypeScript, and Advanced Analytics</p>
        </div>
      </footer>
    </div>
  );
}
