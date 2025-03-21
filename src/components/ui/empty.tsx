import Image from "next/image"

const Empty = ({ type }: { type: "empty" | "error" }) => {
    return <div className="flex-1 grid place-items-center min-h-[300px]">
        <Image src={type === "empty" ? "/empty.png" : "/error.png"} width={250} height={200} alt="empty" />
    </div>
}

export default Empty;