# NFL Fantasy & Predictions Hub

A comprehensive full-stack application for NFL fantasy football analysis and season predictions for the 2025-2026 season. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🔴 LIVE NFL DATA
- **Real-Time Standings**: Powered by ESPN API with current 2025-2026 season records
- **Live Game Scores**: Updated every 5 minutes during game days
- **Current Week Tracking**: Automatically syncs with the actual NFL schedule
- **Smart Caching**: Optimized data fetching (1 hour for standings, 5 min for games)

### Fantasy Football Tools
- **Team Skill Ratings**: Analyze fantasy football teams with comprehensive ratings (S, A, B, C, D, F tiers)
- **Position Strength Analysis**: Breakdown of QB, RB, WR, and TE strength
- **Depth & Upside Scoring**: Evaluate roster depth and high-ceiling potential
- **Trade Analyzer**: Determine fair value in trades with detailed impact analysis
- **Counter Offer Suggestions**: Get recommendations to balance trades

### NFL Season Predictions
- **Game Predictions**: Predict all remaining games with win probabilities and scores
- **Division Standings**: Projected final standings for all 8 divisions
- **Playoff Bracket Simulation**: Complete playoff bracket with predicted outcomes
- **Super Bowl Prediction**: Simulated champion based on advanced algorithms

## Tech Stack

- **Frontend**: Next.js 15+ with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Next.js API Routes
- **Algorithms**:
  - ELO-based team strength ratings
  - Monte Carlo season simulations
  - Position scarcity valuation
  - Advanced trade value calculations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nfl-fantasy-app.git
cd nfl-fantasy-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
```bash
NEXT_PUBLIC_USE_LIVE_DATA=true  # Enable real NFL data from ESPN API
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note**: The app uses ESPN's public API for live NFL data - no API key required! Just enable it in `.env.local`.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
nfl-fantasy-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Homepage
│   │   ├── fantasy/           # Fantasy football pages
│   │   ├── predictions/       # NFL predictions pages
│   │   └── api/               # API routes
│   │       ├── fantasy/       # Fantasy endpoints
│   │       └── nfl/           # NFL prediction endpoints
│   ├── components/            # Reusable React components
│   ├── lib/                   # Core algorithms
│   │   ├── teamRating.ts     # Fantasy team rating system
│   │   ├── tradeAnalyzer.ts  # Trade analysis engine
│   │   ├── gamePrediction.ts # Game prediction algorithms
│   │   └── playoffSimulation.ts # Playoff bracket simulation
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── package.json              # Project dependencies
```

## API Endpoints

### Fantasy Football

#### GET `/api/fantasy/rate-team`
Returns all fantasy teams with skill ratings.

**Response:**
```json
[
  {
    "id": "t1",
    "name": "Gridiron Legends",
    "rating": {
      "overall": 85.5,
      "qbStrength": 90.2,
      "rbStrength": 88.1,
      ...
    },
    "tier": "A"
  }
]
```

#### POST `/api/fantasy/analyze-trade`
Analyzes a trade proposal between two teams.

**Request:**
```json
{
  "team1Id": "t1",
  "team2Id": "t2",
  "team1PlayerIds": ["p1", "p5"],
  "team2PlayerIds": ["p2", "p6"]
}
```

**Response:**
```json
{
  "analysis": {
    "team1Value": 185.5,
    "team2Value": 178.3,
    "winner": "team1",
    "differential": 7.2,
    "recommendation": "..."
  }
}
```

### NFL Predictions

#### GET `/api/nfl/predictions?week=10`
Returns game predictions for remaining season.

**Response:**
```json
{
  "currentWeek": 10,
  "predictions": [
    {
      "id": "g1",
      "week": 10,
      "homeTeam": "KC",
      "awayTeam": "BUF",
      "predictedHomeScore": 27,
      "predictedAwayScore": 24,
      "winProbability": {
        "home": 0.65,
        "away": 0.35
      }
    }
  ]
}
```

#### GET `/api/nfl/playoffs`
Returns playoff bracket simulation and Super Bowl prediction.

**Response:**
```json
{
  "standings": { ... },
  "playoffBracket": {
    "wildCard": [...],
    "divisional": [...],
    "championship": [...],
    "superBowl": { ... }
  },
  "superBowlChampion": "KC"
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/nfl-fantasy-app.git
git push -u origin main
```

2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy"

Your app will be live at `https://your-app-name.vercel.app`

### Deploy to Railway

1. Push your code to GitHub
2. Go to [Railway](https://railway.app) and create a new project
3. Connect your GitHub repository
4. Railway will automatically detect and deploy your Next.js app

### Deploy to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com) and create a new Web Service
3. Connect your repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Deploy

## Algorithms Explained

### Team Rating System
Evaluates fantasy teams across multiple dimensions:
- **Position Strength**: Weighted by starter importance
- **Depth**: Quality bench players
- **Upside**: High-ceiling potential
- **Overall**: Composite score (0-100 scale)

### Trade Analyzer
Calculates fair value using:
- Projected fantasy points
- Position scarcity multipliers
- Recent performance trends
- Impact on roster construction

### Game Predictions
Uses ELO-based ratings with:
- Win percentage component
- Point differential analysis
- Strength of schedule adjustments
- Home field advantage (3 points)

### Playoff Simulation
Monte Carlo simulation running 1000+ iterations:
- Probability-based game outcomes
- Seeding based on records and tiebreakers
- Conference championship paths
- Super Bowl matchup prediction

## Future Enhancements

- [ ] Connect to real NFL data API (ESPN, NFL.com, etc.)
- [ ] User authentication and custom team management
- [ ] Real-time scoring updates
- [ ] Historical data and trends
- [ ] Machine learning predictions
- [ ] Social features (leagues, chat)
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- NFL team data and statistics
- Fantasy football scoring systems
- Advanced analytics community

---

Built with ❤️ for football fans everywhere
