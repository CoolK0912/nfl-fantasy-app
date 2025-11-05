import { NextRequest, NextResponse } from 'next/server';
import { analyzeTrade, suggestCounterOffer } from '@/lib/tradeAnalyzer';
import { sampleFantasyTeams, samplePlayers } from '@/lib/sampleData';
import { TradeProposal } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { team1Id, team2Id, team1PlayerIds, team2PlayerIds } = body;

    // Find teams
    const team1 = sampleFantasyTeams.find(t => t.id === team1Id);
    const team2 = sampleFantasyTeams.find(t => t.id === team2Id);

    if (!team1 || !team2) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Find players
    const team1Players = samplePlayers.filter(p => team1PlayerIds.includes(p.id));
    const team2Players = samplePlayers.filter(p => team2PlayerIds.includes(p.id));

    if (team1Players.length === 0 || team2Players.length === 0) {
      return NextResponse.json(
        { error: 'Invalid player selection' },
        { status: 400 }
      );
    }

    const proposal: TradeProposal = {
      team1: team1.name,
      team2: team2.name,
      team1Gives: team1Players,
      team2Gives: team2Players,
    };

    const analysis = analyzeTrade(proposal, team1, team2);
    const counterOffers = suggestCounterOffer(
      analysis,
      team1.roster,
      team2.roster
    );

    return NextResponse.json({
      analysis,
      counterOffers,
    });
  } catch (error) {
    console.error('Trade analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze trade' },
      { status: 500 }
    );
  }
}
