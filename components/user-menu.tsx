import Link from "next/link";
import { LogOut, Shield } from "lucide-react";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getSessionUser } from "@/lib/session";
import { avatarUrl, getMember, isAdmin } from "@/lib/discord";
import { logout } from "@/app/actions/auth";
import { DiscordIcon } from "./icons";
import { LoginLink } from "./login-link";

export async function UserMenu() {
  const [user, t, locale] = [await getSessionUser(), await getDictionary(), await getLocale()];

  if (!user) {
    return (
      <LoginLink className="btn-primary px-3 py-2 text-sm">
        <DiscordIcon className="size-4" />
        <span className="max-sm:sr-only">{t.nav.login}</span>
      </LoginLink>
    );
  }

  const admin = isAdmin(await getMember(user.id).catch(() => null));
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {admin && (
        <Link href={`/${locale}/admin/`} title={t.nav.admin} className="p-2 text-heading hover:text-secondary">
          <Shield className="size-5" />
          <span className="sr-only">{t.nav.admin}</span>
        </Link>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny Discord avatar, not worth image optimization */}
      <img src={avatarUrl(user.id, user.avatar)} alt={user.name} title={user.name} className="size-8 rounded-full" />
      <form action={logout}>
        <button title={t.nav.logout} className="p-2 text-heading hover:text-secondary">
          <LogOut className="size-5" />
          <span className="sr-only">{t.nav.logout}</span>
        </button>
      </form>
    </div>
  );
}
