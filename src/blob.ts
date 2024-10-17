import blobs2 from 'blobs/v2';
import randomColor from 'randomcolor';

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
  fill?: string,
  stroke: string = 'none',
  strokeWidth: number = 0,
): string {
  const color: string = randomColor();

  const options: BlobOptions = { seed, extraPoints, randomness, size };
  const style: BlobStyle = {
    fill: fill ? `#${fill}` : color,
    stroke: stroke !== 'none' ? `#${stroke}` : stroke,
    strokeWidth,
  };

  return blobs2.svg(options, style);
}
