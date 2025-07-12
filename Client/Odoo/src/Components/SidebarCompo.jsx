// components/SidebarCompo.jsx
import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../reuseableComponents/SidebarProvider";
import {
  IconArrowLeft,
  IconUserBolt,
  IconExchange,
  IconTrash,
} from "@tabler/icons-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { TbPlus, TbMenu2 } from "react-icons/tb";
import Cookies from "js-cookie";
import { deleteUser } from "../../../connection";

export default function SidebarCompo() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const result = await deleteUser();
      if (result.success || result.status === 200) {
        Cookies.remove("token");
        navigate("/register");
      } else {
        alert("Account deletion failed. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Something went wrong.");
    }
  };

  const links = [
    {
      label: "",
      to: "/skillform",
      icon: (
        <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <TbPlus size={20} />
        </div>
      ),
    },
    {
      label: "Account View",
      to: "/account",
      icon: (
        <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "My Swaps",
      to: "/swaps",
      icon: (
        <IconExchange className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center">
        <TbMenu2
          size={24}
          className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        <h1 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          SkillSwap
        </h1>
      </div>

      {/* Sidebar */}
      {open && (
        <div
          className={cn(
            "h-screen w-[220px] border-r border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 fixed z-50 top-0 left-0 md:relative"
          )}
        >
          <Sidebar open={true} setOpen={setOpen}>
            <SidebarBody className="flex flex-col justify-between h-full gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="mt-4 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-gray-300 pt-4 px-1">
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700"
                >
                  <IconTrash size={18} /> Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200 text-sm hover:text-blue-500"
                >
                  <IconArrowLeft size={18} /> Logout
                </button>
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
      )}
    </>
  );
}