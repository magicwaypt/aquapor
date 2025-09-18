import clsx from "clsx";
export default function Card({
  title,
  children,
  className,
  trailing
}: {
  title?: string;
  children?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("rounded-xl border border-white/10 bg-white/5 p-4", className)}>
      {(title || trailing) && (
        <header className="mb-3 flex items-center justify-between">
          {title ? <h2 className="font-medium">{title}</h2> : <div/>}
          {trailing}
        </header>
      )}
      {children}
    </section>
  );
}
