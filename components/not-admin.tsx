import { getDictionary } from "@/lib/i18n";

export async function NotAdmin() {
  const t = await getDictionary();
  return <p className="card text-center text-muted">{t.admin.notAdmin}</p>;
}
