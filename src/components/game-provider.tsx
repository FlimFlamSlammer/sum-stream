"use client";

import { createContext, useContext, useState } from "react";

type GameContextType = {
  accumulator: number;
  setAccumulator: (n: number) => void;
  gameStarted: boolean;
  setGameStarted: (n: boolean) => void;
  playerCount: number;
  setPlayerCount: (n: number) => void;
  playerPoints: number[];
  setPlayerPointsIndividually: (index: number, n: number) => void;
  colorToOperation: ColorToOperation;
  rotateColorToOperation: () => void;
  setPlayerPoints: (arr: number[]) => void;
};

const defaultColorToOperation: ColorToOperation = {
  red: (a, b) => {
    return { res: a + b, str: "+" };
  },
  yellow: (a, b) => {
    let res: number;
    if (b === 0) {
      res = -a;
    } else {
      res = a - b;
    }
    return { res, str: "−" };
  },
  green: (a, b) => {
    return { res: a * b, str: "×" };
  },
  blue: (a, b) => {
    let res: number;
    if (b === 0) {
      res = a;
    } else {
      res = a % b;
    }
    return { res, str: "%" };
  },
};

const GameContext = createContext<GameContextType>({
  accumulator: 0,
  setAccumulator: () => undefined,
  playerCount: 0,
  setPlayerCount: () => undefined,
  gameStarted: false,
  setGameStarted: () => undefined,
  playerPoints: [],
  setPlayerPoints: () => undefined,
  colorToOperation: defaultColorToOperation,
  rotateColorToOperation: () => undefined,
  setPlayerPointsIndividually: () => undefined,
});

export default function GameContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [accumulator, setAccumulator] = useState<number>(0);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerPoints, setPlayerPoints] = useState<number[]>([]);
  const [colorToOperation, setColorToOperation] = useState<ColorToOperation>(
    defaultColorToOperation
  );

  function setPlayerPointsIndividually(i: number, n: number) {
    setPlayerPoints(playerPoints.toSpliced(i, 1, n));
  }

  function rotateColorToOperation() {
    setColorToOperation({
      red: colorToOperation.yellow,
      yellow: colorToOperation.green,
      green: colorToOperation.blue,
      blue: colorToOperation.red,
    });
  }

  return (
    <GameContext.Provider
      value={{
        accumulator,
        setAccumulator,
        playerCount,
        setPlayerCount,
        gameStarted,
        setGameStarted,
        playerPoints,
        setPlayerPoints,
        colorToOperation,
        rotateColorToOperation,
        setPlayerPointsIndividually,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
