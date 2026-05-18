# INICET Study Planner — Claude Instructions

## Git Workflow

### Merging to main
Always squash-merge feature branches into main and push immediately:

```bash
git checkout main
git merge --squash <feature-branch>
git commit -m "<descriptive message>"
git push -u origin main
```

Never use a regular merge (`git merge`) when targeting `main`. Always squash.

### After every task
Commit all changes and push to `main` before stopping. Do not leave uncommitted or unpushed work.
