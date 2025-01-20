import { Suspense } from "react";
import AccountConnections from "./_components/account-connections";
import Connections from "./_components/connections";

export default function ManageLinksPage() {
    return (
        <div className="flex flex-col space-y-5 p-10  w-[900px]">
            <div className="w-full">
                <AccountConnections />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Connections />
            </Suspense>
        </div>
    )
};