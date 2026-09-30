import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('--- Starting Root Build for Zivara ---');

const BACKEND_URL = process.env.VITE_API_BASE_URL || 'https://zivara-backend-4cl3.onrender.com';
const buildEnv = {
  ...process.env,
  VITE_API_BASE_URL: BACKEND_URL,
};

// 1. Install and build frontend with explicit production API URL
console.log(`--- Building frontend with Vite (API: ${BACKEND_URL}) ---`);
execSync('npm install', { cwd: 'frontend', stdio: 'inherit' });
execSync('npm run build', { cwd: 'frontend', stdio: 'inherit', env: buildEnv });

// 2. Ensure root dist exists and contains frontend/dist files
const srcDist = path.resolve('frontend/dist');
const destDist = path.resolve('dist');

if (fs.existsSync(srcDist)) {
  if (!fs.existsSync(destDist)) {
    fs.mkdirSync(destDist, { recursive: true });
  }
  fs.cpSync(srcDist, destDist, { recursive: true });
  console.log('--- Successfully copied frontend/dist to root dist/ ---');

  // SPA direct route fallbacks: ensure /add-ornaments, /collection, /contact never 404 on static hosts
  const indexPath = path.join(destDist, 'index.html');
  if (fs.existsSync(indexPath)) {
    const staticRoutes = ['add-ornaments', 'collection', 'contact'];
    for (const r of staticRoutes) {
      const routeDir = path.join(destDist, r);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
    }
    // Also create 404.html fallback
    fs.copyFileSync(indexPath, path.join(destDist, '404.html'));
    console.log('--- Created static route index fallbacks (add-ornaments, collection, contact, 404.html) ---');
  }
}

console.log('--- Root Build Completed Successfully ---');
