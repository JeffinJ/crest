import AccountConnections from "./_components/account-connections";

export default function ManageLinksPage() {
    return (
        <div className="flex flex-col space-y-5 p-10  w-[900px]">
            <div className="w-full">
                <AccountConnections />
            </div>
        </div>
    )
};