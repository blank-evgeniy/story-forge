import { BotIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Skeleton } from "@/shared/ui/skeleton";

type AiCommentCardProps = {
  status: "idle" | "loading" | "success" | "error";
  comment: string | null;
};

export function AiCommentCard({ status, comment }: AiCommentCardProps) {
  const { t } = useTranslation();

  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-0 flex-1 flex-col"
    >
      {status === "loading" && (
        <Card>
          <CardHeader>
            <span className="text-small flex items-center gap-2 font-medium">
              <BotIcon className="text-surface-2 size-4" />
              {t("room.reveal.aiComment.loading")}
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {status === "success" && comment !== null && (
        <Card className="flex min-h-0 flex-1 flex-col">
          <CardHeader>
            <span className="text-small flex items-center gap-2 font-medium">
              <BotIcon className="text-surface-2 size-4" />
              {t("room.reveal.aiComment.title")}
            </span>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 px-2">
            <ScrollArea className="h-full px-2" viewportClassName="max-h-full">
              <p className="text-sm leading-relaxed">{comment}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {status === "error" && (
        <p className="text-surface-2 flex items-center justify-center gap-1 px-2 text-center text-xs">
          {t("room.reveal.aiComment.error")}
          <BotIcon className="text-surface-2 size-4" />
        </p>
      )}
    </motion.div>
  );
}
