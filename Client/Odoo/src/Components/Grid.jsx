import React from "react";
import { cn } from "../lib/utils";

export function GridBackground({ children }) {
  return (
    <div className="relative flex md:h-screen h-[80vh] w-full items-center justify-center bg-white dark:bg-black">
      {/* Grid lines */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:30px_30px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial gradient mask */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Center content */}
      <div className="absolute top-1/3 z-10 p-3 text-left sm:text-center w-full px-4">
        {children}
      </div>
    </div>
  );
}