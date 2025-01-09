export interface User {
    id: number,
    userId: string,
    userName: string,
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