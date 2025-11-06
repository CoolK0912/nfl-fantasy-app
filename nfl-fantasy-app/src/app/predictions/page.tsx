'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Game {
  id: string;
  week: number;
  homeTeam: string;
  awayTeam: string;
  predictedHomeScore?: number;
  predictedAwayScore?: number;
  winProbability?: {
    home: number;
    away: number;
  };
}

interface PlayoffData {
  standings: any;
  playoffBracket: any;
  superBowlChampion: string;
}

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Game[]>([]);
  const [playoffData, setPlayoffData] = useState<PlayoffData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'games' | 'standings' | 'playoffs'>('games');

  useEffect(() => {
    fetchPredictions();
    fetchPlayoffs();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/nfl/predictions?week=10');
      const data = await response.json();
      setPredictions(data.predictions);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    }
  };

  const fetchPlayoffs = async () => {
    try {
      const response = await fetch('/api/nfl/playoffs');
      const data = await response.json();
      setPlayoffData(data);
    } catch (error) {
      console.error('Failed to fetch playoffs:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupGamesByWeek = (games: Game[]) => {
    const grouped: Record<number, Game[]> = {};
    games.forEach((game) => {
      if (!grouped[game.week]) {
        grouped[game.week] = [];
      }
      grouped[game.week].push(game);
    });
    return grouped;
  };

  const gamesByWeek = groupGamesByWeek(predictions);
  const weeks = Object.keys(gamesByWeek).map(Number).sort((a, b) => a - b);

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
              <h1 className="text-3xl md:text-4xl font-black text-yellow-300" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>🏈 NFL SEASON PREDICTIONS</h1>
              <p className="text-yellow-100 mt-1 font-bold">2025-2026 Forecast • Live Data</p>
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

      {/* Tab Navigation - Scoreboard Style */}
      <div className="bg-gray-900 border-b-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 md:space-x-8">
            <button
              onClick={() => setActiveTab('games')}
              className={`py-4 px-4 md:px-6 font-black transition-all text-sm md:text-base ${
                activeTab === 'games'
                  ? 'text-yellow-300 border-b-4 border-yellow-400'
                  : 'text-white hover:text-yellow-300'
              }`}
            >
              GAMES
            </button>
            <button
              onClick={() => setActiveTab('standings')}
              className={`py-4 px-4 md:px-6 font-black transition-all text-sm md:text-base ${
                activeTab === 'standings'
                  ? 'text-yellow-300 border-b-4 border-yellow-400'
                  : 'text-white hover:text-yellow-300'
              }`}
            >
              STANDINGS
            </button>
            <button
              onClick={() => setActiveTab('playoffs')}
              className={`py-4 px-4 md:px-6 font-black transition-all text-sm md:text-base ${
                activeTab === 'playoffs'
                  ? 'text-yellow-300 border-b-4 border-yellow-400'
                  : 'text-white hover:text-yellow-300'
              }`}
            >
              PLAYOFFS
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {loading ? (
          <div className="text-white text-center py-12">Loading predictions...</div>
        ) : (
          <>
            {/* Game Predictions Tab */}
            {activeTab === 'games' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 text-shadow">Upcoming Games</h2>
                {weeks.map((week) => (
                  <div key={week} className="mb-8">
                    <h3 className="text-2xl font-bold text-yellow-300 mb-4">Week {week}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gamesByWeek[week].map((game) => (
                        <div key={game.id} className="bg-gray-900 border-2 border-yellow-400 rounded-lg shadow-2xl p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-center flex-1">
                              <div className="text-xl font-bold text-white">{game.awayTeam}</div>
                              <div className="text-sm text-yellow-200">Away</div>
                              {game.winProbability && (
                                <div className="text-blue-400 font-semibold mt-1">
                                  {(game.winProbability.away * 100).toFixed(0)}%
                                </div>
                              )}
                            </div>

                            <div className="text-center px-6">
                              <div className="text-yellow-400 text-sm font-bold">@</div>
                              {game.predictedAwayScore !== undefined && game.predictedHomeScore !== undefined && (
                                <div className="text-2xl font-bold text-yellow-300 mt-2">
                                  {game.predictedAwayScore} - {game.predictedHomeScore}
                                </div>
                              )}
                            </div>

                            <div className="text-center flex-1">
                              <div className="text-xl font-bold text-white">{game.homeTeam}</div>
                              <div className="text-sm text-yellow-200">Home</div>
                              {game.winProbability && (
                                <div className="text-green-400 font-semibold mt-1">
                                  {(game.winProbability.home * 100).toFixed(0)}%
                                </div>
                              )}
                            </div>
                          </div>

                          {game.winProbability && (
                            <div className="mt-4">
                              <div className="flex w-full h-4 rounded-full overflow-hidden border-2 border-yellow-400">
                                <div
                                  className="bg-blue-500"
                                  style={{ width: `${game.winProbability.away * 100}%` }}
                                ></div>
                                <div
                                  className="bg-green-500"
                                  style={{ width: `${game.winProbability.home * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Division Standings Tab */}
            {activeTab === 'standings' && playoffData && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Projected Final Standings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(playoffData.standings).map(([division, teams]: [string, any]) => (
                    <div key={division} className="bg-gray-900 border-2 border-yellow-400 rounded-lg shadow-2xl p-6">
                      <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b-2 border-yellow-400 pb-2">
                        {division}
                      </h3>
                      <div className="space-y-3">
                        {teams.map((team: any, index: number) => (
                          <div key={team.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-3">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-white">{team.name}</div>
                                <div className="text-sm text-yellow-200">{team.abbreviation}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-white">
                                {Math.round(team.record.wins)}-{Math.round(team.record.losses)}
                              </div>
                              <div className="text-sm text-yellow-200">
                                {index === 0 && <span className="text-green-400 font-bold">Division Winner</span>}
                                {index > 0 && index <= 3 && <span className="text-blue-400 font-bold">Playoff Hunt</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Playoff Bracket Tab */}
            {activeTab === 'playoffs' && playoffData && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Playoff Bracket Simulation</h2>
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 border-4 border-white inline-block px-8 py-4 rounded-xl font-black text-2xl shadow-2xl">
                    🏆 Predicted Champion: {playoffData.superBowlChampion}
                  </div>
                </div>

                {/* Wild Card Round */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">🎯 Wild Card Round</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {playoffData.playoffBracket.wildCard.map((game: any) => (
                      <div key={game.id} className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-4 shadow-xl">
                        <div className="text-center text-sm text-yellow-200 font-bold mb-2">Wild Card</div>
                        <div className={`p-3 rounded border-2 ${game.predictedWinner === game.homeTeam ? 'bg-green-800 border-green-400' : 'bg-gray-800 border-gray-600'}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{game.homeTeam}</span>
                            <span className="font-bold text-yellow-300">{game.homeScore}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded border-2 mt-2 ${game.predictedWinner === game.awayTeam ? 'bg-green-800 border-green-400' : 'bg-gray-800 border-gray-600'}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{game.awayTeam}</span>
                            <span className="font-bold text-yellow-300">{game.awayScore}</span>
                          </div>
                        </div>
                        <div className="text-center mt-3 text-sm text-green-400 font-bold">
                          ✓ Winner: {game.predictedWinner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divisional Round */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">⚡ Divisional Round</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playoffData.playoffBracket.divisional.map((game: any) => (
                      <div key={game.id} className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-4 shadow-xl">
                        <div className="text-center text-sm text-yellow-200 font-bold mb-2">Divisional</div>
                        <div className={`p-3 rounded border-2 ${game.predictedWinner === game.homeTeam ? 'bg-green-800 border-green-400' : 'bg-gray-800 border-gray-600'}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{game.homeTeam}</span>
                            <span className="font-bold text-yellow-300">{game.homeScore}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded border-2 mt-2 ${game.predictedWinner === game.awayTeam ? 'bg-green-800 border-green-400' : 'bg-gray-800 border-gray-600'}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{game.awayTeam}</span>
                            <span className="font-bold text-yellow-300">{game.awayScore}</span>
                          </div>
                        </div>
                        <div className="text-center mt-3 text-sm text-green-400 font-bold">
                          ✓ Winner: {game.predictedWinner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Championship Round */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">🔥 Conference Championships</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playoffData.playoffBracket.championship.map((game: any) => (
                      <div key={game.id} className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-4 shadow-xl">
                        <div className="text-center text-sm text-yellow-200 font-bold mb-2">Championship</div>
                        <div className={`p-3 rounded border-2 ${game.predictedWinner === game.homeTeam ? 'bg-green-800 border-green-400' : 'bg-gray-800 border-gray-600'}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{game.homeTeam}</span>
                            <span className="font-bold text-yellow-300">{game.homeScore}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded border-2 mt-2 ${game.predictedWinner === game.awayTeam ? 'bg-green-800 border-green-400' : 'bg-gray-800 border-gray-600'}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">{game.awayTeam}</span>
                            <span className="font-bold text-yellow-300">{game.awayScore}</span>
                          </div>
                        </div>
                        <div className="text-center mt-3 text-sm text-green-400 font-bold">
                          ✓ Winner: {game.predictedWinner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Super Bowl */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">🏆 SUPER BOWL LX 🏆</h3>
                  <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-8 shadow-2xl border-4 border-white">
                      <div className="text-center text-gray-900 font-black text-2xl mb-6">SUPER BOWL LX</div>
                      <div className={`bg-gray-900 p-4 rounded-lg border-4 ${playoffData.playoffBracket.superBowl.predictedWinner === playoffData.playoffBracket.superBowl.homeTeam ? 'border-green-400 shadow-lg shadow-green-400' : 'border-gray-600'}`}>
                        <div className="flex justify-between">
                          <span className="font-bold text-xl text-white">{playoffData.playoffBracket.superBowl.homeTeam}</span>
                          <span className="font-bold text-2xl text-yellow-300">{playoffData.playoffBracket.superBowl.homeScore}</span>
                        </div>
                      </div>
                      <div className={`bg-gray-900 p-4 rounded-lg border-4 mt-3 ${playoffData.playoffBracket.superBowl.predictedWinner === playoffData.playoffBracket.superBowl.awayTeam ? 'border-green-400 shadow-lg shadow-green-400' : 'border-gray-600'}`}>
                        <div className="flex justify-between">
                          <span className="font-bold text-xl text-white">{playoffData.playoffBracket.superBowl.awayTeam}</span>
                          <span className="font-bold text-2xl text-yellow-300">{playoffData.playoffBracket.superBowl.awayScore}</span>
                        </div>
                      </div>
                      <div className="text-center mt-6 bg-gray-900 rounded-lg px-6 py-4 border-4 border-white">
                        <div className="text-yellow-300 font-black text-2xl">
                          🏆 {playoffData.playoffBracket.superBowl.predictedWinner} 🏆
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
