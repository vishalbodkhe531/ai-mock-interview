"use client";
import { useTheme } from "next-themes";
import ModeToggle from "@/components/ui/ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function Header() {
  const path = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeTextColor =
    theme === "dark" ? "text-indigo-300" : "text-blue-500";

  const hoverTextColor =
    theme === "dark" ? "hover:text-indigo-300" : "hover:text-blue-400";

  return (
    <div className="bg-secondary flex justify-between items-center w-full">
      <Image src={"/logo.png"} height={85} alt="logo" width={85} />
      <ul className="hidden md:flex  justify-center gap-6 items-center w-[50%] font-medium tracking-wide">
        {[
          {
            href: "/",
            label: "Home",
            icon: <IoHome className="inline-block mr-1 text-lg" />,
          },
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: <MdDashboard className="inline-block mr-1 text-lg" />,
          },
          {
            href: "/questions",
            label: "Questions",
            icon: <FaQuestion className="inline-block mr-1 text-lg" />,
          },
          {
            href: "/upgrade",
            label: "Upgrade",
            icon: <HiSparkles className="inline-block mr-1 text-lg" />,
          },
        ].map(({ href, label, icon }) => (
          <Link href={href} key={href}>
            <li
              className={`cursor-pointer ${hoverTextColor} transition-colors duration-200 ease-in-out
                ${
                  path === href
                    ? `${activeTextColor} font-semibold`
                    : theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                } flex items-center text-sm uppercase tracking-wider`}
            >
              {icon}
              {label}
            </li>
          </Link>
        ))}
        <ModeToggle />
      </ul>
      <div className="p-3 flex items-center">
        <SignedOut>
          <div className="mx-3">
            <SignInButton />
          </div>
          <div>
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
