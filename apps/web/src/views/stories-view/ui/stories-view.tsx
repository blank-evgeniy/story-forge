import type { ReactNode } from "react";

import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useTranslation } from "react-i18next";

import type { StoryListItemDTO } from "@/shared/api/requests/types";

import { Card, CardContent } from "@/shared/ui/card";

import { StoriesSkeleton } from "./stories-skeleton";
import { StoryCard } from "./story-card";

type StoriesViewProps = {
  stories: StoryListItemDTO[] | undefined;
  isLoading: boolean;
  onOpen: (id: number) => void;
  modalSlot: ReactNode;
};

export function StoriesView({
  stories,
  isLoading,
  onOpen,
  modalSlot,
}: StoriesViewProps) {
  const { t } = useTranslation();

  useDocumentTitle(t("titles.stories"));

  return (
    <>
      <div className="mt-4 flex flex-1 flex-col gap-4">
        <h1 className="text-h1">{t("stories.heading")}</h1>

        {isLoading && <StoriesSkeleton />}

        {!isLoading && stories?.length === 0 && (
          <Card>
            <CardContent className="text-ink-muted text-center">
              {t("stories.empty")}
            </CardContent>
          </Card>
        )}

        {!isLoading && stories && stories.length > 0 && (
          <div className="flex flex-col gap-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>
      {modalSlot}
    </>
  );
}
