import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from './lib/auth/session'

export async function middleware(request: NextRequest) {
    const sessionData = await getServerSession()
    console.log('Session data:', sessionData);
    if (
        sessionData &&
        sessionData.name === 'jwt' &&
        sessionData.value
    ) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    matcher: [
        '/admin/(.*)'
    ],
}