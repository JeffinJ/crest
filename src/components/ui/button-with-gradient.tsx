import React from 'react';
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from './button';

interface ButtonWithGradientProps extends ButtonProps {
    gradientColors?: {
        via1?: string;
        via2?: string;
    };
}

const ButtonWithGradient = React.forwardRef<HTMLButtonElement, ButtonWithGradientProps>(
    ({
        children,
        className,
        variant = "ghost",
        gradientColors = {
            via1: "cyan-500",
            via2: "indigo-500"
        },
        ...props
    }, ref) => {
        // Create a mapping object for gradient classes
        const gradientMap: Record<string, string> = {
            // Core colors
            'transparent': 'from-transparent via-transparent to-transparent',
            'black': 'from-transparent via-black to-transparent',
            'white': 'from-transparent via-white to-transparent',

            // Gray colors
            'gray-50': 'from-transparent via-gray-50 to-transparent',
            'gray-100': 'from-transparent via-gray-100 to-transparent',
            'gray-200': 'from-transparent via-gray-200 to-transparent',
            'gray-300': 'from-transparent via-gray-300 to-transparent',
            'gray-400': 'from-transparent via-gray-400 to-transparent',
            'gray-500': 'from-transparent via-gray-500 to-transparent',
            'gray-600': 'from-transparent via-gray-600 to-transparent',
            'gray-700': 'from-transparent via-gray-700 to-transparent',
            'gray-800': 'from-transparent via-gray-800 to-transparent',
            'gray-900': 'from-transparent via-gray-900 to-transparent',
            'gray-950': 'from-transparent via-gray-950 to-transparent',

            // Slate colors
            'slate-50': 'from-transparent via-slate-50 to-transparent',
            'slate-100': 'from-transparent via-slate-100 to-transparent',
            'slate-200': 'from-transparent via-slate-200 to-transparent',
            'slate-300': 'from-transparent via-slate-300 to-transparent',
            'slate-400': 'from-transparent via-slate-400 to-transparent',
            'slate-500': 'from-transparent via-slate-500 to-transparent',
            'slate-600': 'from-transparent via-slate-600 to-transparent',
            'slate-700': 'from-transparent via-slate-700 to-transparent',
            'slate-800': 'from-transparent via-slate-800 to-transparent',
            'slate-900': 'from-transparent via-slate-900 to-transparent',
            'slate-950': 'from-transparent via-slate-950 to-transparent',

            // Zinc colors
            'zinc-50': 'from-transparent via-zinc-50 to-transparent',
            'zinc-100': 'from-transparent via-zinc-100 to-transparent',
            'zinc-200': 'from-transparent via-zinc-200 to-transparent',
            'zinc-300': 'from-transparent via-zinc-300 to-transparent',
            'zinc-400': 'from-transparent via-zinc-400 to-transparent',
            'zinc-500': 'from-transparent via-zinc-500 to-transparent',
            'zinc-600': 'from-transparent via-zinc-600 to-transparent',
            'zinc-700': 'from-transparent via-zinc-700 to-transparent',
            'zinc-800': 'from-transparent via-zinc-800 to-transparent',
            'zinc-900': 'from-transparent via-zinc-900 to-transparent',
            'zinc-950': 'from-transparent via-zinc-950 to-transparent',

            // Neutral colors
            'neutral-50': 'from-transparent via-neutral-50 to-transparent',
            'neutral-100': 'from-transparent via-neutral-100 to-transparent',
            'neutral-200': 'from-transparent via-neutral-200 to-transparent',
            'neutral-300': 'from-transparent via-neutral-300 to-transparent',
            'neutral-400': 'from-transparent via-neutral-400 to-transparent',
            'neutral-500': 'from-transparent via-neutral-500 to-transparent',
            'neutral-600': 'from-transparent via-neutral-600 to-transparent',
            'neutral-700': 'from-transparent via-neutral-700 to-transparent',
            'neutral-800': 'from-transparent via-neutral-800 to-transparent',
            'neutral-900': 'from-transparent via-neutral-900 to-transparent',
            'neutral-950': 'from-transparent via-neutral-950 to-transparent',

            // Stone colors
            'stone-50': 'from-transparent via-stone-50 to-transparent',
            'stone-100': 'from-transparent via-stone-100 to-transparent',
            'stone-200': 'from-transparent via-stone-200 to-transparent',
            'stone-300': 'from-transparent via-stone-300 to-transparent',
            'stone-400': 'from-transparent via-stone-400 to-transparent',
            'stone-500': 'from-transparent via-stone-500 to-transparent',
            'stone-600': 'from-transparent via-stone-600 to-transparent',
            'stone-700': 'from-transparent via-stone-700 to-transparent',
            'stone-800': 'from-transparent via-stone-800 to-transparent',
            'stone-900': 'from-transparent via-stone-900 to-transparent',
            'stone-950': 'from-transparent via-stone-950 to-transparent',

            // Red colors
            'red-50': 'from-transparent via-red-50 to-transparent',
            'red-100': 'from-transparent via-red-100 to-transparent',
            'red-200': 'from-transparent via-red-200 to-transparent',
            'red-300': 'from-transparent via-red-300 to-transparent',
            'red-400': 'from-transparent via-red-400 to-transparent',
            'red-500': 'from-transparent via-red-500 to-transparent',
            'red-600': 'from-transparent via-red-600 to-transparent',
            'red-700': 'from-transparent via-red-700 to-transparent',
            'red-800': 'from-transparent via-red-800 to-transparent',
            'red-900': 'from-transparent via-red-900 to-transparent',
            'red-950': 'from-transparent via-red-950 to-transparent',

            // Orange colors
            'orange-50': 'from-transparent via-orange-50 to-transparent',
            'orange-100': 'from-transparent via-orange-100 to-transparent',
            'orange-200': 'from-transparent via-orange-200 to-transparent',
            'orange-300': 'from-transparent via-orange-300 to-transparent',
            'orange-400': 'from-transparent via-orange-400 to-transparent',
            'orange-500': 'from-transparent via-orange-500 to-transparent',
            'orange-600': 'from-transparent via-orange-600 to-transparent',
            'orange-700': 'from-transparent via-orange-700 to-transparent',
            'orange-800': 'from-transparent via-orange-800 to-transparent',
            'orange-900': 'from-transparent via-orange-900 to-transparent',
            'orange-950': 'from-transparent via-orange-950 to-transparent',

            // Amber colors
            'amber-50': 'from-transparent via-amber-50 to-transparent',
            'amber-100': 'from-transparent via-amber-100 to-transparent',
            'amber-200': 'from-transparent via-amber-200 to-transparent',
            'amber-300': 'from-transparent via-amber-300 to-transparent',
            'amber-400': 'from-transparent via-amber-400 to-transparent',
            'amber-500': 'from-transparent via-amber-500 to-transparent',
            'amber-600': 'from-transparent via-amber-600 to-transparent',
            'amber-700': 'from-transparent via-amber-700 to-transparent',
            'amber-800': 'from-transparent via-amber-800 to-transparent',
            'amber-900': 'from-transparent via-amber-900 to-transparent',
            'amber-950': 'from-transparent via-amber-950 to-transparent',

            // Yellow colors
            'yellow-50': 'from-transparent via-yellow-50 to-transparent',
            'yellow-100': 'from-transparent via-yellow-100 to-transparent',
            'yellow-200': 'from-transparent via-yellow-200 to-transparent',
            'yellow-300': 'from-transparent via-yellow-300 to-transparent',
            'yellow-400': 'from-transparent via-yellow-400 to-transparent',
            'yellow-500': 'from-transparent via-yellow-500 to-transparent',
            'yellow-600': 'from-transparent via-yellow-600 to-transparent',
            'yellow-700': 'from-transparent via-yellow-700 to-transparent',
            'yellow-800': 'from-transparent via-yellow-800 to-transparent',
            'yellow-900': 'from-transparent via-yellow-900 to-transparent',
            'yellow-950': 'from-transparent via-yellow-950 to-transparent',

            // Lime colors
            'lime-50': 'from-transparent via-lime-50 to-transparent',
            'lime-100': 'from-transparent via-lime-100 to-transparent',
            'lime-200': 'from-transparent via-lime-200 to-transparent',
            'lime-300': 'from-transparent via-lime-300 to-transparent',
            'lime-400': 'from-transparent via-lime-400 to-transparent',
            'lime-500': 'from-transparent via-lime-500 to-transparent',
            'lime-600': 'from-transparent via-lime-600 to-transparent',
            'lime-700': 'from-transparent via-lime-700 to-transparent',
            'lime-800': 'from-transparent via-lime-800 to-transparent',
            'lime-900': 'from-transparent via-lime-900 to-transparent',
            'lime-950': 'from-transparent via-lime-950 to-transparent',

            // Green colors
            'green-50': 'from-transparent via-green-50 to-transparent',
            'green-100': 'from-transparent via-green-100 to-transparent',
            'green-200': 'from-transparent via-green-200 to-transparent',
            'green-300': 'from-transparent via-green-300 to-transparent',
            'green-400': 'from-transparent via-green-400 to-transparent',
            'green-500': 'from-transparent via-green-500 to-transparent',
            'green-600': 'from-transparent via-green-600 to-transparent',
            'green-700': 'from-transparent via-green-700 to-transparent',
            'green-800': 'from-transparent via-green-800 to-transparent',
            'green-900': 'from-transparent via-green-900 to-transparent',
            'green-950': 'from-transparent via-green-950 to-transparent',

            // Emerald colors
            'emerald-50': 'from-transparent via-emerald-50 to-transparent',
            'emerald-100': 'from-transparent via-emerald-100 to-transparent',
            'emerald-200': 'from-transparent via-emerald-200 to-transparent',
            'emerald-300': 'from-transparent via-emerald-300 to-transparent',
            'emerald-400': 'from-transparent via-emerald-400 to-transparent',
            'emerald-500': 'from-transparent via-emerald-500 to-transparent',
            'emerald-600': 'from-transparent via-emerald-600 to-transparent',
            'emerald-700': 'from-transparent via-emerald-700 to-transparent',
            'emerald-800': 'from-transparent via-emerald-800 to-transparent',
            'emerald-900': 'from-transparent via-emerald-900 to-transparent',
            'emerald-950': 'from-transparent via-emerald-950 to-transparent',

            // Teal colors
            'teal-50': 'from-transparent via-teal-50 to-transparent',
            'teal-100': 'from-transparent via-teal-100 to-transparent',
            'teal-200': 'from-transparent via-teal-200 to-transparent',
            'teal-300': 'from-transparent via-teal-300 to-transparent',
            'teal-400': 'from-transparent via-teal-400 to-transparent',
            'teal-500': 'from-transparent via-teal-500 to-transparent',
            'teal-600': 'from-transparent via-teal-600 to-transparent',
            'teal-700': 'from-transparent via-teal-700 to-transparent',
            'teal-800': 'from-transparent via-teal-800 to-transparent',
            'teal-900': 'from-transparent via-teal-900 to-transparent',
            'teal-950': 'from-transparent via-teal-950 to-transparent',

            // Cyan colors
            'cyan-50': 'from-transparent via-cyan-50 to-transparent',
            'cyan-100': 'from-transparent via-cyan-100 to-transparent',
            'cyan-200': 'from-transparent via-cyan-200 to-transparent',
            'cyan-300': 'from-transparent via-cyan-300 to-transparent',
            'cyan-400': 'from-transparent via-cyan-400 to-transparent',
            'cyan-500': 'from-transparent via-cyan-500 to-transparent',
            'cyan-600': 'from-transparent via-cyan-600 to-transparent',
            'cyan-700': 'from-transparent via-cyan-700 to-transparent',
            'cyan-800': 'from-transparent via-cyan-800 to-transparent',
            'cyan-900': 'from-transparent via-cyan-900 to-transparent',
            'cyan-950': 'from-transparent via-cyan-950 to-transparent',

            // Sky colors
            'sky-50': 'from-transparent via-sky-50 to-transparent',
            'sky-100': 'from-transparent via-sky-100 to-transparent',
            'sky-200': 'from-transparent via-sky-200 to-transparent',
            'sky-300': 'from-transparent via-sky-300 to-transparent',
            'sky-400': 'from-transparent via-sky-400 to-transparent',
            'sky-500': 'from-transparent via-sky-500 to-transparent',
            'sky-600': 'from-transparent via-sky-600 to-transparent',
            'sky-700': 'from-transparent via-sky-700 to-transparent',
            'sky-800': 'from-transparent via-sky-800 to-transparent',
            'sky-900': 'from-transparent via-sky-900 to-transparent',
            'sky-950': 'from-transparent via-sky-950 to-transparent',

            // Blue colors
            'blue-50': 'from-transparent via-blue-50 to-transparent',
            'blue-100': 'from-transparent via-blue-100 to-transparent',
            'blue-200': 'from-transparent via-blue-200 to-transparent',
            'blue-300': 'from-transparent via-blue-300 to-transparent',
            'blue-400': 'from-transparent via-blue-400 to-transparent',
            'blue-500': 'from-transparent via-blue-500 to-transparent',
            'blue-600': 'from-transparent via-blue-600 to-transparent',
            'blue-700': 'from-transparent via-blue-700 to-transparent',
            'blue-800': 'from-transparent via-blue-800 to-transparent',
            'blue-900': 'from-transparent via-blue-900 to-transparent',
            'blue-950': 'from-transparent via-blue-950 to-transparent',

            // Indigo colors
            'indigo-50': 'from-transparent via-indigo-50 to-transparent',
            'indigo-100': 'from-transparent via-indigo-100 to-transparent',
            'indigo-200': 'from-transparent via-indigo-200 to-transparent',
            'indigo-300': 'from-transparent via-indigo-300 to-transparent',
            'indigo-400': 'from-transparent via-indigo-400 to-transparent',
            'indigo-500': 'from-transparent via-indigo-500 to-transparent',
            'indigo-600': 'from-transparent via-indigo-600 to-transparent',
            'indigo-700': 'from-transparent via-indigo-700 to-transparent',
            'indigo-800': 'from-transparent via-indigo-800 to-transparent',
            'indigo-900': 'from-transparent via-indigo-900 to-transparent',
            'indigo-950': 'from-transparent via-indigo-950 to-transparent',

            // Violet colors
            'violet-50': 'from-transparent via-violet-50 to-transparent',
            'violet-100': 'from-transparent via-violet-100 to-transparent',
            'violet-200': 'from-transparent via-violet-200 to-transparent',
            'violet-300': 'from-transparent via-violet-300 to-transparent',
            'violet-400': 'from-transparent via-violet-400 to-transparent',
            'violet-500': 'from-transparent via-violet-500 to-transparent',
            'violet-600': 'from-transparent via-violet-600 to-transparent',
            'violet-700': 'from-transparent via-violet-700 to-transparent',
            'violet-800': 'from-transparent via-violet-800 to-transparent',
            'violet-900': 'from-transparent via-violet-900 to-transparent',
            'violet-950': 'from-transparent via-violet-950 to-transparent',

            // Purple colors
            'purple-50': 'from-transparent via-purple-50 to-transparent',
            'purple-100': 'from-transparent via-purple-100 to-transparent',
            'purple-200': 'from-transparent via-purple-200 to-transparent',
            'purple-300': 'from-transparent via-purple-300 to-transparent',
            'purple-400': 'from-transparent via-purple-400 to-transparent',
            'purple-500': 'from-transparent via-purple-500 to-transparent',
            'purple-600': 'from-transparent via-purple-600 to-transparent',
            'purple-700': 'from-transparent via-purple-700 to-transparent',
            'purple-800': 'from-transparent via-purple-800 to-transparent',
            'purple-900': 'from-transparent via-purple-900 to-transparent',
            'purple-950': 'from-transparent via-purple-950 to-transparent',

            // Fuchsia colors
            'fuchsia-50': 'from-transparent via-fuchsia-50 to-transparent',
            'fuchsia-100': 'from-transparent via-fuchsia-100 to-transparent',
            'fuchsia-200': 'from-transparent via-fuchsia-200 to-transparent',
            'fuchsia-300': 'from-transparent via-fuchsia-300 to-transparent',
            'fuchsia-400': 'from-transparent via-fuchsia-400 to-transparent',
            'fuchsia-500': 'from-transparent via-fuchsia-500 to-transparent',
            'fuchsia-600': 'from-transparent via-fuchsia-600 to-transparent',
            'fuchsia-700': 'from-transparent via-fuchsia-700 to-transparent',
            'fuchsia-800': 'from-transparent via-fuchsia-800 to-transparent',
            'fuchsia-900': 'from-transparent via-fuchsia-900 to-transparent',
            'fuchsia-950': 'from-transparent via-fuchsia-950 to-transparent',

            // Pink colors
            'pink-50': 'from-transparent via-pink-50 to-transparent',
            'pink-100': 'from-transparent via-pink-100 to-transparent',
            'pink-200': 'from-transparent via-pink-200 to-transparent',
            'pink-300': 'from-transparent via-pink-300 to-transparent',
            'pink-400': 'from-transparent via-pink-400 to-transparent',
            'pink-500': 'from-transparent via-pink-500 to-transparent',
            'pink-600': 'from-transparent via-pink-600 to-transparent',
            'pink-700': 'from-transparent via-pink-700 to-transparent',
            'pink-800': 'from-transparent via-pink-800 to-transparent',
            'pink-900': 'from-transparent via-pink-900 to-transparent',
            'pink-950': 'from-transparent via-pink-950 to-transparent',

            // Rose colors
            'rose-50': 'from-transparent via-rose-50 to-transparent',
            'rose-100': 'from-transparent via-rose-100 to-transparent',
            'rose-200': 'from-transparent via-rose-200 to-transparent',
            'rose-300': 'from-transparent via-rose-300 to-transparent',
            'rose-400': 'from-transparent via-rose-400 to-transparent',
            'rose-500': 'from-transparent via-rose-500 to-transparent',
            'rose-600': 'from-transparent via-rose-600 to-transparent',
            'rose-700': 'from-transparent via-rose-700 to-transparent',
            'rose-800': 'from-transparent via-rose-800 to-transparent',
            'rose-900': 'from-transparent via-rose-900 to-transparent',
            'rose-950': 'from-transparent via-rose-950 to-transparent',

        };

        // Get the correct gradient classes or fall back to defaults
        const gradient1Class = gradientMap[gradientColors.via1 as keyof typeof gradientMap] || gradientMap['cyan-500'];
        const gradient2Class = gradientMap[gradientColors.via2 as keyof typeof gradientMap] || gradientMap['indigo-500'];

        return (
            <div className="relative group/btn">
                <Button
                    ref={ref}
                    variant={variant}
                    className={cn(
                        "w-full shadow-input",
                        "dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]",
                        "bg-background hover:bg-background",
                        className
                    )}
                    {...props}
                >
                    {children}
                </Button>
                {/* First gradient line */}
                <span
                    className={cn(
                        "opacity-0 group-hover/btn:opacity-100",
                        "transition-all duration-500",
                        "absolute h-[2px] w-full -bottom-px inset-x-0",
                        "bg-gradient-to-r",
                        gradient1Class
                    )}
                />
                {/* Second gradient line with blur */}
                <span
                    className={cn(
                        "opacity-0 group-hover/btn:opacity-100",
                        "transition-all duration-500",
                        "absolute h-[2px] w-1/2 mx-auto -bottom-px inset-x-10",
                        "blur-[2px]",
                        "bg-gradient-to-r",
                        gradient2Class
                    )}
                />
            </div>
        );
    }
);

ButtonWithGradient.displayName = "ButtonWithGradient";

export { ButtonWithGradient };