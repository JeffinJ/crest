import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmActionProps = {
    trigger: React.ReactNode;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onConfirm: () => void | Promise<void>;
    variant?: 'default' | 'destructive';
    confirmButtonClassName?: string;
};

export function ConfirmAction({
    trigger,
    title = "Confirm Action",
    description = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    open,
    onOpenChange,
    onConfirm,
    variant = 'default',
    confirmButtonClassName,
}: ConfirmActionProps) {
    const getDefaultButtonClass = () => {
        if (confirmButtonClassName) return confirmButtonClassName;

        return variant === 'destructive'
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-primary hover:bg-primary/90';
    };

    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className={getDefaultButtonClass()}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}