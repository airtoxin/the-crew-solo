/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useDocumentBodySize } from "../hooks/useDocumentBodySize";

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;

export const GameLayout: React.FunctionComponent = ({ children }) => {
  const { clientWidth, clientHeight } = useDocumentBodySize();
  const scale = Math.min(clientWidth / GAME_WIDTH, clientHeight / GAME_HEIGHT);

  return (
    <div
      css={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        transformOrigin: "left top",
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};
