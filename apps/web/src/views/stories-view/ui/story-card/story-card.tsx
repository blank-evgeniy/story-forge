import { BookOpenIcon } from "lucide-react";

import type { StoryListItemDTO } from "@/api/requests/types";

type StoryCardProps = {
  story: StoryListItemDTO;
  onOpen: (id: number) => void;
};

export function StoryCard({ story, onOpen }: StoryCardProps) {
  const date = new Date(story.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <button
      type="button"
      className="w-full text-left flex flex-col gap-4 cursor-pointer overflow-hidden rounded-4xl bg-card py-4 text-sm text-card-foreground shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10 transition-shadow hover:ring-primary/30 select-none"
      onClick={() => onOpen(story.id)}
    >
      <div className="grid auto-rows-min items-start gap-1.5 px-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <BookOpenIcon className="size-4 text-primary" />
          {story.ownerName}
        </div>
        <div className="text-sm text-muted-foreground">{date}</div>
      </div>
    </button>
  );
}
