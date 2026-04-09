# caveman-harness Roadmap

Fork tracker for [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — what's shipped, what's in flight upstream, and what we're holding for later.

This file lives in the fork, not upstream. Upstream doesn't need to know about our internal planning.

## Upstream PR Status

| # | Title | Status | Notes |
|---|-------|--------|-------|
| [#55](https://github.com/JuliusBrussee/caveman/pull/55) | `feat: optional SessionStart hook + visible [CAVEMAN] statusline badge` | ✅ Merged | Julius merged + added follow-up `4e91954` with `install.sh` + `hooks/README.md`. First contribution landed. |

## Fork-Only Additions

Things that live in this fork and aren't being pushed upstream (yet or ever). These are Claude Code harness integrations and stylistic choices that don't fit the lean upstream philosophy.

- `.claude-plugin/plugin.json` — renamed to `caveman-harness` with fork-maintainer metadata and upstream pointer
- `.claude-plugin/marketplace.json` — same rename
- `README.md` — fork notice at top, attribution section, "What This Fork Adds" table
- `hooks/install.sh` — URLs rewritten to fetch from `jccidc/caveman-harness` so fork users get a consistent install flow
- `skills/caveman/SKILL.md` — Token Savings Footer rule + Session Summary rule + German triggers (the German triggers are being upstreamed as PR 4/4 — see below)

## Quick Wins — Audit Results

Full audit of upstream `caveman` done 2026-04-09. 9 candidates identified, ranked by value/risk. 5 were selected for upstream PRs, 4 held.

### Shipped as Upstream PRs (4 grouped)

- **PR 1/4 — `fix/bash-statusline-escape`** — QW1 — Fix broken bash statusline example in `hooks/README.md`. The current snippet uses double-quoted `\033[...]` which bash treats as a literal string, not an escape sequence. Fix is one-line: switch to `$'\033[...]'` ANSI-C quoting so the escape actually interprets. Users who copy-paste the bash snippet today get the literal text `\033[38;5;172m[CAVEMAN]\033[0m` in their statusline instead of a colored badge.

- **PR 2/4 — `feat/install-sh-safety`** — QW3 + QW4 — Two install.sh safety fixes:
  - Back up `~/.claude/settings.json` to `settings.json.bak` before the node merge step so an interrupted write doesn't corrupt the user's settings
  - Check for `node` availability at script start and fail fast with a helpful message if it's missing (currently fails cryptically inside the heredoc)

- **PR 3/4 — `feat/hook-uninstall-script`** — QW2 — Add `hooks/uninstall.sh` companion that mirrors `install.sh`: removes `caveman-activate.js`, idempotently removes the SessionStart entry from `settings.json` via node, deletes the `.caveman-active` flag file. Symmetric feature completion — currently `hooks/README.md` documents uninstall as 3 manual steps.

- **PR 4/4 — `feat/german-activation-triggers`** — QW5 — Add German activation phrases (`kurz`, `kurz bitte`, `kurz&knapp`, `weniger text` → ON; `ausführlich` → OFF) to main `skills/caveman/SKILL.md` frontmatter + mirror copies. Julius is in the EU, likely to appreciate. Pure additive change to an existing trigger list.

### Held for Later

Not shipped yet. Revisit after we've had more merges land and know Julius's review style + what kinds of contributions he wants.

- **QW6 — Unify badge colors between bash + node examples in `hooks/README.md`**. Bash uses `38;5;172` (dim orange), node uses `1;38;5;208` (bright bold orange). Pick one canonical color. Cosmetic-only, not worth a standalone PR. Bundle with a future docs PR.

- **QW7 — Add shellcheck CI workflow for `install.sh`**. Add `.github/workflows/shellcheck.yml` that runs shellcheck on `hooks/*.sh` on PRs touching those files. Catches shell bugs before they ship. **Risk:** adding a CI workflow on someone else's repo can feel presumptuous — hold until we have 3+ merges and Julius has signalled he wants CI contributions.

- **QW8 — More language triggers (French, Spanish, Portuguese)**. Similar pattern to QW5 — `court`, `breve`, `conciso` → ON; `verbeux`, `detallado` → OFF. **Risk:** low, **value:** medium. Hold until we see how Julius reacts to PR 4/4 (German triggers). If he merges it enthusiastically, ship this as a follow-up. If he hesitates or asks questions about German, don't pile on.

- **QW9 — More robust hook-presence check in `install.sh`**. Current `grep -q "caveman-activate"` could false-positive on comments or unrelated fields. Use node to check structurally like the install does. **Risk:** low, **value:** low (edge case). Not worth a standalone PR — bundle with a future install.sh hardening PR if we find another safety issue.

## Sync Strategy

When Julius ships upstream changes, pull them into this fork:

```bash
cd caveman-harness
git fetch upstream
git merge upstream/main
# Resolve README.md conflicts (fork notice + branding) — always preserve fork-specific sections
# Resolve hooks/install.sh URL conflicts — always rewrite to jccidc/caveman-harness
# Push
git push origin main
```

When we want to PR something upstream, branch from `upstream/main` (not `origin/main`) so the PR diff doesn't include fork-only changes:

```bash
git fetch upstream
git checkout -b feat/whatever upstream/main
# make changes
git push -u origin feat/whatever
gh pr create --repo JuliusBrussee/caveman --base main --head jccidc:feat/whatever ...
```

## Historical Notes

- **2026-04-09** — Archived `jccidc/caveman-distillate` in favor of this repo. The distillate was a stripped-down fork of a stripped-down fork (dlepold → jccidc) and diverged from Julius's full-featured upstream. Going back to the source is cleaner.
- **2026-04-09** — PR #55 merged within hours of opening. Julius added `install.sh` + `hooks/README.md` on top — exactly the turnkey installer we'd identified as the next logical step.
