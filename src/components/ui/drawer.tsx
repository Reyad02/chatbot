"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

const Drawer = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="drawer lg:drawer-open" ref={drawerRef}>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        readOnly
      />
      <div className="lg:hidden drawer-content flex p-1 pl-2 flex-row justify-between w-screen items-center bg-[#2B2830]">
        <div className="flex-1">
          <label
            htmlFor="my-drawer-2"
            className="btn px-2 py-2 bg-transparent border border-white drawer-button lg:hidden"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <GiHamburgerMenu className="text-xl text-white" />
          </label>
        </div>
        <div className="lg:hidden flex-1 text-center">
          <h1>ChatBot</h1>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        ></label>
        <ul className="menu bg-[#2B2830] text-base-content min-h-full w-64 gap-2 p-4">
          <li className="pointer-events-none">
            <h1 className="text-xl">ChatBot</h1>
          </li>
          <li
            className={
              pathname === "/"
                ? "bg-[#17151B] text-[#C0BCCA] rounded"
                : "bg-transparent text-[#7E7A86]"
            }
          >
            <Link href="/" onClick={() => setIsDrawerOpen(false)}>
              <MdOutlineMessage className="text-lg" /> New Chat
            </Link>
          </li>
          <li
            className={
              pathname.startsWith("/history") ? "bg-[#17151B] text-[#C0BCCA] rounded" : "bg-transparent text-[#7E7A86]"
            }
          >
            <Link href="/history" onClick={() => setIsDrawerOpen(false)}>
              <FaHistory className="text-base" /> History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
