"use client";

import { useState, useEffect } from "react";
import { Dice1Icon as Dice } from "lucide-react";

const BingoGame = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  useEffect(() => {
    const newNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
    setNumbers(newNumbers.sort(() => Math.random() - 0.5));
  }, []);

  const drawNumber = () => {
    if (selectedNumbers.length < 25) {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 25) + 1;
      } while (selectedNumbers.includes(newNumber));
      setCurrentNumber(newNumber);
      setSelectedNumbers([...selectedNumbers, newNumber]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-purple-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Dice className="mr-2" /> Bingo
        </h1>
      </header>

      <main className="flex-grow p-4">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {numbers.map((number, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg ${
                selectedNumbers.includes(number)
                  ? "bg-purple-500 text-white"
                  : "bg-white text-purple-800"
              }`}
            >
              {number}
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          <p className="text-xl font-bold text-purple-800">Current Number:</p>
          <div className="text-4xl font-bold text-purple-600">
            {currentNumber || "-"}
          </div>
        </div>

        <button
          onClick={drawNumber}
          className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold text-lg"
          disabled={selectedNumbers.length === 25}
        >
          Draw Number
        </button>
      </main>
    </div>
  );
};

export default BingoGame;
