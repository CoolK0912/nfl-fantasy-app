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
  const [selectedTeams, setSelectedTeams] = useState<{ team1: string; team2: string }>({
    team1: '',
    team2: '',
  });
  const [tradeResult, setTradeResult] = useState<any>(null);

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
      S: 'bg-purple-500',
      A: 'bg-green-500',
      B: 'bg-blue-500',
      C: 'bg-yellow-500',
      D: 'bg-orange-500',
      F: 'bg-red-500',
    };
    return colors[tier] || 'bg-gray-500';
  };

  const analyzeExampleTrade = async () => {
    try {
      // Example trade: Team 1 gives first 2 players, Team 2 gives next 2 players
      const response = await fetch('/api/fantasy/analyze-trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team1Id: 't1',
          team2Id: 't2',
          team1PlayerIds: ['p1', 'p5'], // Mahomes + CMC
          team2PlayerIds: ['p2', 'p6'], // Allen + Henry
        }),
      });
      const data = await response.json();
      setTradeResult(data);
    } catch (error) {
      console.error('Failed to analyze trade:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
      {/* Header */}
      <header className="bg-green-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">Fantasy Football Tools</h1>
              <p className="text-gray-200 mt-2">Team ratings and trade analyzer</p>
            </div>
            <Link
              href="/"
              className="bg-white text-green-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Team Ratings Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Team Skill Ratings</h2>

          {loading ? (
            <div className="text-white text-center py-12">Loading teams...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="bg-white rounded-lg shadow-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{team.name}</h3>
                      <p className="text-gray-600">Owner: {team.owner}</p>
                      <p className="text-gray-600">
                        Record: {team.record.wins}-{team.record.losses}-{team.record.ties}
                      </p>
                    </div>
                    <div className="text-center">
                      <div
                        className={`${getTierColor(team.tier)} text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-lg`}
                      >
                        {team.tier}
                      </div>
                      <div className="text-gray-600 text-sm mt-1">Tier</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-semibold">Overall Rating</span>
                        <span className="text-gray-900 font-bold">{team.rating.overall}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${team.rating.overall}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">QB Strength</div>
                        <div className="font-semibold text-gray-800">{team.rating.qbStrength}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">RB Strength</div>
                        <div className="font-semibold text-gray-800">{team.rating.rbStrength}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">WR Strength</div>
                        <div className="font-semibold text-gray-800">{team.rating.wrStrength}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">TE Strength</div>
                        <div className="font-semibold text-gray-800">{team.rating.teStrength}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Depth</div>
                        <div className="font-semibold text-gray-800">{team.rating.depth}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Upside</div>
                        <div className="font-semibold text-gray-800">{team.rating.upside}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Trade Analyzer Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Trade Analyzer</h2>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-gray-700 mb-6">
              Analyze trade proposals to determine fair value and see the impact on both teams
            </p>

            <button
              onClick={analyzeExampleTrade}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Analyze Example Trade (Mahomes + CMC ↔ Allen + Henry)
            </button>

            {tradeResult && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Trade Analysis Results</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-blue-900 mb-2">Team 1 Value</h4>
                    <div className="text-3xl font-bold text-blue-600">
                      {tradeResult.analysis.team1Value.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Impact: {tradeResult.analysis.impactOnTeam1.overall > 0 ? '+' : ''}
                      {tradeResult.analysis.impactOnTeam1.overall.toFixed(1)} overall
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-green-900 mb-2">Team 2 Value</h4>
                    <div className="text-3xl font-bold text-green-600">
                      {tradeResult.analysis.team2Value.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Impact: {tradeResult.analysis.impactOnTeam2.overall > 0 ? '+' : ''}
                      {tradeResult.analysis.impactOnTeam2.overall.toFixed(1)} overall
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg ${
                    tradeResult.analysis.winner === 'fair'
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-yellow-100 border-2 border-yellow-500'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">
                      {tradeResult.analysis.winner === 'fair' ? '⚖️' : '⚠️'}
                    </span>
                    <h4 className="font-bold text-lg">
                      {tradeResult.analysis.winner === 'fair'
                        ? 'Fair Trade'
                        : `Team ${tradeResult.analysis.winner === 'team1' ? '1' : '2'} Wins`}
                    </h4>
                  </div>
                  <p className="text-gray-800">{tradeResult.analysis.recommendation}</p>
                  {tradeResult.analysis.winner !== 'fair' && (
                    <div className="mt-2 text-sm text-gray-700">
                      Value differential: {tradeResult.analysis.differential.toFixed(1)} points
                    </div>
                  )}
                </div>

                {tradeResult.counterOffers && tradeResult.counterOffers.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-bold text-lg text-gray-800 mb-3">Counter Offer Suggestions</h4>
                    <ul className="space-y-2">
                      {tradeResult.counterOffers.map((offer: string, index: number) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="text-blue-500 mr-2">→</span>
                          <span>{offer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
