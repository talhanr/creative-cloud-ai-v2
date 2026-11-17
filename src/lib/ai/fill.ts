// "{name}" → value; "{Name}" → value with a capital first letter. Unknown keys are left empty.
export function fill(template: string, vars: Record<string, string | undefined>): string {
  return template
    .replace(/\{(\w+)\}/g, (_, key: string) => {
      const lower = key[0].toLowerCase() + key.slice(1);
      const value = vars[key] ?? vars[lower] ?? "";
      const capitalised = key[0] === key[0].toUpperCase() && key[0] !== key[0].toLowerCase();
      return capitalised && value ? value[0].toUpperCase() + value.slice(1) : value;
    })
    .replace(/\s+([,.!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export const stripEnd = (s: string) => s.trim().replace(/[.!?]+$/, "");
