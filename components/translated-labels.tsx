"use client";

import { useI18n } from "@/lib/i18n";

/** Renders the "Colección" / "Collection" label */
export function CollectionLabel() {
  const { t } = useI18n();
  return <>{t("collection.label")}</>;
}

/** Renders the empty state message */
export function CollectionEmpty() {
  const { t } = useI18n();
  return <>{t("collection.empty")}</>;
}

/** Renders "← Volver al inicio" / "← Back to home" */
export function BackHomeLabel() {
  const { t } = useI18n();
  return <>{t("collection.backHome")}</>;
}

/** Renders "← Volver a Es pensar" / "← Back to Es pensar" */
export function BackEspensarLabel() {
  const { t } = useI18n();
  return <>{t("article.backEspensar")}</>;
}

/** Renders "← Volver a Es posible" / "← Back to Es posible" */
export function BackEsposibleLabel() {
  const { t } = useI18n();
  return <>{t("article.backEsposible")}</>;
}

/** Renders the aria-label for tags */
export function TagsLabel() {
  const { t } = useI18n();
  return <>{t("article.tagsLabel")}</>;
}
