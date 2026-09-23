import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('--- Starting Root Build for Zivara ---');

// 1. Install and build frontend
console.log('--- Building frontend with Vite ---');
execSync('npm install', { cwd: 'frontend', stdio: 'inherit' });
execSync('npm run build', { cwd: 'frontend', stdio: 'inherit' });

// 2. Ensure root dist exists and contains frontend/dist files
const srcDist = path.resolve('frontend/dist');
const destDist = path.resolve('dist');

if (fs.existsSync(srcDist)) {
  if (!fs.existsSync(destDist)) {
    fs.mkdirSync(destDist, { recursive: true });
  }
  fs.cpSync(srcDist, destDist, { recursive: true });
  console.log('--- Successfully copied frontend/dist to root dist/ ---');
}

console.log('--- Root Build Completed Successfully ---');
