"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";
import { TriangleAlert } from "lucide-react";

export default function ErrorPage(props: { error: Error; reset: () => void }) {
  return (
    <Alert variant="destructive">
      <TriangleAlert size={16} />
      <div>
        <AlertTitle>Error.tsx</AlertTitle>
        <AlertDescription>
          Please refresh the page or try again later.
        </AlertDescription>
        <Button variant="outline" onClick={props.reset}>
          Reset
        </Button>
        <a
          href={await getCurrentExerciseUrl()}
          className={buttonVariants({ variant: "outline" })}
        >
          Remove error
        </a>
      </div>
    </Alert>
  );
}
