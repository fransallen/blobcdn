const blobs2 = require('blobs/v2');
const randomColor = require('randomcolor');

async function getBlob(
  seed,
  extraPoints,
  randomness,
  size,
  fill,
  stroke,
  strokeWidth,
) {
  const color = randomColor();
  const blob = blobs2.svg(
    {
      seed: seed,
      extraPoints: extraPoints,
      randomness: randomness,
      size: size,
    },
    {
      fill: fill ? '#' + fill : color,
      stroke: '#' + stroke,
      strokeWidth: strokeWidth,
    },
  );
  return blob;
}

module.exports = { getBlob };
