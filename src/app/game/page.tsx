"use client";

import { useGameContext } from "@/components/game-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardDropDown from "@/components/ui/card-dropdown";
import Display from "@/components/ui/display";
import PlayingCard from "@/components/ui/playing-card";
import { useRef, useState } from "react";

export default function Game() {
  const {
    accumulator,
    setAccumulator,
    colorToOperation,
    rotateColorToOperation,
    playerPoints,
    setPlayerPointsIndividually,
    setPlayerPoints,
  } = useGameContext();

  const [turnOps, setTurnOps] = useState<
    ((index: number, points: number[]) => number[])[]
  >([]);
  const [canDoTurn, setCanDoTurn] = useState(false);
  let { current: previousAccumulator } = useRef(accumulator);

  function onNumberClickHandler(n: number, operation: Operation) {
    if (!canDoTurn) {
      previousAccumulator = accumulator;
      setCanDoTurn(true);
    }

    if (n == 0 && operation(2, 1).res == 0 /* modulo check */) {
      setTurnOps([
        ...turnOps,
        (index: number, points: number[]) => {
          return points.toSpliced(index, 1, -points[index]);
        },
      ]);
    } else {
      const newAccumulator = operation(accumulator, n).res;
      setAccumulator(newAccumulator);
      setTurnOps([
        ...turnOps,
        (index: number, points: number[]) => {
          return points.toSpliced(index, 1, points[index] + newAccumulator);
        },
      ]);
    }
  }

  function doTurn(playerIndex: number) {
    setCanDoTurn(false);
    let newPlayerPoints = playerPoints;
    turnOps.forEach((op) => {
      newPlayerPoints = op(playerIndex, newPlayerPoints);
    });
    setPlayerPoints(newPlayerPoints);
    setTurnOps([]);
  }

  function createPlayerCards() {
    return playerPoints.map((points, index) => {
      return (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-center">P{index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 items-center">
              <Button
                onClick={() => {
                  doTurn(index);
                }}
                size="icon"
                disabled={!canDoTurn}
              >
                +
              </Button>
              <Display>{points}</Display>
            </div>
          </CardContent>
        </Card>
      );
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 justify-between">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-6xl font-bold mb-10">Sum Stream</h1>
        <Display>{accumulator}</Display>
        <div className="flex flex-row gap-2">
          <CardDropDown
            color="red"
            onClick={(n) => onNumberClickHandler(n, colorToOperation.red)}
          >
            {colorToOperation.red(0, 0).str}
          </CardDropDown>
          <CardDropDown
            color="yellow"
            onClick={(n) => onNumberClickHandler(n, colorToOperation.yellow)}
          >
            {colorToOperation.yellow(0, 0).str}
          </CardDropDown>
          <CardDropDown
            color="green"
            onClick={(n) => onNumberClickHandler(n, colorToOperation.green)}
          >
            {colorToOperation.green(0, 0).str}
          </CardDropDown>
          <CardDropDown
            color="blue"
            onClick={(n) => onNumberClickHandler(n, colorToOperation.blue)}
          >
            {colorToOperation.blue(0, 0).str}
          </CardDropDown>
          <PlayingCard onClick={rotateColorToOperation}>↻</PlayingCard>
          <PlayingCard
            onClick={() => {
              setTurnOps([
                ...turnOps,
                (index: number, points: number[]) => {
                  return points.map((p_points: number) => {
                    return -p_points;
                  });
                },
              ]);
            }}
          >
            ⇄
          </PlayingCard>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <Button
          disabled={!canDoTurn}
          onClick={() => {
            setTurnOps([]);
            setCanDoTurn(false);
            setAccumulator(previousAccumulator);
          }}
          className="w-fit"
        >
          Cancel
        </Button>
        <div className="flex flex-row gap-3 justify-center">
          {createPlayerCards()}
        </div>
      </div>
    </div>
  );
}
