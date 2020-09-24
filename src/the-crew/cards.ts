import { range } from "../utils";

export type Card = {
  type: "red" | "green" | "yellow" | "blue" | "rocket";
  num: number;
};

export const allCards: Card[] = ([
  "red",
  "green",
  "yellow",
  "blue",
] as Card["type"][])
  .flatMap((type) =>
    range(9, 1).map((num) => ({
      type,
      num,
    }))
  )
  .concat(
    range(4, 1).map((num) => ({
      type: "rocket" as const,
      num,
    }))
  );
