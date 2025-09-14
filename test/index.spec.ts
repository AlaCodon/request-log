/**
 * Test suite for the Request Log Cloudflare Worker
 * 
 * These tests verify that the worker correctly handles incoming requests
 * and returns the expected response message.
 */

import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Request Log Worker', () => {
	it('logs and responds to GET requests (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		
		expect(response.status).toBe(200);
		expect(await response.text()).toMatchInlineSnapshot(`"Request logged successfully!"`);
		expect(response.headers.get('Content-Type')).toBe('text/plain');
		expect(response.headers.get('X-Request-Logger')).toBe('Cloudflare-Worker');
	});

	it('logs and responds to POST requests with body (unit style)', async () => {
		const testBody = JSON.stringify({ message: 'test data' });
		const request = new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'test-client/1.0'
			},
			body: testBody
		});
		
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		
		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Request logged successfully!');
		expect(response.headers.get('Content-Type')).toBe('text/plain');
	});

	it('handles requests with empty body', async () => {
		const request = new IncomingRequest('http://example.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: ''
		});
		
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		
		expect(response.status).toBe(200);
		expect(await response.text()).toBe('Request logged successfully!');
	});

	it('responds correctly via integration test', async () => {
		const response = await SELF.fetch('https://example.com', {
			method: 'GET',
			headers: {
				'X-Test-Header': 'integration-test'
			}
		});
		
		expect(response.status).toBe(200);
		expect(await response.text()).toMatchInlineSnapshot(`"Request logged successfully!"`);
	});

	it('handles different HTTP methods', async () => {
		const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
		
		for (const method of methods) {
			const request = new IncomingRequest('http://example.com', { method });
			const ctx = createExecutionContext();
			const response = await worker.fetch(request, env, ctx);
			await waitOnExecutionContext(ctx);
			
			expect(response.status).toBe(200);
			expect(await response.text()).toBe('Request logged successfully!');
		}
	});
});
