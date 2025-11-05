# Deployment Guide

This guide will walk you through deploying your NFL Fantasy & Predictions Hub to GitHub and various hosting platforms.

## Step 1: Push to GitHub

### Create a new repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `nfl-fantasy-app`)
4. Choose public or private
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Push your local repository to GitHub

```bash
# Add your GitHub repository as the remote origin
git remote add origin https://github.com/YOUR_USERNAME/nfl-fantasy-app.git

# Push your code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Deploy to Vercel (Recommended - Easiest)

Vercel is the platform that created Next.js, so it has the best integration.

### Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (you can use your GitHub account)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"
7. Wait 2-3 minutes for the build to complete
8. Your app will be live at `https://your-app-name.vercel.app`

### Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? (press enter for default)
# - Directory? ./ (press enter)
# - Want to override settings? No

# For production deployment
vercel --prod
```

## Step 3: Deploy to Railway (Alternative)

Railway is great for full-stack apps with databases.

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `nfl-fantasy-app` repository
5. Railway will auto-detect Next.js
6. Click "Deploy Now"
7. Your app will be live at `https://your-app-name.up.railway.app`

### Environment Variables (if needed later)

In Railway dashboard:
- Go to your project
- Click "Variables"
- Add any environment variables

## Step 4: Deploy to Render (Alternative)

Render offers free tier hosting for web apps.

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: nfl-fantasy-app
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Click "Create Web Service"
7. Your app will be live at `https://your-app-name.onrender.com`

## Step 5: Set Up Custom Domain (Optional)

### On Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### On Railway:
1. Go to your project settings
2. Click "Settings" → "Domains"
3. Click "Generate Domain" or add custom domain
4. Update your DNS records as instructed

### On Render:
1. Go to your web service
2. Click "Settings" → "Custom Domain"
3. Add your domain
4. Configure DNS with the provided CNAME

## Testing Your Deployment

After deployment, test these URLs:

1. **Homepage**: `https://your-app.domain/`
2. **Fantasy Tools**: `https://your-app.domain/fantasy`
3. **Predictions**: `https://your-app.domain/predictions`
4. **API - Team Ratings**: `https://your-app.domain/api/fantasy/rate-team`
5. **API - Playoffs**: `https://your-app.domain/api/nfl/playoffs`

## Troubleshooting

### Build fails with "Module not found"
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify
- Check import paths are correct

### Page shows 404
- Ensure all pages are in `src/app/` directory
- Check file naming (should be `page.tsx`)
- Verify routing structure

### API routes not working
- Check API routes are in `src/app/api/` directory
- Ensure route files are named `route.ts`
- Verify HTTP methods (GET, POST) are exported

### CSS not loading
- Confirm Tailwind is configured in `tailwind.config.ts`
- Check `globals.css` imports Tailwind directives
- Verify `postcss.config.mjs` exists

## Updating Your Deployment

Whenever you make changes:

```bash
# Commit your changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Vercel, Railway, and Render will automatically detect the push and redeploy your app!

## Environment Variables for Future Features

If you add a real NFL API later, set these in your deployment platform:

```
NFL_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```

## Monitoring and Analytics

### Vercel Analytics
- Built-in analytics available in dashboard
- Shows page views, performance metrics

### Railway Logs
- View logs in Railway dashboard
- Monitor resource usage

### Render Logs
- Access logs from Render dashboard
- View build and runtime logs

## Cost Considerations

### Free Tiers:
- **Vercel**: 100GB bandwidth/month, unlimited requests
- **Railway**: $5 free credit/month
- **Render**: 750 hours/month, automatic sleep after inactivity

### Paid Plans:
- **Vercel Pro**: $20/month - More bandwidth, better support
- **Railway**: Pay-as-you-go, ~$5-10/month for small apps
- **Render**: $7/month - Always on, no sleep

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Congratulations!** Your NFL Fantasy & Predictions Hub is now live and accessible to anyone with the URL!
