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

function build() {
  const map = new Map();

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
