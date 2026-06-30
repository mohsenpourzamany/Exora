import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconSettings2,
  IconArrowsExchange,
  IconChartBar,
  IconCurrencyDollar,
  IconAdjustments,
  IconCloudUpload,
  IconChevronDown,
} from "@tabler/icons-react";
import { MENU_ITEMS } from "../../constants/menu";
import ExoraLogo from "../../assets/ExoraLogo.png";

const ICONS: Record<string, React.ElementType> = {
  IconLayoutDashboard,
  IconSettings2,
  IconArrowsExchange,
  IconChartBar,
  IconCurrencyDollar,
  IconAdjustments,
  IconCloudUpload,
};

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <aside
      className={`
        fixed inset-y-0 right-0 h-screen bg-[#1E3A8A] flex flex-col z-40
        transition-all duration-300 ease-in-out shadow-xl
        ${collapsed ? "w-18" : "w-64"}
      `}
    >
      {/* Logo */}
      <div>
        <div
          className={`flex items-center justify-center h-24 border-b border-white/10 ${collapsed ? "px-2" : "px-6"}`}
        >
          {collapsed ? (
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#1E3A8A] font-bold text-lg">E</span>
            </div>
          ) : (
            <img
              src={ExoraLogo}
              alt="Exora"
              className="h-36 w-auto object-contain rounded-lg "
            />
          )}
        </div>
        <div>
          <p className="text-white text-sm font-medium text-center mt-4 mb-4 px-2">
            {" "}
            سیستم جامع حسابداری
          </p>
        </div>
      </div>
      {/* Menu */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus.includes(item.id);
          const active = isActive(item.path);

          return (
            <div key={item.id}>
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleMenu(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm
                      transition-colors duration-150
                      ${
                        active
                          ? "bg-[#2563EB] text-white font-medium"
                          : "text-blue-200 hover:bg-white/10 hover:text-white"
                      }
                      ${collapsed ? "justify-center" : "justify-between"}
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {Icon && <Icon size={19} stroke={1.8} />}
                      {!collapsed && <span>{item.label}</span>}
                    </span>
                    {!collapsed && (
                      <IconChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {!collapsed && isOpen && (
                    <div className="mt-1 mr-3 pr-3 border-r-2 border-white/15 space-y-0.5">
                      {item.children!.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          className={({ isActive }) => `
                            block px-3 py-2 rounded-lg text-xs
                            transition-colors duration-150
                            ${
                              isActive
                                ? "bg-white/15 text-white font-medium"
                                : "text-blue-300 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm
                    transition-colors duration-150
                    ${
                      isActive
                        ? "bg-[#2563EB] text-white font-medium"
                        : "text-blue-200 hover:bg-white/10 hover:text-white"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  {Icon && <Icon size={19} stroke={1.8} />}
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-5 py-5 border-t border-white/10">
          <p className="text-blue-300/70 text-[11px] text-center tracking-wide leading-relaxed">
            Exchange. Accounting.
            <br />
            Excellence.
          </p>
        </div>
      )}
    </aside>
  );
}
