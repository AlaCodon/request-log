/**
 * Request Log - Cloudflare Worker
 * 
 * A simple Cloudflare Worker that logs incoming HTTP requests for debugging and monitoring.
 * This worker captures request headers and body content, logs them to the console,
 * and returns a success response.
 * 
 * Use cases:
 * - Debugging webhooks from third-party services
 * - Monitoring API traffic patterns
 * - Testing HTTP client implementations
 * - Capturing request data for analysis
 * 
 * @example
 * // Deploy the worker and send a request:
 * curl -X POST https://your-worker.workers.dev \
 *   -H "Content-Type: application/json" \
 *   -d '{"test": "data"}'
 * 
 * @see https://developers.cloudflare.com/workers/
 */

/**
 * The main fetch handler for the Cloudflare Worker.
 * Processes incoming HTTP requests, logs their details, and returns a success response.
 */
export default {
    /**
     * Handles incoming HTTP requests
     * 
     * @param request - The incoming HTTP request object
     * @param env - Environment variables and bindings configured in wrangler.jsonc
     * @param ctx - Execution context for the request (used for waitUntil, passThroughOnException, etc.)
     * @returns Promise<Response> - Always returns a 200 OK response with success message
     */
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        try {
            // Convert headers to a readable format and log them
            const headersObject = Object.fromEntries(request.headers.entries());
            console.log("Request Details:");
            console.log("  Method:", request.method);
            console.log("  URL:", request.url);
            console.log("  Headers:", JSON.stringify(headersObject, null, 2));

            // Attempt to read and log the request body
            let requestBody: string = "";
            
            // Clone the request to avoid consuming the body stream
            const requestClone = request.clone();
            
            try {
                requestBody = await requestClone.text();
                if (requestBody) {
                    console.log("  Body:", requestBody);
                } else {
                    console.log("  Body: (empty)");
                }
            } catch (bodyError) {
                console.error("  Body read error:", bodyError);
                console.log("  Body: (unable to read)");
            }

            // Log a separator for readability in console
            console.log("--- End of Request Log ---");

            // Return a simple success response
            return new Response("Request logged successfully!", {
                status: 200,
                headers: {
                    "Content-Type": "text/plain",
                    "X-Request-Logger": "Cloudflare-Worker"
                }
            });

        } catch (error) {
            // Log any unexpected errors
            console.error("Error processing request:", error);
            
            // Return an error response
            return new Response("Error processing request", {
                status: 500,
                headers: {
                    "Content-Type": "text/plain"
                }
            });
        }
    },
} satisfies ExportedHandler<Env>;
