import { BsThreeDots } from "react-icons/bs";

export default function DotBtn({ style }) {
  return (
    <button
      className={`h-9 w-9 rounded-full bg-[#e4e6eb] hover:bg-[#dadde5] ${style}`}
    >
      <BsThreeDots className="mx-auto text-xl" />
    </button>
  );
}
