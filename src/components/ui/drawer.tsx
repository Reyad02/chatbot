"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

const Drawer = () => {
  const pathname = usePathname();
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="lg:hidden drawer-content flex flex-row justify-between  w-screen items-center  bg-red-400">
        {/* Page content here */}
        <div className="flex-1">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden "
          >
            <GiHamburgerMenu className="text-xl" />
          </label>
        </div>
        <div className="lg:hidden flex-1  text-center"><h1>ChatBot</h1></div>
        <div className="flex-1"></div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 ">
          {/* Sidebar content here */}
          <li className="">
            <h1 className="text-xl ">ChatBot</h1>
          </li>
          <li className={pathname === "/" ? "bg-red-500" : "bg-transparent"}>
            <Link href="/">New Chat</Link>
          </li>

          <li
            className={
              pathname.includes("/history") ? "bg-red-500" : "bg-transparent"
            }
          >
            <Link href="/history">History</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
