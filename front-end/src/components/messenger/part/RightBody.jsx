import Avatar from "../../Avatar";
import { PiUserCircleFill } from "react-icons/pi";

import { Disclosure } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { Notification, Search } from "../../../SVG";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function RightBody({
  showProfile,
  activeChatUser,
  isOpen,
  setIsOpen,
  isActive,
}) {
  return (
    <>
      <aside
        className={`${
          !showProfile ? "hidden" : "hidden md:block"
        } px-2 py-4  h-[calc(100vh-3px)] overflow-auto min-w-[240px] lg:min-w-[300px]  `}
      >
        <Avatar
          style="h-[75px] w-[75px] mx-auto"
          photo={activeChatUser?.photo}
          name={activeChatUser?.name}
        />
        {/* if user is active  */}
        {isActive && (
          <p className="text-green-700 text-[13px] font-semibold text-center">
            Active now
          </p>
        )}
        <h3 className="text-[17px] font-semibold text-center pt-2 pb-5  ">
          {activeChatUser?.name}
        </h3>
        <div className="flex gap-5 justify-center items-center">
          <div className="flex flex-col gap-1">
            <button className="hover:bg-[#e4e6e8] bg-[#f5f5f5] w-9 h-9 rounded-full">
              <PiUserCircleFill className="text-[22px] mx-auto" />
            </button>
            <span className="text-gray-500 text-[13px]">Profile</span>
          </div>
          <div className="flex flex-col gap-1">
            <button className="hover:bg-[#e4e6e8] bg-[#f5f5f5] w-9 h-9 rounded-full">
              <Notification />
            </button>
            <span className="text-gray-500 text-[13px]">Mute</span>
          </div>
          <div className="flex flex-col gap-1">
            <button className="hover:bg-[#e4e6e8] bg-[#f5f5f5] w-9 h-9 rounded-full">
              <Search />
            </button>
            <span className="text-gray-500 text-[13px]">Search</span>
          </div>
        </div>
        <div className="accordion py-4">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-3 py-2 text-left  font-semibold hover:bg-[#edeff1]  focus:outline-none focus-visible:ring ">
                  Chat Info
                  <MdKeyboardArrowDown
                    className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="rounded-lg px-4 pb-2 pt-2 text-sm text-gray-800 hover:bg-[#eaecee]">
                  <button className="cursor-pointer flex items-center gap-2">
                    <BsFillPinAngleFill className="text-xl" /> View pinned
                    messages
                  </button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-3 py-2 text-left  font-semibold hover:bg-[#edeff1]  focus:outline-none focus-visible:ring ">
                  Media, files and links
                  <MdKeyboardArrowDown
                    className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="rounded-lg  pb-2  text-sm text-gray-800 ">
                  <ul className="flex flex-col ">
                    <li>
                      <button className="hover:bg-[#eaecee] rounded-lg w-full py-2 px-3 cursor-pointer flex gap-2 items-center">
                        <FaImages className="text-xl" /> Media
                      </button>
                    </li>
                    <li>
                      <button className="hover:bg-[#eaecee] rounded-lg w-full py-2 px-3 cursor-pointer flex gap-2 items-center">
                        <FaFileAlt className="text-xl" /> File
                      </button>
                    </li>
                    <li>
                      <button className="hover:bg-[#eaecee] rounded-lg w-full py-2 px-3 cursor-pointer flex gap-2 items-center">
                        <FaLink className="text-xl" /> Links
                      </button>
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </aside>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative  z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Avatar
                      style="h-[75px] w-[75px] mx-auto"
                      photo={activeChatUser?.photo}
                      name={activeChatUser?.name}
                    />
                    <h3 className="text-[17px] font-semibold text-center pt-2 pb-5  ">
                      {activeChatUser?.name}
                    </h3>
                    <div className="flex gap-5 justify-center items-center">
                      <div className="flex flex-col gap-1">
                        <button className="hover:bg-[#e4e6e8] bg-[#f5f5f5] w-9 h-9 rounded-full">
                          <PiUserCircleFill className="text-[22px] mx-auto" />
                        </button>
                        <span className="text-gray-500 text-[13px]">
                          Profile
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button className="hover:bg-[#e4e6e8] bg-[#f5f5f5] w-9 h-9 rounded-full">
                          <Notification />
                        </button>
                        <span className="text-gray-500 text-[13px]">Mute</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button className="hover:bg-[#e4e6e8] bg-[#f5f5f5] w-9 h-9 rounded-full">
                          <Search />
                        </button>
                        <span className="text-gray-500 text-[13px]">
                          Search
                        </span>
                      </div>
                    </div>
                    <div className="accordion py-4">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg  px-3 py-2 text-left  font-semibold hover:bg-[#edeff1]  focus:outline-none focus-visible:ring ">
                              Chat Info
                              <MdKeyboardArrowDown
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 `}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="rounded-lg px-4 pb-2 pt-2 text-sm text-gray-800 hover:bg-[#eaecee]">
                              <button className="cursor-pointer flex items-center gap-2">
                                <BsFillPinAngleFill className="text-xl" /> View
                                pinned messages
                              </button>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg  px-3 py-2 text-left  font-semibold hover:bg-[#edeff1]  focus:outline-none focus-visible:ring ">
                              Media, files and links
                              <MdKeyboardArrowDown
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 `}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="rounded-lg  pb-2  text-sm text-gray-800 ">
                              <ul className="flex flex-col ">
                                <li>
                                  <button className="hover:bg-[#eaecee] rounded-lg w-full py-2 px-3 cursor-pointer flex gap-2 items-center">
                                    <FaImages className="text-xl" /> Media
                                  </button>
                                </li>
                                <li>
                                  <button className="hover:bg-[#eaecee] rounded-lg w-full py-2 px-3 cursor-pointer flex gap-2 items-center">
                                    <FaFileAlt className="text-xl" /> File
                                  </button>
                                </li>
                                <li>
                                  <button className="hover:bg-[#eaecee] rounded-lg w-full py-2 px-3 cursor-pointer flex gap-2 items-center">
                                    <FaLink className="text-xl" /> Links
                                  </button>
                                </li>
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
}

RightBody.propTypes = {
  showProfile: PropTypes.bool.isRequired,
  activeChatUser: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};
