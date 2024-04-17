import { PulseLoader } from "react-spinners";
import Avatar from "../../../../Avatar";
export default function Typing() {
  return (
    <div className="flex w-[80%] sm:w-[65%] xsm:w-[75%] md:w-[70%] lg:w-[60%] items-end friend-chat  gap-1">
      <div className="">
        <Avatar style="h-8 w-8" />
      </div>
      <div className=" space-y-2 bg-[#eee] rounded-full flex justify-center items-center py-2 px-3">
        <PulseLoader color="#36d7b7" size={8} />
      </div>
    </div>
  );
}
