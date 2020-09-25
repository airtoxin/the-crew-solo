import React, { useMemo } from "react";
import type { Card as CardType } from "../the-crew/card";
// @ts-expect-error
import cardsSrc from "../files/cards.jpg";
import { getSequentialNum } from "../the-crew/card";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { gameSlice } from "../the-crew/game";
import { useAppSelector } from "../hooks/useAppSelector";

export const Card: React.FunctionComponent<{
  card: CardType;
  isMissionCard?: boolean;
}> = ({ card, isMissionCard = false }) => {
  const dispatch = useAppDispatch();
  const selectingCard = useAppSelector((s) => s.game.selectingCard);
  const selectingMissionCard = useAppSelector(
    (s) => s.game.selectingMissionCard
  );
  const isSelected = useMemo(
    () =>
      (isMissionCard ? selectingMissionCard : selectingCard)?.id === card.id,
    [selectingCard, isMissionCard, selectingMissionCard, card]
  );
  const seq = useMemo(() => getSequentialNum(card), [card]);

  const scale = useMemo(() => (isMissionCard ? 0.6 : 1), [isMissionCard]);

  const IMAGE_WIDTH = 1200 * scale;
  const IMAGE_HEIGHT = 747 * scale;
  const CARD_WIDTH = IMAGE_WIDTH / 10;
  const CARD_HEIGHT = IMAGE_HEIGHT / 4;

  const xOffset = (seq % 10) * -CARD_WIDTH;
  const yOffset = Math.floor(seq / 10) * -CARD_HEIGHT;

  return (
    <div
      style={{ position: "relative" }}
      onClick={() =>
        dispatch(
          (isMissionCard
            ? gameSlice.actions.selectMissionCard
            : gameSlice.actions.selectCard)({
            card: isSelected ? undefined : card,
          })
        )
      }
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: "rgb(255 255 255 / 43%)",
          }}
        />
      )}
      <div
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          backgroundImage: `url(${cardsSrc})`,
          backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
          backgroundPositionX: xOffset,
          backgroundPositionY: yOffset,
        }}
      />
    </div>
  );
};
