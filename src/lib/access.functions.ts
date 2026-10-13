import { createServerFn } from "@tanstack/react-start";

export const readAccess = createServerFn({ method: "GET" }).handler(async () => {
  const { hasAccessCookie } = await import("./access-key.server");
  return { open: hasAccessCookie() };
});

export const unlockAccess = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const key =
      data && typeof data === "object" && "key" in data && typeof data.key === "string"
        ? data.key
        : "";
    return { key: key.slice(0, 80) };
  })
  .handler(async ({ data }) => {
    const { keyIsValid, setAccessCookie, clearAccessCookie } = await import("./access-key.server");
    if (!keyIsValid(data.key)) {
      clearAccessCookie();
      return { ok: false as const };
    }
    setAccessCookie();
    return { ok: true as const };
  });

export const lockAccess = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAccessCookie } = await import("./access-key.server");
  clearAccessCookie();
  return { ok: true as const };
});
