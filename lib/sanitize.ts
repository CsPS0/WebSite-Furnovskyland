/** A #rrggbb colour, or the fallback: the value ends up in inline styles and SVG fills. */
export function hexColor(value: FormDataEntryValue | null, fallback: string) {
  const s = String(value ?? "").trim();
  return /^#[0-9a-f]{6}$/i.test(s) ? s : fallback;
}

// Every visitor loads campaign posters, so an arbitrary host would see all their IP addresses.
const IMAGE_HOSTS = ["cdn.discordapp.com", "media.discordapp.net"];

/** A path on this site or an https image on Discord's CDN. */
export function isSafeImageUrl(url: string) {
  if (/[\u0000-\u001F\u007F\\]/.test(url)) return false;
  if (url.startsWith("/")) return !url.startsWith("//");
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && IMAGE_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}
