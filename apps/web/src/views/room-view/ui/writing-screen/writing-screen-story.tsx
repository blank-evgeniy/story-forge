import { BookOpenIcon } from "lucide-react";
import { PlayerMessage } from "../common/player-message";

type WritingScreenStoryProps = {
  story: string[] | string | null;
};

export function WritingScreenStory({ story }: WritingScreenStoryProps) {
  if (!story) return null;

  const sentences = typeof story === "string" ? [story] : story;

  return (
    <div className="w-full rounded-xl border border-border bg-muted/30 px-5 py-4">
      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
        <BookOpenIcon className="size-4" />
        <span className="text-xs font-medium uppercase tracking-wide">
          История
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {sentences.map((sentence, index) => (
          <PlayerMessage key={index} message={sentence} />
        ))}
      </div>
    </div>
  );
}
