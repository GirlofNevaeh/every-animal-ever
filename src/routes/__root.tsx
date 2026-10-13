import { useEffect } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts, useNavigate, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Paywall } from "@/components/paywall";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { I18nProvider } from "@/i18n/context";
import { AccessProvider, useAccess } from "@/lib/access";
import { readAccess } from "@/lib/access.functions";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  beforeLoad: async () => {
    try {
      const { open } = await readAccess();
      return { accessOpen: open };
    } catch {
      return { accessOpen: false };
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Every Animal Ever" },
      { name: "description", content: "200 animals, each with one unusual fact." },
      { name: "theme-color", content: "#2E7D32" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,620;9..144,700&family=Nunito:wght@560;700;800&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const { accessOpen } = Route.useRouteContext();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <I18nProvider>
            <AccessProvider initialOpen={accessOpen}>
              <SiteHeader />
              <GatedOutlet />
            </AccessProvider>
          </I18nProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function GatedOutlet() {
  const { open, ready } = useAccess();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !open && path !== "/") void navigate({ to: "/", replace: true });
  }, [navigate, open, path, ready]);

  if (!ready || !open) return <Paywall />;
  return (
    <>
      <Outlet />
      <SiteFooter />
    </>
  );
}
