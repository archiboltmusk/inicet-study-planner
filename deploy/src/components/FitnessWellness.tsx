import { useState } from "react";
import {
  Dumbbell, Apple, Moon, Flame, ChevronDown, ChevronUp,
  Footprints, Droplets, Clock, CheckCircle2, AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "workout" | "diet" | "recovery";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCHEDULE = [
  { day: "Mon", label: "Upper Body + Core", type: "upper"  as const, emoji: "💪" },
  { day: "Tue", label: "Lower Body + Abs",  type: "lower"  as const, emoji: "🦵" },
  { day: "Wed", label: "Active Rest / Walk",type: "rest"   as const, emoji: "🚶" },
  { day: "Thu", label: "Upper Body + Core", type: "upper"  as const, emoji: "💪" },
  { day: "Fri", label: "Lower Body + Abs",  type: "lower"  as const, emoji: "🦵" },
  { day: "Sat", label: "Rest / Light Cardio",type: "rest"  as const, emoji: "😴" },
  { day: "Sun", label: "Rest",              type: "rest"   as const, emoji: "😴" },
];

const UPPER_EXERCISES = [
  { name: "Pull-ups",                   sets: "3", reps: "To failure",  note: "Loop resistance band over bar for assistance if needed. Or jump up and lower slowly." },
  { name: "Push-ups",                   sets: "3", reps: "To failure",  note: "Elbows at 45° to protect shoulders and target chest." },
  { name: "Band Seated Rows",           sets: "3", reps: "15",          note: "Sit on mat, loop band around feet, pull toward belly button squeezing your back." },
  { name: "Dumbbell Shoulder Press",    sets: "3", reps: "15",          note: "5 kg. Sit tall, press overhead." },
  { name: "Dumbbell Lateral Raises",    sets: "3", reps: "12–15",       note: "5 kg. Slow and controlled — widens your shoulders." },
  { name: "Ab Roller",                  sets: "3", reps: "8–12",        note: "Kneel on yoga mat. Core tight, back slightly rounded. Only roll as far as you can control." },
];

const LOWER_EXERCISES = [
  { name: "Band Front Squats",          sets: "3", reps: "15",          note: "Step on band with both feet, pull top to shoulder level, squat deep." },
  { name: "Dumbbell Lunges",            sets: "3", reps: "12 / leg",    note: "5 kg each hand. Drop back knee close to floor." },
  { name: "Band Romanian Deadlifts",    sets: "3", reps: "15",          note: "Step on band, push hips back until hamstring stretch, then stand." },
  { name: "Glute Bridges",              sets: "3", reps: "20",          note: "Lie on mat, bend knees, thrust hips up, squeeze glutes at the top." },
  { name: "Plank",                      sets: "3", reps: "45–60 sec",   note: "Forearms on mat. Core braced, straight line from head to heels." },
];

const DIET_DAYS = [
  {
    day: "Monday",
    breakfast: "3 Boiled/Omelette Eggs + 2 slices brown bread",
    lunch: "1 cup Rice + 1 bowl Dal + 150g Chicken breast curry (low oil)",
    snack: "Green Tea + Roasted Chana",
    dinner: "2 Rotis + 100g Paneer bhurji + Cucumber salad",
  },
  {
    day: "Tuesday",
    breakfast: "1 bowl Oats + Milk + 1 scoop Whey (or 3 egg whites)",
    lunch: "1 cup Rice + 150g Fish (Rohu/Katla) curry + Mixed veg",
    snack: "1 Apple + 10 Almonds",
    dinner: "2 Rotis + Soya chunks curry + Side salad",
  },
  {
    day: "Wednesday",
    breakfast: "2 Besan Chillas + 2 Boiled Eggs",
    lunch: "2 Rotis + 1 bowl Dal + 150g Chicken Saagwala",
    snack: "Black Coffee/Tea + Roasted Makhana",
    dinner: "1 large bowl Dal + 3 Boiled Eggs + Sautéed greens",
  },
  {
    day: "Thursday",
    breakfast: "1 bowl Poha with peanuts + 3 Egg whites",
    lunch: "1 cup Rice + 100g Paneer sabzi + 1 bowl Dal",
    snack: "Greek Yogurt / thick Curd",
    dinner: "2 Rotis + 150g Grilled Chicken + Salad",
  },
  {
    day: "Friday",
    breakfast: "3-Egg Omelette with spinach + 1 Roti",
    lunch: "1 cup Rice + 150g Fish curry + Green beans",
    snack: "Peanuts + 1 Banana",
    dinner: "Mixed Sprouts salad + 100g Paneer",
  },
  {
    day: "Saturday",
    breakfast: "1 bowl Dalia + 3 Boiled Eggs",
    lunch: "2 Rotis + 150g Chicken curry + Salad",
    snack: "Tea + Roasted Chana",
    dinner: "2 Rotis + 1 bowl Dal + 2 Egg Bhurji",
  },
  {
    day: "Sunday",
    breakfast: "Paneer sandwich (2 brown bread + 50g paneer)",
    lunch: "1.5 cups Rice + 150g Chicken or lean Mutton + Salad",
    snack: "1 Orange or Papaya bowl",
    dinner: "100g Chicken breast + Sautéed vegetables (no roti/rice)",
  },
];

const QUICK_MEALS = [
  {
    meal: "Breakfast",
    time: "2 min",
    options: [
      "Sattu drink (3–4 tbsp Sattu + water + black salt + lemon) + 3 Boiled Eggs",
      "Overnight Oats (mix oats + milk/curd + peanuts the night before) + 3 Boiled Eggs",
    ],
  },
  {
    meal: "Lunch",
    time: "5–10 min",
    options: [
      "1 large cup Rice (cook in bulk for 2 days) + 1 bowl thick Dal OR Soya Chunks soaked in hot water",
      "1 whole Cucumber or Carrot, eaten raw",
    ],
  },
  {
    meal: "Snack",
    time: "0 min",
    options: [
      "Black Coffee/Tea + 1 bowl plain Dahi mixed with banana/apple",
      "Handful of roasted chana or peanuts",
    ],
  },
  {
    meal: "Dinner",
    time: "5–10 min",
    options: [
      "2 Rotis (buy pre-made whole wheat) OR 1 cup leftover rice",
      "100g Paneer (raw cubes with chaat masala) OR 3-egg omelette/bhurji + tomato-onion salad",
    ],
  },
];

const RECOVERY_TIPS = [
  { icon: Moon,      color: "text-indigo-400", title: "7–8 Hours Sleep",      body: "Muscle is built and fat burned during sleep, not in the gym. Poor sleep spikes cortisol — the hormone that makes your body hold onto belly fat." },
  { icon: Footprints,color: "text-green-400",  title: "8,000–10,000 Steps/day",body: "Daily movement outside workouts. This alone burns 200–300 extra calories without touching your recovery." },
  { icon: Droplets,  color: "text-blue-400",   title: "3–4 Litres Water",     body: "Keep a 2-litre bottle on your desk and refill it once. Dehydration mimics hunger and tanks cognitive performance." },
  { icon: Flame,     color: "text-orange-400", title: "Consistency > Intensity",body: "6 months of moderate training beats 2 weeks of extreme effort followed by burnout. Show up, do the work, leave." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExerciseCard({ ex }: { ex: typeof UPPER_EXERCISES[0] }) {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{ex.name}</span>
        <span className="text-xs font-mono text-primary shrink-0">{ex.sets} × {ex.reps}</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{ex.note}</p>
    </div>
  );
}

function SectionToggle({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/60 rounded-lg text-sm font-medium text-foreground transition-colors"
    >
      {label}
      {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FitnessWellness() {
  const [activeSection, setActiveSection] = useState<Section>("workout");
  const [openUpper, setOpenUpper] = useState(true);
  const [openLower, setOpenLower] = useState(false);
  const [openQuickMeals, setOpenQuickMeals] = useState(false);
  const [openFullChart, setOpenFullChart] = useState(false);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">

      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-foreground">Body Recomposition Plan — NEET PG Edition</h2>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Lose fat, build muscle, keep studying. Calibrated for home equipment (pull-up bar, resistance bands, 5 kg dumbbells, ab roller).
              <span className="text-primary ml-1">~1,700–1,900 kcal · 115–140 g protein/day.</span>
            </p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Calories/day", value: "1,700–1,900", color: "text-orange-400" },
            { label: "Protein/day",  value: "115–140 g",   color: "text-blue-400"   },
            { label: "Workout days", value: "4 per week",  color: "text-violet-400" },
          ].map(s => (
            <div key={s.label} className="bg-muted/30 rounded-lg p-3 text-center">
              <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2">
        {([
          { id: "workout",  label: "Workout",  emoji: "🏋️" },
          { id: "diet",     label: "Diet",     emoji: "🥗" },
          { id: "recovery", label: "Recovery", emoji: "🌙" },
        ] as { id: Section; label: string; emoji: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeSection === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* ── WORKOUT ─────────────────────────────────────────────────────────── */}
      {activeSection === "workout" && (
        <div className="flex flex-col gap-3">

          {/* Weekly schedule */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase mb-3">Weekly Schedule</h3>
            <div className="grid grid-cols-7 gap-1.5">
              {SCHEDULE.map(d => (
                <div key={d.day}
                  className={`rounded-lg p-2 text-center ${
                    d.type === "rest" ? "bg-muted/20 border border-border/50" : "bg-primary/10 border border-primary/20"
                  }`}
                >
                  <div className="text-lg leading-none">{d.emoji}</div>
                  <div className="text-[10px] font-mono font-bold text-foreground mt-1">{d.day}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{d.label.split(" ")[0]}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">
              ⚡ Warm-up every session: 5 min arm circles + jumping jacks + bodyweight squats.
              Time under tension — perform each rep slowly, squeeze the muscle, pause at top and bottom.
            </p>
          </div>

          {/* Upper body */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <SectionToggle
              label="💪 Day 1 & 4 — Upper Body + Core"
              open={openUpper}
              onToggle={() => setOpenUpper(v => !v)}
            />
            {openUpper && (
              <div className="p-4 grid gap-2">
                {UPPER_EXERCISES.map(ex => <ExerciseCard key={ex.name} ex={ex} />)}
              </div>
            )}
          </div>

          {/* Lower body */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <SectionToggle
              label="🦵 Day 2 & 5 — Lower Body + Abs"
              open={openLower}
              onToggle={() => setOpenLower(v => !v)}
            />
            {openLower && (
              <div className="p-4 grid gap-2">
                {LOWER_EXERCISES.map(ex => <ExerciseCard key={ex.name} ex={ex} />)}
              </div>
            )}
          </div>

          {/* NEET PG note */}
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-violet-300">Study-break adaptation:</span> If exhausted from studying, just do 20 minutes.
              Prioritise <span className="text-foreground">Pull-ups, Band Rows, and Glute Bridges</span> — these specifically reverse the "hunched over desk" posture.
              A quick workout increases blood flow to the brain and burns off cortisol from long study sessions.
            </div>
          </div>
        </div>
      )}

      {/* ── DIET ────────────────────────────────────────────────────────────── */}
      {activeSection === "diet" && (
        <div className="flex flex-col gap-3">

          {/* Rules */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase mb-3">Golden Rules</h3>
            <div className="grid gap-2">
              {[
                { icon: "🫙", text: "Cooking oil: 3–4 tsp total per day (mustard oil, olive oil, or ghee)" },
                { icon: "🍚", text: "\"1 cup rice\" = ~150g cooked rice" },
                { icon: "💧", text: "3–4 litres water daily — keep a bottle on your desk" },
                { icon: "🥩", text: "Protein sources: chicken breast, eggs, fish (Rohu/Katla), paneer, dal, soya chunks, curd" },
              ].map(r => (
                <div key={r.text} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-base leading-none shrink-0">{r.icon}</span>
                  <span>{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick meals for NEET PG */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <SectionToggle
              label="⏱️ Minimal-Prep Meals (for NEET PG prep)"
              open={openQuickMeals}
              onToggle={() => setOpenQuickMeals(v => !v)}
            />
            {openQuickMeals && (
              <div className="p-4 grid gap-3">
                {QUICK_MEALS.map(m => (
                  <div key={m.meal} className="bg-muted/30 border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-foreground">{m.meal}</span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                        <Clock className="w-3 h-3" /> {m.time} prep
                      </span>
                    </div>
                    {m.options.map((opt, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground mt-1">
                        <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground">
                  💡 <strong>Sattu tip (Bengal):</strong> Sattu needs zero cooking, is high in protein, and can be made in 60 seconds.
                  Pressure-cooker Dal Khichdi = 5 min prep + 15 min unattended. Boil eggs while brushing your teeth.
                </p>
              </div>
            )}
          </div>

          {/* 7-day chart */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <SectionToggle
              label="📅 Full 7-Day Diet Chart (~1,700–1,800 kcal)"
              open={openFullChart}
              onToggle={() => setOpenFullChart(v => !v)}
            />
            {openFullChart && (
              <div className="p-4 grid gap-3">
                {DIET_DAYS.map(d => (
                  <div key={d.day} className="bg-muted/20 border border-border rounded-lg p-3">
                    <div className="text-xs font-bold text-primary mb-2">{d.day}</div>
                    <div className="grid gap-1.5">
                      {[
                        { label: "🌅 Breakfast", value: d.breakfast },
                        { label: "☀️ Lunch",     value: d.lunch     },
                        { label: "🍎 Snack",     value: d.snack     },
                        { label: "🌙 Dinner",    value: d.dinner    },
                      ].map(row => (
                        <div key={row.label} className="flex gap-2 text-[11px]">
                          <span className="text-muted-foreground shrink-0 w-20">{row.label}</span>
                          <span className="text-foreground/80">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground">
                  📸 Progress tip: Take a photo in the same lighting every 2 weeks.
                  The scale may not move much (muscle weighs more than fat) but your physique will visibly tighten. 8 weeks = massive difference.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── RECOVERY ────────────────────────────────────────────────────────── */}
      {activeSection === "recovery" && (
        <div className="flex flex-col gap-3">
          {RECOVERY_TIPS.map(tip => (
            <div key={tip.title} className="bg-card border border-border rounded-xl p-4 flex gap-4">
              <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                <tip.icon className={`w-5 h-5 ${tip.color}`} />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{tip.title}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tip.body}</p>
              </div>
            </div>
          ))}

          {/* Body recomp note */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-emerald-300 block mb-1">BMI 25.6 — Body Recomposition Strategy</span>
              The goal is not just weight loss — it is losing fat while building muscle simultaneously.
              Cardio alone makes you a smaller version of your current shape.
              <strong className="text-foreground"> Resistance training + protein + slight caloric deficit</strong> is what reshapes the physique.
              You cannot spot-reduce fat, but a consistent routine will take care of the whole body.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
