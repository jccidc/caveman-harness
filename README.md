<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/rock_1faa8.png" width="120" />
</p>

<h1 align="center">caveman-harness</h1>

<p align="center">
  <strong>caveman + Claude Code harness integrations</strong><br>
  <em>SessionStart hook · visible statusline badge · token footer · session summary</em>
</p>

<p align="center">
  <a href="https://github.com/jccidc/caveman-harness/stargazers"><img src="https://img.shields.io/github/stars/jccidc/caveman-harness?style=flat&color=yellow" alt="Stars"></a>
  <a href="https://github.com/jccidc/caveman-harness/commits/main"><img src="https://img.shields.io/github/last-commit/jccidc/caveman-harness?style=flat" alt="Last Commit"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/jccidc/caveman-harness?style=flat" alt="License"></a>
</p>

<p align="center">
  <a href="#what-this-fork-adds">Fork Additions</a> •
  <a href="#before--after">Before/After</a> •
  <a href="#install">Install</a> •
  <a href="#visible-mode-badge">Visible Badge</a> •
  <a href="#intensity-levels">Levels</a> •
  <a href="#caveman-skills">Skills</a> •
  <a href="#benchmarks">Benchmarks</a>
</p>

---

> **This is a fork of [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) by [Julius Brussee](https://github.com/JuliusBrussee).**
> All the core caveman magic — the intensity levels, wenyan mode, sub-skills, compression tool, benchmarks, evals — is his work. Full credit and thanks to Julius for creating the original and releasing it under MIT. If you like this fork, please also **[star the original](https://github.com/JuliusBrussee/caveman)** ⭐ — that's where the real work lives.
>
> `caveman-harness` layers a small set of Claude Code harness integrations on top: a `SessionStart` activation hook, a persistent `[CAVEMAN]` statusline badge, a per-response token savings footer, a goodbye/exit session summary, and German activation triggers. See [What This Fork Adds](#what-this-fork-adds) for details. Everything else below is Julius's original documentation, lightly updated with fork-specific install commands.

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill/plugin and Codex plugin that makes agent talk like caveman — cutting **~75% of output tokens** while keeping full technical accuracy. Now with [文言文 mode](#文言文-wenyan-mode), [terse commits](#caveman-commit), [one-line code reviews](#caveman-review), and a [compression tool](#caveman-compress) that cuts **~45% of input tokens** every session.

Based on the viral observation that caveman-speak dramatically reduces LLM token usage without losing technical substance. So we made it a one-line install.

## What This Fork Adds

`caveman-harness` is a **pure superset** of the original — nothing is removed, only added. All additions are **harness-level** (Claude Code hooks, statusline, settings.json), not skill-level. The skill rules themselves are unchanged from Julius's original, plus a few German triggers and two new behavioral rules (footer + session summary).

| Addition | What it does | Scope |
|---|---|---|
| `hooks/caveman-activate.js` | SessionStart hook that auto-loads the caveman ruleset into Claude's context on every session start and writes a `~/.claude/.caveman-active` flag file | Claude Code only |
| Visible `[CAVEMAN]` statusline badge | Persistent orange badge in your statusline proving caveman mode is loaded (SessionStart hook output is otherwise invisible to users) | Claude Code only |
| Token savings footer | After each caveman response, appends `> Caveman saved ~X% (~N tokens)` so you can see compression working in real time | All tools |
| Session summary | On `goodbye` / `exit`, shows cumulative responses compressed + estimated tokens saved for the session | All tools |
| German activation triggers | `kurz`, `kurz bitte`, `kurz&knapp`, `weniger text` → ON; `ausführlich` → OFF | All tools |

**What's unchanged from Julius's original:**
- All 6 intensity levels (lite / full / ultra / wenyan-lite / wenyan-full / wenyan-ultra)
- `caveman-commit` and `caveman-review` sub-skills
- `caveman-compress` standalone Python tool
- Auto-clarity rules for destructive operations
- Benchmarks and evals harness
- Multi-tool support (Cursor, Codex, agents)
- `caveman.skill` ZIP bundle

If you want the lean original with none of the harness extras, install `JuliusBrussee/caveman` directly.

## Before / After

<table>
<tr>
<td width="50%">

### 🗣️ Normal Claude (69 tokens)

> "The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time, which triggers a re-render. I'd recommend using useMemo to memoize the object."

</td>
<td width="50%">

### 🪨 Caveman Claude (19 tokens)

> "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

</td>
</tr>
<tr>
<td>

### 🗣️ Normal Claude

> "Sure! I'd be happy to help you with that. The issue you're experiencing is most likely caused by your authentication middleware not properly validating the token expiry. Let me take a look and suggest a fix."

</td>
<td>

### 🪨 Caveman Claude

> "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"

</td>
</tr>
</table>

**Same fix. 75% less word. Brain still big.**

**Pick your level of grunt:**

<table>
<tr>
<td width="25%">

#### 🪶 Lite

> "Your component re-renders because you create a new object reference each render. Inline object props fail shallow comparison every time. Wrap it in `useMemo`."

</td>
<td width="25%">

#### 🪨 Full

> "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

</td>
<td width="25%">

#### 🔥 Ultra

> "Inline obj prop → new ref → re-render. `useMemo`."

</td>
<td width="25%">

#### 📜 文言文

> "物出新參照，致重繪。useMemo Wrap之。"

</td>
</tr>
</table>

**Same answer. You pick how many word.**

```
┌─────────────────────────────────────┐
│  TOKENS SAVED          ████████ 75% │
│  TECHNICAL ACCURACY    ████████ 100%│
│  SPEED INCREASE        ████████ ~3x │
│  VIBES                 ████████ OOG │
└─────────────────────────────────────┘
```

- **Faster response** — less token to generate = speed go brrr
- **Easier to read** — no wall of text, just the answer
- **Same accuracy** — all technical info kept, only fluff removed ([science say so](https://arxiv.org/abs/2604.00025))
- **Save money** — ~71% less output token = less cost
- **Fun** — every code review become comedy

## Install

**Install this fork (with harness additions):**

```bash
npx skills add jccidc/caveman-harness
```

`npx skills` supports 40+ agents. To install for a specific agent:

```bash
npx skills add jccidc/caveman-harness -a cursor
npx skills add jccidc/caveman-harness -a github-copilot
npx skills add jccidc/caveman-harness -a cline
npx skills add jccidc/caveman-harness -a windsurf
npx skills add jccidc/caveman-harness -a codex
```

Or with Claude Code plugin system:

```bash
claude plugin marketplace add jccidc/caveman-harness
claude plugin install caveman-harness@caveman-harness
```

**Prefer the lean original?** Install Julius's upstream instead — no harness extras, same core skill:

```bash
npx skills add JuliusBrussee/caveman
```

Codex:

1. Clone repo
2. Open Codex in repo
3. Run `/plugins`
4. Search `Caveman`
5. Install plugin

> [!NOTE]
> **Windows Codex users:** Clone repo → VS Code → Codex Settings → Plugins → find `Caveman` under local marketplace → Install → Reload Window. Also enable `git config core.symlinks true` before cloning (requires developer mode or admin).

Install once. Use in all sessions after that. One rock. That it.

## Visible Mode Badge

Claude Code `SessionStart` hooks inject their stdout as hidden system-reminder context — useful for Claude, invisible to you in the terminal. If you want persistent visual confirmation that caveman mode is loaded, wire up the included activation hook and add a small badge to your statusline.

### 1. Install the activation hook

Copy `hooks/caveman-activate.js` from this repo to `~/.claude/hooks/caveman-activate.js`, then add it to your `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"~/.claude/hooks/caveman-activate.js\"",
            "statusMessage": "Loading caveman mode..."
          }
        ]
      }
    ]
  }
}
```

The hook writes a flag file at `~/.claude/.caveman-active` and emits the caveman ruleset as session context.

### 2. Add the badge to your statusline

In your Claude Code statusline script (reads JSON on stdin, writes a single line to stdout), check for the flag file and prepend a badge:

```js
const fs = require('fs');
const path = require('path');
const os = require('os');

// ...existing statusline logic...

let cavemanBadge = '';
const cavemanFlag = path.join(os.homedir(), '.claude', '.caveman-active');
if (fs.existsSync(cavemanFlag)) {
  // Bold orange [CAVEMAN]
  cavemanBadge = '\x1b[1;38;5;208m[CAVEMAN]\x1b[0m │ ';
}

process.stdout.write(`${cavemanBadge}${model} │ ${dirname}`);
```

Restart Claude Code and an orange `[CAVEMAN]` badge sits in your statusline for the entire session — no more wondering whether the hook fired.

### Why a flag file?

`SessionStart` hook stdout goes into Claude's context, not your terminal. The statusline runs as a separate process and can't see that context. A flag file is the simplest bridge between "the hook ran" and "the statusline can prove it."

## Usage

Trigger with:
- `/caveman` or Codex `$caveman`
- "talk like caveman"
- "caveman mode"
- "less tokens please"

Stop with: "stop caveman" or "normal mode"

### Intensity Levels

| Level | Trigger | What it do |
|-------|---------|------------|
| **Lite** | `/caveman lite` | Drop filler, keep grammar. Professional but no fluff |
| **Full** | `/caveman full` | Default caveman. Drop articles, fragments, full grunt |
| **Ultra** | `/caveman ultra` | Maximum compression. Telegraphic. Abbreviate everything |

### 文言文 (Wenyan) Mode

Classical Chinese literary compression — same technical accuracy, but in the most token-efficient written language humans ever invented.

| Level | Trigger | What it do |
|-------|---------|------------|
| **Wenyan-Lite** | `/caveman wenyan-lite` | Semi-classical. Grammar intact, filler gone |
| **Wenyan-Full** | `/caveman wenyan` | Full 文言文. Maximum classical terseness |
| **Wenyan-Ultra** | `/caveman wenyan-ultra` | Extreme. Ancient scholar on a budget |

Level stick until you change it or session end.

## Caveman Skills

| Skill | What it do | Trigger |
|-------|-----------|---------|
| **caveman-commit** | Terse commit messages. Conventional Commits. ≤50 char subject. Why over what. | `/caveman-commit` |
| **caveman-review** | One-line PR comments: `L42: 🔴 bug: user null. Add guard.` No throat-clearing. | `/caveman-review` |

### caveman-compress

Caveman make Claude *speak* with fewer tokens. **Compress** make Claude *read* fewer tokens.

Your `CLAUDE.md` loads on **every session start**. Caveman Compress rewrites memory files into caveman-speak so Claude reads less — without you losing the human-readable original.

```
/caveman:compress CLAUDE.md
```

```
CLAUDE.md          ← compressed (Claude reads this every session — fewer tokens)
CLAUDE.original.md ← human-readable backup (you read and edit this)
```

| File | Original | Compressed | Saved |
|------|----------:|----------:|------:|
| `claude-md-preferences.md` | 706 | 285 | **59.6%** |
| `project-notes.md` | 1145 | 535 | **53.3%** |
| `claude-md-project.md` | 1122 | 687 | **38.8%** |
| `todo-list.md` | 627 | 388 | **38.1%** |
| `mixed-with-code.md` | 888 | 574 | **35.4%** |
| **Average** | **898** | **494** | **45%** |

Code blocks, URLs, file paths, commands, headings, dates, version numbers — anything technical passes through untouched. Only prose gets compressed. See the full [caveman-compress README](caveman-compress/README.md) for details. [Security note](./caveman-compress/SECURITY.md): Snyk flags this as High Risk due to subprocess/file patterns — it's a false positive.

## Benchmarks

Real token counts from the Claude API ([reproduce it yourself](benchmarks/)):

<!-- BENCHMARK-TABLE-START -->
| Task | Normal (tokens) | Caveman (tokens) | Saved |
|------|---------------:|----------------:|------:|
| Explain React re-render bug | 1180 | 159 | 87% |
| Fix auth middleware token expiry | 704 | 121 | 83% |
| Set up PostgreSQL connection pool | 2347 | 380 | 84% |
| Explain git rebase vs merge | 702 | 292 | 58% |
| Refactor callback to async/await | 387 | 301 | 22% |
| Architecture: microservices vs monolith | 446 | 310 | 30% |
| Review PR for security issues | 678 | 398 | 41% |
| Docker multi-stage build | 1042 | 290 | 72% |
| Debug PostgreSQL race condition | 1200 | 232 | 81% |
| Implement React error boundary | 3454 | 456 | 87% |
| **Average** | **1214** | **294** | **65%** |

*Range: 22%–87% savings across prompts.*
<!-- BENCHMARK-TABLE-END -->

> [!IMPORTANT]
> Caveman only affects output tokens — thinking/reasoning tokens are untouched. Caveman no make brain smaller. Caveman make *mouth* smaller. Biggest win is **readability and speed**, cost savings are a bonus.

A March 2026 paper ["Brevity Constraints Reverse Performance Hierarchies in Language Models"](https://arxiv.org/abs/2604.00025) found that constraining large models to brief responses **improved accuracy by 26 percentage points** on certain benchmarks and completely reversed performance hierarchies. Verbose not always better. Sometimes less word = more correct.

## Evals

Caveman not just claim 75%. Caveman **prove** it.

The `evals/` directory has a three-arm eval harness that measures real token compression against a proper control — not just "verbose vs skill" but "terse vs skill". Because comparing caveman to verbose Claude conflate the skill with generic terseness. That cheating. Caveman not cheat.

```bash
# Run the eval (needs claude CLI)
uv run python evals/llm_run.py

# Read results (no API key, runs offline)
uv run --with tiktoken python evals/measure.py
```

Snapshots committed to git. CI runs free. Every number change reviewable as diff. Add a skill, add a prompt — harness pick it up automatically.

## Star Both Repos

If caveman save you mass token, mass money — leave mass star on **both**. The original is where the real work is; this fork is a thin harness layer on top. ⭐

- **[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)** — the original (star this one first)
- **[jccidc/caveman-harness](https://github.com/jccidc/caveman-harness)** — this fork with Claude Code harness additions

[![Star History Chart](https://api.star-history.com/svg?repos=JuliusBrussee/caveman,jccidc/caveman-harness&type=Date)](https://star-history.com/#JuliusBrussee/caveman&jccidc/caveman-harness&Date)

## Also by Julius Brussee

- **[Blueprint](https://github.com/JuliusBrussee/blueprint)** — specification-driven development for Claude Code. Natural language → blueprints → parallel builds → working software.
- **[Revu](https://github.com/JuliusBrussee/revu-swift)** — local-first macOS study app with FSRS spaced repetition, decks, exams, and study guides. [revu.cards](https://revu.cards)

## License & Attribution

MIT — free like mass mammoth on open plain.

- **Original work:** Copyright (c) Julius Brussee — [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)
- **Fork additions:** Copyright (c) jccidc — [github.com/jccidc/caveman-harness](https://github.com/jccidc/caveman-harness)

The original LICENSE file is preserved unchanged. All core caveman functionality (skill rules, intensity levels, wenyan variants, sub-skills, compress tool, benchmarks, evals) is Julius's work. This fork adds only harness-level integrations — see [What This Fork Adds](#what-this-fork-adds) for the full delta.
