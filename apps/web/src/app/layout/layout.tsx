import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PlayerAvatar, usePlayerStore } from "@/entities/player";
import { AppLogo } from "@/shared/ui/app-logo";
import { Button } from "@/shared/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const user = usePlayerStore((store) => store.player);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pb-4">
      <header className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-px">
          <AppLogo />
        </Link>

        <svg
          id="visual"
          viewBox="0 0 900 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          className="fixed inset-0 -z-10 hidden h-full w-full opacity-10 grayscale lg:block"
        >
          <path
            d="M0 49L13.7 58C27.3 67 54.7 85 82 90C109.3 95 136.7 87 163.8 82C191 77 218 75 245.2 82C272.3 89 299.7 105 327 107C354.3 109 381.7 97 409 91C436.3 85 463.7 85 491 93C518.3 101 545.7 117 573 115C600.3 113 627.7 93 654.8 84C682 75 709 77 736.2 72C763.3 67 790.7 55 818 52C845.3 49 872.7 55 886.3 58L900 61L900 0L886.3 0C872.7 0 845.3 0 818 0C790.7 0 763.3 0 736.2 0C709 0 682 0 654.8 0C627.7 0 600.3 0 573 0C545.7 0 518.3 0 491 0C463.7 0 436.3 0 409 0C381.7 0 354.3 0 327 0C299.7 0 272.3 0 245.2 0C218 0 191 0 163.8 0C136.7 0 109.3 0 82 0C54.7 0 27.3 0 13.7 0L0 0Z"
            fill="#6198ff"
          ></path>
          <path
            d="M0 121L13.7 127C27.3 133 54.7 145 82 147C109.3 149 136.7 141 163.8 152C191 163 218 193 245.2 215C272.3 237 299.7 251 327 237C354.3 223 381.7 181 409 177C436.3 173 463.7 207 491 216C518.3 225 545.7 209 573 203C600.3 197 627.7 201 654.8 194C682 187 709 169 736.2 169C763.3 169 790.7 187 818 187C845.3 187 872.7 169 886.3 160L900 151L900 59L886.3 56C872.7 53 845.3 47 818 50C790.7 53 763.3 65 736.2 70C709 75 682 73 654.8 82C627.7 91 600.3 111 573 113C545.7 115 518.3 99 491 91C463.7 83 436.3 83 409 89C381.7 95 354.3 107 327 105C299.7 103 272.3 87 245.2 80C218 73 191 75 163.8 80C136.7 85 109.3 93 82 88C54.7 83 27.3 65 13.7 56L0 47Z"
            fill="#3c80ff"
          ></path>
          <path
            d="M0 379L13.7 360C27.3 341 54.7 303 82 309C109.3 315 136.7 365 163.8 382C191 399 218 383 245.2 380C272.3 377 299.7 387 327 367C354.3 347 381.7 297 409 284C436.3 271 463.7 295 491 324C518.3 353 545.7 387 573 411C600.3 435 627.7 449 654.8 442C682 435 709 407 736.2 403C763.3 399 790.7 419 818 424C845.3 429 872.7 419 886.3 414L900 409L900 149L886.3 158C872.7 167 845.3 185 818 185C790.7 185 763.3 167 736.2 167C709 167 682 185 654.8 192C627.7 199 600.3 195 573 201C545.7 207 518.3 223 491 214C463.7 205 436.3 171 409 175C381.7 179 354.3 221 327 235C299.7 249 272.3 235 245.2 213C218 191 191 161 163.8 150C136.7 139 109.3 147 82 145C54.7 143 27.3 131 13.7 125L0 119Z"
            fill="#0066ff"
          ></path>
          <path
            d="M0 517L13.7 524C27.3 531 54.7 545 82 545C109.3 545 136.7 531 163.8 521C191 511 218 505 245.2 511C272.3 517 299.7 535 327 537C354.3 539 381.7 525 409 526C436.3 527 463.7 543 491 552C518.3 561 545.7 563 573 563C600.3 563 627.7 561 654.8 557C682 553 709 547 736.2 545C763.3 543 790.7 545 818 547C845.3 549 872.7 551 886.3 552L900 553L900 407L886.3 412C872.7 417 845.3 427 818 422C790.7 417 763.3 397 736.2 401C709 405 682 433 654.8 440C627.7 447 600.3 433 573 409C545.7 385 518.3 351 491 322C463.7 293 436.3 269 409 282C381.7 295 354.3 345 327 365C299.7 385 272.3 375 245.2 378C218 381 191 397 163.8 380C136.7 363 109.3 313 82 307C54.7 301 27.3 339 13.7 358L0 377Z"
            fill="#0059dd"
          ></path>
          <path
            d="M0 601L13.7 601C27.3 601 54.7 601 82 601C109.3 601 136.7 601 163.8 601C191 601 218 601 245.2 601C272.3 601 299.7 601 327 601C354.3 601 381.7 601 409 601C436.3 601 463.7 601 491 601C518.3 601 545.7 601 573 601C600.3 601 627.7 601 654.8 601C682 601 709 601 736.2 601C763.3 601 790.7 601 818 601C845.3 601 872.7 601 886.3 601L900 601L900 551L886.3 550C872.7 549 845.3 547 818 545C790.7 543 763.3 541 736.2 543C709 545 682 551 654.8 555C627.7 559 600.3 561 573 561C545.7 561 518.3 559 491 550C463.7 541 436.3 525 409 524C381.7 523 354.3 537 327 535C299.7 533 272.3 515 245.2 509C218 503 191 509 163.8 519C136.7 529 109.3 543 82 543C54.7 543 27.3 529 13.7 522L0 515Z"
            fill="#004cbb"
          ></path>
        </svg>

        <div className="flex items-center gap-1">
          <Button
            variant={"ghost-white"}
            size={"icon"}
            render={<Link to="/stories" />}
            nativeButton={false}
            aria-label={t("layout.storiesButton")}
          >
            <BookOpen className="size-5" />
          </Button>
          {user && (
            <Button
              variant={"ghost-white"}
              className={"flex max-w-40 gap-2"}
              render={<Link to="/profile" />}
              nativeButton={false}
            >
              <span className="truncate text-sm font-medium">Профиль</span>
              <PlayerAvatar
                color={user.color}
                icon={user.icon}
                className="shrink-0"
              />
            </Button>
          )}
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
