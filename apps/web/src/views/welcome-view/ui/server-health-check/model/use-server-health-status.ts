import { useEffect, useState } from "react";
import { useCheckHealth } from "../api/use-health-check";

type Status = "checking" | "starting" | "error" | "online";

export function useServerHealthStatus() {
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

  let status: Status;

  if (isError) status = "error";
  else if (data?.ok) status = "online";
  else if (isLoading && delayed) status = "starting";
  else status = "checking";

  return { status, refetch };
}
