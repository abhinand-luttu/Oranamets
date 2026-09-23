import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT, 10) || 5174;
const HOST = '0.0.0.0';

// Check possible dist locations
const DIST_PATHS = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'frontend', 'dist')
];

function getDistDir() {
  for (const p of DIST_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return DIST_PATHS[0];
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Health check endpoint for host platforms
  if (req.url === '/health' || req.url === '/healthz' || req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  const distDir = getDistDir();
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let safePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(distDir, safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback: Serve index.html for all client routes
    const indexPath = path.join(distDir, 'index.html');
    fs.readFile(indexPath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Zivara Frontend - Dist build not found. Please run npm run build.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`=========================================`);
  console.log(` Zivara Web Service running on ${HOST}:${PORT}`);
  console.log(` Serving from: ${getDistDir()}`);
  console.log(`=========================================`);
});
