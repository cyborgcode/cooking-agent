import {
  AlarmClock,
  Amphora,
  ArrowLeft,
  ArrowRight,
  Baby,
  BadgeCheck,
  Bean,
  Beef,
  BookOpen,
  Boxes,
  CakeSlice,
  CalendarDays,
  Carrot,
  Check,
  CheckCheck,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  Citrus,
  Clock,
  Coins,
  CookingPot,
  Croissant,
  Drumstick,
  Egg,
  ExternalLink,
  Filter,
  Fish,
  Flame,
  Gauge,
  Globe,
  HandPlatter,
  House,
  Info,
  Leaf,
  LeafyGreen,
  Languages,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Milk,
  Minus,
  Moon,
  Newspaper,
  Nut,
  PartyPopper,
  Pizza,
  Pause,
  Play,
  Plus,
  Printer,
  Refrigerator,
  RotateCcw,
  Salad,
  Search,
  Snowflake,
  Soup,
  Sparkles,
  Sprout,
  Store,
  Sun,
  Tag,
  Telescope,
  Timer,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Users,
  Utensils,
  UtensilsCrossed,
  Vegan,
  Wallet,
  Wheat,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Registre d'icônes de l'application.
 *
 * Toute icône affichée passe par ici : l'interface n'utilise aucun emoji,
 * uniquement des pictogrammes vectoriels, qui restent nets à toute taille
 * et s'alignent correctement dans un texte arabe comme français.
 */
export const ICONS = {
  // Navigation
  today: HandPlatter,
  recipes: BookOpen,
  week: CalendarDays,
  shopping: ListChecks,
  pantry: Refrigerator,
  brand: ChefHat,
  home: House,

  // Commerces
  market: Store,
  meat: Beef,
  fish: Fish,
  spice: Amphora,
  bread: Croissant,
  store: Boxes,

  // Catégories d'ingrédients
  legume: Carrot,
  fruit: Citrus,
  herbe: Sprout,
  viande: Drumstick,
  poisson: Fish,
  cremerie: Milk,
  epice: Amphora,
  cereale: Wheat,
  legumineuse: Bean,
  epicerie: Boxes,
  boulangerie: Croissant,

  // Catégories de plats
  plat: CookingPot,
  soupe: Soup,
  salade: Salad,
  entree: Egg,
  petit_dejeuner: Milk,
  dessert: CakeSlice,

  // Étiquettes de recette
  rapide: Timer,
  economique: Coins,
  vegetarien: Vegan,
  plat_unique: Utensils,
  ramadan: Moon,
  invites: PartyPopper,
  enfants: Baby,
  sans_gluten: Leaf,
  batch: Boxes,

  // Mesures et repères
  time: Clock,
  cost: Wallet,
  people: Users,
  difficulty: Gauge,
  season: LeafyGreen,
  heat: Flame,
  timer: AlarmClock,
  utensils: UtensilsCrossed,
  nut: Nut,

  // Saisons
  spring: Sprout,
  summer: Sun,
  autumn: Leaf,
  winter: Snowflake,

  // Cuisines
  tunisienne: HandPlatter,
  italienne: Pizza,

  // Thème
  themeLight: Sun,
  themeDark: Moon,

  // Recherche web et prix
  web: Globe,
  price: Tag,
  link: ExternalLink,
  up: TrendingUp,
  down: TrendingDown,
  discover: Telescope,
  article: Newspaper,
  verified: BadgeCheck,

  // Actions et états
  agent: Sparkles,
  tip: Lightbulb,
  search: Search,
  filter: Filter,
  check: Check,
  checkAll: CheckCheck,
  done: CircleCheck,
  pending: CircleDashed,
  add: Plus,
  remove: Minus,
  close: X,
  next: ChevronRight,
  prev: ChevronLeft,
  forward: ArrowRight,
  back: ArrowLeft,
  play: Play,
  pause: Pause,
  reset: RotateCcw,
  loading: LoaderCircle,
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  lang: Languages,
  print: Printer,
  trash: Trash2,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
  /** Texte alternatif : sans lui, l'icône est purement décorative. */
  label?: string;
}

/** Affiche une icône du registre. */
export function Icon({ name, className, size = 18, strokeWidth = 1.75, label }: IconProps) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
