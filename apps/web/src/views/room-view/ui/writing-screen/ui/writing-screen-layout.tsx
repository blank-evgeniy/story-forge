import { motion } from "motion/react";

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function WritingScreenLayoutRoot({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>;
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex min-h-0 flex-1 flex-col gap-4"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

function HeaderMeta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function InputSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="mt-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ ...transition, delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
}

export const WritingScreenLayout = Object.assign(WritingScreenLayoutRoot, {
  Header,
  HeaderMeta,
  InputSection,
});
