import { URL } from 'url';

export function getInt(str: string | number | undefined): number | undefined {
  if (typeof str === 'number') {
    return Math.floor(str);
  }
  return /[0-9]+/.test(String(str)) ? parseInt(String(str), 10) : undefined;
}

export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
