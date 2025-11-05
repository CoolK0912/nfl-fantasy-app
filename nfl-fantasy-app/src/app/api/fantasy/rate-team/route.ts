import { NextRequest, NextResponse } from 'next/server';
import { calculateTeamRating, getSkillTier } from '@/lib/teamRating';
import { sampleFantasyTeams } from '@/lib/sampleData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId } = body;

    const team = sampleFantasyTeams.find(t => t.id === teamId);
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const rating = calculateTeamRating(team);
    const tier = getSkillTier(rating.overall);

    return NextResponse.json({
      teamId,
      teamName: team.name,
      rating,
      tier,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate team rating' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all teams with ratings
  const teamsWithRatings = sampleFantasyTeams.map(team => {
    const rating = calculateTeamRating(team);
    const tier = getSkillTier(rating.overall);

    return {
      id: team.id,
      name: team.name,
      owner: team.owner,
      record: team.record,
      rating,
      tier,
    };
  });

  return NextResponse.json(teamsWithRatings);
}
