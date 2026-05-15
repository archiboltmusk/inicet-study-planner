import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export interface XPToastItem {
  id: number;
  amount: number;
  label: string;
}

interface Props {
  items: XPToastItem[];
  onDismiss: (id: number) => void;
}

export function XPToastLayer({ items, onDismiss }: Props) {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col-reverse gap-2 pointer-events-none">
      {items.map(item => (
        <XPToastBubble key={item.id} item={item} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function XPToastBubble({ item, onDismiss }: { item: XPToastItem; onDismiss: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 20);
    const hide = setTimeout(() => setVisible(false), 1800);
    const done = setTimeout(() => onDismiss(item.id), 2200);
    return () => { clearTimeout(show); clearTimeout(hide); clearTimeout(done); };
  }, [item.id, onDismiss]);

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-full border border-violet-500/40 bg-violet-900/80 backdrop-blur-sm text-sm font-mono font-bold text-violet-300 shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <Zap className="w-3.5 h-3.5 text-violet-400" />
      +{item.amount} XP
      {item.label && <span className="text-violet-400/60 text-xs font-normal hidden sm:inline">{item.label}</span>}
    </div>
  );
}

let _counter = 0;

export function makeToastItem(amount: number, label: string): XPToastItem {
  return { id: ++_counter, amount, label };
}
