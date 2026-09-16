/**
 * TODO — replace every use of this with a real date.
 *
 * Nothing in the feed has a genuine publication date yet. This constant exists
 * so that is impossible to miss: grep for TODO_DATE and every unset entry
 * appears at once.
 *
 * Fix them before the first deploy. Once a feed is public, `published` and the
 * entry id are the two fields that cannot be quietly corrected — subscribers
 * have already stored them, and changing either re-notifies everyone. While
 * nobody is subscribed, they are still free.
 *
 * Until then, entries all share one timestamp and the feed's order is just the
 * order of the content modules.
 */
export const TODO_DATE = "2026-01-01T00:00:00Z";
