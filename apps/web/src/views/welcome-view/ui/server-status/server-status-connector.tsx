import { useEffect, useState } from "react";

import type { ServerHealthStatus } from "../../model/types";

import { useCheckHealth } from "../../api/use-check-health";
import { ServerStatus } from "./ui/server-status";

export function ServerStatusConnector() {
  const { data, isError, isLoading, refetch } = useCheckHealth();

  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setDelayed(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      setDelayed(false);
    };
  }, [isLoading]);

  let status: ServerHealthStatus;

  if (isError) status = "error";
  else if (data?.ok) status = "online";
  else if (isLoading && delayed) status = "starting";
  else status = "checking";

  return <ServerStatus status={status} onRetry={refetch} />;
}
