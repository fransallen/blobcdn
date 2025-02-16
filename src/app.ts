import { Request, Response } from 'express';
import etag from 'etag';
import randomColor from 'randomcolor';
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
    const color: string = randomColor();
    const random = Math.random();
    const blobQuery = [
      query.seed ?? random.toString(),
      getInt(query.extraPoints) ?? 4,
      getInt(query.randomness) ?? 6,
      getInt(query.size) ?? 256,
      query.fill ? `#${query.fill}` : color,
      query.stroke ? `#${query.stroke}` : 'none',
      getInt(query.strokeWidth) ?? 0,
    ] as const;

    const blob = getBlob(...blobQuery);

    res
      .status(200)
      .header('Content-Disposition', 'filename="blob.svg"')
      .header('Content-Type', 'image/svg+xml')
      .header('Cache-Control', 'public, max-age=0, must-revalidate')
      .header('ETag', etag(blob))
      .header(
        'Blob-Version',
        `${
          process.env.VERSION
            ? `${process.env.VERSION}-${os.hostname()}`
            : '1.0-dev'
        }`,
      )
      .header(
        'Blob-Path',
        `/blob.svg?seed=${blobQuery[0]}&extraPoints=${
          blobQuery[1]
        }&randomness=${blobQuery[2]}&size=${
          blobQuery[3]
        }&fill=${blobQuery[4].replace('#', '')}&stroke=${blobQuery[5].replace(
          '#',
          '',
        )}&strokeWidth=${blobQuery[6]}`,
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
