export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="label-meta flex items-center gap-2">
      <span>{index}</span>
      <span className="h-px w-6 bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}
