"use client";

import { useState, useEffect } from "react";
import { Crosshair } from "lucide-react";

const CrashGame = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bet, setBet] = useState(10);
  const [cashOut, setCashOut] = useState(0);
  const [gameHistory, setGameHistory] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          if (Math.random() < 0.01) {
            setIsPlaying(false);
            setGameHistory((history) => [prev, ...history].slice(0, 10));
            return 1;
          }
          return prev * 1.01;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setMultiplier(1);
    setCashOut(0);
  };

  const handleCashOut = () => {
    if (isPlaying) {
      setCashOut(bet * multiplier);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-pink-100">
      <header className="bg-pink-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Crosshair className="mr-2" /> Crash
        </h1>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold mb-8 text-pink-800">
          {isPlaying ? multiplier.toFixed(2) + "x" : "Ready"}
        </div>

        <div className="w-full max-w-xs mb-4">
          <label className="block text-sm font-medium text-pink-700 mb-1">
            Bet Amount
          </label>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md text-pink-800"
            disabled={isPlaying}
          />
        </div>

        <button
          onClick={isPlaying ? handleCashOut : startGame}
          className={`w-full max-w-xs py-3 rounded-full font-semibold text-lg mb-4 ${
            isPlaying ? "bg-green-500 text-white" : "bg-pink-600 text-white"
          }`}
        >
          {isPlaying ? "Cash Out" : "Start Game"}
        </button>

        {cashOut > 0 && (
          <div className="text-2xl font-bold text-green-600 mb-4">
            You won: ${cashOut.toFixed(2)}
          </div>
        )}

        <div className="w-full max-w-xs">
          <h2 className="text-xl font-bold mb-2 text-pink-800">Game History</h2>
          <div className="flex flex-wrap gap-2">
            {gameHistory.map((result, index) => (
              <div
                key={index}
                className="bg-white px-2 py-1 rounded shadow text-sm text-pink-800"
              >
                {result.toFixed(2)}x
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CrashGame;
