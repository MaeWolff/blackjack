"use client";
import Card, { InitialCard } from "@/components/Card";
import deck from "@/entities/deck-of-cards";
import type { Card as CardType } from "@/entities/types";
import {
  MAP_VALUE_TO_SCORE,
  calculateWinner,
  drawRandomCardIndex,
  updateDeck,
} from "@/entities/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Home() {
  // GAME
  const [currentDeck, setCurrentDeck] = useState(deck);
  const [gameState, setGameState] = useState<
    "initial" | "started" | "dealerTurn" | "finished"
  >("initial");

  // DEALER
  const [dealerDeck, setDealerDeck] = useState<[] | CardType[]>([]);
  const [dealerScore, setDealerScore] = useState<number>(0);

  // PLAYER
  const [myDeck, setMyDeck] = useState<[] | CardType[]>([]);
  const [myScore, setMyScore] = useState<number>(0);

  function handlePlayGame() {
    const dealerCardIndex = drawRandomCardIndex();
    const myCardIndex1 = drawRandomCardIndex();
    const myCardIndex2 = drawRandomCardIndex();

    setDealerDeck((oldCards) => [...oldCards, currentDeck[dealerCardIndex]]);
    setMyDeck((oldCards) => [
      ...oldCards,
      currentDeck[myCardIndex1],
      currentDeck[myCardIndex2],
    ]);

    const newDeck = updateDeck(currentDeck, [
      dealerCardIndex,
      myCardIndex1,
      myCardIndex2,
    ]);
    setCurrentDeck(newDeck);

    if (myScore >= 21) setGameState("finished");
    setGameState("started");
  }

  function handleHit() {
    if (myScore >= 21) setGameState("finished");
    const randomCardIndex = drawRandomCardIndex();

    setMyDeck((oldCards) => [...oldCards, currentDeck[randomCardIndex]]);

    const newDeck = updateDeck(currentDeck, randomCardIndex);
    setCurrentDeck(newDeck);
  }

  function handleStand() {
    setGameState("dealerTurn");
  }

  function handlePlayAgain() {
    setDealerDeck([]);
    setMyDeck([]);
    setDealerScore(0);
    setMyScore(0);
    setGameState("initial");
    setCurrentDeck(deck);
  }

  useEffect(() => {
    let newDealerScore = 0;
    dealerDeck.forEach((card) => {
      if (card.value) {
        newDealerScore += MAP_VALUE_TO_SCORE[card.value];
      }
    });
    setDealerScore(newDealerScore);
  }, [dealerDeck]);

  useEffect(() => {
    let newMyScore = 0;
    myDeck.forEach((card) => {
      if (card.value) {
        newMyScore += MAP_VALUE_TO_SCORE[card.value];
      }
    });
    setMyScore(newMyScore);
  }, [myDeck]);

  useEffect(() => {
    if (dealerScore < 17 && gameState === "dealerTurn") {
      const randomCardIndex = drawRandomCardIndex();
      const newCard = currentDeck[randomCardIndex];

      setDealerDeck((oldCards) => [...oldCards, newCard]);

      const newDeck = updateDeck(currentDeck, randomCardIndex);
      setCurrentDeck(newDeck);

      setDealerScore(
        (prevScore) => prevScore + MAP_VALUE_TO_SCORE[newCard.value]
      );
    }

    if (dealerScore >= 17) return setGameState("finished");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerScore, gameState]);

  return (
    <main className="flex w-full flex-col items-center gap-16 p-8">
      <div className="flex min-h-[200px] w-full max-w-[600px] flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-500">Dealer ({dealerScore})</p>
          <div className="flex flex-row gap-2">
            {gameState === "initial" && <InitialCard />}

            {dealerDeck.map((card, i) => (
              <Card key={i} {...card} />
            ))}
            {dealerDeck.length === 1 && <InitialCard />}
          </div>
        </div>

        <div
          className={clsx(
            "w-fit rounded-md bg-[#FED3C0] px-4 py-2 font-bold text-red-500",
            { ["bg-transparent text-transparent"]: gameState !== "finished" }
          )}
        >
          {calculateWinner(dealerScore, myScore)}
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-red-500">You ({myScore})</p>
          <div className="flex flex-row gap-2">
            {gameState === "initial" && <InitialCard />}

            {myDeck.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </div>
        </div>
      </div>

      {gameState === "initial" && (
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={handlePlayGame}
        >
          Play
        </button>
      )}

      {gameState === "started" && (
        <div className="flex flex-row gap-2">
          <button
            className="rounded-md bg-red-500/60 px-4 py-2 text-white"
            onClick={handleStand}
          >
            Stand
          </button>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white"
            onClick={handleHit}
          >
            Hit
          </button>
        </div>
      )}

      {gameState === "finished" && (
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={handlePlayAgain}
        >
          Play again :)
        </button>
      )}
    </main>
  );
}
