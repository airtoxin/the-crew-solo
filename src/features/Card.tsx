/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useMemo } from "react";
import type { Card as CardType } from "../the-crew/card";
// @ts-expect-error
import cardsSrc from "../files/cards.jpg";
import { getSequentialNum } from "../the-crew/card";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { gameSlice } from "../the-crew/game";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  CARD_HEIGHT,
  CARD_SPRITE_HEIGHT,
  CARD_SPRITE_WIDTH,
  CARD_WIDTH,
} from "../constants";

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

  const scaledSpriteWidth = CARD_SPRITE_WIDTH * scale;
  const scaledSpriteHeight = CARD_SPRITE_HEIGHT * scale;
  const scaledCardWidth = CARD_WIDTH * scale;
  const scaledCardHeight = CARD_HEIGHT * scale;

  const xOffset = (seq % 10) * -scaledCardWidth;
  const yOffset = Math.floor(seq / 10) * -scaledCardHeight;

  return (
    <div
      css={{
        position: "relative",
        "&:hover": { transform: "translate(0, -10px)" },
      }}
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
          css={{
            position: "absolute",
            width: scaledCardWidth,
            height: scaledCardHeight,
            backgroundColor: "rgb(255 255 255 / 43%)",
          }}
        />
      )}
      <div
        css={{
          width: scaledCardWidth,
          height: scaledCardHeight,
          backgroundImage: `url(${cardsSrc})`,
          backgroundSize: `${scaledSpriteWidth}px ${scaledSpriteHeight}px`,
          backgroundPositionX: xOffset,
          backgroundPositionY: yOffset,
        }}
      />
    </div>
  );
};
