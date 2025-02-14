"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti-boom";

const ValentinePrompt = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const moveNoButton = () => {
    const randomX = Math.random() * 300 - 100;
    const randomY = Math.random() * 300 - 100;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleAccept = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000); // Hide confetti after 4s
  };

  return (
    <motion.div
      className="absolute inset-6 bg-white z-30 p-6 flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && (
        <div className="w-full z-50  pointer-events-none h-full">
          <Confetti
            mode="boom"
            particleCount={1000}
            colors={["#ff577f", "#ff884b"]}
            x={0.5}
          />
        </div>
      )}

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        {showConfetti
          ? "YAYYYYYYYYYYYYYYYYYYYYYYYY, I LOVE YOU"
          : "Will you be my Valentine? ❤️"}
      </h2>

      <div className="flex gap-10 mt-4">
        {/* YES Button */}
        <button
          style={{ backgroundColor: '#A4B465' }}
          className="px-6 py-2 text-white font-bold rounded-lg shadow-md hover:bg-[#A4B465]/50 transition"
          onClick={handleAccept}
        >
          Yes
        </button>

        {/* NO Button (Moves when hovered/clicked) */}
        <motion.button
          className="px-6 py-2 text-white font-bold rounded-lg shadow-md hover:bg-[#D91656]/50 transition"
          style={{ backgroundColor: '#D91656' }}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          animate={{ x: noButtonPos.x, y: noButtonPos.y }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          No
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ValentinePrompt;
