import spinner from "../../public/assets/spinner.svg";
import Image from "next/image";

export default function FullScreenLoader() {
    return (
        <div className="h-screen w-full bg-transparent flex items-center justify-center">
            <Image src={spinner} alt="spinner" width={50} height={50}
                priority
                className="w-20 h-20" />
        </div>
    )
};