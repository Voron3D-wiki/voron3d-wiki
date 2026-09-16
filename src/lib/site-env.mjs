// Which environment is this build for?
//
// This drives robots.txt and the `noindex` meta tag, so the failure modes are
// asymmetric and worth being explicit about:
//
//   - Dev accidentally indexed  -> a duplicate of the wiki competes with the
//     real one in search. Bad, but visible and recoverable.
//   - Production accidentally noindexed -> the site falls out of Google
//     entirely, taking the affiliate revenue with it. Catastrophic, and it can
//     take weeks to recover after the fix ships.
//
// So this deliberately **defaults to production**. A non-production deploy has
// to opt in by setting SITE_ENV, which means a forgotten variable can never
// deindex the live site. The dev deploy setting it is a documented, required
// step — see README.
//
// Set SITE_ENV=preview (or anything other than "production") on the dev Worker
// or Pages environment.

const explicit = process.env.SITE_ENV?.trim().toLowerCase();

// Cloudflare sets the branch on git-connected builds; treat anything that is
// not the default branch as non-production even if SITE_ENV was forgotten.
const branch = (process.env.CF_PAGES_BRANCH ?? process.env.WORKERS_CI_BRANCH ?? '').trim();

export const IS_PRODUCTION = explicit
  ? explicit === 'production'
  : branch
    ? branch === 'main'
    : true; // no signal at all: assume production, never deindex by accident

export const SITE_ENV = IS_PRODUCTION ? 'production' : (explicit || branch || 'preview');
