"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import PlayingCard from "./playing-card";
import { ReactNode } from "react";

type CardDropDownProps = {
  color: (typeof COLORS)[number];
  children: ReactNode;
  onClick?: (n: number) => void;
};

export default function CardDropDown({
  color,
  children,
  onClick,
}: CardDropDownProps) {
  function generateCards() {
    const cards = [];
    for (let i = 0; i <= 9; i++) {
      cards.push(
        <PlayingCard
          key={i}
          color={color}
          onClick={() => onClick && onClick(i)}
        >
          {i}
        </PlayingCard>
      );
    }
    return cards;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`border-8 rounded-md text-2xl w-11 h-14 text-center flex flex-col justify-center card-${color} bg-background hover:bg-secondary/80 hover:text-accent-foreground`}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuItem>
          <div className="flex flex-row gap-1 w-fit">{generateCards()}</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
