import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { TagIcon } from "./icons";

interface TagProps {
  title: string;
  isActive: boolean;
}

const Tag: React.FC<TagProps & HTMLAttributes<HTMLButtonElement>> = ({
  title,
  isActive,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={cn(
        "rounded-full cursor-pointer py-1.5 px-4 flex gap-2 items-center transition-all duration-300 font-medium text-sm focus:outline-purple",
        isActive ? "bg-purple text-white" : "text-purple bg-input"
      )}
    >
      <TagIcon color={isActive ? "white" : "#6833FF"} />
      {title}
    </button>
  );
};

export default Tag;
