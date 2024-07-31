// middleware.js
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from './src/lib/auth';

export async function middleware(req) {
    const session = await getServerSession(req, authOptions);
    const { pathname } = req.nextUrl;

    // If there is no session and the user is trying to access a protected route
    if (!session && pathname !== '/sign-in' && pathname !== '/sign-up') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
