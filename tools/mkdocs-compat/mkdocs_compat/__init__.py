"""Temporary shim so a stale `mkdocs build` command builds the Astro site.

This site migrated from MkDocs Material to Astro + Starlight. Cloudflare Pages
holds its build command and output directory in the dashboard, which this repo
cannot change, and the project was created with:

    build command:     pip install -r requirements.txt && mkdocs build
    output directory:  site

Rather than block a preprod deploy on someone editing that form, installing this
package puts a `mkdocs` executable on PATH that runs the real build. Combined
with scripts/mirror-output.mjs publishing to both `dist/` and `site/`, the deploy
succeeds under either the old or the new dashboard configuration.

REMOVE THIS once the Pages project is confirmed to be on:

    build command:     npm ci && npm run build
    output directory:  dist

Delete `tools/mkdocs-compat/`, drop the `./tools/mkdocs-compat` line from
requirements.txt, and delete requirements.txt if nothing else needs it.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys

def _find_root() -> str:
    """Locate the repo root.

    Deliberately not derived from ``__file__``: pip installs this package into
    site-packages, so walking up from the module lands in the virtualenv. Build
    systems run the build command from the repo root, so start at the working
    directory and walk up until package.json turns up.
    """
    directory = os.path.abspath(os.getcwd())
    while True:
        if os.path.exists(os.path.join(directory, "package.json")):
            return directory
        parent = os.path.dirname(directory)
        if parent == directory:
            raise SystemExit(
                "[mkdocs-compat] could not find package.json above "
                f"{os.getcwd()} — run the build from the repo root."
            )
        directory = parent


def _run(command: list[str], root: str) -> None:
    print(f"[mkdocs-compat] $ {' '.join(command)}", flush=True)
    result = subprocess.run(command, cwd=root)
    if result.returncode != 0:
        # Fail loudly. A silent partial build would publish a broken site.
        raise SystemExit(
            f"[mkdocs-compat] '{' '.join(command)}' exited {result.returncode}"
        )


def main() -> None:
    root = _find_root()
    print(
        "[mkdocs-compat] This site is built with Astro, not MkDocs.\n"
        "[mkdocs-compat] Running the Astro build instead. See "
        "tools/mkdocs-compat/ for how to remove this shim.",
        flush=True,
    )

    npm = shutil.which("npm")
    if npm is None:
        raise SystemExit(
            "[mkdocs-compat] npm not found on PATH. The build image needs Node "
            "20 or newer — set NODE_VERSION=22 in the Pages environment."
        )

    # `npm ci` needs the lockfile; fall back to `npm install` if it is absent so
    # the shim degrades rather than dying on a detail.
    if os.path.exists(os.path.join(root, "package-lock.json")):
        _run([npm, "ci"], root)
    else:
        _run([npm, "install"], root)

    _run([npm, "run", "build"], root)

    # npm run build already mirrors dist/ -> site/. Verify rather than assume,
    # because which one Pages publishes depends on the dashboard setting.
    for directory in ("dist", "site"):
        path = os.path.join(root, directory)
        if not os.path.isdir(path):
            raise SystemExit(f"[mkdocs-compat] expected {directory}/ to exist after build")
        print(f"[mkdocs-compat] {directory}/ ready", flush=True)

    print("[mkdocs-compat] build complete", flush=True)


if __name__ == "__main__":
    sys.exit(main())
