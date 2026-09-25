/**
 * Returns an external URL only when it is safe to place in an href or src.
 * Portfolio content is editable from Supabase, so it must be treated as
 * untrusted at the rendering boundary.
 */
export function safeExternalUrl(
  value: string | undefined | null,
): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
