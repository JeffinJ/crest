"use client"

import CardSkeletonLoader from "@/components/card-skelton";
import { useAuth } from "@/providers/auth.context";
import { Connection } from "@/types/connection.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConnectionCard from "./connection-card";
import { useAction } from "next-safe-action/hooks";
import { deleteUserConnectionAction } from "@/server/actions/connections/connection.action";
import { useToast } from "@/hooks/use-toast";

export default function Connections() {
    const { jwt, user } = useAuth();
    const queryClient = useQueryClient();
    const { toast } = useToast();

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

    const {
        execute: executeDeleteUserConnectionAction,
        isExecuting: isDeletingUserConnection,
    } = useAction(deleteUserConnectionAction, {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["links"]
            })
            toast({
                variant: "destructive",
                title: "Connection deleted",
                description: "Connection deleted successfully",
                duration: 5000,
            });
            console.log("Connection deleted");
        },
        onError: (error) => {
            console.error(error);
        }
    })

    const deleteUserConnection = (id: number) => {
        executeDeleteUserConnectionAction(id);
    }

    if (isPending) return <CardSkeletonLoader />

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-3 w-full transition-all duration-300">
                {connections?.map((connection) => (
                    <ConnectionCard
                        key={connection.id}
                        isLoading={isDeletingUserConnection}
                        connection={connection}
                        onDelete={deleteUserConnection} />
                ))}
            </div>
        </div>
    )
}