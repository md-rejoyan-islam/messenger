import Avatar from "../../../Avatar";
import DotBtn from "../../../DotBtn";

export default function GroupChatBar() {
  return (
    <div className="flex gap-2 chat-bar relative  items-center hover:bg-[#dfe2e9] active pl-6 pr-2 py-2 rounded-md cursor-pointer">
      <div className="flex relative">
        <Avatar style="h-10 w-10 -mt-4" />
        <div className="h-10 w-10 absolute right-4">
          <Avatar style="h-10 w-10" />
        </div>
      </div>
      <div>
        <h5 className=" text-[17px] font-[500]">Md.Rejoyan Islam</h5>
        <p className="text-[14px] text-gray-600">
          Lorem ipsum dolor sit amet...{" "}
          <span className="px-1 text-gray-500">1 w</span>
        </p>
      </div>
      <div className="absolute right-2 dotButton">
        <DotBtn style="bg-white border border-gray-300" />
      </div>
    </div>
  );
}
