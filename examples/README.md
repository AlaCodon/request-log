# Usage Examples

This directory contains practical examples of how to use the Request Log worker.

## Basic cURL Examples

### GET Request
```bash
curl https://your-worker.your-subdomain.workers.dev
```

### POST with JSON Data
```bash
curl -X POST https://your-worker.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from cURL", "timestamp": "2024-01-01T00:00:00Z"}'
```

### POST with Form Data
```bash
curl -X POST https://your-worker.your-subdomain.workers.dev \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=John&email=john@example.com"
```

### Custom Headers
```bash
curl https://your-worker.your-subdomain.workers.dev \
  -H "X-API-Key: your-api-key" \
  -H "X-Client-Version: 1.0.0" \
  -H "User-Agent: MyApp/1.0"
```

## JavaScript/Node.js Examples

### Using Fetch API
```javascript
// Basic GET request
const response = await fetch('https://your-worker.your-subdomain.workers.dev');
console.log(await response.text()); // "Request logged successfully!"

// POST with JSON
const postResponse = await fetch('https://your-worker.your-subdomain.workers.dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'test-value'
  },
  body: JSON.stringify({
    event: 'user_signup',
    userId: '12345',
    timestamp: new Date().toISOString()
  })
});
```

### Using Axios
```javascript
const axios = require('axios');

// POST request with axios
const response = await axios.post('https://your-worker.your-subdomain.workers.dev', {
  webhook: 'payment_completed',
  orderId: 'order-789',
  amount: 29.99
}, {
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Source': 'payment-system'
  }
});

console.log(response.data); // "Request logged successfully!"
```

## Python Examples

### Using requests library
```python
import requests
import json

# GET request
response = requests.get('https://your-worker.your-subdomain.workers.dev')
print(response.text)  # "Request logged successfully!"

# POST with JSON data
data = {
    'event': 'order_shipped',
    'tracking_number': 'TRK123456789',
    'customer_id': 'cust_456'
}

response = requests.post(
    'https://your-worker.your-subdomain.workers.dev',
    json=data,
    headers={
        'Content-Type': 'application/json',
        'X-API-Version': 'v1',
        'User-Agent': 'OrderSystem/2.1'
    }
)

print(response.status_code)  # 200
print(response.text)  # "Request logged successfully!"
```

## Webhook Testing

### GitHub Webhook Example
```bash
# Simulate a GitHub push webhook
curl -X POST https://your-worker.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -H "X-GitHub-Delivery: 12345678-1234-1234-1234-123456789012" \
  -H "User-Agent: GitHub-Hookshot/044aadd" \
  -d '{
    "ref": "refs/heads/main",
    "before": "abc123",
    "after": "def456",
    "repository": {
      "name": "test-repo",
      "full_name": "user/test-repo"
    },
    "pusher": {
      "name": "username",
      "email": "user@example.com"
    }
  }'
```

### Stripe Webhook Example
```bash
# Simulate a Stripe payment webhook
curl -X POST https://your-worker.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: t=1234567890,v1=signature_here" \
  -d '{
    "id": "evt_1234567890",
    "object": "event",
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_1234567890",
        "amount": 2000,
        "currency": "usd",
        "status": "succeeded"
      }
    }
  }'
```

## Common Use Cases

### API Client Testing
Use the request logger to debug your API client implementations:

```javascript
// Test your API client against the logger
const apiClient = new MyApiClient({
  baseUrl: 'https://your-worker.your-subdomain.workers.dev',
  apiKey: 'test-key'
});

// This will log the exact request your client makes
await apiClient.createUser({
  name: 'Test User',
  email: 'test@example.com'
});
```

### Third-party Integration Debugging
When integrating with third-party services, use the logger to see exactly what they're sending:

1. Configure the third-party service to send webhooks to your worker URL
2. Trigger the event in the third-party service
3. Check your Cloudflare Workers logs to see the exact request format

### Load Testing
Use tools like Apache Bench or Artillery to test how your logger handles high traffic:

```bash
# Simple load test with Apache Bench
ab -n 100 -c 10 https://your-worker.your-subdomain.workers.dev/
```

## Viewing Logged Requests

### Development Mode
When running `npm run dev`, logs appear directly in your terminal.

### Production Logs
1. Go to the Cloudflare dashboard
2. Navigate to Workers & Pages
3. Select your worker
4. Click on the "Logs" tab
5. View real-time logs or use filters to find specific requests

### Using Wrangler CLI
```bash
# Stream live logs
wrangler tail

# Stream logs for specific worker
wrangler tail --name request-log
```

## Tips

- **JSON formatting**: The logger automatically formats JSON request bodies for readability
- **Large payloads**: Be aware that very large request bodies might be truncated in logs
- **Rate limiting**: Consider implementing rate limiting if using this in production
- **Security**: Never log sensitive data like passwords or API keys in production