import type { Meta, StoryObj } from "@storybook/react-vite";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-h2 text-ink mb-4">{children}</h2>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="mb-12">{children}</section>
);

type ColorSwatch = {
  name: string;
  className: string;
};

const colorGroups: { title: string; swatches: ColorSwatch[] }[] = [
  {
    title: "Бренд",
    swatches: [
      { name: "brand-50", className: "bg-brand-50" },
      { name: "brand-200", className: "bg-brand-200" },
      { name: "brand-400", className: "bg-brand-400" },
      { name: "brand-500", className: "bg-brand-500" },
      { name: "brand-700", className: "bg-brand-700" },
      { name: "brand-900", className: "bg-brand-900" },
    ],
  },
  {
    title: "Ягодный",
    swatches: [
      { name: "deep-400", className: "bg-deep-400" },
      { name: "deep-700", className: "bg-deep-700" },
    ],
  },
  {
    title: "Нейтральные",
    swatches: [
      { name: "ink", className: "bg-ink" },
      { name: "ink-muted", className: "bg-ink-muted" },
      { name: "surface", className: "bg-surface" },
      { name: "surface-2", className: "bg-surface-2" },
      { name: "line", className: "bg-line" },
    ],
  },
  {
    title: "Success",
    swatches: [
      { name: "success-50", className: "bg-success-50" },
      { name: "success", className: "bg-success" },
      { name: "success-700", className: "bg-success-700" },
    ],
  },
  {
    title: "Warning",
    swatches: [
      { name: "warning-50", className: "bg-warning-50" },
      { name: "warning", className: "bg-warning" },
      { name: "warning-700", className: "bg-warning-700" },
    ],
  },
  {
    title: "Danger",
    swatches: [
      { name: "danger-50", className: "bg-danger-50" },
      { name: "danger", className: "bg-danger" },
      { name: "danger-700", className: "bg-danger-700" },
    ],
  },
];

const ColorGrid = () => (
  <>
    {colorGroups.map((group) => (
      <div key={group.title} className="mb-7">
        <h3 className="text-small text-ink-muted mb-2.5 font-semibold">
          {group.title}
        </h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
          {group.swatches.map((swatch) => (
            <div
              key={swatch.name}
              className="border-line overflow-hidden rounded-md border"
            >
              <div className={`h-16 ${swatch.className}`} />
              <div className="bg-surface text-caption text-ink px-2.5 py-2 font-mono">
                {swatch.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

const GlassGrid = () => (
  <div className="bg-app flex flex-col gap-4 rounded-lg p-6">
    {[
      { name: "glass", className: "glass" },
      { name: "glass-strong", className: "glass-strong" },
    ].map((item) => (
      <div
        key={item.name}
        className={`text-small h-40 rounded-md p-5 font-mono text-white ${item.className}`}
      >
        {item.name}
      </div>
    ))}
  </div>
);

const typographyTokens = [
  { name: "caption", className: "text-caption" },
  { name: "small", className: "text-small" },
  { name: "body", className: "text-body" },
  { name: "h3", className: "text-h3" },
  { name: "h2", className: "text-h2" },
  { name: "h1", className: "text-h1" },
  { name: "display", className: "text-display" },
];

const TypographyScale = () => (
  <div className="flex flex-col gap-4">
    {typographyTokens.map((token) => (
      <div
        key={token.name}
        className="border-line flex items-baseline gap-4 border-b pb-3"
      >
        <span className="text-caption text-ink-muted w-24 shrink-0 font-mono">
          {token.className}
        </span>
        <span className={`${token.className} text-ink`}>
          Sample text Aa 123
        </span>
      </div>
    ))}
  </div>
);

const shadowTokens = [
  { name: "card", className: "shadow-card" },
  { name: "pop", className: "shadow-pop" },
  { name: "brand", className: "shadow-brand" },
];

const ShadowGrid = () => (
  <div className="bg-surface-2 flex flex-wrap gap-8 rounded-lg p-8">
    {shadowTokens.map((token) => (
      <div key={token.name} className="text-center">
        <div className={`bg-surface h-20 w-30 rounded-md ${token.className}`} />
        <div className="text-caption text-ink-muted mt-3 font-mono">
          {token.name}
        </div>
      </div>
    ))}
  </div>
);

const DesignSystem = () => (
  <div className="bg-surface max-w-[1100px] p-8">
    <Section>
      <SectionTitle>Цвета</SectionTitle>
      <ColorGrid />
    </Section>

    <Section>
      <SectionTitle>Стекло (glass)</SectionTitle>
      <GlassGrid />
    </Section>

    <Section>
      <SectionTitle>Типографика</SectionTitle>
      <TypographyScale />
    </Section>

    <Section>
      <SectionTitle>Тени</SectionTitle>
      <ShadowGrid />
    </Section>
  </div>
);

const meta = {
  title: "Design System/Tokens",
  component: DesignSystem,
  tags: ["autodocs"],
} satisfies Meta<typeof DesignSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
