"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const AviatorGame = () => {
  const [multiplier, setMultiplier] = useState(1);
  const [isFlying, setIsFlying] = useState(false);
  const [bet, setBet] = useState(10);
  const [cashOut, setCashOut] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFlying) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          if (Math.random() < 0.01) {
            setIsFlying(false);
            return prev;
          }
          return prev + 0.01;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isFlying]);

  const startFlight = () => {
    setIsFlying(true);
    setMultiplier(1);
    setCashOut(0);
  };

  const handleCashOut = () => {
    if (isFlying) {
      setCashOut(bet * multiplier);
      setIsFlying(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-red-100">
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Zap className="mr-2" /> Aviator
        </h1>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold mb-8 text-red-800">
          {isFlying ? multiplier.toFixed(2) + "x" : "Ready"}
        </div>

        <div className="w-full max-w-xs mb-4">
          <label className="block text-sm font-medium text-red-700 mb-1">
            Bet Amount
          </label>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md text-red-800"
            disabled={isFlying}
          />
        </div>

        <button
          onClick={isFlying ? handleCashOut : startFlight}
          className={`w-full max-w-xs py-3 rounded-full font-semibold text-lg mb-4 ${
            isFlying ? "bg-green-500 text-white" : "bg-red-600 text-white"
          }`}
        >
          {isFlying ? "Cash Out" : "Start Flight"}
        </button>

        {cashOut > 0 && (
          <div className="text-2xl font-bold text-green-600">
            You won: ${cashOut.toFixed(2)}
          </div>
        )}
      </main>
    </div>
  );
};

export default AviatorGame;
