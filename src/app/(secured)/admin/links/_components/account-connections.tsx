import ProfileCard from "@/components/profile-card";
import AddConnection from "./add-connection";

export default function AccountConnections() {

    return (
        <div className="flex flex-col space-y-5 w-full">
            <ProfileCard />
            <AddConnection />
        </div>
    )
};