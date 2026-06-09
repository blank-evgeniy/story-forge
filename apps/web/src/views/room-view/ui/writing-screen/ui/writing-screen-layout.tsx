function WritingScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>;
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>;
}

function HeaderMeta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function InputSection({ children }: { children: React.ReactNode }) {
  return <div className="mt-auto">{children}</div>;
}

export const WritingScreenLayout = Object.assign(WritingScreenLayoutRoot, {
  Header,
  HeaderMeta,
  InputSection,
});
