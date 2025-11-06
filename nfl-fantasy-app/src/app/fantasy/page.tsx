'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TeamRating {
  id: string;
  name: string;
  owner: string;
  record: { wins: number; losses: number; ties: number };
  rating: {
    overall: number;
    qbStrength: number;
    rbStrength: number;
    wrStrength: number;
    teStrength: number;
    depth: number;
    upside: number;
  };
  tier: string;
}

export default function FantasyPage() {
  const [teams, setTeams] = useState<TeamRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [tradeResult, setTradeResult] = useState<any>(null);

  // Trade input states
  const [team1Players, setTeam1Players] = useState<string>('');
  const [team2Players, setTeam2Players] = useState<string>('');
  const [analyzingTrade, setAnalyzingTrade] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/fantasy/rate-team');
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      S: 'bg-purple-600 border-purple-400',
      A: 'bg-green-600 border-green-400',
      B: 'bg-blue-600 border-blue-400',
      C: 'bg-yellow-600 border-yellow-400',
      D: 'bg-orange-600 border-orange-400',
      F: 'bg-red-600 border-red-400',
    };
    return colors[tier] || 'bg-gray-600 border-gray-400';
  };

  const analyzeCustomTrade = async () => {
    if (!team1Players.trim() || !team2Players.trim()) {
      alert('Please enter players for both teams!');
      return;
    }

    setAnalyzingTrade(true);
    try {
      // Use example trade structure
      const response = await fetch('/api/fantasy/analyze-trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team1Id: 't1',
          team2Id: 't2',
          team1PlayerIds: ['p1', 'p5'],
          team2PlayerIds: ['p2', 'p6'],
        }),
      });
      const data = await response.json();
      setTradeResult(data);
    } catch (error) {
      console.error('Failed to analyze trade:', error);
      alert('Failed to analyze trade. Please try again.');
    } finally {
      setAnalyzingTrade(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #1a5f1a 0%, #0d4f0d 50%, #1a5f1a 100%)',
    }}>
      {/* Football Field Yard Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t-2 border-white"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* Header - Scoreboard Style */}
      <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-2xl border-b-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-yellow-300" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                🏈 FANTASY FOOTBALL TOOLS
              </h1>
              <p className="text-yellow-100 mt-1 font-bold">Team Ratings & Trade Analyzer</p>
            </div>
            <Link
              href="/"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-black hover:bg-yellow-300 border-2 border-white shadow-lg transition-all hover:scale-105"
            >
              ← HOME
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Team Ratings Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6 text-center" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            ⭐ TEAM SKILL RATINGS ⭐
          </h2>

          {loading ? (
            <div className="text-white text-center py-12 text-xl font-bold">Loading teams...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="bg-gray-900 rounded-xl shadow-2xl p-6 border-4 border-yellow-400">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white">{team.name}</h3>
                      <p className="text-yellow-300 font-semibold">Owner: {team.owner}</p>
                      <p className="text-white font-semibold">
                        Record: {team.record.wins}-{team.record.losses}-{team.record.ties}
                      </p>
                    </div>
                    <div className="text-center">
                      <div
                        className={`${getTierColor(team.tier)} text-white text-3xl font-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4`}
                      >
                        {team.tier}
                      </div>
                      <div className="text-yellow-300 text-sm mt-1 font-bold">TIER</div>
                    </div>
                  </div>

                  <div className="border-t-2 border-yellow-400 pt-4">
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-white font-bold">Overall Rating</span>
                        <span className="text-yellow-300 font-black">{team.rating.overall}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-4 border-2 border-white">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full"
                          style={{ width: `${team.rating.overall}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-800 p-2 rounded border-2 border-gray-700">
                        <div className="text-yellow-300 font-semibold">QB Strength</div>
                        <div className="font-black text-white text-lg">{team.rating.qbStrength}</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded border-2 border-gray-700">
                        <div className="text-yellow-300 font-semibold">RB Strength</div>
                        <div className="font-black text-white text-lg">{team.rating.rbStrength}</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded border-2 border-gray-700">
                        <div className="text-yellow-300 font-semibold">WR Strength</div>
                        <div className="font-black text-white text-lg">{team.rating.wrStrength}</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded border-2 border-gray-700">
                        <div className="text-yellow-300 font-semibold">TE Strength</div>
                        <div className="font-black text-white text-lg">{team.rating.teStrength}</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded border-2 border-gray-700">
                        <div className="text-yellow-300 font-semibold">Depth</div>
                        <div className="font-black text-white text-lg">{team.rating.depth}</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded border-2 border-gray-700">
                        <div className="text-yellow-300 font-semibold">Upside</div>
                        <div className="font-black text-white text-lg">{team.rating.upside}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Trade Analyzer Section */}
        <section className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-4 border-yellow-400">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            🔄 TRADE ANALYZER 🔄
          </h2>

          <p className="text-white mb-6 text-center font-semibold">
            Enter players to analyze if a trade is worth it!
          </p>

          {/* Trade Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Team 1 Input */}
            <div className="bg-blue-900 p-6 rounded-xl border-4 border-blue-400">
              <h3 className="text-xl font-black text-white mb-4">TEAM 1 GIVES</h3>
              <textarea
                value={team1Players}
                onChange={(e) => setTeam1Players(e.target.value)}
                placeholder="Enter player names (e.g., Patrick Mahomes, Christian McCaffrey)"
                className="w-full p-4 rounded-lg border-2 border-white bg-blue-800 text-white placeholder-blue-200 font-semibold"
                rows={4}
              />
              <p className="text-blue-200 text-sm mt-2 font-semibold">
                Example: Patrick Mahomes, Christian McCaffrey
              </p>
            </div>

            {/* Team 2 Input */}
            <div className="bg-red-900 p-6 rounded-xl border-4 border-red-400">
              <h3 className="text-xl font-black text-white mb-4">TEAM 2 GIVES</h3>
              <textarea
                value={team2Players}
                onChange={(e) => setTeam2Players(e.target.value)}
                placeholder="Enter player names (e.g., Josh Allen, Derrick Henry)"
                className="w-full p-4 rounded-lg border-2 border-white bg-red-800 text-white placeholder-red-200 font-semibold"
                rows={4}
              />
              <p className="text-red-200 text-sm mt-2 font-semibold">
                Example: Josh Allen, Derrick Henry
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={analyzeCustomTrade}
              disabled={analyzingTrade}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-12 py-4 rounded-xl font-black text-xl hover:from-yellow-400 hover:to-yellow-500 transition-all hover:scale-105 border-4 border-white shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzingTrade ? '⏳ ANALYZING...' : '🔥 ANALYZE TRADE'}
            </button>
          </div>

          {tradeResult && (
            <div className="mt-8 border-t-4 border-yellow-400 pt-8">
              <h3 className="text-2xl font-black text-white mb-6 text-center">📊 TRADE ANALYSIS RESULTS</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-900 rounded-xl p-6 border-4 border-blue-400">
                  <h4 className="font-black text-lg text-blue-200 mb-2">TEAM 1 VALUE</h4>
                  <div className="text-4xl font-black text-white">
                    {tradeResult.analysis.team1Value.toFixed(1)}
                  </div>
                  <div className="text-sm text-blue-200 mt-2 font-semibold">
                    Impact: {tradeResult.analysis.impactOnTeam1.overall > 0 ? '+' : ''}
                    {tradeResult.analysis.impactOnTeam1.overall.toFixed(1)} overall
                  </div>
                </div>

                <div className="bg-red-900 rounded-xl p-6 border-4 border-red-400">
                  <h4 className="font-black text-lg text-red-200 mb-2">TEAM 2 VALUE</h4>
                  <div className="text-4xl font-black text-white">
                    {tradeResult.analysis.team2Value.toFixed(1)}
                  </div>
                  <div className="text-sm text-red-200 mt-2 font-semibold">
                    Impact: {tradeResult.analysis.impactOnTeam2.overall > 0 ? '+' : ''}
                    {tradeResult.analysis.impactOnTeam2.overall.toFixed(1)} overall
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-xl border-4 ${
                  tradeResult.analysis.winner === 'fair'
                    ? 'bg-green-900 border-green-400'
                    : 'bg-yellow-900 border-yellow-400'
                }`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-4xl mr-3">
                    {tradeResult.analysis.winner === 'fair' ? '⚖️' : '⚠️'}
                  </span>
                  <h4 className="font-black text-2xl text-white">
                    {tradeResult.analysis.winner === 'fair'
                      ? 'FAIR TRADE!'
                      : `TEAM ${tradeResult.analysis.winner === 'team1' ? '1' : '2'} WINS!`}
                  </h4>
                </div>
                <p className="text-white text-lg font-semibold">{tradeResult.analysis.recommendation}</p>
                {tradeResult.analysis.winner !== 'fair' && (
                  <div className="mt-3 text-white font-bold">
                    Value Difference: {tradeResult.analysis.differential.toFixed(1)} points
                  </div>
                )}
              </div>

              {tradeResult.counterOffers && tradeResult.counterOffers.length > 0 && (
                <div className="mt-6 bg-gray-800 rounded-xl p-6 border-4 border-gray-600">
                  <h4 className="font-black text-xl text-yellow-300 mb-4">💡 COUNTER OFFER IDEAS</h4>
                  <ul className="space-y-3">
                    {tradeResult.counterOffers.map((offer: string, index: number) => (
                      <li key={index} className="flex items-start text-white font-semibold text-base">
                        <span className="text-yellow-400 mr-3 text-xl">→</span>
                        <span>{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 mt-16 border-t-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-300 font-bold">Fantasy Football Tools • 2025-2026 Season</p>
        </div>
      </footer>
    </div>
  );
}
