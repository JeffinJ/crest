import Link from "next/link";

type ButtonWithGradientProps = {
    href: string;
    children: React.ReactNode;
};

export default function LinkWithGradient({ children, href }: ButtonWithGradientProps) {
    return (
        <Link
            href={href}
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-transparent  text-white">
            {children}
            <BottomGradient />
        </Link>
    )
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};