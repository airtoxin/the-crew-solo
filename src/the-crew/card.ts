import { generateId, range } from "../utils";

export type Card = {
  id: number;
  type: "red" | "green" | "yellow" | "blue" | "rocket";
  num: number;
};

export const missionCards: Card[] = ([
  "red",
  "green",
  "yellow",
  "blue",
] as Card["type"][]).flatMap((type) =>
  range(9, 1).map((num) => ({
    id: generateId(),
    type,
    num,
  }))
);

export const rocket4Card: Card = {
  id: generateId(),
  type: "rocket" as const,
  num: 4,
};

export const allCards: Card[] = missionCards
  .concat(
    range(3, 1).map((num) => ({
      id: generateId(),
      type: "rocket" as const,
      num,
    }))
  )
  .concat([rocket4Card]);
