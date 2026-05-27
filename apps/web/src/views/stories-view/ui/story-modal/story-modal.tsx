import { BookOpenIcon } from "lucide-react";

import type { GetStoryResponseDTO } from "@/api/requests/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { StoryContent } from "./story-content";

type StoryModalProps = {
  isOpen: boolean;
  openedStory: GetStoryResponseDTO | undefined;
  isStoryLoading: boolean;
  onClose: () => void;
};

export function StoryModal({
  isOpen,
  openedStory,
  isStoryLoading,
  onClose,
}: StoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg" initialFocus={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpenIcon className="size-4 text-primary" />
            {openedStory?.ownerName ?? "История"}
          </DialogTitle>
        </DialogHeader>

        {isStoryLoading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2 self-end" />
            <Skeleton className="h-10 w-2/3" />
          </div>
        )}

        {!isStoryLoading && openedStory && (
          <StoryContent items={openedStory.content} />
        )}
      </DialogContent>
    </Dialog>
  );
}
