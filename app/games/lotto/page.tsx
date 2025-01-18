"use client";

import { useState } from "react";
import { Ticket } from "lucide-react";

const LottoGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const startGame = () => {
    if (selectedNumbers.length === 6) {
      const drawn:any = [];
      while (drawn.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1;
        if (!drawn.includes(num)) {
          drawn.push(num);
        }
      }
      setDrawnNumbers(drawn);
      setIsGameStarted(true);
    }
  };

  const getMatchCount = () => {
    return selectedNumbers.filter((num) => drawnNumbers.includes(num)).length;
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-100">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Ticket className="mr-2" /> Lotto
        </h1>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 49 }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => !isGameStarted && toggleNumber(number)}
              className={`aspect-square flex items-center justify-center text-lg font-bold rounded-lg ${
                selectedNumbers.includes(number)
                  ? "bg-indigo-500 text-white"
                  : drawnNumbers.includes(number)
                  ? "bg-green-500 text-white"
                  : "bg-white text-indigo-800"
              }`}
              disabled={isGameStarted}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={startGame}
          className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold text-lg mb-4"
          disabled={selectedNumbers.length !== 6 || isGameStarted}
        >
          {isGameStarted ? "Game In Progress" : "Start Game"}
        </button>

        {isGameStarted && (
          <div className="text-center">
            <p className="text-xl font-bold mb-2 text-indigo-800">
              Drawn Numbers:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {drawnNumbers.map((number) => (
                <span
                  key={number}
                  className="bg-green-500 text-white px-3 py-2 rounded-full text-lg font-bold"
                >
                  {number}
                </span>
              ))}
            </div>
            <p className="text-lg font-semibold text-indigo-800">
              You matched {getMatchCount()} number
              {getMatchCount() !== 1 ? "s" : ""}!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LottoGame;
