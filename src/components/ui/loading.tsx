import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import { LoadingIcon } from "./icons";

interface LoadingProps {
    loading: boolean
    children: ReactNode
}

const LoadingSpinner: FC<LoadingProps> = ({ children, loading }) => {
    return (
        <div className="flex-1 w-full grid place-items-center h-fit overflow-hidden transition-all relative">
            <div className={cn("absolute grid place-items-center size-full bg-white/80 transition-all duration-300", loading ? "opacity-100 z-20" : "opacity-0")}>
                <LoadingIcon />
            </div>
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>

    );
};

export default LoadingSpinner;