import { ContainerTextFlip } from "../reuseableComponents/TextFlip";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import React from "react";

const MainText = () => {
  const words = ["collaboration", "skill exchange", "community", "learning"];

  return (
    <div className="space-y-3">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        layout
        className={cn(
          "relative max-w-6xl text-center sm:text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-snug tracking-tight text-zinc-700 dark:text-zinc-100"
        )}
      >
        <div className="inline-block">
          Empower your growth through <ContainerTextFlip words={words} />
        </div>
      </motion.h1>

      {/* Subtext Quote (No box, placed closer) */}
      <p className="text-center sm:text-left text-gray-600 dark:text-gray-400 italic text-bold sm:text-lg">
        “Alone we can do so little; together we can do so much.” — Helen Keller
      </p>
    </div>
  );
};

export default MainText;