import { BotIcon } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type AiCommentCardProps = {
  status: "idle" | "loading" | "success" | "error";
  comment: string | null;
};

export function AiCommentCard({ status, comment }: AiCommentCardProps) {
  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {status === "loading" && (
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BotIcon className="w-4 h-4 text-muted-foreground" />
              Оракул Историй пишет вердикт...
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {status === "success" && comment !== null && (
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BotIcon className="w-4 h-4 text-muted-foreground" />
              Оракул Историй
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{comment}</p>
          </CardContent>
        </Card>
      )}

      {status === "error" && (
        <p className="text-xs text-muted-foreground text-center px-2 flex items-center gap-1 justify-center">
          Оракул Историй погрузился в молчание
          <BotIcon className="size-4 text-muted-foreground" />
        </p>
      )}
    </motion.div>
  );
}
