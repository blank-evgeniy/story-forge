import type { ServerHealthStatus } from "../../../model/types";

import { CheckingState } from "./checking-state";
import { ErrorState } from "./error-state";
import { OnlineState } from "./online-state";
import { StartingState } from "./starting-state";

type ServerStatusProps = {
  status: ServerHealthStatus;
  onRetry: () => void;
};

export function ServerStatus({ onRetry, status }: ServerStatusProps) {
  switch (status) {
    case "checking":
      return <CheckingState />;
    case "starting":
      return <StartingState />;
    case "error":
      return <ErrorState onRetry={onRetry} />;
    case "online":
      return <OnlineState />;
    default:
      return null;
  }
}
