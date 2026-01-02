import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory store for rate limiting
// Note: In a production Vercel/Serverless environment, this map is per-lambda instance.
// For robust global rate limiting, use Redis (e.g., Upstash).
const rateLimit = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

// Next.js 16+ convention: 'proxy' instead of 'middleware'
export function proxy(request: NextRequest) {
    const ip = request.ip || "127.0.0.1";

    // Clean up old entries periodically (optimization)
    const now = Date.now();

    let record = rateLimit.get(ip);

    if (!record || (now - record.lastReset > RATE_LIMIT_WINDOW)) {
        record = { count: 1, lastReset: now };
        rateLimit.set(ip, record);
    } else {
        record.count++;
    }

    if (record.count > MAX_REQUESTS) {
        return new NextResponse(
            JSON.stringify({ success: false, message: "Too many requests" }),
            { status: 429, headers: { "Content-Type": "application/json" } }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Apply to all routes except api, _next, static assets
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
