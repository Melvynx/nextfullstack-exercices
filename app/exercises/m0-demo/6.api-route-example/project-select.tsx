import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { z } from "zod";

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export function ProjectSelect({
  selectedProjectId,
  // onProjectChange,
}: {
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [search] = useState("");

  const { data } = useQuery({
    queryKey: ["projects", search],
    queryFn: async () => {
      const response = await fetch(`/api/projects?q=${search}`);
      const data = await response.json();
      return z.object({ projects: z.array(ProjectSchema) }).parse(data);
    },
  });

  const projects = data?.projects ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} variant="outline" size="sm">
          {selectedProjectId
            ? projects.find((project) => project.id === selectedProjectId)?.name
            : "Select project"}
          <ChevronDown className="ml-1 size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent variant="destructive" className="w-full">
        <p className="text-inherit">TODO</p>
      </PopoverContent>
    </Popover>
  );
}
