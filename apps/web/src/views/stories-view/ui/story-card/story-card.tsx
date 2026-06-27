import { BookOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { StoryListItemDTO } from "@/shared/api/requests/types";

type StoryCardProps = {
  story: StoryListItemDTO;
  onOpen: (id: number) => void;
};

export function StoryCard({ story, onOpen }: StoryCardProps) {
  const { i18n } = useTranslation();
  const date = new Date(story.createdAt).toLocaleDateString(i18n.language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <button
      type="button"
      className="glass text-surface ring-surface/5 hover:ring-brand-400 shadow-card flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-4xl py-4 text-left ring-1 transition-shadow select-none"
      onClick={() => onOpen(story.id)}
    >
      <div className="grid auto-rows-min items-start gap-1.5 px-4">
        <div className="text-body flex items-center gap-2 font-semibold">
          <BookOpenIcon className="text-brand-200 size-4" />
          {story.ownerName}
        </div>
        <div className="text-muted-foreground text-small">{date}</div>
      </div>
    </button>
  );
}
