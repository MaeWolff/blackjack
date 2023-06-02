import { describe, it, expect } from "vitest";

import deck from "./deck-of-cards";
import { drawRandomCardIndex } from "./utils";

describe(drawRandomCardIndex.name, () => {
  it("returns a valid card index from the deck", () => {
    const index = drawRandomCardIndex(deck);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(deck.length);
  });
});
