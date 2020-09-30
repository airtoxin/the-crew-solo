/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import React from "react";
import { useDocumentBodySize } from "../hooks/useDocumentBodySize";
// @ts-expect-error
import galaxySrc from "../files/galaxy-1837306_1920.jpg";

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
      <Global
        styles={css({
          "html,body,#app": {
            width: "100vw",
            height: "100vh",
            margin: 0,
          },
          "#app": {
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${galaxySrc})`,
          },
        })}
      />
      {children}
    </div>
  );
};
