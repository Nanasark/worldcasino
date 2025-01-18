"use client";

import { useState } from "react";
import { Ticket, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Raffles = () => {
  const [expandedRaffle, setExpandedRaffle] = useState<number | null>(null);
  const raffles = [
    {
      id: 1,
      name: "Weekend Getaway",
      tickets: 100,
      timeLeft: "2d 5h",
      price: "$5",
    },
    {
      id: 2,
      name: "Gaming Console",
      tickets: 50,
      timeLeft: "1d 12h",
      price: "$10",
    },
    {
      id: 3,
      name: "Cash Prize $1000",
      tickets: 200,
      timeLeft: "3d 8h",
      price: "$20",
    },
  ];

  const toggleRaffle = (id: number) => {
    setExpandedRaffle(expandedRaffle === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-blue-500">Raffles</h1>
      </header>

      <main className="flex-grow p-4">
        <ul className="space-y-4">
          {raffles.map((raffle) => (
            <li
              key={raffle.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full text-left p-4 flex items-center justify-between"
                onClick={() => toggleRaffle(raffle.id)}
              >
                <span className="font-semibold">{raffle.name}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    expandedRaffle === raffle.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedRaffle === raffle.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t">
                      <div className="flex items-center mb-2 text-blue-600">
                        <Ticket size={18} className="mr-2 text-blue-500" />
                        <span>{raffle.tickets} tickets left</span>
                      </div>
                      <div className="flex items-center mb-4 text-green-600">
                        <Clock size={18} className="mr-2 text-green-500" />
                        <span>{raffle.timeLeft} remaining</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{raffle.price}/ticket</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                          Buy Ticket
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Raffles;
