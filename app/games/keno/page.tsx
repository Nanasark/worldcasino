"use client";

import { useState } from "react";
import { Target } from "lucide-react";

const KenoGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 10) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const startGame = () => {
    if (selectedNumbers.length === 10) {
      const drawn:any = [];
      while (drawn.length < 20) {
        const num = Math.floor(Math.random() * 80) + 1;
        if (!drawn.includes(num)) {
          drawn.push(num);
        }
      }
      setDrawnNumbers(drawn);
      setIsGameStarted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Target className="mr-2" /> Keno
        </h1>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-8 gap-2 mb-4">
          {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => !isGameStarted && toggleNumber(number)}
              className={`aspect-square flex items-center justify-center text-lg font-bold rounded-lg ${
                selectedNumbers.includes(number)
                  ? "bg-green-500 text-white"
                  : drawnNumbers.includes(number)
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-green-800"
              }`}
              disabled={isGameStarted}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={startGame}
          className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg mb-4"
          disabled={selectedNumbers.length !== 10 || isGameStarted}
        >
          {isGameStarted ? "Game In Progress" : "Start Game"}
        </button>

        {isGameStarted && (
          <div className="text-center">
            <p className="text-xl font-bold mb-2 text-green-800">
              Drawn Numbers:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {drawnNumbers.map((number) => (
                <span
                  key={number}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-full"
                >
                  {number}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KenoGame;
