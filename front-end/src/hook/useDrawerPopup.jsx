import { useEffect, useRef, useState } from "react";

const useDrawerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //outside click
  const handleClickOutside = (e) => {
    if (
      dropDownRef?.current &&
      dropDownRef?.current?.classList.contains("open-drawer") &&
      !dropDownRef?.current?.contains(e.target)
    ) {
      setIsOpen(false);
    }
    // dropDownRef.current && dropDownRef.current.classList.toggle("open-drawer");
    if (
      !dropDownRef?.current?.classList.contains("open-drawer") &&
      !dropDownRef?.current?.contains(e.target)
    ) {
      dropDownRef?.current?.classList.add("open-drawer");
    } else if (
      dropDownRef?.current?.classList.contains("open-drawer") &&
      dropDownRef?.current?.contains(e.target)
    ) {
      dropDownRef?.current?.classList.add("open-drawer");
    } else {
      dropDownRef?.current?.classList.remove("open-drawer");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    drawerOpen: isOpen,
    drawerToggle: toggleMenu,
    drawerRef: dropDownRef,
  };
};

export default useDrawerPopup;
