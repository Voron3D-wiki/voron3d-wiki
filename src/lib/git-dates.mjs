// Last-modified date per content file, from git history.
//
// Starlight's `lastUpdated: true` did this internally. Doing it here keeps the
// footer honest without a frontmatter field authors would have to remember to
// bump.
//
// One `git log` pass builds the whole map, rather than a `git log -1` per file.
// At 75 pages that is the difference between one process and 75, which is worth
// the extra parsing.

import { execFileSync } from 'node:child_process';

let cache = null;

function git(args, options = {}) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], ...options });
}

// Cloudflare Pages builds from a shallow clone. There, every file's "last
// commit" is the single commit that was fetched, so every page would claim it
// was updated on the day of the build. Try to fetch the rest of the history
// first; if that is not possible, report no dates at all — no date is better
// than a wrong one. Full local clones and CI (fetch-depth: 0) skip this.
function hasFullHistory() {
  try {
    if (git(['rev-parse', '--is-shallow-repository']).trim() !== 'true') return true;
  } catch {
    return false;
  }
  try {
    git(['fetch', '--unshallow', '--no-tags', '--quiet'], { timeout: 60_000 });
    return git(['rev-parse', '--is-shallow-repository']).trim() !== 'true';
  } catch {
    console.warn('git-dates: shallow clone and --unshallow failed; omitting "last updated" dates.');
    return false;
  }
}

function build() {
  const map = new Map();

  if (!hasFullHistory()) return map;

  let out;
  try {
    out = execFileSync(
      'git',
      ['log', '--pretty=format:%ct', '--name-only', '--no-merges', '--', 'src/content'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
    );
  } catch {
    // No git (a tarball export, or a CI checkout without history). The footer
    // just omits the date rather than failing the build.
    return map;
  }

  let timestamp = null;
  for (const line of out.split('\n')) {
    const text = line.trim();
    if (text === '') continue;

    if (/^\d+$/.test(text)) {
      timestamp = Number(text) * 1000;
      continue;
    }

    // git log walks newest first, so the first time a path appears is its most
    // recent commit. Later (older) mentions must not overwrite it.
    if (timestamp !== null && !map.has(text)) map.set(text, new Date(timestamp));
  }

  return map;
}

/** Last commit date for a repo-relative path, or null. */
export function lastUpdated(filePath) {
  if (!filePath) return null;
  cache ??= build();
  return cache.get(filePath.split('\\').join('/')) ?? null;
}
