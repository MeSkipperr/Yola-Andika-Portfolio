import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    
    const segments = path.split('/').filter(Boolean); 

    if (segments[0] === 'connection' && segments.length === 2) {
        console.log(`Redirecting: ${path} → /connection`); 
        return NextResponse.redirect(new URL('/connection', req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: '/connection/:path*',
};
