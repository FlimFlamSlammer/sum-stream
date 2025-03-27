"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

type CardProps = {
  color?: (typeof COLORS)[number];
  children?: ReactNode;
  onClick?: () => void;
};

export default function PlayingCard({ color, children, onClick }: CardProps) {
  return (
    <button
      className={`border-8 rounded-md text-2xl w-11 h-14 text-center flex flex-col justify-center card-${
        color || "white"
      } bg-background hover:bg-secondary/80 hover:text-accent-foreground`}
      onClick={onClick}
    >
      <div>{children}</div>
      <div className="card-red card-yellow card-green card-blue card-white display-none"></div>
    </button>
  );
}
