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

function Header() {
  const path = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure the theme is only applied after mounting
  if (!mounted) return null;

  const activeTextColor = theme === "dark" ? "text-red-400" : "text-blue-700";
  const hoverTextColor =
    theme === "dark" ? "hover:text-green-300" : "hover:text-green-700";

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-lg w-full">
      <Image src={"/logo.svg"} height={50} alt="logo" width={50} />
      <ul className="hidden md:flex justify-center gap-6 items-center w-[50%]">
        {[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/questions", label: "Questions" },
          { href: "/upgrade", label: "Upgrade" },
          { href: "/works", label: "How it Works ?" },
        ].map(({ href, label }) => (
          <Link href={href} key={href}>
            <li
              className={`cursor-pointer ${hoverTextColor} ${
                path === href ? `${activeTextColor} font-bold` : ""
              }`}
            >
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
