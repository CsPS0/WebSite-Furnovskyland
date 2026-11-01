"use client";

import { useState } from "react";
import { Crown, Edit3, Shield, UserCheck } from "lucide-react";
import { updateParliamentSeat } from "@/app/actions/parliament";
import type { ParliamentSeat } from "@/db/schema";
import { HemicycleChart, type HemicycleSeat } from "./hemicycle";

const PARTY_COLOR_PRESETS = [
  { label: "Alliance for Furnovskyland (Red)", value: "#d60000" },
  { label: "Christian-Conservative Party (White)", value: "#ffffff" },
  { label: "United Furnovskyland (Orange)", value: "#ff8c00" },
  { label: "Independent / Partner (Grey)", value: "#d9d9d9" },
  { label: "Liberal Party (Blue)", value: "#206694" },
  { label: "Integral Nationalist Party (Green)", value: "#1f8b4c" },
];

export function ParliamentChamber({
  seats,
  canManage,
}: {
  seats: ParliamentSeat[];
  canManage: boolean;
}) {
  const [selectedSeatNum, setSelectedSeatNum] = useState<number>(seats[0]?.seatNumber ?? 1);
  const [editing, setEditing] = useState(false);

  const selected = seats.find((s) => s.seatNumber === selectedSeatNum) ?? seats[0];

  const coalitionHemicycle: HemicycleSeat[] = seats.map((s) => ({
    seatNumber: s.seatNumber,
    color: s.coalition === "government" ? "#d60000" : "#ffffff",
    label: s.memberName,
    sublabel: `${s.party} · ${s.coalition === "government" ? "Government" : "Opposition"}`,
  }));

  const partyHemicycle: HemicycleSeat[] = seats.map((s) => ({
    seatNumber: s.seatNumber,
    color: s.color,
    label: s.memberName,
    sublabel: `${s.party} · ${s.role}`,
  }));

  const govSeats = seats.filter((s) => s.coalition === "government");
  const oppSeats = seats.filter((s) => s.coalition === "opposition");

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <HemicycleChart
            seats={coalitionHemicycle}
            selectedSeat={selectedSeatNum}
            onSelectSeat={(n) => {
              setSelectedSeatNum(n);
              setEditing(false);
            }}
            title="Coalition Seat Distribution (15 Seats)"
            subtitle={`Governing Majority (${govSeats.length} Red) · Opposition (${oppSeats.length} White)`}
          />
          <div className="mt-4 flex flex-wrap justify-center gap-4 border-t border-border pt-3 text-xs">
            <span className="inline-flex items-center gap-2 font-semibold text-heading">
              <span className="size-3.5 rounded-full bg-[#d60000]" /> Governing Coalition ({govSeats.length})
            </span>
            <span className="inline-flex items-center gap-2 font-semibold text-heading">
              <span className="size-3.5 rounded-full border border-slate-400 bg-white" /> Opposition ({oppSeats.length})
            </span>
          </div>
        </div>

        <div className="card">
          <HemicycleChart
            seats={partyHemicycle}
            selectedSeat={selectedSeatNum}
            onSelectSeat={(n) => {
              setSelectedSeatNum(n);
              setEditing(false);
            }}
            title="Individual Party Seat Breakdown (15 Seats)"
            subtitle="Click any seat in the arch to inspect or assign its Member of Parliament"
          />
          <div className="mt-4 flex flex-wrap justify-center gap-3 border-t border-border pt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-heading">
              <span className="size-3 rounded-full bg-[#d60000]" /> AfF (8)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-heading">
              <span className="size-3 rounded-full border border-slate-400 bg-[#d9d9d9]" /> Ind. / Partner (1)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-heading">
              <span className="size-3 rounded-full border border-slate-400 bg-white" /> CCP (5)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-heading">
              <span className="size-3 rounded-full bg-[#ff8c00]" /> United Furnovskyland (1)
            </span>
          </div>
        </div>
      </div>

      {selected && (
        <div className="card border-secondary/40 bg-bg-alt/60">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary font-serif text-lg font-bold shadow-sm"
                style={{
                  backgroundColor: selected.color,
                  color:
                    selected.color.toLowerCase() === "#ffffff" || selected.color.toLowerCase() === "#d9d9d9"
                      ? "#0f172a"
                      : "#ffffff",
                }}
              >
                #{selected.seatNumber}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge">{selected.coalition === "government" ? "Governing Majority" : "Opposition Bench"}</span>
                  <span className="text-xs font-semibold text-secondary">{selected.party}</span>
                </div>
                <h3 className="mt-1 text-2xl font-bold text-heading">{selected.memberName}</h3>
                <p className="text-sm font-medium text-text">{selected.role}</p>
                {selected.userId && (
                  <p className="mt-1 font-mono text-xs text-muted">Discord ID: {selected.userId}</p>
                )}
              </div>
            </div>

            {canManage && (
              <button
                type="button"
                onClick={() => setEditing((v) => !v)}
                className="btn-ghost px-3.5 py-2 text-xs"
              >
                <Edit3 className="size-4" />
                {editing ? "Close Seat Editor" : `Assign / Edit Seat #${selected.seatNumber}`}
              </button>
            )}
          </div>

          {canManage && editing && (
            <form
              action={async (fd) => {
                await updateParliamentSeat(fd);
                setEditing(false);
              }}
              className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <input type="hidden" name="seatNumber" value={selected.seatNumber} />
              <label className="block">
                <span className="label">Member Name (RP / Display Name)</span>
                <input name="memberName" required defaultValue={selected.memberName} className="input" />
              </label>
              <label className="block">
                <span className="label">Discord User ID</span>
                <input name="userId" defaultValue={selected.userId ?? ""} placeholder="e.g. 387777487503097868" className="input font-mono text-sm" />
              </label>
              <label className="block">
                <span className="label">Political Party</span>
                <input name="party" required defaultValue={selected.party} className="input" />
              </label>
              <label className="block">
                <span className="label">Parliamentary Bench</span>
                <select name="coalition" defaultValue={selected.coalition} className="input">
                  <option value="government">Governing Majority</option>
                  <option value="opposition">Opposition Bench</option>
                </select>
              </label>
              <label className="block">
                <span className="label">Cabinet / Parliamentary Role</span>
                <input name="role" required defaultValue={selected.role} className="input" />
              </label>
              <label className="block">
                <span className="label">Party Seat Color</span>
                <select name="color" defaultValue={selected.color} className="input">
                  {PARTY_COLOR_PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="sm:col-span-2 lg:col-span-3">
                <button type="submit" className="btn-primary text-sm">
                  Save Seat #{selected.seatNumber} Assignment
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-heading">
              <Crown className="size-5 text-secondary" /> Governing Majority ({govSeats.length} Seats)
            </h3>
            <span className="text-xs font-semibold text-muted">Seats #1 – #{govSeats.length}</span>
          </div>
          <ul className="space-y-2">
            {govSeats.map((s) => (
              <li key={s.seatNumber}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeatNum(s.seatNumber);
                    setEditing(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left transition ${
                    selectedSeatNum === s.seatNumber
                      ? "border-secondary bg-secondary/10"
                      : "border-border bg-bg-alt/40 hover:border-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-black/20 text-xs font-bold"
                      style={{
                        backgroundColor: s.color,
                        color: s.color.toLowerCase() === "#ffffff" || s.color.toLowerCase() === "#d9d9d9" ? "#0f172a" : "#ffffff",
                      }}
                    >
                      {s.seatNumber}
                    </span>
                    <div>
                      <p className="font-semibold text-heading">{s.memberName}</p>
                      <p className="text-xs text-muted">{s.role}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-secondary">{s.party}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-heading">
              <Shield className="size-5 text-primary dark:text-link" /> Her Majesty&apos;s Opposition ({oppSeats.length} Seats)
            </h3>
            <span className="text-xs font-semibold text-muted">
              Seats #{govSeats.length + 1} – #{seats.length}
            </span>
          </div>
          <ul className="space-y-2">
            {oppSeats.map((s) => (
              <li key={s.seatNumber}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeatNum(s.seatNumber);
                    setEditing(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left transition ${
                    selectedSeatNum === s.seatNumber
                      ? "border-secondary bg-secondary/10"
                      : "border-border bg-bg-alt/40 hover:border-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-400 text-xs font-bold"
                      style={{
                        backgroundColor: s.color,
                        color: s.color.toLowerCase() === "#ffffff" || s.color.toLowerCase() === "#d9d9d9" ? "#0f172a" : "#ffffff",
                      }}
                    >
                      {s.seatNumber}
                    </span>
                    <div>
                      <p className="font-semibold text-heading">{s.memberName}</p>
                      <p className="text-xs text-muted">{s.role}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-muted">{s.party}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted">
        <UserCheck className="size-4 text-secondary" />
        Seats are allocated via the D&apos;Hondt proportional representation method under the October 24, 2026 Constitution and may be updated by the Emperor, Electoral Administrators, or Parliamentary Leadership when substitutions occur.
      </p>
    </div>
  );
}
