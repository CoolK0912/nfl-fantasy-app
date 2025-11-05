import { NextRequest, NextResponse } from 'next/server';
import { predictRemainingSeason } from '@/lib/gamePrediction';
import { nflTeams, sampleSchedule } from '@/lib/sampleData';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const currentWeek = parseInt(searchParams.get('week') || '10');

    const predictions = predictRemainingSeason(nflTeams, sampleSchedule, currentWeek);

    return NextResponse.json({
      currentWeek,
      predictions,
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    );
  }
}
