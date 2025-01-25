# Adv-TTL-Proxy-Worker

This is a Cloudflare Worker designed to proxy TikTok Live stream segments. It is part of the **Adv-TTL** project, which provides tools for interacting with TikTok Live streams.

## Features

- **Proxy TikTok Live Streams**: Proxies TikTok Live stream segments to bypass regional restrictions.
- **Simple and Lightweight**: Built as a Cloudflare Worker for fast and efficient proxying.
- **Supports M3U8 Playlists**: Handles `.m3u8` playlists and individual segments.

## Usage

### Endpoint

- **Proxy Stream**:
  ```
  GET /proxy-stream/:encodedUrl/:segment
  ```
  - `:encodedUrl`: Base64-encoded and reversed URL of the TikTok Live stream.
  - `:segment`: (Optional) The specific segment to fetch (e.g., `index.m3u8` or `segment.ts`).

### Example

1. Encode the TikTok Live stream URL using Base64 and reverse it:

   ```javascript
   const encodedUrl = Buffer.from('https://example.com/stream/index.m3u8').toString('base64');
   const reversedUrl = encodedUrl.split('').reverse().join('');
   ```

2. Fetch the stream or segment:
   ```
   GET /proxy-stream/<reversedUrl>/index.m3u8
   ```

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/farizrifqi/adv-ttl-proxy-worker.git
   cd adv-ttl-proxy-worker
   ```

2. Deploy to Cloudflare Workers:
   - Use the [Cloudflare Workers CLI](https://developers.cloudflare.com/workers/cli-wrangler) to deploy the worker.
   ```bash
   wrangler publish
   ```

## License

This project is open-source and available under the **[MIT License](https://opensource.org/licenses/MIT)**.

## Acknowledgments

- [Adv-TTL-Client](https://github.com/farizrifqi/adv-ttl-client): The client-side application that interacts with this server.
- [Adv-TTL-Server](https://github.com/farizrifqi/adv-ttl-server): For the main server as connector to Tiktok livestream with build-in proxy stream.

## Support

If you find this project useful, consider giving it a ⭐ on GitHub! For any questions or issues, please open an issue in the repository.
