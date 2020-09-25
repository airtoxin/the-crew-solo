import { allCards, getSequentialNum } from "./card";

describe("getSequentialNum", () => {
  it("should return sequential card number", () => {
    expect(
      getSequentialNum(allCards.find((c) => c.type === "rocket" && c.num === 1))
    ).toBe(0);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "rocket" && c.num === 4))
    ).toBe(3);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "blue" && c.num === 1))
    ).toBe(4);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "blue" && c.num === 6))
    ).toBe(9);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "blue" && c.num === 7))
    ).toBe(10);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "green" && c.num === 1))
    ).toBe(13);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "green" && c.num === 7))
    ).toBe(19);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "green" && c.num === 8))
    ).toBe(20);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "red" && c.num === 1))
    ).toBe(22);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "red" && c.num === 8))
    ).toBe(29);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "red" && c.num === 9))
    ).toBe(30);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "yellow" && c.num === 1))
    ).toBe(31);
    expect(
      getSequentialNum(allCards.find((c) => c.type === "yellow" && c.num === 9))
    ).toBe(39);
  });
});
