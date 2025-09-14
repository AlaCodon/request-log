# Request Log

A Cloudflare Worker that logs incoming HTTP requests for debugging and monitoring purposes.

## Overview

This Cloudflare Worker intercepts incoming HTTP requests and logs their details (headers and body) to the console. It's useful for debugging webhooks, API calls, or any HTTP traffic you want to monitor.

## Features

- 📝 **Request Logging**: Logs all incoming request headers and body content
- 🚀 **Cloudflare Workers**: Runs on Cloudflare's edge network for fast response times
- 🔧 **Easy Deployment**: Simple setup with Wrangler CLI
- 🧪 **Testing**: Includes unit and integration tests with Vitest

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- npm
- A Cloudflare account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AlaCodon/request-log.git
cd request-log
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

This will start a local server at `http://localhost:8787/` where you can test the worker.

### Testing

Run the test suite:
```bash
npm test
```

### Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Usage

Once deployed, the worker will be available at your Cloudflare Workers URL (e.g., `https://your-worker.your-subdomain.workers.dev`).

### Making Requests

Send any HTTP request to your worker URL:

```bash
# GET request
curl https://your-worker.your-subdomain.workers.dev

# POST request with data
curl -X POST https://your-worker.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, World!"}'
```

### Response

The worker will respond with:
```
Request logged successfully!
```

### Viewing Logs

Request details are logged to the Cloudflare Workers console. You can view them:

1. In the Cloudflare dashboard under Workers & Pages > your-worker > Logs
2. During development with `npm run dev`, logs appear in your terminal
3. Using the Wrangler CLI: `wrangler tail`

### Example Log Output

```
Request Headers: [
  ["host", "your-worker.your-subdomain.workers.dev"],
  ["user-agent", "curl/7.68.0"],
  ["accept", "*/*"],
  ["content-type", "application/json"],
  ["content-length", "25"]
]

Request Body: {"message": "Hello, World!"}
```

## Configuration

The worker configuration is stored in `wrangler.jsonc`. Key settings:

- `name`: Your worker's name
- `compatibility_date`: Cloudflare Workers compatibility date
- `observability.enabled`: Enables enhanced logging and metrics

### Environment Variables

To add environment variables, uncomment and modify the `vars` section in `wrangler.jsonc`:

```jsonc
"vars": { 
  "MY_VARIABLE": "production_value" 
}
```

### Secrets

For sensitive data, use Wrangler secrets:

```bash
wrangler secret put SECRET_NAME
```

## API Reference

### Request Handler

The worker exports a default fetch handler that accepts:

- **request**: [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) - The incoming HTTP request
- **env**: `Env` - Environment variables and bindings
- **ctx**: [`ExecutionContext`](https://developers.cloudflare.com/workers/runtime-apis/execution-context/) - Execution context for the request

### Response

Always returns a `Response` with:
- **Status**: 200 OK
- **Body**: "Request logged successfully!"
- **Content-Type**: text/plain

## Development

### Project Structure

```
request-log/
├── src/
│   └── index.ts          # Main worker code
├── test/
│   ├── index.spec.ts     # Tests
│   └── env.d.ts          # Test environment types
├── wrangler.jsonc        # Wrangler configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm test` - Run tests
- `npm run cf-typegen` - Generate TypeScript types for bindings

### TypeScript Support

The project is fully typed with TypeScript. Types are automatically generated for Cloudflare Workers APIs and your custom bindings.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m "Description of changes"`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Troubleshooting

### Common Issues

**Error: "vitest: not found"**
- Solution: Run `npm install` to install dependencies

**Error: "wrangler: not found"**
- Solution: Install Wrangler globally: `npm install -g wrangler`

**Error: "Request failed"**
- Check your Cloudflare account settings
- Ensure you're authenticated: `wrangler auth login`
- Verify your worker name is unique

### Getting Help

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Issue Tracker](https://github.com/AlaCodon/request-log/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Wrangler CLI](https://github.com/cloudflare/workers-sdk)
- [Vitest](https://vitest.dev/)