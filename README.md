# BlobCDN

BlobCDN is the CDN for beautiful SVG shapes. The service allows you to quickly generate SVG shapes on the fly.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffransallen%2Fblobcdn)

## Docker

To run BlobCDN using Docker, execute the following command:

```
docker run -p 3000:3000 ghcr.io/fransallen/blobcdn:latest
```

This command will run the latest BlobCDN image and expose it on port 3000, accessible at http://localhost:3000.

## Contributing

Please feel free to submit an issue or pull request. To develop, you'll need [Bun](https://bun.sh). Run `bun install` && `bun dev`.

## Sponsors

BlobCDN operates thanks to our sponsors for providing services for free.

<a href="https://vercel.com/?utm_source=upsetdev&utm_campaign=oss">
  <img width="200px" src="./public/vercel.svg" alt="Vercel" />
</a>

## License

[MIT](https://github.com/fransallen/blobcdn/blob/main/LICENSE)
