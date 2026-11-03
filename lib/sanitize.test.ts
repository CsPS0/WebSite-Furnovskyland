import { expect, test } from "bun:test";
import { resultsVisibilities } from "@/db/schema";
import { isVoteChannelId, resultsArePublic } from "./governance-config";
import { hexColor, isSafeImageUrl } from "./sanitize";

test("hexColor keeps #rrggbb and falls back on anything else", () => {
  expect(hexColor("#2563eb", "#000000")).toBe("#2563eb");
  expect(hexColor(" #ABCDEF ", "#000000")).toBe("#ABCDEF");
  for (const bad of ["red", "#fff", "#2563eb;background:url(x)", "", null]) {
    expect(hexColor(bad, "#000000")).toBe("#000000");
  }
});

test("isSafeImageUrl allows site paths and Discord's CDN only", () => {
  expect(isSafeImageUrl("/campaigns/poster.png")).toBe(true);
  expect(isSafeImageUrl("https://cdn.discordapp.com/attachments/1/2/a.png")).toBe(true);
  expect(isSafeImageUrl("https://media.discordapp.net/attachments/1/2/a.png")).toBe(true);
  for (const bad of [
    "//evil.com/a.png",
    "/\\evil.com/a.png",
    "http://cdn.discordapp.com/a.png",
    "https://evil.com/a.png",
    "https://cdn.discordapp.com.evil.com/a.png",
    "javascript:alert(1)",
    "data:image/png;base64,AAAA",
    "not a url",
  ]) {
    expect(isSafeImageUrl(bad)).toBe(false);
  }
});

test("isVoteChannelId accepts listed channels only", () => {
  expect(isVoteChannelId("852198106627047474")).toBe(true);
  expect(isVoteChannelId("../guilds/1/roles?")).toBe(false);
  expect(isVoteChannelId("123456789012345678")).toBe(false);
  expect(isVoteChannelId("")).toBe(false);
});

test("restricted visibilities keep the tally out of public announcements", () => {
  expect(Object.fromEntries(resultsVisibilities.map((v) => [v, resultsArePublic(v)]))).toEqual({
    after_close: true,
    live_public: true,
    live_admin_only: true,
    eligible_only: false,
    admin_only: false,
  });
});
