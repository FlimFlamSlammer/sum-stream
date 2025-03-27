import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export default function Display({ children }: { children: ReactNode }) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="p-3">
        <CardTitle className="min-w-7 text-xl text-center">
          {children}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
