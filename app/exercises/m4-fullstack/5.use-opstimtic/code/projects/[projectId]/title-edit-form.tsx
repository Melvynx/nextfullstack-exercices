"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

interface TitleUpdateFormProps {
  title: string;
  onUpdate: (title: string) => Promise<void>;
  className?: string;
  inputClassName?: string;
}

export function TitleUpdateForm({
  title: initialTitle,
  onUpdate,
  className,
  inputClassName,
}: TitleUpdateFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  // 🦁 Ajoute useTransition pour gérer la mise à jour du titre
  // 🦁 Ajoute useOptimistic pour gérer l'optimistic title
  const optimisticTitle = initialTitle;
  const isPending = false;

  const handleSave = async () => {
    if (editedTitle.trim() === "") {
      return;
    }

    // 🦁 Utilise useTransition et setOptimisticTitle pour mettre à jour le titre

    setIsEditing(false);
    await onUpdate(editedTitle);
  };

  const handleCancel = () => {
    setEditedTitle(optimisticTitle);
    setIsEditing(false);
  };

  const titleStyles = cn("text-2xl font-bold rounded-md px-1 py-1", className);

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          style={{
            // @ts-expect-error - new field api
            fieldSizing: "content",
          }}
          className={cn(
            "bg-transparent outline rounded-md",
            titleStyles,
            inputClassName
          )}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void handleSave();
            }
            if (e.key === "Escape") {
              handleCancel();
            }
          }}
        />
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={() => void handleSave()}>
            <Check className="size-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center gap-2">
      <h1
        className={cn(titleStyles, {
          "animate-pulse": isPending,
        })}
      >
        {optimisticTitle}
      </h1>
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="size-4" />
      </Button>
    </div>
  );
}
