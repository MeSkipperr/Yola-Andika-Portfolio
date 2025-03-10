import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const path :string = req.nextUrl.pathname;

    
    const segments:string[] = path.split('/').filter(Boolean); 

    if (segments[0] === 'connection' && segments.length === 2) {
        console.log(`Redirecting: ${path} → /connection`); 
        return NextResponse.redirect(new URL('/connection', req.url));
    }
    const libraryCategory :string[] = ["components","contexts","hooks","utils"]

    if (segments[0] === "library" && segments[1] && !libraryCategory.includes(segments[1])) {
        console.log(`Redirecting: ${path} → /library`); 
        return NextResponse.redirect(new URL('/library', req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/connection/:path*',"/library/:path*"],
};
