import type { ReactNode } from "react";
import { Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface Props {
  isPremium: boolean;
  feature: string;
  onUpgrade: () => void;
  children: ReactNode;
}

export function PremiumGate({ isPremium, feature, onUpgrade, children }: Props) {
  const { isGuest, user } = useAuth();

  if (isPremium) return <>{children}</>;

  const notLoggedIn = isGuest || !user;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-indigo-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        {feature} is Premium
      </h2>

      <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
        {notLoggedIn
          ? "Sign in and upgrade to access the intelligence layer — the part of the planner that actively manages your brain, not just your schedule."
          : `${feature} is part of the Premium intelligence layer. Less than one Marrow mock costs — and unlike a mock, this adapts to your specific weak points.`}
      </p>

      <button
        onClick={onUpgrade}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        {notLoggedIn ? "Sign in to Upgrade" : "Upgrade to Premium"}
      </button>

      <p className="text-slate-600 text-xs mt-6">
        ₹199/month · ₹899 for 6 months · No auto-renewal
      </p>
    </div>
  );
}
