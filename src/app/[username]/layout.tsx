type UserPublicProfileLayoutProps = {
    children: React.ReactNode;
};
export default function UserPublicProfileLayout({ children }: UserPublicProfileLayoutProps) {
    return (
        <div>
            {children}
        </div>
    )
}