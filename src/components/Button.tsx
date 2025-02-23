"use client";

import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-10 w-32 md:w-36 h-12 cursor-pointer rounded-full text-lg font-bold text-textcolor bg-gradient-to-r from-primary via-accent to-secondary bg-[length:400%] transition-all duration-300 ease-in-out hover:animate-gradient-xy hover:bg-[length:100%] active:bg-primary focus:ring-2 focus:ring-secondary before:absolute before:-top-1 before:-bottom-1 before:-left-1 before:-right-1 before:-z-10 before:rounded-[35px] before:bg-gradient-to-r before:from-primary before:via-secondary before:to-primary before:bg-[length:400%] before:transition-all before:duration-1000 before:ease-in-out before:hover:blur-xl before:hover:bg-[length:100%]"
    >
      {children}
    </button>
  );
}
