export type GameStatus = "initial" | "started" | "dealerTurn" | "finished";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Value = "A" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "K" | "Q";

export interface Card {
  suit: Suit;
  value: Value;
}
