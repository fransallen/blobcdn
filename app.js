const etag = require('etag');
const { getBlob } = require('./blob');
const { parse } = require('url');
const { getInt } = require('./validator');

async function getApp(req, res) {
  try {
    const { query = {} } = parse(req.url, true);

    const {
      seed = Math.random(),
      extraPoints = 4,
      randomness = 6,
      size = 256,
      fill,
      stroke = 'none',
      strokeWidth = 0,
    } = query;
    const ep = getInt(extraPoints);
    const rand = getInt(randomness);
    const sz = getInt(size);
    const stw = getInt(strokeWidth);

    const blob = await getBlob(seed, ep, rand, sz, fill, stroke, stw);

    res.statusCode = 200;
    res.setHeader('Content-Disposition', `filename="blob.svg"`);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('ETag', etag(blob));
    res.send(blob);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Failed to generate a blob SVG image.');
    console.error(e.message);
  }
}

module.exports = { getApp };
