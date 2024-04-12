import messengerPhoto from "../assets/messengar_transparent.png";

import icon from "../assets/messenger.png";
import { Helmet } from "react-helmet-async";

export default function NoChatSelected() {
  return (
    <>
      <Helmet>
        <title>Chat</title>
        {/* <link rel="canonical" href={icon} /> */}
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <section className=" hidden xsm:block min-h-[calc(100vh-3px)] mx-auto flex-1  p-4 border-l">
        <div className="flex justify-center items-center flex-col h-full">
          <figure>
            <img src={messengerPhoto} className="w-40 " alt="" />
          </figure>
          <span className="text-lg font-semibold">No Chat Selected</span>
        </div>
      </section>
    </>
  );
}
