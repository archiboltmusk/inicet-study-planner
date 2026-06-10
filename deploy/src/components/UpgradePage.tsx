import { useState } from "react";
import {
  CheckCircle2, Sparkles, Zap, Brain, BarChart2,
  CalendarCheck, FlaskConical, Crown, RefreshCw,
} from "lucide-react";
import { useSubscription, startCheckout, PLANS, type Plan } from "@/lib/subscription";
import { useAuth } from "@/lib/auth";

const PREMIUM_FEATURES = [
  { icon: Sparkles,      label: "Clinical Socratic Engine",            desc: "An AI tutor that grills you on clinical scenarios until you own the concept — server-funded, no API key needed. Free users read static notes; you get interrogated until the answer is instinctive." },
  { icon: CalendarCheck, label: "Dynamic Retention Protocol",          desc: "SM-2 flashcards scheduled by your memory decay curve, not gut feeling — pings you exactly on the day a topic hits the critical threshold. Micro, Pharma, Patho included." },
  { icon: BarChart2,     label: "Vulnerability Heatmap & Diagnostics", desc: "Actively diagnoses where you are bleeding marks. Visual heatmap of high-yield subjects that need immediate triage." },
  { icon: Brain,         label: "Knowledge Gap Diagnostic",            desc: "Pinpoints the topics you think you know but don't — before the exam does it for you." },
  { icon: FlaskConical,  label: "High-Fidelity Exam Drills",           desc: "Adaptive, timed INI-CET simulations that replicate the exact cognitive fatigue of the real exam — not casual practice." },
  { icon: Zap,           label: "Auto Mistake Cloud Sync",             desc: "Every wrong answer is logged and synced across devices, feeding the AI tutor your personal weak points." },
];

// Replace with your real support inbox before going live on Razorpay
const SUPPORT_EMAIL = "support@inicetplanner.app";

const LEGAL_SECTIONS = [
  {
    title: "Terms of Service",
    body: `INICET Planner Premium grants access to the premium feature set (AI tutor, retention scheduling, diagnostics, exam drills) for the duration purchased — 30 days (Monthly Pulse) or 180 days (INI-CET Cycle Pass). Subscriptions are personal, tied to your signed-in account, and may not be shared or resold. Study content is provided for exam preparation only and is not medical advice. We may suspend accounts that abuse the service (e.g. automated scraping or credential sharing).`,
  },
  {
    title: "Privacy Policy",
    body: `We store your account email, study progress, and subscription status in Supabase to sync your data across devices. Payment card / UPI details are handled entirely by Razorpay — they never touch our servers. Questions you ask the AI tutor are sent to the AI provider to generate a response and are not used to train models. We do not sell your data. You can request deletion of your account and all associated data at any time via the support email below.`,
  },
  {
    title: "Refund & Cancellation Policy",
    body: `Plans are one-time purchases with no auto-renewal, so there is nothing to cancel. If you were charged and premium did not activate within 24 hours, contact support with your payment ID for a full refund. Refunds for change of mind are available within 7 days of purchase, provided premium features have not been substantially used. Approved refunds are processed back to the original payment method by Razorpay within 5–7 business days.`,
  },
];

const FREE_FEATURES = [
  "Daily Planner & Checklists",
  "Core BTR + Marrow Tracker",
  "PYQ Browser",
  "Subject Notes Editor",
  "Drills & Rapid Fire",
  "One-liners, PSM Calc, Image Bank",
  "Community, Toppers, Resources",
  "Rewards & Streaks",
];

export function UpgradePage() {
  const { session, user } = useAuth();
  const { isPremium, daysLeft, plan, expiresAt, loading, refresh } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("cycle");
  const [purchasing, setPurchasing]     = useState(false);
  const [toast, setToast]               = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  }

  async function handleCheckout() {
    if (purchasing) return;
    setPurchasing(true);
    await startCheckout(
      selectedPlan,
      user?.email,
      session,
      (expiresAt) => {
        refresh();
        showToast("success", `Premium unlocked! Expires ${new Date(expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.`);
        setPurchasing(false);
      },
      (msg) => {
        showToast("error", msg);
        setPurchasing(false);
      },
    );
  }

  if (loading) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg ${
          toast.type === "success"
            ? "bg-emerald-500/90 text-white"
            : "bg-red-500/90 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
            <Crown className="w-7 h-7 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">INICET Planner Premium</h1>
        <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
          The free tier organises your desk. The premium tier actively manages your brain.
          Let the algorithm handle revision scheduling, diagnose your weak subjects,
          and run adaptive drills — so you focus on studying, not planning.
        </p>
      </div>

      {/* Current subscription badge */}
      {isPremium && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-emerald-300 font-semibold">
              Premium active — {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
            </p>
            <p className="text-slate-400 text-sm">
              {PLANS[plan!].label} · Expires {expiresAt?.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <button
            onClick={() => { void handleCheckout(); }}
            className="ml-auto flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Extend
          </button>
        </div>
      )}

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(["monthly", "cycle"] as Plan[]).map((p) => {
          const plan = PLANS[p];
          const isSelected = selectedPlan === p;
          const isCycle    = p === "cycle";
          return (
            <button
              key={p}
              onClick={() => setSelectedPlan(p)}
              className={`relative text-left rounded-2xl border p-5 transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              {isCycle && (
                <span className="absolute -top-2.5 left-4 bg-indigo-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">{plan.label}</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                <span className="text-slate-400 text-sm">
                  {p === "monthly" ? "/month" : "/6 months"}
                </span>
              </div>
              {isCycle && (
                <div className="text-emerald-400 text-xs font-medium mb-3">
                  Save ₹{PLANS.monthly.price * 6 - PLANS.cycle.price} vs monthly
                </div>
              )}
              <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                isSelected ? "border-indigo-500 bg-indigo-500" : "border-slate-600"
              }`} />
            </button>
          );
        })}
      </div>

      {/* Checkout button */}
      {!isPremium && (
        <button
          onClick={() => { void handleCheckout(); }}
          disabled={purchasing || !user}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl text-base transition-colors"
        >
          {purchasing
            ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing…</>
            : <><Sparkles className="w-4 h-4" /> Unlock Premium — ₹{PLANS[selectedPlan].price}</>}
        </button>
      )}

      {!user && (
        <p className="text-center text-slate-500 text-sm -mt-4">
          Sign in first to complete payment.
        </p>
      )}

      {/* Premium features */}
      <div>
        <h2 className="text-base font-semibold text-slate-300 mb-4">The Premium Intelligence Layer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PREMIUM_FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex gap-3 bg-slate-800/50 rounded-xl p-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">{label}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free features */}
      <div className="bg-slate-800/40 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Always free</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          {FREE_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-slate-600 text-xs">
        Payments processed securely by Razorpay. UPI, cards, net banking accepted.
        No auto-renewal — you choose when to extend.
      </p>

      {/* Legal — required for Razorpay live-mode approval */}
      <div className="border-t border-slate-800 pt-6 space-y-2">
        {LEGAL_SECTIONS.map(({ title, body }) => (
          <details key={title} className="group bg-slate-800/30 rounded-xl px-4 py-3">
            <summary className="text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer list-none flex items-center justify-between">
              {title}
              <span className="text-slate-600 group-open:rotate-90 transition-transform">›</span>
            </summary>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 whitespace-pre-line">{body}</p>
          </details>
        ))}
        <p className="text-center text-slate-700 text-[11px] pt-2">
          Support: {SUPPORT_EMAIL}
        </p>
      </div>
    </div>
  );
}
