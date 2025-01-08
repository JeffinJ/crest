"use client"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
    id: number,
    userId: string,
    username: string,
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    profilePictureUrl: string,
    isEmailVerified: boolean,
    accountStatus: string,
    googleId: string,
    discordId: string,
    githubId: string,
    refreshToken: string,
    passwordResetToken: string | null,
    passwordResetTokenExpiresAt: string | null,
    created_at: string,
    updated_at: string
}

interface AuthContextType {
    user: User | null
    loading: boolean,
    jwt: string | null
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    jwt: null
})

type AuthProviderProps = {
    children: React.ReactNode,
    jwt: string | null
}

export function AuthProvider({ children, jwt }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user')
                const res = await fetch('http://localhost:3000/auth/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    }
                )
                if (res.ok) {
                    console.log('User is logged in');
                    const user = await res.json()
                    console.log('User', user);
                    setUser(user)
                }
            } catch (error: unknown) {
                console.error('Failed to fetch user', error);
                setUser(null)
            }
            setLoading(false)
        }
        fetchUser()
    }, [jwt])
    
    return (
        <AuthContext.Provider value={{ user, loading, jwt }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

