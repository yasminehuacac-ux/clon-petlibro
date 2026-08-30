# Codex workflow

## Start a task

1. Open the repository root in VS Code.
2. Confirm the intended branch and `git status`.
3. Open Codex and begin a fresh chat for the phase.
4. Ask Codex to implement the exact task file.
5. Require a short plan before edits for complex work.

Starter instruction:

```text
Execute tasks/TASK-XXX-NAME.md.
Read AGENTS.md and every document referenced by the task before changing code.
Inspect the existing Horizon implementation first. Stay strictly within scope.
At completion, run the required verification and write reports/TASK-XXX-RESULT.md.
Do not deploy, install apps, or change Git remotes.
```

## During execution

- Answer only real commercial or scope decisions.
- Do not redirect Codex toward later tasks.
- Require Codex to stop on conflicting data rather than invent values.
- Inspect diffs and command output as work proceeds.

## Windows development terminals

- In PowerShell, use `shopify.cmd` when script-execution policy blocks `shopify.ps1`.
- Run `shopify.cmd theme dev` in a dedicated terminal and keep that process isolated for the duration of live validation.
- Run Git, Theme Check, and other test commands in a second terminal so they do not interrupt the development server.
- Never store storefront passwords, authentication codes, preview URLs, or temporary development-theme IDs in repository files, command transcripts, reports, or commits.

## Close a task

1. Read the result report.
2. Review the diff.
3. Reproduce critical behavior.
4. Send the report/screenshots to ChatGPT Work for commercial and visual QA.
5. Return reproducible defects to Codex.
6. Approve the gate before changing the next task to `READY`.
7. Commit only after the result is accepted or at a deliberate checkpoint.

## Session strategy

Use a fresh Codex chat for each major task. Persistent context belongs in repository files, not in an indefinitely growing conversation.
