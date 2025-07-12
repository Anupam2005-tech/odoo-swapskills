import { ContainerTextFlip } from "../reuseableComponents/TextFlip";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import React from "react";

const MainText = () => {
  const words = ["better", "modern", "beautiful", "awesome"];

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      layout
      className={cn(
        "relative max-w-4xl text-center sm:text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight sm:leading-snug tracking-tight text-zinc-700 dark:text-zinc-100"
      )}
    >
      <div className="inline-block">
        Make your websites look 10x <ContainerTextFlip words={words} />
      </div>
    </motion.h1>
  );
};

export default MainText;