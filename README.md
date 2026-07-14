# INICET Study Planner

A study planner for the INI-CET / NEET PG exam (Aug 30, 2026). Tracks daily study progress, mistakes, mock tests, and revision cycles in one offline-first PWA.

Built with React + Vite. Works fully offline via localStorage, with optional Supabase cloud sync for signed-in users.

## Features
- Live countdown to exam day
- Daily plan, study grid, and Core BTR / Marrow revision schedules
- Subject-wise PYQ bank, drills, image quiz bank, and custom mock generator
- Mistake Logbook — auto-captures wrong answers with subject/topic/reason breakdown
- Spaced-repetition flashcards (Leitner system + SM-2 + Ebbinghaus retention curve)
- Mock test analytics — concept/topic/difficulty breakdown, weak-area detection, trend tracking
- Weekly Review checkpoint — auto-pulled from the mistake logbook and study streak
- Weak-topic heatmap, notes editor, mnemonics bank, high-yield reference
- Gamification (XP, streaks, achievements) and wellbeing/stress tracking
- Offline-first with background sync, and real-time Supabase cloud sync for premium users

## Stack
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Zustand for local state, Supabase for auth + cloud sync
- Vite PWA plugin (installable, offline-capable)
- Vitest for unit/integration tests
- pnpm monorepo (app source lives in `deploy/`)
