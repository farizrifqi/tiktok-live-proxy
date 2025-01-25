export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const pathSegments = url.pathname.split('/').filter(Boolean);

		// Handle proxy-stream requests
		if (pathSegments[0] === 'proxy-stream') {
			const encodedUrl = pathSegments[1];
			const segment = pathSegments[2] || '';
			let streamUrl = Buffer.from(reverseInPlace(encodedUrl), 'base64').toString('utf-8');

			// Replace the segment in the URL if provided
			if (segment) {
				if (streamUrl.includes('index.m3u8')) {
					streamUrl = streamUrl.replace('index.m3u8', segment);
				} else if (streamUrl.includes('playlist.m3u8')) {
					streamUrl = streamUrl.replace('playlist.m3u8', segment);
				} else if (streamUrl.includes('.m3u8')) {
					const temporary = streamUrl.split('/');
					temporary[temporary.length - 1] = segment;
					streamUrl = temporary.join('/');
				} else {
					console.error(`Unknown URL`, { url: encodedUrl }, { segment });
					return new Response('Invalid URL or segment', { status: 400 });
				}
			}

			// Append query parameters if present
			if (url.search) {
				streamUrl += url.search;
			}

			try {
				// Fetch the stream segment
				const response = await fetch(streamUrl);
				const headers = new Headers(response.headers);

				// Return the response with the appropriate headers
				return new Response(response.body, {
					status: response.status,
					headers: headers,
				});
			} catch (err) {
				console.error('Error fetching segment:', err);
				return new Response('Failed to fetch segment', { status: 500 });
			}
		}

		// Default response for non-proxy requests
		return new Response('running', { status: 200 });
	},
} satisfies ExportedHandler<Env>;

/**
 * Reverses a string in place.
 * @param str - The string to reverse.
 * @returns The reversed string.
 */
function reverseInPlace(str: string): string {
	return str.split('').reverse().join('');
}
