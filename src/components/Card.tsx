import type { Card } from "@/entities/types";
import { MAP_SUIT_TO_SYMBOL } from "@/entities/utils";
import React from "react";

export default function Card({ suit, value }: Card) {
  return (
    <div className="flex h-28 w-20 flex-col justify-between rounded-md bg-white p-2">
      <p className="font-bold">{value}</p>
      <p className="text-2xl">{MAP_SUIT_TO_SYMBOL[suit]}</p>
    </div>
  );
}

export function InitialCard() {
  return (
    <div className="flex h-28 w-20 flex-col justify-between rounded-md bg-red-200 p-2"></div>
  );
}
