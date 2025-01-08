import { cookies } from "next/headers";

export async function getServerSession() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt');
    return jwt;
}