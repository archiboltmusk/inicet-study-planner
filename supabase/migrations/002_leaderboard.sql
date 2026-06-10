-- Leaderboard table for XP rankings
create table if not exists public.leaderboard (
  user_id     uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  xp          integer not null default 0,
  rank_title  text    not null default 'Intern',
  streak      integer not null default 0,
  completed   integer not null default 0,
  updated_at  timestamp with time zone default now()
);

alter table public.leaderboard enable row level security;

-- Everyone can read the leaderboard
drop policy if exists "leaderboard_read" on public.leaderboard;
create policy "leaderboard_read" on public.leaderboard
  for select using (true);

-- Users can only upsert their own row
drop policy if exists "leaderboard_write" on public.leaderboard;
create policy "leaderboard_write" on public.leaderboard
  for insert with check (auth.uid() = user_id);

drop policy if exists "leaderboard_update" on public.leaderboard;
create policy "leaderboard_update" on public.leaderboard
  for update using (auth.uid() = user_id);

-- Unlocked achievements table
create table if not exists public.user_achievements (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamp with time zone default now(),
  unique (user_id, achievement_id)
);

alter table public.user_achievements enable row level security;

drop policy if exists "achievements_read" on public.user_achievements;
create policy "achievements_read" on public.user_achievements
  for select using (true);

drop policy if exists "achievements_write" on public.user_achievements;
create policy "achievements_write" on public.user_achievements
  for insert with check (auth.uid() = user_id);
