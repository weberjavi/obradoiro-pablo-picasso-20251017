#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment to GitHub Pages...');

try {
  // Get repository name
  const repoUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  const repoName = repoUrl.match(/github\.com[:/]([^.]*)/)?.[1] || 'obradoiro-pablo-picasso-20251017';
  console.log(`📦 Repository: ${repoName}`);

  // Build demo
  console.log('🔨 Building demo project...');
  execSync('cd demo && npm run build', { stdio: 'inherit' });
  console.log('✅ Demo build completed');

  // Create deploy directory
  console.log('📁 Preparing deployment files...');
  if (fs.existsSync('deploy-temp')) {
    fs.rmSync('deploy-temp', { recursive: true });
  }
  fs.mkdirSync('deploy-temp');

  // Copy demo files
  console.log('📋 Copying demo files...');
  execSync('cp -r demo/dist/* deploy-temp/', { stdio: 'inherit' });

  // Copy slides
  console.log('📋 Copying slides...');
  fs.mkdirSync('deploy-temp/slides');
  execSync('cp -r slides/* deploy-temp/slides/', { stdio: 'inherit' });

  // Create main index.html
  console.log('📄 Creating main index.html...');
  const indexHtml = `<!DOCTYPE html>
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
</html>`;

  fs.writeFileSync('deploy-temp/index.html', indexHtml);

  // Deploy to GitHub Pages
  console.log('🚀 Deploying to GitHub Pages...');
  process.chdir('deploy-temp');
  
  execSync('git init', { stdio: 'inherit' });
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy workshop demo and slides to GitHub Pages"', { stdio: 'inherit' });
  
  // Check if gh-pages branch exists and deploy
  try {
    execSync('git ls-remote --heads origin gh-pages', { stdio: 'pipe' });
    console.log('📝 gh-pages branch exists, updating...');
    execSync('git push origin gh-pages --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('📝 Creating gh-pages branch...');
    execSync('git push origin HEAD:gh-pages', { stdio: 'inherit' });
  }

  // Cleanup
  process.chdir('..');
  fs.rmSync('deploy-temp', { recursive: true });

  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your workshop is now available at:');
  console.log(`   Demo: https://${repoName}.github.io/obradoiro-pablo-picasso-20251017/`);
  console.log(`   Slides: https://${repoName}.github.io/obradoiro-pablo-picasso-20251017/slides/`);

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}