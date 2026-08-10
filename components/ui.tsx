"use client";

import { Icon, type IconName } from "@/components/icons";

/** Petites briques d'interface partagées par toutes les pages. */

export function Badge({
  icon,
  children,
  tone = "neutral",
}: {
  icon?: IconName;
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "accent" | "olive";
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted",
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent",
    olive: "bg-olive-soft text-olive",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}

/** Une donnée chiffrée avec son icône : temps, coût, convives… */
export function Stat({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-muted">
        <Icon name={icon} size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-wide text-muted">{label}</span>
        <span className="block truncate text-sm font-semibold">{value}</span>
      </span>
    </div>
  );
}

export function SectionTitle({
  icon,
  children,
  action,
}: {
  icon: IconName;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <Icon name={icon} size={18} className="text-primary" />
        {children}
      </h2>
      {action}
    </div>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function Button({
  icon,
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-ink hover:opacity-90",
    secondary: "bg-surface-2 text-ink hover:bg-border",
    ghost: "text-muted hover:bg-surface-2 hover:text-ink",
  } as const;

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`}
    >
      {loading ? (
        <Icon name="loading" size={16} className="animate-spin" />
      ) : (
        icon && <Icon name={icon} size={16} />
      )}
      {children}
    </button>
  );
}

/** Bandeau d'information ou d'avertissement. */
export function Notice({
  icon = "info",
  children,
  tone = "info",
}: {
  icon?: IconName;
  children: React.ReactNode;
  tone?: "info" | "warning";
}) {
  const tones = {
    info: "bg-accent-soft text-accent",
    warning: "bg-primary-soft text-primary",
  } as const;

  return (
    <p className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs ${tones[tone]}`}>
      <Icon name={icon} size={15} className="mt-px shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Message affiché quand une liste est vide. */
export function EmptyState({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-surface-2 text-muted">
        <Icon name={icon} size={26} />
      </span>
      <p className="font-semibold">{title}</p>
      {children && <div className="max-w-sm text-sm text-muted">{children}</div>}
    </div>
  );
}
