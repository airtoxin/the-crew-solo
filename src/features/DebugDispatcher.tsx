import React, { useMemo } from "react";
import { gameSlice } from "../the-crew/game";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

export const DebugDispatcher: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const phase = useAppSelector((s) => s.game.phase);
  const playerHands = useAppSelector((s) => s.game.player.hands);
  const selectingCard = useAppSelector((s) => s.game.selectingCard);
  const selectingMissionCard = useAppSelector(
    (s) => s.game.selectingMissionCard
  );
  const turnPlayer = useAppSelector((s) => s.game.turnPlayer);
  const leadPlayer = useAppSelector((s) => s.game.leadPlayer);
  const leadCard = useAppSelector((s) => s.game.playingCards[leadPlayer]);
  const canSwap = useMemo(() => {
    return (
      selectingCard && !!playerHands.find((c) => c.id === selectingCard.id)
    );
  }, [selectingCard, playerHands]);
  const canPlayCard = useMemo(() => {
    if (turnPlayer !== "player" || !selectingCard) return false;
    if (!leadCard) return true;
    if (selectingCard.type === leadCard.type) return true;
    return !playerHands.find((c) => c.type === leadCard.type);
  }, [turnPlayer, selectingCard]);

  return (
    <div>
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
          disabled={!canSwap}
          onClick={() => dispatch(gameSlice.actions.swapCommander())}
        >
          swapCommander
        </button>
      )}
      {phase === "pickupMissionCards" && (
        <button
          disabled={!selectingMissionCard}
          onClick={() => dispatch(gameSlice.actions.pickupMissionCards())}
        >
          pickupMissionCard
        </button>
      )}
      {phase === "started" && (
        <button
          disabled={!canPlayCard}
          onClick={() => dispatch(gameSlice.actions.playCard())}
        >
          playCard
        </button>
      )}
    </div>
  );
};
