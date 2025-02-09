# BlobCDN

BlobCDN is the CDN for beautiful SVG shapes. The service allows you to quickly generate SVG shapes on the fly.

## Docker

To run BlobCDN using Docker, execute the following command:

```
docker run -p 3000:3000 ghcr.io/fransallen/blobcdn:latest
```

This command will run the latest BlobCDN image and expose it on port 3000, accessible at http://localhost:3000.

## Contributing

Please feel free to submit an issue or pull request. To develop, you'll need [Bun](https://bun.sh). Run `bun install` && `bun dev`.

## License

[MIT](https://github.com/fransallen/blobcdn/blob/main/LICENSE)
