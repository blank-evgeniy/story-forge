import { BookOpenIcon } from "lucide-react";

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
          <div key={index} className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5">
              <p className="text-sm leading-relaxed text-foreground/90">
                {sentence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
