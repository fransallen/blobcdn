import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getApp } from './app';

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.disable('x-powered-by');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Redirect blobcdn.fly.dev to blobcdn.com
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.hostname === 'blobcdn.fly.dev') {
    return res.redirect(301, 'https://blobcdn.com');
  }
  next();
});

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
