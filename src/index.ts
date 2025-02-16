import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { getApp } from './app';

const app = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

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
