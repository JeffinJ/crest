import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams
    const token = searchParams.get('token')

    if (!token) {
        return NextResponse.redirect(new URL('/auth/error', request.url))
    }

    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return response
}