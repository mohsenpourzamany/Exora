import { useState } from "react";
import {
  IconBell,
  IconMail,
  IconSearch,
  IconSun,
  IconMoon,
  IconMenu2,
  IconMapPin,
  IconCalendar,
  IconChevronDown,
  IconShield,
} from "@tabler/icons-react";
import {
  useAuth,
  useMockUsers,
  type UserRole,
} from "../../context/AuthContext";

interface NavbarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const ROLE_COLORS: Record<UserRole, string> = {
  admin: "bg-[#2563EB] text-white",
  branch_manager: "bg-[#7C3AED] text-white",
  teller: "bg-[#059669] text-white",
};

export default function Navbar({ collapsed, onToggle }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const { user, setUser } = useAuth();
  const mockUsers = useMockUsers();

  const now = new Date();
  const timeStr = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = now.toLocaleDateString("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className={`
        fixed top-0 inset-x-0 h-16 bg-white border-b border-slate-200 z-30
        transition-all duration-300
        ${collapsed ? "mr-[72px]" : "mr-64"}
      `}
    >
      <div className="h-full flex items-center px-6 gap-4">
        {/* Sidebar toggle */}
        <button
          onClick={onToggle}
          className="shrink-0 p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <IconMenu2 size={20} />
        </button>

        <div className="h-7 w-px bg-slate-200 shrink-0" />

        {/* Search */}
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <IconSearch
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="جستجو در سیستم..."
              className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg pr-9 pl-12 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded ltr">
              Ctrl+K
            </span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Branch */}
        <button className="shrink-0 h-9 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 hover:bg-slate-100 transition-colors">
          <IconChevronDown size={13} className="text-slate-400" />
          <span className="text-xs text-slate-700 font-medium">
            {user.branch}
          </span>
          <IconMapPin size={15} className="text-[#1D4ED8]" />
        </button>

        {/* Date */}
        <div className="hidden lg:flex shrink-0 h-9 items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3">
          <div className="text-right leading-tight">
            <p className="text-[11px] font-medium text-slate-700">{dateStr}</p>
            <p className="text-[10px] text-slate-400 ltr">{timeStr}</p>
          </div>
          <IconCalendar size={15} className="text-slate-400" />
        </div>

        <div className="h-7 w-px bg-slate-200 shrink-0" />

        {/* Icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            {darkMode ? <IconSun size={19} /> : <IconMoon size={19} />}
          </button>
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <IconMail size={19} />
          </button>
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <IconBell size={19} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <div className="h-7 w-px bg-slate-200 shrink-0" />

        {/* Role switcher (for demo) */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-2.5 hover:bg-slate-50 rounded-lg pl-1 pr-2 py-1.5 transition-colors"
          >
            <IconChevronDown size={13} className="text-slate-400" />
            <div className="text-right leading-tight hidden md:block">
              <p className="text-xs font-semibold text-slate-800">
                {user.name}
              </p>
              <div className="flex items-center gap-1 justify-end">
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${ROLE_COLORS[user.role]}`}
                >
                  {user.roleLabel}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user.avatar}
            </div>
          </button>

          {/* Role switcher dropdown */}
          {showRoleSwitcher && (
            <div className="absolute left-0 top-12 bg-white border border-slate-200 rounded-xl shadow-xl w-64 p-3 z-50">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <IconShield size={14} className="text-slate-400" />
                <p className="text-xs font-semibold text-slate-600">
                  تغییر نقش (تست)
                </p>
              </div>
              {Object.values(mockUsers).map((u) => (
                <button
                  key={u.role}
                  onClick={() => {
                    setUser(u);
                    setShowRoleSwitcher(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors mb-1 ${user.role === u.role ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      {u.name}
                    </p>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${ROLE_COLORS[u.role]}`}
                    >
                      {u.roleLabel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
