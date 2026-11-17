// Small local list of common disposable / throwaway email domains (Phase 1).
// Phase 3 may swap this for a maintained list or API.
export const disposableDomains = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "sharklasers.com",
  "10minutemail.com", "10minutemail.net", "10minutemail.co.uk", "tempmail.com", "temp-mail.org",
  "temp-mail.io", "tempmailo.com", "tempmail.net", "throwawaymail.com", "yopmail.com", "yopmail.net",
  "yopmail.fr", "getnada.com", "nada.email", "dispostable.com", "trashmail.com", "trashmail.de",
  "trashmail.net", "maildrop.cc", "mailnesia.com", "mintemail.com", "fakeinbox.com", "spamgourmet.com",
  "mohmal.com", "emailondeck.com", "burnermail.io", "getairmail.com", "mailcatch.com", "moakt.com",
  "mytemp.email", "inboxkitten.com", "tempinbox.com", "discard.email", "spambox.us", "tmail.ws",
  "mailpoof.com", "33mail.com", "fakemail.net", "emailfake.com", "tempr.email", "anonbox.net",
  "harakirimail.com", "mail-temp.com", "minuteinbox.com", "byom.de", "trbvm.com", "wegwerfmail.de",
  "einrot.com", "grr.la", "pokemail.net", "spam4.me", "mailtemp.uk", "tempmail.plus", "1secmail.com",
  "1secmail.net", "1secmail.org", "dropmail.me", "emltmp.com", "linshiyouxiang.net", "tmpmail.org",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  if (disposableDomains.has(domain)) return true;
  // sub-domains of known services, e.g. "x.mailinator.com"
  return [...disposableDomains].some((d) => domain.endsWith(`.${d}`));
}
