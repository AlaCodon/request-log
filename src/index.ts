/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx): Promise<Response> {
        // Log request headers
        console.log("Request Headers:", JSON.stringify([...request.headers], null, 2));

        // Log request body
        let requestBody = null;
        try {
            requestBody = await request.text(); // Read the request body as text
            console.log("Request Body:", requestBody);
        } catch (error) {
            console.error("Error reading request body:", error);
        }

        // Respond to the request
        return new Response("Request logged successfully!");
    },
} satisfies ExportedHandler<Env>;
