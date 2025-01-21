"use client"

import CardSkeletonLoader from "@/components/card-skelton";
import { useAuth } from "@/providers/auth.context";
import { Connection } from "@/types/connection.types";
import { useQuery } from "@tanstack/react-query";
import ConnectionCard from "./connection-card";

export default function Connections() {
    const { jwt, user } = useAuth();
    const {
        data: connections,
        isPending
    } = useQuery({
        queryKey: ["links"],
        queryFn: async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL + '/auth/connection/user/' + user?.userId,
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
            return userData as Connection[];
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchInterval: 5 * 60 * 1000
    })

    if (isPending) return <CardSkeletonLoader />

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-3 w-full transition-all duration-300">
                {connections?.map((connection) => (
                    <ConnectionCard
                        key={connection.id}
                        connection={connection}
                        onDelete={()=>{}} />
                ))}
            </div>
        </div>
    )
}