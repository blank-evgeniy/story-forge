import { BotIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

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
      className="min-h-0"
    >
      {status === "loading" && (
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BotIcon className="text-muted-foreground size-4" />
              {t("aiComment.loading")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {status === "success" && comment !== null && (
        <Card size="sm" className="min-h-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BotIcon className="text-muted-foreground size-4" />
              {t("aiComment.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <ScrollArea
              className="max-h-[20vh] px-2"
              viewportClassName="max-h-[inherit]"
            >
              <p className="text-sm leading-relaxed">{comment}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {status === "error" && (
        <p className="text-muted-foreground flex items-center justify-center gap-1 px-2 text-center text-xs">
          {t("aiComment.error")}
          <BotIcon className="text-muted-foreground size-4" />
        </p>
      )}
    </motion.div>
  );
}
