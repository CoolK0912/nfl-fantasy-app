# Quick Start Guide

Get your NFL Fantasy & Predictions Hub running in 5 minutes!

## Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- Git installed
- A GitHub account

## 1. Run Locally (2 minutes)

```bash
# Navigate to the project directory
cd nfl-fantasy-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 2. Push to GitHub (1 minute)

```bash
# Create a new repository on GitHub (https://github.com/new)
# Then run these commands:

git remote add origin https://github.com/YOUR_USERNAME/nfl-fantasy-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 3. Deploy to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your `nfl-fantasy-app` repository
5. Click "Deploy"

Your app will be live at `https://your-app-name.vercel.app` in 2-3 minutes!

## What's Included

### Fantasy Football Features
- **Team Ratings** at [/fantasy](/fantasy)
  - Comprehensive skill analysis (S-F tiers)
  - Position strength breakdown
  - Depth and upside scoring

- **Trade Analyzer** at [/fantasy](/fantasy)
  - Fair value calculation
  - Impact analysis for both teams
  - Counter offer suggestions

### NFL Predictions
- **Game Predictions** at [/predictions](/predictions)
  - Win probabilities for all upcoming games
  - Predicted scores
  - Week-by-week breakdown

- **Season Projections** at [/predictions](/predictions)
  - Final division standings
  - Complete playoff bracket
  - Super Bowl champion prediction

## API Endpoints

Test the API directly:

```bash
# Get team ratings
curl http://localhost:3000/api/fantasy/rate-team

# Get playoff predictions
curl http://localhost:3000/api/nfl/playoffs

# Get game predictions
curl http://localhost:3000/api/nfl/predictions?week=10
```

## Making Changes

1. Edit files in the `src/` directory
2. Changes auto-reload in development mode
3. Commit and push to GitHub
4. Vercel automatically redeploys!

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── fantasy/page.tsx      # Fantasy tools page
│   ├── predictions/page.tsx  # Predictions page
│   └── api/                  # API endpoints
├── lib/
│   ├── teamRating.ts         # Rating algorithms
│   ├── tradeAnalyzer.ts      # Trade analysis
│   ├── gamePrediction.ts     # Game predictions
│   └── playoffSimulation.ts  # Playoff bracket
└── types/index.ts            # TypeScript types
```

## Customization Ideas

### Add Your Own Fantasy Team
Edit `src/lib/sampleData.ts`:
```typescript
{
  id: 't3',
  name: 'Your Team Name',
  owner: 'Your Name',
  roster: [/* add your players */],
  record: { wins: 0, losses: 0, ties: 0 },
  totalPoints: 0,
  skillRating: 0,
}
```

### Change Team Colors
Edit `src/app/globals.css` or `tailwind.config.ts`

### Add More Stats
Extend the `Player` type in `src/types/index.ts` and update algorithms

## Troubleshooting

### Port already in use?
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Build fails?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### API not working?
- Check console for errors (F12 in browser)
- Ensure API routes are in `src/app/api/`
- Restart development server

## Next Steps

1. Read the full [README.md](README.md) for detailed information
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
3. Customize the sample data with real players
4. Add authentication for user accounts
5. Connect to a real NFL data API

## Need Help?

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

**You're all set!** Start building your NFL empire! 🏈
