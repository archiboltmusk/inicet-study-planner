# INICET Study Planner — Claude Instructions

## Git Workflow

### Auto-merge rule (MANDATORY)
After **every single commit** — no exceptions — immediately squash-merge to `main` and push. Do not wait to be asked. Do not leave work only on a feature branch.

**Step 1 — sync feature branch with latest main FIRST (prevents conflicts):**
```bash
git fetch origin main
git rebase origin/main
# If conflicts arise, resolve them, then: git rebase --continue
```

**Step 2 — squash-merge to main:**
```bash
git checkout main
git pull origin main
git merge --squash <feature-branch>
git commit -m "<descriptive message>"
git push -u origin main
git checkout <feature-branch>
```

Never use a regular merge (`git merge`) when targeting `main`. Always squash.

### After every task
Commit all changes, sync with main (`git fetch origin main && git rebase origin/main`), squash-merge to `main`, and push before stopping. Do not leave uncommitted or unpushed work on any branch.

### Why sync before merging
If you skip the rebase step, a long-running feature branch will drift from main. When main has received many commits (especially refactors), the diff becomes enormous and conflicts are hard to resolve. Rebasing early — ideally after every main push — keeps the diff small and conflicts trivial.
