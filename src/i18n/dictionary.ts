import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import type { Locale } from "@/i18n/config";

// Statically imported so every locale is bundled at build time and each route
// stays fully prerendered — no request-time loading, no dynamic import cost.
const dictionaries = { en, fr } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
