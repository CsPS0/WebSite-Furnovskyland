import { Suspense } from "react";
import { ElectionForm } from "@/components/election-form";
import { getAdmin } from "@/lib/admin";
import { getGuildRoles, isAdmin } from "@/lib/discord";
import { getDictionary, getLocale } from "@/lib/i18n";
import { NotAdmin } from "@/components/not-admin";

export const metadata = { title: "Admin", robots: { index: false } };

export default function NewVotePage() {
  return (
    <section className="section">
      <div className="page max-w-3xl">
        <Suspense fallback={<div className="card h-96 animate-pulse" />}>
          <NewVote />
        </Suspense>
      </div>
    </section>
  );
}

async function NewVote() {
  const [admin, t, locale] = [await getAdmin(), await getDictionary(), await getLocale()];
  if (!admin || !isAdmin(admin.member)) return <NotAdmin />;
  const roles = await getGuildRoles();
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">{t.admin.newVote}</h1>
      <ElectionForm lang={locale} roles={roles} t={t.admin} types={t.vote.types} majorities={t.vote.majority} />
    </>
  );
}
