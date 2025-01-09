"use client"
import FullScreenLoader from "@/components/fullscreen-loader"
import { useQuery } from "@tanstack/react-query"
import { createContext, useContext } from "react"

interface User {
    id: number,
    userId: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    profilePictureUrl: string,
    isEmailVerified: boolean,
    accountStatus: string,
    googleId: string,
    discordId: string,
    githubId: string,
    refreshToken: string,
    created_at: string,
    updated_at: string
}

interface AuthContextType {
    user: User | null
    jwt: string | null
    signout: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    jwt: null,
    signout: () => { }
})

type AuthProviderProps = {
    children: React.ReactNode,
    jwt: string | null
}

export function AuthProvider({ children, jwt }: AuthProviderProps) {
    const {
        isPending: isLoading,
        data: userData
    } = useQuery({
        queryKey: ['user', jwt],
        queryFn: async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL + '/auth/profile',
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            if (!res.ok) {
                const errorData = await res.json()
                console.error('errorData', errorData);
            }
            const userData = await res.json()
            return userData as User;
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchInterval: 5 * 60 * 1000
    });

    const signout = () => { }

    if (isLoading) return <FullScreenLoader />

    return (
        <AuthContext.Provider value={{
            user: userData || null,
            jwt,
            signout
        }}>
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

if (!process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL) throw new Error('NEXT_PUBLIC_CREST_AUTH_CENTER_URL is not defined');
