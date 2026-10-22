import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  Handshake,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { AdminTab } from "../pages/Admin";

type NavItem = {
  key?: AdminTab;
  label: string;
  count?: string | number;
  href?: string;
  icon: typeof LayoutDashboard;
  tone?: "neutral" | "attention" | "success";
};

type NavGroup = {
  key: string;
  label: string;
  description: string;
  icon: typeof LayoutDashboard;
  items: NavItem[];
};

const GROUPS: NavGroup[] = [
  {
    key: "management",
    label: "Leads & Clients",
    description: "Readiness checks, consult requests and customers",
    icon: Users,
    items: [
      { key: "leads", label: "Leads", icon: BriefcaseBusiness, tone: "attention" },
      { key: "clients", label: "Clients", icon: Users },
      { key: "messages", label: "Messages", icon: MessageSquare },
      { key: "partners", label: "Partners", icon: Handshake },
    ],
  },
  {
    key: "operations",
    label: "Operations",
    description: "Platform history",
    icon: FileText,
    items: [{ key: "audit_log", label: "Audit Log", icon: FileText }],
  },
  {
    key: "security",
    label: "Security & Safety",
    description: "Access, security and message controls",
    icon: ShieldCheck,
    items: [
      { key: "security", label: "Security", icon: ShieldCheck },
      { key: "safety", label: "Message Safety", icon: ShieldCheck },
    ],
  },
];

function getInitialOpenGroup(tab: AdminTab): string {
  const match = GROUPS.find((group) => group.items.some((item) => item.key === tab));
  return match?.key ?? "management";
}

export default function AdminNavigation({
  tab,
  onSelect,
  counts,
}: {
  tab: AdminTab;
  onSelect: (tab: AdminTab) => void;
  counts?: Partial<Record<AdminTab, string | number>>;
}) {
  const [openGroup, setOpenGroup] = useState(() => getInitialOpenGroup(tab));

  useEffect(() => {
    setOpenGroup(getInitialOpenGroup(tab));
  }, [tab]);

  function toggle(groupKey: string) {
    setOpenGroup((prev) => (prev === groupKey ? "" : groupKey));
  }

  return (
    <aside className="lg:sticky lg:top-5 lg:self-start rounded-xl overflow-hidden border border-white/10 bg-billboard-ink text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-billboard-yellow text-billboard-ink">
            <LayoutDashboard size={18} strokeWidth={2.4} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/45">Control centre</p>
            <h2 className="font-display text-lg leading-tight">Admin Dashboard</h2>
          </div>
        </div>
      </div>

      <nav className="p-2.5" aria-label="Admin sections">
        {GROUPS.map((group) => {
          const GroupIcon = group.icon;
          const open = openGroup === group.key;
          const hasActive = group.items.some((item) => item.key === tab);

          return (
            <div key={group.key} className="mb-1.5 last:mb-0">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggle(group.key)}
                className={`w-full flex items-center gap-3 rounded-lg px-3.5 py-3 text-left transition ${hasActive ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}`}
              >
                <span className={`w-8 h-8 rounded-md border flex items-center justify-center ${hasActive ? "border-billboard-yellow/60 text-billboard-yellow" : "border-white/10 text-white/55"}`}>
                  <GroupIcon size={16} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{group.label}</span>
                  <span className="block text-[11px] text-white/40 truncate">{group.description}</span>
                </span>
                <ChevronDown size={16} className={`text-white/45 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              <div className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="mt-1 ml-11 space-y-1 pb-1">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = item.key === tab;
                      const count = item.key ? counts?.[item.key] ?? item.count : item.count;
                      const content = (
                        <>
                          <span className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${isActive ? "bg-billboard-ink/10" : "bg-white/[0.04]"}`}>
                            <ItemIcon size={14} strokeWidth={2.2} aria-hidden="true" />
                          </span>
                          <span className="flex-1 truncate">{item.label}</span>
                          {count !== undefined && (
                            <span className={`font-mono text-[11px] min-w-5 text-center px-1.5 py-0.5 rounded-full border ${isActive ? "border-billboard-ink/20" : "border-white/10"}`}>
                              {count}
                            </span>
                          )}
                          {item.tone === "attention" && !isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-billboard-yellow shrink-0" aria-label="Needs attention" />
                          )}
                        </>
                      );

                      if (item.href) {
                        return (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-white/65 hover:text-white hover:bg-white/[0.05] transition"
                          >
                            {content}
                          </Link>
                        );
                      }

                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            setOpenGroup(group.key);
                            if (item.key) onSelect(item.key);
                          }}
                          className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition ${isActive ? "bg-billboard-yellow text-billboard-ink font-bold shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_18px_rgba(255,205,64,0.14)]" : "text-white/65 hover:text-white hover:bg-white/[0.05]"}`}
                        >
                          {content}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 bg-black/10">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/45">
          <span className="w-1.5 h-1.5 rounded-full bg-billboard-green" />
          Admin session protected
        </div>
      </div>
    </aside>
  );
}
