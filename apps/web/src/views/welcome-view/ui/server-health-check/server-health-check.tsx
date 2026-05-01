import { useServerHealthStatus } from "./model/use-server-health-status";
import { CheckingState } from "./ui/checking-state";
import { ErrorState } from "./ui/error-state";
import { OnlineState } from "./ui/online-state";
import { StartingState } from "./ui/starting-state";

export function ServerHealthCheck() {
  const { status, refetch } = useServerHealthStatus();

  switch (status) {
    case "checking":
      return <CheckingState />;
    case "starting":
      return <StartingState />;
    case "error":
      return <ErrorState onRetry={refetch} />;
    case "online":
      return <OnlineState />;
    default:
      return null;
  }
}
