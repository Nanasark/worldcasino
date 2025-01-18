"use client";

import { useState } from "react";
import { Coins } from "lucide-react";

const SlotMachine = () => {
  const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎"];
  const [reels, setReels] = useState(["?", "?", "?"]);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(1);

  const spin = () => {
    if (balance >= bet) {
      const newReels = reels.map(
        () => symbols[Math.floor(Math.random() * symbols.length)]
      );
      setReels(newReels);
      setBalance(balance - bet);

      // Check for win
      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        const winAmount = bet * 10;
        setBalance(balance + winAmount);
        alert(`You won $${winAmount}!`);
      }
    } else {
      alert("Insufficient balance!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-100">
      <header className="bg-yellow-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Coins className="mr-2" /> Slots
        </h1>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="text-6xl mb-8 bg-white p-4 rounded-lg shadow-lg">
          {reels.join(" ")}
        </div>

        <div className="mb-4">
          <p className="text-xl font-bold text-yellow-800">
            Balance: ${balance}
          </p>
        </div>

        <div className="w-full max-w-xs mb-4">
          <label className="block text-sm font-medium text-yellow-700 mb-1">
            Bet Amount
          </label>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md text-yellow-800"
            min="1"
            max={balance}
          />
        </div>

        <button
          onClick={spin}
          className="w-full max-w-xs bg-yellow-600 text-white py-3 rounded-full font-semibold text-lg"
        >
          Spin
        </button>
      </main>
    </div>
  );
};

export default SlotMachine;
