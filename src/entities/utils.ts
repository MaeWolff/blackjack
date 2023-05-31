import deck from "./deck-of-cards";
import type { Card, Suit, Value } from "./types";

const MAP_SUIT_TO_SYMBOL: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const MAP_VALUE_TO_SCORE: Record<Value, number> = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 10,
  Q: 10,
  K: 10,
};

function drawRandomCardIndex(): number {
  return Math.floor(Math.random() * deck.length);
}

function removeCardsFromDeck(deck: Card[], cardIndex: number | number[]) {
  if (typeof cardIndex === "number") return deck.splice(cardIndex, 1);
  return cardIndex.map((i) => deck.splice(i, 1));
}

function updateDeck(
  currentDeck: Card[],
  cardIndexToDelete: number | number[]
): Card[] {
  const newDeck = [...currentDeck];
  removeCardsFromDeck(newDeck, cardIndexToDelete);
  return newDeck;
}

enum ResultMessage {
  win = "You Win !",
  lose = "You lose",
  equality = "Push",
}

function calculateWinner(dealerScore: number, myScore: number) {
  if (dealerScore > 21 && myScore <= 21) {
    return ResultMessage.win;
  } else if (myScore > 21 && dealerScore <= 21) {
    return ResultMessage.lose;
  } else if (myScore === dealerScore) {
    return ResultMessage.equality;
  } else if (dealerScore > myScore && dealerScore <= 21) {
    return ResultMessage.lose;
  } else if (myScore > dealerScore && myScore <= 21) {
    return ResultMessage.win;
  } else {
    return "Invalid scores";
  }
}

export {
  MAP_SUIT_TO_SYMBOL,
  MAP_VALUE_TO_SCORE,
  drawRandomCardIndex,
  removeCardsFromDeck,
  updateDeck,
  calculateWinner,
};
