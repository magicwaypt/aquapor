export type CsvHeader<T extends Record<string, any>> = { key: keyof T; label: string };

export function exportToCSV<T extends Record<string, any>>(
  rows: T[],
  headers: CsvHeader<T>[],
  filename: string
) {
  const escape = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const sep = ";";
  const head = headers.map(h => escape(h.label)).join(sep);
  const body = rows.map(r => headers.map(h => escape(r[h.key])).join(sep)).join("\n");
  const csv = head + "\n" + body;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : filename + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
