export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-10" role="status" aria-live="polite">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-brand-500" />
    </div>
  );
}
