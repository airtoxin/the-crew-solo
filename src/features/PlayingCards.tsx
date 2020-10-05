import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { Card } from "../components/Card";

export const PlayingCards: React.FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  const leadPlayer = useAppSelector((s) => s.game.leadPlayer);
  const playingCards = useAppSelector((s) => s.game.playingCards);
  const leadCard = useAppSelector((s) => s.game.playingCards[leadPlayer]);

  return (
    <div style={{ display: "flex" }} className={className}>
      {Object.entries(playingCards).map(([name, card]) => (
        <div key={name}>
          <div>
            {name}
            {leadCard?.id === card?.id && <span>(Lead)</span>}
          </div>
          {card && <Card card={card} noInteraction />}
        </div>
      ))}
    </div>
  );
};
