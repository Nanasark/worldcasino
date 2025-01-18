"use client";

import { useState, useEffect } from "react";
import { WalletCardsIcon as Cards } from "lucide-react";

type Card = { suit: string; value: string };

const BlackjackGame = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<
    "betting" | "playing" | "finished"
  >("betting");
  const [bet, setBet] = useState(10);

  const createDeck = () => {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const newDeck = suits.flatMap((suit) =>
      values.map((value) => ({ suit, value }))
    );
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const dealCards = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck.pop()!, newDeck.pop()!]);
    setDealerHand([newDeck.pop()!, newDeck.pop()!]);
    setGameStatus("playing");
  };

  const hit = () => {
    if (gameStatus === "playing") {
      const newPlayerHand = [...playerHand, deck.pop()!];
      setPlayerHand(newPlayerHand);
      setDeck([...deck]);
      if (calculateHandValue(newPlayerHand) > 21) {
        setGameStatus("finished");
      }
    }
  };

  const stand = () => {
    if (gameStatus === "playing") {
      let newDealerHand = [...dealerHand];
      while (calculateHandValue(newDealerHand) < 17) {
        newDealerHand.push(deck.pop()!);
      }
      setDealerHand(newDealerHand);
      setDeck([...deck]);
      setGameStatus("finished");
    }
  };

  const calculateHandValue = (hand: Card[]) => {
    let value = 0;
    let aces = 0;
    for (let card of hand) {
      if (card.value === "A") {
        aces += 1;
      } else if (["K", "Q", "J", "10"].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    }
    for (let i = 0; i < aces; i++) {
      if (value + 11 <= 21) {
        value += 11;
      } else {
        value += 1;
      }
    }
    return value;
  };

  useEffect(() => {
    if (gameStatus === "finished") {
      const playerValue = calculateHandValue(playerHand);
      const dealerValue = calculateHandValue(dealerHand);
      if (playerValue > 21) {
        alert("You bust! Dealer wins.");
      } else if (dealerValue > 21) {
        alert("Dealer busts! You win!");
      } else if (playerValue > dealerValue) {
        alert("You win!");
      } else if (dealerValue > playerValue) {
        alert("Dealer wins.");
      } else {
        alert("It's a tie!");
      }
    }
  }, [gameStatus]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Cards className="mr-2" /> Blackjack
        </h1>
      </header>

      <main className="flex-grow p-4">
        {gameStatus === "betting" && (
          <div className="text-center">
            <input
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              className="w-full max-w-xs px-3 py-2 border rounded-md mb-4 text-blue-800"
            />
            <button
              onClick={dealCards}
              className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-full font-semibold text-lg"
            >
              Place Bet and Deal
            </button>
          </div>
        )}

        {gameStatus !== "betting" && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2 text-blue-800">
                Dealer&apos;s Hand
              </h2>
              <div className="flex space-x-2">
                {dealerHand.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white p-2 rounded shadow text-blue-800"
                  >
                    {gameStatus === "playing" && index === 0
                      ? "??"
                      : `${card.value}${card.suit}`}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2 text-blue-800">
                Your Hand
              </h2>
              <div className="flex space-x-2">
                {playerHand.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white p-2 rounded shadow text-blue-800"
                  >
                    {`${card.value}${card.suit}`}
                  </div>
                ))}
              </div>
            </div>

            {gameStatus === "playing" && (
              <div className="flex space-x-4">
                <button
                  onClick={hit}
                  className="flex-1 bg-green-500 text-white py-2 rounded-full font-semibold"
                >
                  Hit
                </button>
                <button
                  onClick={stand}
                  className="flex-1 bg-red-500 text-white py-2 rounded-full font-semibold"
                >
                  Stand
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default BlackjackGame;
