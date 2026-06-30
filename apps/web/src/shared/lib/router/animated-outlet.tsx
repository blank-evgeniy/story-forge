import {
  Outlet,
  RouterContextProvider,
  useMatches,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useMemo, useState } from "react";

function frozenStore<T>(value: T) {
  return {
    state: value,
    get: () => value,
    subscribe: () => ({ unsubscribe: () => {} }),
  };
}

function createFrozenRouter(
  router: ReturnType<typeof useRouter>,
  matches: ReturnType<typeof useMatches>,
  prevMatches: ReturnType<typeof useMatches>,
) {
  const patched = [
    ...matches.map((match, index) => ({
      ...(prevMatches[index] ?? match),
      id: match.id,
    })),
    ...prevMatches.slice(matches.length),
  ];

  const patchedState = { ...router.state, matches: patched };

  // router.stores is a v1.168+ internal API not yet reflected in all type declarations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routerStores = (router as any).stores;

  const fakeMatchStores = new Map(routerStores.matchStores);
  const routeIdToFrozenStore = new Map<
    string,
    ReturnType<typeof frozenStore>
  >();

  for (const match of patched) {
    const store = frozenStore(match);
    (store as typeof store & { routeId?: string }).routeId = match.routeId;
    fakeMatchStores.set(match.id, store);
    if (match.routeId) routeIdToFrozenStore.set(match.routeId, store);
  }

  const fakeStores = Object.create(routerStores);
  Object.defineProperty(fakeStores, "matches", {
    value: frozenStore(patched),
    configurable: true,
  });
  Object.defineProperty(fakeStores, "matchesId", {
    value: frozenStore(patched.map((match) => match.id)),
    configurable: true,
  });
  Object.defineProperty(fakeStores, "matchStores", {
    value: fakeMatchStores,
    configurable: true,
  });
  Object.defineProperty(fakeStores, "getRouteMatchStore", {
    value: (routeId: string) =>
      routeIdToFrozenStore.get(routeId) ?? frozenStore(undefined),
    configurable: true,
  });

  const fakeRouter = Object.create(router);
  Object.defineProperty(fakeRouter, "stores", {
    value: fakeStores,
    configurable: true,
  });
  Object.defineProperty(fakeRouter, "state", {
    get: () => patchedState,
    configurable: true,
  });

  return fakeRouter as typeof router;
}

function FrozenOutlet() {
  const isPresent = useIsPresent();
  const matches = useMatches();
  const router = useRouter();

  const [prevMatches, setPrevMatches] = useState(matches);

  if (isPresent && prevMatches !== matches) {
    setPrevMatches(matches);
  }

  const frozenRouter = useMemo(
    () => (isPresent ? null : createFrozenRouter(router, matches, prevMatches)),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recompute only when exit starts, then keep the same frozen snapshot for the whole exit animation
    [isPresent],
  );

  return (
    <RouterContextProvider router={frozenRouter ?? router}>
      <Outlet />
    </RouterContextProvider>
  );
}

/**
 * Owns the single `AnimatePresence` for route transitions so the exiting and
 * entering pages animate in the same tree and stay in sync. The actual look
 * of the transition (variants, transition timing) is left to each page: they
 * render a `motion.div` with `variants="initial" | "animate" | "exit"` as the
 * root of their content, and those props propagate down from this wrapper's
 * `motion.div` via Motion's variant propagation.
 */
export function AnimatedOutlet() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <FrozenOutlet />
      </motion.div>
    </AnimatePresence>
  );
}
