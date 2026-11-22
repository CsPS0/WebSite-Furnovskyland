import { Eye, Hash, ShieldCheck } from "lucide-react";

export const WEBSITE_ROLE_PRIVILEGES = [
  {
    tier: "Emperor",
    discordRole: "『👑』His Majesty, the Emperor of the Commonwealth『👑』",
    roleId: "836272651814830140",
    color: "#992d22",
    privileges: [
      "Create, edit, schedule, cancel and delete any election or referendum",
      "Veto a passed law (Sanctio Regia) during the veto window after the vote",
      "Assign and change all 15 seats in the parliament chart and the cabinet roster",
      "See every live count, every restricted vote and the voter warning flags",
    ],
  },
  {
    tier: "Admins",
    discordRole: "Votum Admin · Webmaster · Moderator",
    roleId: "1135221429164584960 · 1566045077980053524 · 1033089906001584129",
    color: "#e74c3c",
    privileges: [
      "Use the /admin/ page, pick the Discord channel for announcements and set who can see results",
      "Check voter warning flags (shared device cookie, shared IP hash, new account, recent server join)",
      "Void fraudulent or duplicate ballots before the vote closes, and remove test votes",
      "Update parliament seat assignments and moderate campaign posts",
    ],
  },
  {
    tier: "Government and Parliament leaders",
    discordRole: "Prime Minister · Deputy Prime Minister · Speaker of the House · Bureau Officer",
    roleId: "836273968058859581 · 978721383678894091 · 1491734052355444849 · 1564419081405337630",
    color: "#e67e22",
    privileges: [
      "Assign and update the 15 parliament seats in the seat chart when MPs or ministers change",
      "Publish coalition and government campaign posts in the campaigns section",
      "Vote in public referendums and in restricted government and parliament votes",
    ],
  },
  {
    tier: "MPs and ministers",
    discordRole: "Member of Parliament · Minister of the Government · Senator",
    roleId: "1490455424812454149 · 836274885226397726 · 1006845578270998538",
    color: "#d97706",
    privileges: [
      "Hold an assigned seat in the 15-seat III. Federal Parliament chart, with their portfolio shown",
      "Vote in restricted parliament votes (bills, constitutional amendments and confidence motions)",
      "See results restricted to their chamber, and publish manifestos during elections",
    ],
  },
  {
    tier: "Party leaders and candidates",
    discordRole: "『🚩』Party Leader『🚩』 · Campaigning...",
    roleId: "891932223169765387 · 999227153415671909",
    color: "#d7342a",
    privileges: [
      "Publish party manifestos, coalition lists and campaign posters in the campaigns section",
      "Remove or replace their own campaign posts",
    ],
  },
  {
    tier: "Citizens",
    discordRole: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』",
    roleId: "836275657892954122",
    color: "#2ecc71",
    privileges: [
      "Sign in with Discord and vote by secret ballot in parliamentary, municipal and referendum votes",
      "Change their ballot at any time while the vote is open",
      "See all public results, including the pie charts and D'Hondt seat charts",
    ],
  },
  {
    tier: "Unverified and restricted accounts",
    discordRole: "『🚫』Unverified『🚫』 · 『🛑』Quarantine『🛑』 · Non-Members",
    roleId: "875780258962505739 · 879725345677410304",
    color: "#64748b",
    privileges: [
      "Can read the public pages, including history, the legal archive and public election results",
      "Cannot sign in to vote or cast a ballot until they pass border verification",
    ],
  },
] as const;

export const VOTING_WORKFLOW_MATRIX = [
  {
    voteType: "Parliamentary election (15 seats)",
    discordChannel: "#『🗳』elections (852198106627047474)",
    eligibleVoters: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』 (Universal Suffrage)",
    votingRule: "One choice of party or coalition list; 15 seats shared out by D'Hondt",
    resultsVisibility: "Hidden while open; pie chart and seat chart public after it closes",
  },
  {
    voteType: "National referendum (Art. 9)",
    discordChannel: "#『✅』citizen-polls『❌』 (871702306352144405)",
    eligibleVoters: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』 (Universal Suffrage)",
    votingRule: "Yes / No / Abstain; valid only with a quorum (>50% of the target threshold)",
    resultsVisibility: "Hidden while open (or public live if so set); public after it closes",
  },
  {
    voteType: "Ordinary bill (Art. 5)",
    discordChannel: "#the-parliament (1490456420444016871), then #federal-gazette",
    eligibleVoters: "『🕴』Member of Parliament『🕴』 & 『🕴』Speaker of the House『🕴』",
    votingRule: "Simple majority (>50% of those present, quorum ≥ 8 MPs), then a 120-hour Sanctio Regia window",
    resultsVisibility: "Emperor and admins see it live; public in #federal-gazette after it closes",
  },
  {
    voteType: "Cardinal law or constitutional amendment (Art. S, Art. 5(4))",
    discordChannel: "#the-parliament (1490456420444016871), then #『📢』throne-hall『🎂』",
    eligibleVoters: "『🕴』Member of Parliament『🕴』 & 『🕴』Speaker of the House『🕴』",
    votingRule: "Two-thirds majority (≥2/3 of MPs), then imperial assent in #throne-hall",
    resultsVisibility: "Emperor and admins see it live; public once promulgated",
  },
  {
    voteType: "Mayoral election (Art. 32)",
    discordChannel: "#『🗳』elections (852198106627047474)",
    eligibleVoters: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』",
    votingRule: "Single choice or ranked choice (IRV); 5-month term",
    resultsVisibility: "Hidden while open; pie chart public after it closes",
  },
] as const;

export function RolePrivilegesTable() {
  return (
    <div className="space-y-6">
      <div className="card overflow-hidden p-0 sm:p-0">
        <div className="flex items-center justify-between border-b border-border bg-bg-alt/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-secondary" />
            <h3 className="text-lg font-bold text-heading">What each Discord role can do on the website</h3>
          </div>
          <span className="text-xs font-semibold text-muted">Synced from Discord</span>
        </div>
        <div className="table-wrapper" role="region" aria-label="Discord roles and website permissions">
          <table className="data-table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Discord role(s)</th>
                <th>Website permissions</th>
              </tr>
            </thead>
            <tbody>
              {WEBSITE_ROLE_PRIVILEGES.map((r) => (
                <tr key={r.tier}>
                  <td className="align-top whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="font-bold text-heading">{r.tier}</span>
                    </div>
                  </td>
                  <td className="align-top">
                    <p className="font-medium text-heading">{r.discordRole}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">ID: {r.roleId}</p>
                  </td>
                  <td className="align-top">
                    <ul className="list-disc space-y-1 pl-4 text-sm text-text">
                      {r.privileges.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card overflow-hidden p-0 sm:p-0">
        <div className="flex items-center justify-between border-b border-border bg-bg-alt/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Hash className="size-5 text-secondary" />
            <h3 className="text-lg font-bold text-heading">Vote types, channels and who sees results</h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <Eye className="size-3.5 text-secondary" /> Per the Constitution
          </span>
        </div>
        <div className="table-wrapper" role="region" aria-label="Vote types and results visibility">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vote type</th>
                <th>Discord channel</th>
                <th>Who can vote</th>
                <th>Rule</th>
                <th>Who sees the results</th>
              </tr>
            </thead>
            <tbody>
              {VOTING_WORKFLOW_MATRIX.map((row) => (
                <tr key={row.voteType}>
                  <td className="align-top font-bold text-heading">{row.voteType}</td>
                  <td className="align-top font-mono text-xs text-secondary">{row.discordChannel}</td>
                  <td className="align-top text-sm">{row.eligibleVoters}</td>
                  <td className="align-top text-sm text-muted">{row.votingRule}</td>
                  <td className="align-top text-sm font-medium text-heading">{row.resultsVisibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
