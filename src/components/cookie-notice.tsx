import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";

const STORAGE_KEY = "eae-cookie-ok";

export function CookieNotice() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* the notice can still close */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t("Cookies")}
      className="cookie-notice no-print fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-sky px-3 py-3"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center">
        <p className="text-base font-bold text-ink">
          {t(
            "This site stores a cookie on this device. It remembers your language and your access key. It does not watch you on other sites.",
          )}
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="h-12 shrink-0 rounded-card border-2 border-ink bg-leaf px-5 text-lg font-extrabold text-sand sm:min-w-28"
        >
          {t("OK")}
        </button>
      </div>
    </div>
  );
}
