import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    const maintenance = process.env.MAINTENANCE_MODE === 'true';

    if (maintenance) {
        return NextResponse.rewrite(new URL('/maintenance', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}