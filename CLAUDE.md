# INICET Study Planner — Claude Instructions

## Git Workflow

### Auto-merge rule (MANDATORY)
After **every single commit** — no exceptions — immediately squash-merge to `main` and push. Do not wait to be asked. Do not leave work only on a feature branch.

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
Commit all changes, squash-merge to `main`, and push before stopping. Do not leave uncommitted or unpushed work on any branch.
