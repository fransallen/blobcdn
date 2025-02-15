import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getApp } from './app';

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// Allowed hostnames
const allowedHosts = process.env.HOSTNAME
  ? process.env.HOSTNAME.split(',').map((h) => h.trim()) // Support multiple domains via comma-separated values
  : ['blobcdn.com', 'localhost'];

app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.hostname;
  if (!allowedHosts.includes(host)) {
    return res
      .status(403)
      .send('BlobCDN 403 Forbidden: Please set HOSTNAME env var correctly.');
  }
  next();
});

app.disable('x-powered-by');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Blob route
app.get('/blob.svg', getApp);

// Start the server
app.listen(port, () => {
  console.log(`BlobCDN listening at http://localhost:${port}`);
});
