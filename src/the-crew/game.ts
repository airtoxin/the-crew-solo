import { Card } from "./card";

export type GameState = {
  status: "started" | "end";
  tricks: number;
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
