"use client";

import { useGameContext } from "@/components/game-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Setup() {
  const {
    playerCount,
    setPlayerCount,
    accumulator,
    setAccumulator,
    setGameStarted,
    setPlayerPoints,
  } = useGameContext();
  const router = useRouter();

  function startGame() {
    setPlayerPoints(Array(playerCount).fill(0, 0, playerCount));
    setGameStarted(true);
    router.push("/game");
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 gap-3">
      <h1 className="text-6xl font-bold mb-10">Sum Stream</h1>
      <Card>
        <CardHeader>
          <CardTitle>Game Setup</CardTitle>
          <CardDescription>Set your game parameters.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="playerCount">Player Amount</Label>
                <Input
                  type="number"
                  min="2"
                  max="16"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(Number(e.target.value))}
                  id="playerCount"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="playerCount">Accumulator Starting Value</Label>
                <Input
                  type="number"
                  min="0"
                  max="9"
                  value={accumulator}
                  onChange={(e) => setAccumulator(Number(e.target.value))}
                  id="playerCount"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={startGame}>Play!</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
