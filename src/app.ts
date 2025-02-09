import { Request, Response } from 'express';
import etag from 'etag';
import { getBlob } from './blob';
import { getInt } from './validator';
import os from 'os';

type BlobQuery = {
  seed?: string;
  extraPoints?: string;
  randomness?: string;
  size?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
};

export async function getApp(req: Request, res: Response): Promise<void> {
  try {
    const query: BlobQuery = req.query;

    const blob = getBlob(
      query.seed ?? Math.random(),
      getInt(query.extraPoints) ?? 4,
      getInt(query.randomness) ?? 6,
      getInt(query.size) ?? 256,
      query.fill,
      query.stroke ?? 'none',
      getInt(query.strokeWidth) ?? 0,
    );

    res
      .status(200)
      .header('Content-Disposition', 'filename="blob.svg"')
      .header('Content-Type', 'image/svg+xml')
      .header('Cache-Control', 'public, max-age=0, must-revalidate')
      .header('ETag', etag(blob))
      .header(
        'Blob-Version',
        `${process.env.VERSION ?? '1.0-dev'}-${os.hostname()}`,
      )
      .send(blob);
  } catch (e) {
    console.error((e as Error).message);
    res
      .status(500)
      .type('text/plain')
      .send('Failed to generate a blob SVG image.');
  }
}
