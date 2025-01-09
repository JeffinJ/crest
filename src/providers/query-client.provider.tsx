"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type QueryClientProviderProps = {
    children: React.ReactNode,
}

const queryClient = new QueryClient()

export default function QueryClientWrapper({ children }: QueryClientProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}