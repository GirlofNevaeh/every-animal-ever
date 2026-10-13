import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { lockAccess, unlockAccess } from "@/lib/access.functions";

const STORAGE = "eae-access-key";

type AccessValue = {
  open: boolean;
  ready: boolean;
  unlock: (key: string) => Promise<boolean>;
  lock: () => Promise<void>;
};

const AccessContext = createContext<AccessValue | null>(null);

export function AccessProvider({
  initialOpen,
  children,
}: {
  initialOpen: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(initialOpen);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  useEffect(() => {
    if (initialOpen) return;
    const saved = localStorage.getItem(STORAGE);
    if (!saved) return;
    let cancel = false;
    setReady(false);
    unlockAccess({ data: { key: saved } })
      .then((result) => {
        if (cancel) return;
        if (!result.ok) localStorage.removeItem(STORAGE);
        setOpen(result.ok);
      })
      .catch(() => {
        if (!cancel) setOpen(false);
      })
      .finally(() => {
        if (!cancel) setReady(true);
      });
    return () => {
      cancel = true;
    };
  }, [initialOpen]);

  const value = useMemo<AccessValue>(
    () => ({
      open,
      ready,
      unlock: async (key: string) => {
        try {
          const result = await unlockAccess({ data: { key } });
          if (!result.ok) return false;
          localStorage.setItem(STORAGE, key);
          setOpen(true);
          return true;
        } catch {
          return false;
        }
      },
      lock: async () => {
        localStorage.removeItem(STORAGE);
        try {
          await lockAccess();
        } catch {
          /* cookie clear is best-effort; local state still locks */
        }
        setOpen(false);
      },
    }),
    [open, ready],
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const value = useContext(AccessContext);
  if (!value) throw new Error("useAccess outside provider");
  return value;
}
