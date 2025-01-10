"use client"
import FullScreenLoader from "@/components/fullscreen-loader"
import { User } from "@/types/auth.tyes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createContext, useContext } from "react"

interface AuthContextType {
    user: User | null
    jwt: string | null
    signOut: () => void
    isSigningOut: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    jwt: null,
    signOut: () => { },
    isSigningOut: false
})

type AuthProviderProps = {
    children: React.ReactNode,
    jwt: string | null
}

export function AuthProvider({ children, jwt }: AuthProviderProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    
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
                return null
            }
            const userData = await res.json()
            return userData as User;
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchInterval: 5 * 60 * 1000
    });

    const {
        mutate: signOut,
        isPending: isSigningOut
    } = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Failed to sign out')
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.clear()
            router.replace('/signin')
            router.refresh() 
        }
    })

    if (isLoading) return <FullScreenLoader />

    return (
        <AuthContext.Provider value={{
            user: userData || null,
            jwt,
            signOut,
            isSigningOut
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
