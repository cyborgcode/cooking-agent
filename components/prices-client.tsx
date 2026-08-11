"use client";

import { useCallback, useState } from "react";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { Badge, Button, Notice } from "@/components/ui";
import { formatTND } from "@/lib/scale";
import type { PriceConfidence, PriceReport } from "@/lib/market-prices";

const CONFIDENCE_KEYS = {
  haute: "confidenceHigh",
  moyenne: "confidenceMedium",
  basse: "confidenceLow",
} as const;

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatDate(iso: string, lang: "fr" | "ar"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(lang === "ar" ? "ar-TN" : "fr-TN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PricesClient({
  month,
  initialIds,
}: {
  month: number;
  initialIds: string[];
}) {
  const { t, s, lang } = useLang();

  const [report, setReport] = useState<PriceReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const check = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/prix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientIds: initialIds, month }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setReport((await response.json()) as PriceReport);
    } catch {
      setFailed(true);
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, [initialIds, month]);

  const verified = report?.prices.filter((p) => p.webPrice !== undefined) ?? [];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-lg font-extrabold">
          <Icon name="price" size={20} className="text-primary" />
          {t("pricesTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted">{t("pricesHelp")}</p>
      </div>

      <Button icon="web" loading={loading} onClick={check} className="w-full">
        {loading ? t("checking") : t("checkPrices")}
      </Button>

      {failed && (
        <Notice icon="error" tone="warning">
          {t("error")}
        </Notice>
      )}

      {report && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Badge icon={report.source === "web" ? "web" : "pantry"} tone={report.source === "web" ? "olive" : "neutral"}>
              {report.source === "web" ? t("priceSourceWeb") : t("priceSourceCatalogue")}
            </Badge>
            <span className="text-xs text-muted">
              {t("lastChecked")} {formatDate(report.fetchedAt, lang)}
            </span>
          </div>

          {report.notice && <Notice icon="info">{report.notice}</Notice>}

          <ul className="card divide-y overflow-hidden">
            {report.prices.map((price) => {
              const rising = (price.delta ?? 0) > 0;
              return (
                <li key={price.ingredientId} className="px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                      {s(price.name)}
                      <span className="ms-1.5 text-[11px] font-normal text-muted">
                        / {price.priceUnit}
                      </span>
                    </span>

                    <span className="shrink-0 text-end">
                      <span className="block text-[11px] text-muted">
                        {t("catalogPrice")} {formatTND(price.catalogPrice, lang)}
                      </span>
                      {price.webPrice !== undefined ? (
                        <span className="flex items-center justify-end gap-1.5">
                          <span className="text-sm font-extrabold text-primary">
                            {formatTND(price.webPrice, lang)}
                          </span>
                          {price.delta !== undefined && price.delta !== 0 && (
                            <span
                              className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                                rising ? "text-primary" : "text-olive"
                              }`}
                            >
                              <Icon name={rising ? "up" : "down"} size={11} />
                              {Math.abs(price.delta)}%
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted">{t("noWebPrice")}</span>
                      )}
                    </span>
                  </div>

                  {price.sourceUrl && (
                    <a
                      href={price.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
                    >
                      <Icon name="link" size={11} />
                      {hostOf(price.sourceUrl)}
                      {price.confidence && (
                        <span className="text-muted">
                          · {t(CONFIDENCE_KEYS[price.confidence as PriceConfidence])}
                        </span>
                      )}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {verified.length > 0 && (
            <Notice icon="info">{t("priceNotice")}</Notice>
          )}

          {report.sources.length > 0 && (
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
                <Icon name="web" size={16} className="text-primary" />
                {t("sources")}
              </h2>
              <ul className="space-y-1.5">
                {report.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card flex items-start gap-2 p-2.5 text-xs transition hover:border-primary"
                    >
                      <Icon name="link" size={13} className="mt-0.5 shrink-0 text-muted" />
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{source.title}</span>
                        <span className="block truncate text-muted">{hostOf(source.url)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
