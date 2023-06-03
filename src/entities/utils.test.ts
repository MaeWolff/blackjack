import { describe, it, expect } from "vitest";

import deck from "./deck-of-cards";
import { drawRandomCardIndex, updateDeck } from "./utils";
import { Card } from "./types";

describe(drawRandomCardIndex.name, () => {
  it("returns a valid card index from the deck", () => {
    const index = drawRandomCardIndex(deck);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(deck.length);
  });
});

describe(updateDeck.name, () => {
  it("should remove a single card from the deck", () => {
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

  it("should remove multiple cards from the deck", () => {
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
