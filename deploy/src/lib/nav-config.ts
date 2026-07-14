import type { ComponentType } from "react";

import {
  Calendar, Zap, BookOpen, Crosshair, Sliders, Eye, StickyNote, Brain,
  BarChart2, BookMarked, XCircle, Award, ExternalLink, LayoutGrid,
  Trophy, Home, GraduationCap, Heart, ListChecks, ListOrdered,
} from "lucide-react";

export type MainTab =
  | 'planner' | 'stress' | 'coreBTR' | 'marrow' | 'todolist'
  | 'pyq' | 'drills' | 'imagequiz' | 'custommock'
  | 'notes' | 'ai' | 'mnemonics' | 'flashcards' | 'mistakelogbook'
  | 'analytics' | 'toppers' | 'resources' | 'weakheatmap'
  | 'rewards';

export type NavGroup = 'home' | 'practice' | 'learn' | 'insights' | 'rewards';

export interface NavTab {
  id: MainTab;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

export interface NavGroupConfig {
  id: NavGroup;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  tabs: NavTab[];
}

export const NAV_GROUPS: NavGroupConfig[] = [
  {
    id: 'home',
    label: 'Home',
    Icon: Home,
    tabs: [
      { id: 'todolist', label: 'Daily Plan', Icon: ListChecks   },
      { id: 'planner',  label: 'Planner',   Icon: Calendar     },
      { id: 'coreBTR',  label: 'Core BTR',  Icon: ListOrdered  },
      { id: 'marrow',   label: 'Marrow',    Icon: GraduationCap},
      { id: 'stress',   label: 'Wellbeing', Icon: Heart        },
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    Icon: Zap,
    tabs: [
      { id: 'pyq',        label: 'PYQ',        Icon: BookOpen  },
      { id: 'drills',     label: 'Drills',     Icon: Crosshair },
      { id: 'imagequiz',  label: 'Image Bank', Icon: Eye       },
      { id: 'custommock', label: 'Custom Mock',Icon: Sliders   },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    Icon: GraduationCap,
    tabs: [
      { id: 'notes',          label: 'Notes',     Icon: StickyNote },
      { id: 'ai',             label: 'HY Ref',    Icon: BookOpen   },
      { id: 'mnemonics',      label: 'Mnemonics', Icon: Brain      },
      { id: 'flashcards',     label: 'Flashcards',Icon: BookMarked },
      { id: 'mistakelogbook', label: 'Logbook',   Icon: XCircle    },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    Icon: BarChart2,
    tabs: [
      { id: 'analytics',   label: 'Analytics',  Icon: BarChart2    },
      { id: 'toppers',     label: 'Toppers',    Icon: Award        },
      { id: 'resources',   label: 'Resources',  Icon: ExternalLink },
      { id: 'weakheatmap', label: 'Weak Areas', Icon: LayoutGrid   },
    ],
  },
  {
    id: 'rewards',
    label: 'Rewards',
    Icon: Trophy,
    tabs: [
      { id: 'rewards', label: 'Rewards', Icon: Trophy },
    ],
  },
];
