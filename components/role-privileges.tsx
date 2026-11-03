import { Eye, Hash, ShieldCheck } from "lucide-react";

export const WEBSITE_ROLE_PRIVILEGES = [
  {
    tier: "Imperial Sovereign",
    discordRole: "『👑』His Majesty, the Emperor of the Commonwealth『👑』",
    roleId: "836272651814830140",
    color: "#992d22",
    privileges: [
      "Full electoral administration: create, edit, schedule, cancel, and delete any election or referendum",
      "Imperial Veto (Sanctio Regia): veto passed legislation during the constitutional post-vote veto window",
      "Assign and modify all 15 seats in the Imperial Parliament Hemicycle and Cabinet roster",
      "View all live tallies, classified divisions, and voter integrity audit logs",
    ],
  },
  {
    tier: "Electoral Commission & Administration",
    discordRole: "Votum Admin · Webmaster · Moderator",
    roleId: "1135221429164584960 · 1566045077980053524 · 1033089906001584129",
    color: "#e74c3c",
    privileges: [
      "Access the /admin/ electoral dashboard, select Discord announcement channels, and configure result visibility rules",
      "Inspect voter integrity flags (shared device cookie, shared IP hash, young account, recent server join)",
      "Void fraudulent or duplicate ballots prior to poll close and remove test votes",
      "Update Parliamentary seat assignments and moderate campaign submissions",
    ],
  },
  {
    tier: "Executive & Parliamentary Leadership",
    discordRole: "Prime Minister · Deputy Prime Minister · Speaker of the House · Bureau Officer",
    roleId: "836273968058859581 · 978721383678894091 · 1491734052355444849 · 1564419081405337630",
    color: "#e67e22",
    privileges: [
      "Assign and update the 15 Parliamentary seats in the interactive hemicycle when MPs or Ministers change",
      "Publish official coalition and government campaign statements on the Campaign Board",
      "Vote in both public referendums and restricted executive/parliamentary divisions",
    ],
  },
  {
    tier: "Legislators & Cabinet Ministers",
    discordRole: "Member of Parliament · Minister of the Government · Senator",
    roleId: "1490455424812454149 · 836274885226397726 · 1006845578270998538",
    color: "#d97706",
    privileges: [
      "Hold an assigned seat in the 15-Seat III. Federal Parliament Hemicycle with portfolio attribution",
      "Vote in restricted Parliamentary divisions (bills, constitutional amendments, and confidence motions)",
      "View chamber-restricted results and publish campaign manifestos during election periods",
    ],
  },
  {
    tier: "Registered Party Leaders & Candidates",
    discordRole: "『🚩』Party Leader『🚩』 · Campaigning...",
    roleId: "891932223169765387 · 999227153415671909",
    color: "#d7342a",
    privileges: [
      "Publish official party manifestos, coalition slates, and campaign posters to the Website Campaigns section",
      "Remove or replace their own published campaign posts",
    ],
  },
  {
    tier: "Verified Citizens of the Empire",
    discordRole: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』",
    roleId: "836275657892954122",
    color: "#2ecc71",
    privileges: [
      "Sign in via Discord OAuth2 and cast secret ballots in all Parliamentary, Municipal, and Citizen Referendum votes",
      "Change their submitted ballot at any time while the poll remains open",
      "Inspect all public election circle graphs, D'Hondt seat allocations, and legislative archives",
    ],
  },
  {
    tier: "Restricted / Unverified Accounts",
    discordRole: "『🚫』Unverified『🚫』 · 『🛑』Quarantine『🛑』 · Non-Members",
    roleId: "875780258962505739 · 879725345677410304",
    color: "#64748b",
    privileges: [
      "Read-only access to public pages, national history, constitutional archives, and finalized public election results",
      "Blocked from Discord OAuth2 voting session creation and ballot submission until border verification is completed",
    ],
  },
] as const;

export const VOTING_WORKFLOW_MATRIX = [
  {
    voteType: "Parliamentary General Election (15 Seats)",
    discordChannel: "#『🗳』elections (852198106627047474)",
    eligibleVoters: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』 (Universal Suffrage)",
    votingRule: "Single-choice party/coalition list · D'Hondt 15-Seat Hemicycle",
    resultsVisibility: "Hidden while open → Public Circle Graph & Seat Hemicycle after close",
  },
  {
    voteType: "National Referendum (Constitution Art. 9)",
    discordChannel: "#『✅』citizen-polls『❌』 (871702306352144405)",
    eligibleVoters: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』 (Universal Suffrage)",
    votingRule: "Law / Referendum (Yes / No / Abstain) · Validity quorum (>50% of target threshold)",
    resultsVisibility: "Hidden while open (or Live Public if ordered) → Public after close",
  },
  {
    voteType: "Act of Parliament / Ordinary Bill (Art. 5)",
    discordChannel: "#the-parliament (1490456420444016871) → #federal-gazette",
    eligibleVoters: "『🕴』Member of Parliament『🕴』 & 『🕴』Speaker of the House『🕴』",
    votingRule: "Simple Majority (>50% present, quorum ≥ 8 MPs) + 120h Imperial Sanctio Regia window",
    resultsVisibility: "Chancellery Live Preview while open → Public in #federal-gazette after close",
  },
  {
    voteType: "Cardinal Law / Constitutional Amendment (Art. S & Art. 5(4))",
    discordChannel: "#the-parliament (1490456420444016871) → #『📢』throne-hall『🎂』",
    eligibleVoters: "『🕴』Member of Parliament『🕴』 & 『🕴』Speaker of the House『🕴』",
    votingRule: "Two-Thirds Supermajority (≥2/3 of MPs) + Imperial Assent in #throne-hall",
    resultsVisibility: "Chancellery Live Preview while open → Public upon promulgation",
  },
  {
    voteType: "Mayoral / Settlement Election (Art. 32)",
    discordChannel: "#『🗳』elections (852198106627047474)",
    eligibleVoters: "『🇭🇺』Citizen of Furnovskyland『🇭🇺』",
    votingRule: "Single-choice or Ranked-choice (IRV) · 5-month mandate",
    resultsVisibility: "Hidden while open → Public Circle Graph after close",
  },
] as const;

export function RolePrivilegesTable() {
  return (
    <div className="space-y-6">
      <div className="card overflow-hidden p-0 sm:p-0">
        <div className="flex items-center justify-between border-b border-border bg-bg-alt/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-secondary" />
            <h3 className="text-lg font-bold text-heading">Discord Role &amp; Website Privilege Rules</h3>
          </div>
          <span className="text-xs font-semibold text-muted">Live Discord Guild RBAC</span>
        </div>
        <div className="table-wrapper" role="region" aria-label="Discord Role and Website Privileges">
          <table className="data-table">
            <thead>
              <tr>
                <th>Constitutional Tier</th>
                <th>Discord Server Role(s)</th>
                <th>Website Privileges &amp; Permissions</th>
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
            <h3 className="text-lg font-bold text-heading">Website Voting Protocol, Discord Channels &amp; Results Visibility</h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <Eye className="size-3.5 text-secondary" /> Constitutional Voting Flow
          </span>
        </div>
        <div className="table-wrapper" role="region" aria-label="Website Voting Protocol and Results Visibility">
          <table className="data-table">
            <thead>
              <tr>
                <th>Division / Election Type</th>
                <th>Linked Discord Channel</th>
                <th>Who Can Vote (Discord Role)</th>
                <th>Majority &amp; Constitutional Rule</th>
                <th>Who Can See Results on Website</th>
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
