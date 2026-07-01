import { Reveal } from "@/shared/ui/reveal";

function WritingScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>;
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <Reveal direction="top" className="flex min-h-0 flex-1 flex-col gap-4">
      {children}
    </Reveal>
  );
}

function HeaderMeta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function InputSection({ children }: { children: React.ReactNode }) {
  return (
    <Reveal direction="bottom" delay={0.05} className="mt-auto">
      {children}
    </Reveal>
  );
}

export const WritingScreenLayout = Object.assign(WritingScreenLayoutRoot, {
  Header,
  HeaderMeta,
  InputSection,
});
