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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <header className="bg-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">NFL Season Predictions</h1>
              <p className="text-gray-200 mt-2">2025-2026 Season Forecast</p>
            </div>
            <Link
              href="/"
              className="bg-white text-blue-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('games')}
              className={`py-4 px-6 font-semibold transition-colors ${
                activeTab === 'games'
                  ? 'text-white border-b-4 border-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Game Predictions
            </button>
            <button
              onClick={() => setActiveTab('standings')}
              className={`py-4 px-6 font-semibold transition-colors ${
                activeTab === 'standings'
                  ? 'text-white border-b-4 border-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Division Standings
            </button>
            <button
              onClick={() => setActiveTab('playoffs')}
              className={`py-4 px-6 font-semibold transition-colors ${
                activeTab === 'playoffs'
                  ? 'text-white border-b-4 border-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Playoff Bracket
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-white text-center py-12">Loading predictions...</div>
        ) : (
          <>
            {/* Game Predictions Tab */}
            {activeTab === 'games' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Upcoming Games</h2>
                {weeks.map((week) => (
                  <div key={week} className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Week {week}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gamesByWeek[week].map((game) => (
                        <div key={game.id} className="bg-white rounded-lg shadow-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-center flex-1">
                              <div className="text-xl font-bold text-gray-800">{game.awayTeam}</div>
                              <div className="text-sm text-gray-500">Away</div>
                              {game.winProbability && (
                                <div className="text-blue-600 font-semibold mt-1">
                                  {(game.winProbability.away * 100).toFixed(0)}%
                                </div>
                              )}
                            </div>

                            <div className="text-center px-6">
                              <div className="text-gray-400 text-sm">@</div>
                              {game.predictedAwayScore !== undefined && game.predictedHomeScore !== undefined && (
                                <div className="text-2xl font-bold text-gray-900 mt-2">
                                  {game.predictedAwayScore} - {game.predictedHomeScore}
                                </div>
                              )}
                            </div>

                            <div className="text-center flex-1">
                              <div className="text-xl font-bold text-gray-800">{game.homeTeam}</div>
                              <div className="text-sm text-gray-500">Home</div>
                              {game.winProbability && (
                                <div className="text-green-600 font-semibold mt-1">
                                  {(game.winProbability.home * 100).toFixed(0)}%
                                </div>
                              )}
                            </div>
                          </div>

                          {game.winProbability && (
                            <div className="mt-4">
                              <div className="flex w-full h-4 rounded-full overflow-hidden">
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
                    <div key={division} className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                        {division}
                      </h3>
                      <div className="space-y-3">
                        {teams.map((team: any, index: number) => (
                          <div key={team.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{team.name}</div>
                                <div className="text-sm text-gray-500">{team.abbreviation}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-800">
                                {Math.round(team.record.wins)}-{Math.round(team.record.losses)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {index === 0 && <span className="text-green-600">Division Winner</span>}
                                {index > 0 && index <= 3 && <span className="text-blue-500">Playoff Hunt</span>}
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
                  <h2 className="text-3xl font-bold text-white mb-2">Playoff Bracket Simulation</h2>
                  <div className="bg-yellow-400 text-yellow-900 inline-block px-6 py-3 rounded-lg font-bold text-xl">
                    Predicted Champion: {playoffData.superBowlChampion}
                  </div>
                </div>

                {/* Wild Card Round */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Wild Card Round</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {playoffData.playoffBracket.wildCard.map((game: any) => (
                      <div key={game.id} className="bg-white rounded-lg p-4">
                        <div className="text-center text-sm text-gray-500 mb-2">Wild Card</div>
                        <div className={`p-2 rounded ${game.predictedWinner === game.homeTeam ? 'bg-green-100' : ''}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold">{game.homeTeam}</span>
                            <span>{game.homeScore}</span>
                          </div>
                        </div>
                        <div className={`p-2 rounded mt-1 ${game.predictedWinner === game.awayTeam ? 'bg-green-100' : ''}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold">{game.awayTeam}</span>
                            <span>{game.awayScore}</span>
                          </div>
                        </div>
                        <div className="text-center mt-2 text-xs text-green-600 font-semibold">
                          Winner: {game.predictedWinner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divisional Round */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Divisional Round</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playoffData.playoffBracket.divisional.map((game: any) => (
                      <div key={game.id} className="bg-white rounded-lg p-4">
                        <div className="text-center text-sm text-gray-500 mb-2">Divisional</div>
                        <div className={`p-2 rounded ${game.predictedWinner === game.homeTeam ? 'bg-green-100' : ''}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold">{game.homeTeam}</span>
                            <span>{game.homeScore}</span>
                          </div>
                        </div>
                        <div className={`p-2 rounded mt-1 ${game.predictedWinner === game.awayTeam ? 'bg-green-100' : ''}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold">{game.awayTeam}</span>
                            <span>{game.awayScore}</span>
                          </div>
                        </div>
                        <div className="text-center mt-2 text-xs text-green-600 font-semibold">
                          Winner: {game.predictedWinner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Championship Round */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Conference Championships</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playoffData.playoffBracket.championship.map((game: any) => (
                      <div key={game.id} className="bg-white rounded-lg p-4">
                        <div className="text-center text-sm text-gray-500 mb-2">Championship</div>
                        <div className={`p-2 rounded ${game.predictedWinner === game.homeTeam ? 'bg-green-100' : ''}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold">{game.homeTeam}</span>
                            <span>{game.homeScore}</span>
                          </div>
                        </div>
                        <div className={`p-2 rounded mt-1 ${game.predictedWinner === game.awayTeam ? 'bg-green-100' : ''}`}>
                          <div className="flex justify-between">
                            <span className="font-semibold">{game.awayTeam}</span>
                            <span>{game.awayScore}</span>
                          </div>
                        </div>
                        <div className="text-center mt-2 text-xs text-green-600 font-semibold">
                          Winner: {game.predictedWinner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Super Bowl */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Super Bowl LX</h3>
                  <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 shadow-2xl">
                      <div className="text-center text-white font-bold mb-4">SUPER BOWL LX</div>
                      <div className={`bg-white p-3 rounded ${playoffData.playoffBracket.superBowl.predictedWinner === playoffData.playoffBracket.superBowl.homeTeam ? 'ring-4 ring-green-500' : ''}`}>
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">{playoffData.playoffBracket.superBowl.homeTeam}</span>
                          <span className="font-bold text-lg">{playoffData.playoffBracket.superBowl.homeScore}</span>
                        </div>
                      </div>
                      <div className={`bg-white p-3 rounded mt-2 ${playoffData.playoffBracket.superBowl.predictedWinner === playoffData.playoffBracket.superBowl.awayTeam ? 'ring-4 ring-green-500' : ''}`}>
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">{playoffData.playoffBracket.superBowl.awayTeam}</span>
                          <span className="font-bold text-lg">{playoffData.playoffBracket.superBowl.awayScore}</span>
                        </div>
                      </div>
                      <div className="text-center mt-4 bg-white rounded px-4 py-2">
                        <div className="text-yellow-900 font-bold text-xl">
                          Champion: {playoffData.playoffBracket.superBowl.predictedWinner}
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
