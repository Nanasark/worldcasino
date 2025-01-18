"use client";

import { useState } from "react";
import {
  Dice1Icon as Dice,
  Target,
  Zap,
  WalletCardsIcon as Cards,
  Coins,
  Crosshair,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const games = [
    { id: 1, name: "Bingo", icon: Dice, color: "bg-purple-500" },
    { id: 2, name: "Keno", icon: Target, color: "bg-green-500" },
    { id: 3, name: "Aviator", icon: Zap, color: "bg-red-500" },
    { id: 4, name: "Blackjack", icon: Cards, color: "bg-blue-500" },
    { id: 5, name: "Slots", icon: Coins, color: "bg-yellow-500" },
    { id: 6, name: "Crash", icon: Crosshair, color: "bg-pink-500" },
    { id: 7, name: "Lotto", icon: Ticket, color: "bg-indigo-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Games</h1>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileTap={{ scale: 0.95 }}
              onTap={() => setSelectedGame(game.id)}
            >
              <Link href={`/games/${game.name.toLowerCase()}`}>
                <div
                  className={`${game.color} rounded-lg shadow-md p-6 text-white text-center cursor-pointer`}
                >
                  <game.icon size={48} className="mx-auto mb-4" />
                  <h2 className="text-xl font-semibold">{game.name}</h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {selectedGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedGame(null)}
        >
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {games.find((g) => g.id === selectedGame)?.name}
            </h3>
            <p className="mb-4 text-gray-600">Are you ready to play?</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add logic to start the game
                }}
              >
                Start Game
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Games;
