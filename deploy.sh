#!/bin/bash

# Deploy script for GitHub Pages
# This script builds and deploys both the demo and slides

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Get the repository name from git remote
REPO_NAME=$(git remote get-url origin | sed 's/.*github.com[:/]\([^.]*\).*/\1/')
echo "📦 Repository: $REPO_NAME"

# Build the demo project
echo "🔨 Building demo project..."
cd demo
yarn install
yarn build
echo "✅ Demo build completed"

# Go back to root
cd ..

# Create a temporary directory for deployment
echo "📁 Preparing deployment files..."
rm -rf deploy-temp
mkdir deploy-temp

# Copy demo build to deploy directory
echo "📋 Copying demo files..."
cp -r demo/dist/* deploy-temp/

# Copy slides to deploy directory
echo "📋 Copying slides..."
mkdir -p deploy-temp/slides
cp -r slides/* deploy-temp/slides/

# Create a simple index.html that redirects to demo
echo "📄 Creating main index.html..."
cat > deploy-temp/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taller de Visualización de Datos Geoespaciales</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        p {
            color: #666;
            font-size: 1.2em;
            margin-bottom: 30px;
        }
        .links {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .link {
            display: inline-block;
            padding: 15px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .link:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        .link.slides {
            background: #764ba2;
        }
        .link.slides:hover {
            box-shadow: 0 10px 20px rgba(118, 75, 162, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Taller de Visualización de Datos Geoespaciales</h1>
        <p>Explora las aplicaciones y principios de diseño para visualización de datos geoespaciales</p>
        <div class="links">
            <a href="./" class="link">Ver Demo Interactivo</a>
            <a href="./slides/" class="link slides">Ver Presentación</a>
        </div>
    </div>
</body>
</html>
EOF

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
cd deploy-temp
git init
git add .
git commit -m "Deploy workshop demo and slides to GitHub Pages"

# Check if gh-pages branch exists
if git ls-remote --heads origin gh-pages | grep -q gh-pages; then
    echo "📝 gh-pages branch exists, updating..."
    git push origin gh-pages --force
else
    echo "📝 Creating gh-pages branch..."
    git push origin HEAD:gh-pages
fi

# Cleanup
cd ..
rm -rf deploy-temp

echo "✅ Deployment completed successfully!"
echo "🌐 Your workshop is now available at:"
echo "   Demo: https://$REPO_NAME.github.io/obradoiro-pablo-picasso-20251017/"
echo "   Slides: https://$REPO_NAME.github.io/obradoiro-pablo-picasso-20251017/slides/"