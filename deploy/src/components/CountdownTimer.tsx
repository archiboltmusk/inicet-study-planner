import React from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  timeLeft: TimeLeft;
  compact?: boolean;
}

export function CountdownTimer({ timeLeft, compact = false }: Props) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const segments: { value: string; label: string; accent?: boolean }[] = [
    { value: pad(timeLeft.days),    label: "DAYS" },
    { value: pad(timeLeft.hours),   label: "HRS"  },
    { value: pad(timeLeft.minutes), label: "MIN"  },
    { value: pad(timeLeft.seconds), label: "SEC", accent: true },
  ];

  if (compact) {
    return (
      <div
        className="flex items-center gap-2 font-mono"
        role="timer"
        aria-label="Time remaining until exam"
        aria-live="off"
      >
        {segments.map((seg, i) => (
          <React.Fragment key={seg.label}>
            <div className="flex flex-col items-center min-w-[32px]">
              <span className={`text-xl font-bold leading-none ${seg.accent ? 'text-primary/70' : 'text-primary'}`}>
                {seg.value}
              </span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{seg.label}</span>
            </div>
            {i < segments.length - 1 && (
              <span className="text-border text-sm pb-3">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 sm:gap-6 bg-background border border-border px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-mono"
      role="timer"
      aria-label="Time remaining until exam"
      aria-live="off"
    >
      {segments.map((seg, i) => (
        <React.Fragment key={seg.label}>
          <div className="flex flex-col items-center">
            <span className={`text-lg sm:text-2xl font-bold ${seg.accent ? 'text-accent-foreground' : 'text-primary'}`}>
              {seg.value}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">{seg.label}</span>
          </div>
          {i < segments.length - 1 && (
            <span className="text-border font-light">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
