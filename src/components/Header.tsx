import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import InstallAppButton from "./InstallAppButton";

const navCls = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-billboard-greenDeep" : "hover:text-billboard-greenDeep transition-colors";

const PRIMARY_LINKS = [
  { to: "/consult", key: "nav.tenderConsult", fallback: "Consult" },
  { to: "/pricing", key: "nav.tenderPricing", fallback: "Pricing" },
  { to: "/for-partners", key: "nav.tenderPartners", fallback: "For Partners" },
] as const;

const SERVICE_LINKS = [
  { to: "/tender-readiness", key: "nav.tenderReadiness", fallback: "Free readiness check" },
  { to: "/tenders", key: "nav.tenders", fallback: "Tenders & RFQs" },
  { to: "/bid-support", key: "nav.bidSupport", fallback: "Bid Support" },
  { to: "/compliance-setup", key: "nav.complianceSetup", fallback: "Compliance Setup" },
  { to: "/services", key: "nav.allServices", fallback: "All services" },
  { to: "/tools", key: "nav.freeTools", fallback: "Free tools" },
] as const;

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslation("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Escape closes whichever menu is open (WCAG 2.1.2 / 1.4.13).
  useEffect(() => {
    if (!menuOpen && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, servicesOpen]);

  // Clicking or tapping anywhere outside the Services menu closes it.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [servicesOpen]);

  const accountTo = profile?.role === "admin" ? "/admin" : "/account";
  const accountLabel = profile?.role === "admin" ? "Admin" : "Account";

  return (
    <header className="sticky top-0 z-50 bg-billboard-paper border-b-[3px] border-billboard-ink">
      <div className="max-w-[1400px] w-full mx-auto min-w-0 flex items-center justify-between px-3 sm:px-5 py-3 gap-2 sm:gap-4">
        <Link to="/" onClick={closeMenu} className="flex items-center shrink-0" aria-label="ChatSched home">
          <img src="/brand/logo-horizontal-light.svg" alt="ChatSched" className="h-7 sm:h-8 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 font-semibold text-sm whitespace-nowrap">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((open) => !open)}
              className="inline-flex items-center gap-1 hover:text-billboard-greenDeep transition-colors"
            >
              Services
              <span aria-hidden="true" className={`text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {servicesOpen && (
              <div id="services-menu" className="absolute top-full left-0 mt-3 w-60 border-2 border-billboard-ink rounded-lg bg-white shadow-blockSm p-2">
                {SERVICE_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setServicesOpen(false)}
                    className={({ isActive }) => `block rounded px-3 py-2.5 text-sm ${isActive ? "bg-billboard-yellow font-bold" : "hover:bg-billboard-paperDim"}`}
                  >
                    {t(link.key, { defaultValue: link.fallback })}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          {PRIMARY_LINKS.map(({ to, key, fallback }) => (
            <NavLink key={to} to={to} className={`${navCls} whitespace-nowrap`}>{t(key, { defaultValue: fallback })}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <InstallAppButton className="hidden xl:inline-flex items-center gap-1.5 text-sm font-semibold text-billboard-inkSoft hover:text-billboard-ink transition-colors" />
          {user ? (
            <>
              <Link to={accountTo} className="hidden sm:inline text-sm font-semibold hover:text-billboard-greenDeep transition-colors">{accountLabel}</Link>
              <button type="button" onClick={() => signOut()} className="hidden sm:inline text-sm font-semibold text-billboard-inkSoft hover:text-billboard-red transition-colors">Log out</button>
            </>
          ) : (
            <Link to="/login" className="hidden sm:inline text-sm font-semibold hover:text-billboard-greenDeep transition-colors">Log in</Link>
          )}
          <Link to="/tender-readiness" data-cta="nav-readiness" className="brand-button dark !py-2 !px-3 sm:!px-4 !text-xs sm:!text-sm">Free readiness check</Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 shrink-0"
          >
            <span className={`block w-5 h-0.5 bg-billboard-ink rounded transition-transform origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-billboard-ink rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-billboard-ink rounded transition-transform origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="lg:hidden absolute inset-x-0 top-full h-screen z-40 bg-billboard-ink/30" onClick={closeMenu} aria-hidden="true" />
          <nav aria-label="Mobile navigation" className="lg:hidden absolute left-0 right-0 top-full z-50 bg-billboard-paper border-b-[3px] border-billboard-ink shadow-blockSm max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="max-w-6xl mx-auto px-5 py-4">
              <div className="border-2 border-billboard-ink rounded-lg bg-white p-2 mb-3">
                <div className="font-mono text-xs uppercase tracking-wider text-billboard-inkSoft px-2 py-1">Services</div>
                {SERVICE_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className="block rounded px-3 py-2.5 text-sm font-semibold hover:bg-billboard-paperDim"
                  >
                    {t(link.key, { defaultValue: link.fallback })}
                  </NavLink>
                ))}
              </div>
              <div className="grid gap-1">
                {PRIMARY_LINKS.map(({ to, key, fallback }) => (
                  <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => `block py-3 border-b border-billboard-ink/10 font-semibold text-sm ${isActive ? "text-billboard-greenDeep" : ""}`}>{t(key, { defaultValue: fallback })}</NavLink>
                ))}
              </div>
              {user ? (
                <div className="grid gap-1 pt-2">
                  <NavLink to={accountTo} onClick={closeMenu} className="py-2.5 font-semibold text-sm">{accountLabel}</NavLink>
                  <button type="button" onClick={() => { signOut(); closeMenu(); }} className="py-2.5 text-left font-semibold text-sm text-billboard-inkSoft">Log out</button>
                </div>
              ) : (
                <div className="grid gap-2 pt-4">
                  <Link to="/login" onClick={closeMenu} className="block py-2.5 font-semibold text-sm">Log in</Link>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
