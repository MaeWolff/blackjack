import { describe, it, expect } from "vitest";

import deck from "./deck-of-cards";
import {
  ResultMessage,
  calculateWinner,
  drawRandomCardIndex,
  updateDeck,
} from "./utils";
import { Card } from "./types";

describe(drawRandomCardIndex.name, () => {
  it("returns a valid card index from the deck", () => {
    const index = drawRandomCardIndex(deck);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(deck.length);
  });
});

describe(updateDeck.name, () => {
  it("removes a single card from the deck", () => {
    const deck: Card[] = [
      { value: "A", suit: "clubs" },
      { value: 2, suit: "diamonds" },
      { value: 3, suit: "hearts" },
      { value: 4, suit: "spades" },
    ];
    const cardIndex = 2;

    const newDeck = updateDeck(deck, cardIndex);

    expect(newDeck).toEqual([
      { value: "A", suit: "clubs" },
      { value: 2, suit: "diamonds" },
      { value: 4, suit: "spades" },
    ]);
  });

  it("removes multiple cards from the deck", () => {
    const deck: Card[] = [
      { value: "A", suit: "clubs" },
      { value: 2, suit: "diamonds" },
      { value: 3, suit: "hearts" },
      { value: 4, suit: "spades" },
    ];
    const cardIndex = [1, 3];

    const newDeck = updateDeck(deck, cardIndex);

    expect(newDeck).toEqual([
      { value: "A", suit: "clubs" },
      { value: 3, suit: "hearts" },
    ]);
  });
});

describe(calculateWinner.name, () => {
  it("returns 'You Win!' when dealerScore is greather than 21 and myScore is 21 or less", () => {
    const dealerScore = 22;
    const myScore = 20;

    const result = calculateWinner(dealerScore, myScore);
    expect(result).toBe(ResultMessage.win);
  });

  it("returns 'You lose' when myScore is greather than 21 and dealerScore is 21 or less.", () => {
    const dealerScore = 18;
    const myScore = 25;

    const result = calculateWinner(dealerScore, myScore);
    expect(result).toBe(ResultMessage.lose);
  });

  it("returns 'Push' when myScore is equal to dealerScore", () => {
    const dealerScore = 19;
    const myScore = 19;

    const result = calculateWinner(dealerScore, myScore);
    expect(result).toBe(ResultMessage.equality);
  });

  it("returns 'You lose' when dealerScore is greather than myScore and dealerScore is less than or equal to 21", () => {
    const dealerScore = 20;
    const myScore = 18;

    const result = calculateWinner(dealerScore, myScore);
    expect(result).toBe(ResultMessage.lose);
  });

  it("returns 'You Win!' when myScore is greather than dealerScore and myScore is less than or equal to 21.", () => {
    const dealerScore = 17;
    const myScore = 21;

    const result = calculateWinner(dealerScore, myScore);
    expect(result).toBe(ResultMessage.win);
  });

  it("returns 'Invalid scores' if the scores are not valid", () => {
    const dealerScore = 43;
    const myScore = 50;

    const result = calculateWinner(dealerScore, myScore);
    expect(result).toBe("Invalid scores");
  });
});
