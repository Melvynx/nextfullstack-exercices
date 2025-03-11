import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredAuth } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { Edit } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectForm } from "./project-form";
import { TasksList } from "./tasks-list";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const user = await getRequiredAuth();
  const projectId = params.projectId;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
    include: {
      tasks: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            <CardTitle>Edit Project</CardTitle>
          </div>
          <CardDescription>Update your project details</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm project={project} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TasksList projectId={projectId} tasks={project.tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
