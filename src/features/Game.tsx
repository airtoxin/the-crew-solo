import React, { useMemo } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { gameSlice } from "../the-crew/game";
import { Player } from "./Player";
import { useAppSelector } from "../hooks/useAppSelector";
import { Card } from "./Card";

export const Game: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const phase = useAppSelector((s) => s.game.phase);
  const nonPickedMissionCards = useAppSelector(
    (s) => s.game.nonPickedMissionCards
  );
  const playerHands = useAppSelector((s) => s.game.player.hands);
  const selectingCard = useAppSelector((s) => s.game.selectingCard);
  const canSwap = useMemo(() => {
    return (
      selectingCard && !!playerHands.find((c) => c.id === selectingCard.id)
    );
  }, [selectingCard, playerHands]);

  return (
    <div>
      <h2>{phase}</h2>
      {phase === "notStarted" && (
        <button onClick={() => dispatch(gameSlice.actions.setup())}>
          setup
        </button>
      )}
      {phase === "swappingCommander" && (
        <button
          onClick={() => dispatch(gameSlice.actions.skipSwappingCommander())}
        >
          skipSwappingCommander
        </button>
      )}
      {phase === "swappingCommander" && (
        <button
          onClick={() => dispatch(gameSlice.actions.swapCommander())}
          disabled={!canSwap}
        >
          swapCommander
        </button>
      )}

      <div style={{ display: "flex" }}>
        {nonPickedMissionCards.map((card) => (
          <Card key={card.id} card={card} isMissionCard />
        ))}
      </div>

      <Player name={"player"} />
      <Player name={"dewey"} />
      <Player name={"huey"} />
      <Player name={"louie"} />
    </div>
  );
};
