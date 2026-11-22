export interface ResolvedAddress {
  url: string;
  isSearch: boolean;
}

export function resolveWebAddress(input: string): ResolvedAddress | null {
  const value = input.trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) {
    return { url: value, isSearch: false };
  }

  if (
    /^localhost(:\d+)?(\/.*)?$/i.test(value) ||
    /^[\w-]+(\.[\w-]+)+([/:?#].*)?$/i.test(value)
  ) {
    return { url: `https://${value}`, isSearch: false };
  }

  return {
    // Most search engines block framing; Marginalia is an independent search
    // engine that renders inside the in-app browser.
    url: `https://search.marginalia.nu/search?query=${encodeURIComponent(value)}`,
    isSearch: true,
  };
}

export function webAddressLabel(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.host.replace(/^www\./, "");
    const path = parsed.pathname === "/" ? "" : parsed.pathname;
    return `${host}${path}`;
  } catch {
    return url;
  }
}

export function webDocumentTitle(url: string) {
  return `Web view: ${webAddressLabel(url)}`;
}
