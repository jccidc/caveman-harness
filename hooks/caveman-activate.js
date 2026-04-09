#!/usr/bin/env node
// caveman-harness — activation hook
//
// - Writes a flag file so the statusline can show a persistent [CAVEMAN] badge
// - Emits the caveman ruleset (captured as SessionStart context by Claude Code)
//
// Wire this up in ~/.claude/settings.json under hooks.SessionStart:
//
//   {
//     "hooks": {
//       "SessionStart": [
//         {
//           "hooks": [
//             {
//               "type": "command",
//               "command": "node \"<path-to>/caveman-activate.js\"",
//               "statusMessage": "Loading caveman mode..."
//             }
//           ]
//         }
//       ]
//     }
//   }
//
// The flag file lives at ~/.claude/.caveman-active and is read by the
// statusline snippet in README.md to render the [CAVEMAN] badge.
//
// caveman-harness is a fork of JuliusBrussee/caveman — see README for details.

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.caveman-active');

try {
  fs.mkdirSync(path.dirname(flagPath), { recursive: true });
  fs.writeFileSync(flagPath, String(Date.now()));
} catch (e) {
  // Silent fail -- flag is best-effort, don't block the hook
}

process.stdout.write(
  "CAVEMAN MODE ACTIVE. Rules: Drop articles/filler/pleasantries/hedging. " +
  "Fragments OK. Short synonyms. Pattern: [thing] [action] [reason]. [next step]. " +
  "Not: 'Sure! I'd be happy to help you with that.' " +
  "Yes: 'Bug in auth middleware. Fix:' " +
  "— Append token savings footer to each response. " +
  "Code/commits/security: write normal. " +
  "User says 'normal' or 'verbose' to deactivate."
);
