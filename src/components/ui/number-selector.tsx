"use client";

import { Button } from "@/components/ui/button";
import Display from "./display";

type NumberSelectorDTO = {
  number: number;
  setNumber: (n: number) => void;
  minValue?: number;
  maxValue?: number;
};

export default function NumberSelector({
  number,
  setNumber,
  minValue,
  maxValue,
}: NumberSelectorDTO) {
  const increment = () => {
    setNumber(number + 1);
  };

  const decrement = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-2 my-1">
      <Button
        onClick={minValue && number <= minValue ? undefined : decrement}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        −
      </Button>
      <Display>{number}</Display>
      <Button
        onClick={maxValue && number >= maxValue ? undefined : increment}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        +
      </Button>
    </div>
  );
}
