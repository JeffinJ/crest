import { UserPublicProfileType } from "@/types/user.types";
import UserPublicProfile from "./_components/user-public-profile";

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    const userData = await fetch(process.env.NEXT_PUBLIC_CREST_AUTH_CENTER_URL + '/auth/user/' + username + '/profile');
    const user = await userData.json() as UserPublicProfileType;

    return (
        <div>
            <UserPublicProfile user={user} />
        </div>
    )
};