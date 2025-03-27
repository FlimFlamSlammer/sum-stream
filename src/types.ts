const COLORS = ["red", "yellow", "green", "blue"] as const;

type Operation = (a: number, b: number) => { res: number; str: String };

type ColorToOperation = {
  [color in (typeof COLORS)[number]]: Operation;
};
