import { buttonVariants } from "@/components/ui/button";
import { getCurrentExerciseUrl } from "@/lib/current-exercises-url";

export default async function RoutePage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const currentUrl = await getCurrentExerciseUrl();

  if (searchParams.wait) {
    const time = parseInt(searchParams.wait);
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
  }

  if (searchParams.error) {
    throw new Error("Invalid code");
  }

  return (
    <div className="flex flex-col gap-2">
      <a
        className={buttonVariants({ variant: "outline" })}
        href={`${currentUrl}?wait=2`}
      >
        Add loading time of 2 second
      </a>
      <a
        className={buttonVariants({ variant: "outline" })}
        href={`${currentUrl}?error=true`}
      >
        Add error
      </a>
      <a
        className={buttonVariants({ variant: "outline" })}
        href={`${currentUrl}?wait=1&error=true`}
      >
        Add loading then error
      </a>
    </div>
  );
}
