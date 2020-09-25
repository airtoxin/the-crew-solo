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

    pickupMissionCards: (state) => {
      if (state.phase !== "pickupMissionCards")
        throw new Error(`Invalid phase of pickupMissionCards: ${state.phase}`);
      if (state.selectingMissionCard == null)
        throw new Error(`Picking up mission card not selected`);

      state[state.turnPlayer].missionCards.push(state.selectingMissionCard);
      state.turnPlayer = nextTurnPlayer(state);
      state.nonPickedMissionCards = state.nonPickedMissionCards.filter(
        (c) => c.id !== state.selectingMissionCard.id
      );
      state.selectingMissionCard = undefined;

      if (state.nonPickedMissionCards.length === 0) {
        state.turnPlayer = state.leadPlayer;
        state.phase = "started";
        state.tricks = 1;
      }
    },

    playCard: (state) => {
      state.playingCards[state.turnPlayer] = state.selectingCard;
      state.player.hands = state.player.hands.filter(
        (c) => c.id !== state.selectingCard.id
      );
      delete state.selectingCard;

      determineWinnerMutation(state);
    },

    playCardByDrone: (state) => {
      const turnDrone = state.turnPlayer;
      const leadCard = state.playingCards[state.leadPlayer];
      const hands = state[turnDrone].hands;

      switch (turnDrone) {
        case "dewey": {
          const card = hands.find((c) => c.type === leadCard?.type) || hands[0];
          state.playingCards.dewey = card;
          state.dewey.hands = hands.filter((c) => c.id !== card.id);
          break;
        }
        case "huey": {
          const card = hands.find((c) => c.type === leadCard?.type)
            ? findMaxBy(
                hands.filter((c) => c.type === leadCard?.type),
                (c) => c.num
              )
            : findMaxBy(hands, (c) => c.num);
          state.playingCards.huey = card;
          state.huey.hands = hands.filter((c) => c.id !== card.id);
          break;
        }
        case "louie": {
          const card = hands.find((c) => c.type === leadCard?.type)
            ? findMaxBy(
                hands.filter((c) => c.type === leadCard?.type),
                (c) => -c.num
              )
            : findMaxBy(hands, (c) => -c.num);
          state.playingCards.louie = card;
          state.louie.hands = hands.filter((c) => c.id !== card.id);
          break;
        }
        case "player": {
          throw new Error(
            "Expect drone's turn but actually called at player's turn"
          );
        }
        default: {
          assertUnreachable(turnDrone);
        }
      }

      determineWinnerMutation(state);
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

const determineWinnerMutation = (state: GameState) => {
  if (Object.keys(state.playingCards).length === 4) {
    // check winner and setup next trick
    const cards = Object.entries(state.playingCards) as [PlayerNames, Card][];
    const rocketCards = cards.filter(([_, card]) => card.type === "rocket");
    let winner: PlayerNames;
    if (rocketCards.length !== 0) {
      [winner] = findMaxBy(rocketCards, ([_, c]) => c.num);
    } else {
      const leadCard = state.playingCards[state.leadPlayer];
      const followedCards = cards.filter(
        ([_, card]) => card.type === leadCard.type
      );
      [winner] = findMaxBy(followedCards, ([_, c]) => c.num);
    }
    console.log("@winner", winner);
    state.leadPlayer = winner;
    state.turnPlayer = winner;
    state.tricks += 1;
    state.playingCards = {};
  } else {
    state.turnPlayer = nextTurnPlayer(state);
  }
};
