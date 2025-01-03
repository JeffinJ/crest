import { ScanFace } from "lucide-react";

export default function SignInPage() {
    return (
        <div className="flex flex-row h-full">
            <div className="h-full w-1/3 flex flex-col justify-center items-center">
                <ScanFace size={64} />
            </div>
            <div className="w-1/2 h-full flex flex-col items-start justify-center">
                <h1 className="font-semibold text-xl uppercase">Join Crest</h1>
                
            </div>
        </div>
    )
}