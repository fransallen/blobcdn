import blobs2 from 'blobs/v2';

interface BlobOptions {
  seed: string | number;
  extraPoints: number;
  randomness: number;
  size: number;
}

interface BlobStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export function getBlob(
  seed: string | number,
  extraPoints: number,
  randomness: number,
  size: number,
  fill: string,
  stroke: string,
  strokeWidth: number,
): string {
  const options: BlobOptions = { seed, extraPoints, randomness, size };
  const style: BlobStyle = {
    fill,
    stroke,
    strokeWidth,
  };

  return blobs2.svg(options, style);
}
