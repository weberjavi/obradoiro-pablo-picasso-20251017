# GitHub Pages Deployment Check

## Steps to verify your deployment:

### 1. Check GitHub Pages Settings
Go to your repository on GitHub:
- Navigate to **Settings** → **Pages**
- Verify the **Source** is set to:
  - **Branch**: `gh-pages`
  - **Folder**: `/ (root)`

### 2. Check GitHub Actions
Go to the **Actions** tab in your repository:
- Look for the "Deploy to GitHub Pages" workflow
- Check if the latest run completed successfully
- Look for any error messages in the logs

### 3. Check gh-pages branch
The deployment should create/update a `gh-pages` branch with:
- `index.html` (your demo)
- `slides/` directory (your presentation)
- `.nojekyll` file

### 4. Common Issues:
- **Wrong source branch**: GitHub Pages serving from `main` instead of `gh-pages`
- **Missing .nojekyll**: Jekyll processing interfering with static files
- **Incorrect base path**: Assets not loading due to wrong base URL
- **Workflow not running**: GitHub Actions not triggered or failing

### 5. Force refresh
Try accessing the site with a hard refresh:
- **Chrome/Edge**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Firefox**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Or try incognito/private browsing mode

## Current Configuration:
- Demo builds to `demo/dist/`
- Deployment copies to `gh-pages` branch root
- Slides copied to `gh-pages/slides/`
- Base path: `/obradoiro-pablo-picasso-20251017/`
