import { Technology } from "@/types/technologies";
import Image from "next/image";
import { RedirectIcon } from "./icons";
import Link from "next/link";

interface ResultCardProps {
  technology: Technology;
}

const ResultCard: React.FC<ResultCardProps> = ({ technology }) => {
  return (
    <Link href={technology.url} target="_blank" className="px-4 py-3 rounded-xl bg-transparent hover:bg-input transition-bg duration-300 group">
      <div className="flex justify-between gap-10 lg:items-center flex-col lg:flex-row">
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
          <Image
            src={technology?.image}
            alt={technology.title}
            width={76}
            height={76}
            className="size-[38px] lg:size-[76px] rounded-xl"
          />
          <div className="flex items-end gap-1">
            <div className="flex flex-col gap-2">
              <p className="text-xl">{technology.title}</p>
              <p className="text-grey line-clamp-1">{technology.description}</p>
            </div>
            <div className="block lg:hidden opacity-0 group-hover:opacity-1">
              <RedirectIcon />
            </div>
          </div>
        </div>
        <div className="hidden lg:block opacity-0 group-hover:opacity-1">
          <RedirectIcon />
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
