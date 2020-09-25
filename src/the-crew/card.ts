import { assertUnreachable, generateId, range } from "../utils";

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

export const getSequentialNum = (card: Card): number => {
  switch (card.type) {
    case "rocket":
      return card.num - 1;
    case "blue":
      return 4 + card.num - 1;
    case "green":
      return 4 + 9 + card.num - 1;
    case "red":
      return 4 + 9 + 9 + card.num - 1;
    case "yellow":
      return 4 + 9 + 9 + 9 + card.num - 1;
  }
  assertUnreachable(card.type);
};
