import { useCallback, useEffect, useState } from "react";

export const useDocumentBodySize = () => {
  const [size, setSize] = useState<{
    clientWidth: number;
    clientHeight: number;
  }>({
    clientWidth: document.body.clientWidth,
    clientHeight: document.body.clientHeight,
  });

  const handleResize = useCallback(() => {
    setSize({
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return size;
};
