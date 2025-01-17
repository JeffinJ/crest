export default function LineGradient({ showOnHover = false }) {
    // Base classes without hover
    const baseClasses = "block absolute h-px w-full -bottom-px inset-x-0";
    const blurClasses = "blur-sm block absolute h-px w-1/2 mx-auto -bottom-px inset-x-10";

    // Transition classes
    const transitionClasses = "transition duration-500";

    // Opacity classes based on showOnHover prop
    const opacityClasses = showOnHover ? "opacity-0 group-hover/btn:opacity-100" : "opacity-100";

    return (
        <>
            <span
                className={`${baseClasses} ${transitionClasses} ${opacityClasses} bg-gradient-to-r from-transparent via-cyan-500 to-transparent`}
            />
            <span
                className={`${blurClasses} ${transitionClasses} ${opacityClasses} bg-gradient-to-r from-transparent via-indigo-500 to-transparent`}
            />
        </>
    );
}