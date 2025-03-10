"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  console.log(path);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-lg w-full">
      <Image src={"/logo.svg"} height={50} alt="logo" width={50} />
      <ul className="hidden md:flex justify-center gap-6 items-center w-[50%]">
        <li
          className={`hover:text-primary  cursor-pointer ${
            path == "/" && "text-blue-700 font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary  cursor-pointer ${
            path == "/questions" && "text-blue-700 font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary  cursor-pointer ${
            path == "/upgrade" && "text-blue-700 font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary  cursor-pointer ${
            path == "/works" && "text-blue-700 font-bold"
          }`}
        >
          How it Works ?
        </li>
      </ul>
      <div className="p-3 flex items-center">
        <SignedOut>
          <div className="mx-3">
            <SignInButton />
          </div>
          <div className="">
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
