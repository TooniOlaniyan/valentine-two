"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ValentinePrompt from "@/component/ValentinePromt";

const ValentineEnvelopeContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [storedName, setStoredName] = useState("");

  useEffect(() => {
    if (name) {
      localStorage.setItem("userName", name);
      setStoredName(name);
    }
  }, [name]);

  return <ValentineEnvelope storedName={storedName} />;
};

// Wrap in Suspense
const ValentineEnvelopeWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ValentineEnvelopeContent />
    </Suspense>
  );
};

// Pass storedName as a prop to avoid useSearchParams inside ValentineEnvelope
const ValentineEnvelope = ({ storedName }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-red-200">
      <motion.div
        className="relative w-[30rem] h-[20rem] cursor-pointer"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#ef4444] shadow-2xl rounded-xl z-10"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? -180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-4 border-4 border-red-300 rounded-xl flex items-center justify-start px-5">
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm text-gray-500">From:</p>
              <p className="text-lg font-bold text-black">Secret Admirer</p>
              <p className="text-sm text-gray-500 mt-2">To:</p>
              <h1 className="text-3xl font-extrabold text-white">
                {storedName || "You"}
              </h1>
            </div>
            <motion.p
              className="text-sm font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
                type: "spring",
                stiffness: 500,
                damping: 10,
                ease: "ease-in-out",
              }}
            >
              Click to Open
            </motion.p>
          </div>
        </motion.div>

        {/* Envelope Flaps */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? -180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#dc2625]/60 origin-bottom shadow-lg"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            }}
          />
        </motion.div>

        {/* Love Letter Content */}
        <AnimatePresence>
          {isOpen && !showPrompt && (
            <motion.div
              className="absolute inset-6 bg-white z-30 p-10 overflow-y-scroll"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                My Dearest {storedName},
              </h2>
              <p className="text-gray-700">
                I'm so glad to have you in my life. Our time together is always
                special, and I appreciate the strong bond we've formed.
              </p>
              <p className="text-gray-700 mt-4">
                Forever Yours,
                <br />
                <span className="font-bold">Your Secret Admirer</span>
              </p>

              <button
                className="mt-4 px-6 py-2 bg-[#ef4444] text-white font-bold rounded-lg shadow-md hover:bg-[#ef4444]/50 transition"
                onClick={() => setShowPrompt(true)}
              >
                Continue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{showPrompt && <ValentinePrompt />}</AnimatePresence>
    </div>
  );
};

export default ValentineEnvelopeWrapper;
