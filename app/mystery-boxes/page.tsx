"use client";

import { useState } from "react";
import { Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MysteryBoxes = () => {
  const [currentBox, setCurrentBox] = useState(0);
  const boxes = [
    { id: 1, name: "Bronze Box", price: "$5", color: "bg-yellow-700" },
    { id: 2, name: "Silver Box", price: "$10", color: "bg-gray-400" },
    { id: 3, name: "Gold Box", price: "$20", color: "bg-yellow-400" },
  ];

  const nextBox = () => {
    setCurrentBox((prev) => (prev + 1) % boxes.length);
  };

  const prevBox = () => {
    setCurrentBox((prev) => (prev - 1 + boxes.length) % boxes.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Mystery Boxes</h1>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-sm">
          <button
            onClick={prevBox}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextBox}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <ChevronRight size={24} />
          </button>
          <motion.div
            key={currentBox}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`${boxes[currentBox].color} rounded-lg shadow-lg p-6 text-center`}
          >
            <Gift size={48} className="mx-auto mb-4 text-white" />
            <h2 className="text-xl font-semibold mb-2 text-white">
              {boxes[currentBox].name}
            </h2>
            <p className="text-white mb-4">{boxes[currentBox].price}</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
              Open Box
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MysteryBoxes;
