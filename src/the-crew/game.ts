import { allCards, Card, missionCards, rocket4Card } from "./card";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assertUnreachable, shuffle } from "../utils";

export type PlayerNames = "player" | "dewey" | "huey" | "louie";

export type GameState = {
  phase:
    | "notStarted"
    | "swappingCommander"
    | "pickupMissionCards"
    | "started"
    | "end";
  tricks: number;
  selectingCard?: Card;
  selectingMissionCard?: Card;
  nonPickedMissionCards: Card[];
  commander: PlayerNames;
  leadPlayer: PlayerNames;
  turnPlayer: PlayerNames;
  playingCards: {
    player?: Card;
    dewey?: Card;
    huey?: Card;
    louie?: Card;
  };
  player: {
    hands: Card[];
    missionCards: Card[];
    numRadioCommunicationTokens: number;
  };
  dewey: {
    hands: Card[];
    missionCards: Card[];
    radioCommunicatedCards: Card[];
  };
  huey: {
    hands: Card[];
    missionCards: Card[];
    radioCommunicatedCards: Card[];
  };
  louie: {
    hands: Card[];
    missionCards: Card[];
    radioCommunicatedCards: Card[];
  };
};

const initialState: GameState = {
  phase: "notStarted",
  tricks: 0,
  nonPickedMissionCards: [],
  commander: "player",
  leadPlayer: "player",
  turnPlayer: "player",
  playingCards: {},
  player: {
    hands: [],
    missionCards: [],
    numRadioCommunicationTokens: 0,
  },
  dewey: {
    hands: [],
    missionCards: [],
    radioCommunicatedCards: [],
  },
  huey: {
    hands: [],
    missionCards: [],
    radioCommunicatedCards: [],
  },
  louie: {
    hands: [],
    missionCards: [],
    radioCommunicatedCards: [],
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState as GameState,
  reducers: {
    setup: (state) => {
      if (state.phase !== "notStarted") {
        throw new Error("game was already started");
      }

      const decks = shuffle(allCards);
      state.phase = "swappingCommander";
      state.nonPickedMissionCards = shuffle(missionCards).slice(0, 5); // TODO: Implement mission
      state.player.hands = decks.slice(0, 10);
      state.player.numRadioCommunicationTokens = 5;
      state.dewey.hands = decks.slice(10, 20);
      state.huey.hands = decks.slice(20, 30);
      state.louie.hands = decks.slice(30, 40);

      const commanderCardIndex = decks.findIndex(
        (c) => c.id === rocket4Card.id
      );
      state.commander = (["player", "dewey", "huey", "louie"] as const)[
        Math.floor(commanderCardIndex / 10)
      ];
      state.leadPlayer = state.commander;
      state.turnPlayer = state.commander;
    },

    swapCommander: (state) => {
      if (state.commander === "player")
        throw new Error(
          "can't swap commander because player already been commander"
        );
      if (state.selectingCard == null)
        throw new Error("Swapping card not selected");

      const index = state[state.commander].hands.findIndex(
        (c) => c.id === rocket4Card.id
      );
      state[state.commander].hands.splice(index, 1, state.selectingCard);
      state.player.hands.push(rocket4Card);
      state.player.hands = state.player.hands.filter(
        (c) => c.id !== state.selectingCard.id
      );

      state.commander = "player";
      state.leadPlayer = "player";
      state.turnPlayer = "player";

      state.phase = "pickupMissionCards";
    },

    skipSwappingCommander: (state) => {
      state.phase = "pickupMissionCards";
    },

    pickupMissionCards: (
      state,
      action: PayloadAction<{ pickingMissionCard: Card }>
    ) => {
      if (state.phase !== "pickupMissionCards")
        throw new Error(`Invalid phase of pickupMissionCards: ${state.phase}`);

      state[state.turnPlayer].missionCards.push(
        action.payload.pickingMissionCard
      );
      state.turnPlayer = nextTurnPlayer(state);

      if (state.nonPickedMissionCards.length === 0) {
        state.turnPlayer = state.leadPlayer;
        state.phase = "started";
        state.tricks = 1;
      }
    },

    playCard: (state, action: PayloadAction<{ playingCard: Card }>) => {
      state.playingCards[state.turnPlayer] = action.payload.playingCard;
      const index = state[state.turnPlayer].hands.findIndex(
        (c) => c.id === action.payload.playingCard.id
      );
      state[state.turnPlayer].hands.splice(index, 1);

      if (Object.keys(state.playingCards).length === 4) {
        // check winner and setup next trick
        const rocketCards = (Object.entries(state.playingCards) as [
          PlayerNames,
          Card
        ][]).filter(([_, card]) => card.type === "rocket");
        if (rocketCards.length !== 0) {
          const [winner] = findMaxBy(rocketCards, ([_, c]) => c.num);
          state.leadPlayer = winner;
          state.turnPlayer = winner;
          state.tricks += 1;
          // TODO
        } else {
          const leadCard = state.playingCards[state.leadPlayer];
          // TODO
        }
      } else {
        state.turnPlayer = nextTurnPlayer(state);
      }
    },

    selectCard: (state, action: PayloadAction<{ card?: Card }>) => {
      state.selectingCard = action.payload.card;
    },

    selectMissionCard: (state, action: PayloadAction<{ card?: Card }>) => {
      state.selectingMissionCard = action.payload.card;
    },
  },
});

const nextTurnPlayer = (state: GameState): PlayerNames => {
  switch (state.turnPlayer) {
    case "player":
      return "dewey";
    case "dewey":
      return "huey";
    case "huey":
      return "louie";
    case "louie":
      return "player";
  }
  assertUnreachable(state.turnPlayer);
};

const findMaxBy = <T>(items: T[], maxBy: (item: T) => number): T => {
  if (items.length === 0) throw new Error("Expect non-empty-list");

  let maxItem = items[0];
  for (const item of items.slice(1)) {
    if (maxBy(item) > maxBy(maxItem)) {
      maxItem = item;
    }
  }

  return maxItem;
};
