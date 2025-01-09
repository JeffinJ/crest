import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true },
            { status: 200 }
        )
        response.cookies.set('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0)
        })

        return response

    } catch (error) {
        console.error('Signout error:', error)
        return NextResponse.json(
            { error: 'Failed to sign out' },
            { status: 500 }
        )
    }
}

// async function cleanupUserSession(userId: string) {
//     try {

//     } catch (error) {
//         console.error('Session cleanup error:', error)
//         throw error
//     }
// }