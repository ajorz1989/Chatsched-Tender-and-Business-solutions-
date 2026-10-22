import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { useNotifications } from "../hooks/useNotifications";
import NotificationList from "./NotificationList";
import type { Notification } from "../lib/types";
import { whatsappLink } from "../lib/constants";

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5 10 3l7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8.5V16a1 1 0 0 0 1 1h3v-4.5h2V17h3a1 1 0 0 0 1-1V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function BrowseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="13.2" y1="13.2" x2="17.5" y2="17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11" y="2.5" width="6.5" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11" y="8.5" width="6.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M2 13h12l-1.2-1.8A6 6 0 0 1 12 8V6.5A4 4 0 0 0 8 2.5a4 4 0 0 0-4 4V8a6 6 0 0 1-.8 3.2L2 13Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6.3 13.5a1.8 1.8 0 0 0 3.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m7.5 10.5 2 2 3.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v7a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3h-1A1.5 1.5 0 0 1 3 12.5v-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const tabCls = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-semibold transition-colors ${
    isActive ? "text-billboard-greenDeep" : "text-billboard-inkSoft"
  }`;

export default function BottomNav() {
  const { user, profile } = useAuth();
  const { t } = useTranslation("common");
  const { notifications, unreadCount, loaded, loadList, markAsRead, markAllAsRead } = useNotifications();
  const [sheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();

  // Bug fix: sheetRef was declared but never read — removed

  // Bug fix: labels were hardcoded English strings, not going through t()
  const dashboardTo = !user
    ? "/login"
    : profile?.role === "admin"
    ? "/admin"
    : "/account";
  const dashboardLabel = !user
    ? t("nav.logIn")
    : profile?.role === "admin"
    ? t("nav.admin")
    : t("nav.dashboard");

  useEffect(() => {
    if (sheetOpen && !loaded) loadList();
  }, [sheetOpen, loaded, loadList]);

  // Bug fix: body scroll lock now always cleans up, even if the component
  // unmounts while the sheet is open (previously overflow:hidden was left
  // on the body in that case).
  useEffect(() => {
    if (!sheetOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  function handleBellTap() {
    if (!user) {
      navigate("/login");
      return;
    }
    setSheetOpen(true);
  }

  function handleItemClick(n: Notification) {
    if (!n.read_at) markAsRead(n.id);
    setSheetOpen(false);
    if (n.link) navigate(n.link);
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-billboard-paper border-t-[3px] border-billboard-ink flex items-stretch h-14"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <NavLink to="/" end className={tabCls}>
          <HomeIcon />
          {t("nav.home")}
        </NavLink>
        <NavLink to="/tenders" className={tabCls}>
          <BrowseIcon />
          Tenders
        </NavLink>
        {user ? (
          <>
            <NavLink to={dashboardTo} className={tabCls}>
              <DashboardIcon />
              {dashboardLabel}
            </NavLink>
          <button
            type="button"
            onClick={handleBellTap}
            aria-label={t("nav.notifications")}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-semibold transition-colors ${
              sheetOpen ? "text-billboard-greenDeep" : "text-billboard-inkSoft"
            }`}
          >
            <span className="relative">
              <BellIcon />
              {user && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] px-[3px] flex items-center justify-center rounded-full bg-billboard-red text-white text-[11px] font-mono font-bold border-2 border-billboard-paper">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </span>
            {t("nav.alerts")}
          </button>
          </>
        ) : (
          <>
            {/* Logged-out visitors get the main action and a human, not a login tab and an alerts bell. */}
            <NavLink
              to="/tender-readiness"
              data-cta="bottom-nav-readiness"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-semibold bg-billboard-yellow text-billboard-ink ${isActive ? "underline" : ""}`
              }
            >
              <CheckIcon />
              Free check
            </NavLink>
            <a
              href={whatsappLink("Hi, I'd like help with tenders and compliance")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp (opens in a new tab)"
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-semibold text-billboard-inkSoft"
            >
              <ChatIcon />
              WhatsApp
            </a>
          </>
        )}
      </nav>

      {sheetOpen && (
        <div className="sm:hidden fixed inset-0 z-[60] flex items-end">
          <div
            className="absolute inset-0 bg-billboard-ink/40"
            onClick={() => setSheetOpen(false)}
            aria-hidden="true"
          />
          <div
            className="relative w-full max-h-[75vh] bg-white border-t-[3px] border-billboard-ink rounded-t-2xl overflow-hidden flex flex-col"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="w-10 h-1 bg-billboard-ink/20 rounded-full mx-auto mt-2.5 mb-1" aria-hidden="true" />
            <NotificationList
              notifications={notifications}
              loaded={loaded}
              unreadCount={unreadCount}
              onMarkAllRead={markAllAsRead}
              onItemClick={handleItemClick}
              maxHeightClass="max-h-[60vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}
