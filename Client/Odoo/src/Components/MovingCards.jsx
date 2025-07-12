import React from "react";
import { InfiniteMovingCards } from "../reuseableComponents/InfiniteCard";
import { motion } from "framer-motion";

export function MovingCards() {
  return (
    <>
      {/* Divider line */}
      <div className="w-full h-[1px] bg-gray-600" />

      {/* Section container */}
      <div className="h-[40rem] flex flex-col items-center justify-center bg-white dark:bg-black dark:bg-grid-white/[0.05] relative overflow-hidden px-4">
        
        {/* Headline + Subheading with scroll animation */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-8xl font-bold text-zinc-800 dark:text-white">
            Explore the SkillSwap Universe
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Real-time insights into skill exchange trends, active users, and collaborative learning in action.
          </p>
        </motion.div>

        {/* Infinite Card Slider with animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <InfiniteMovingCards
            items={swapHighlights}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </div>
    </>
  );
}

// ✨ Highlight cards
const swapHighlights = [
  {
    quote: "🎨 Graphic Design ↔ Web Development",
    name: "Emily & Ravi",
    title: "Swapped creativity for code!",
  },
  {
    quote: "🧮 Excel Mastery ↔ Digital Marketing",
    name: "Aarav & Chloe",
    title: "Built dashboards & campaign funnels",
  },
  {
    quote: "📝 Copywriting ↔ UI/UX Design",
    name: "Sara & Leo",
    title: "Words met wireframes",
  },
  {
    quote: "🎤 Public Speaking ↔ Python Basics",
    name: "Maya & Arjun",
    title: "Confidence meets code",
  },
  {
    quote: "🎹 Piano Lessons ↔ French Language",
    name: "Olivia & Mathieu",
    title: "Melodies and accents swapped",
  },
  {
    quote: "📸 Photography ↔ Video Editing",
    name: "Nikhil & Zoe",
    title: "Captured and cut like pros",
  },
];