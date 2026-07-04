import { useState } from "react";
import {
  IconShield,
  IconUsers,
  IconSettings,
  IconCoin,
  IconLock,
  IconBell,
  IconDatabase,
  IconWorld,
  IconPlus,
  IconDotsVertical,
  IconChevronLeft,
  IconCircleCheck,
} from "@tabler/icons-react";

const roles = [
  {
    id: 1,
    name: "مدیر سیستم",
    desc: "دسترسی کامل به تمام بخش‌های سیستم",
    active: true,
    default: true,
  },
  {
    id: 2,
    name: "مدیر مالی",
    desc: "مدیریت امور مالی، گزارشات و تنظیمات مالی",
    active: true,
    default: false,
  },
  {
    id: 3,
    name: "حسابدار",
    desc: "ثبت و مدیریت تراکنش‌ها و گزارشات مالی",
    active: true,
    default: false,
  },
  {
    id: 4,
    name: "منصفی صرف",
    desc: "انجام عملیات صرافی و نرخ‌ها",
    active: true,
    default: false,
  },
  {
    id: 5,
    name: "کاربر شعبه",
    desc: "مشاهده اطلاعات و انجام عملیات محدود",
    active: true,
    default: false,
  },
  {
    id: 6,
    name: "حسابرس",
    desc: "مشاهده گزارشات و اطلاعات (فقط خواندنی)",
    active: true,
    default: false,
  },
  {
    id: 7,
    name: "پشتیبان سیستم",
    desc: "مدیریت بک‌آپ و اطلاعات سیستم",
    active: true,
    default: false,
  },
  {
    id: 8,
    name: "کاربر مهمان",
    desc: "دسترسی محدود به بخش‌های عمومی",
    active: false,
    default: false,
  },
];

const permissions = {
  financial: {
    label: "دسترسی به گزارشات مالی",
    desc: "کنترل دسترسی به گزارشات مالی و اطلاعات مالی سیستم",
    items: [
      { key: "view_all", label: "مشاهده همه گزارشات مالی", checked: true },
      {
        key: "view_income",
        label: "مشاهده گزارشات عواید و مصارف",
        checked: true,
      },
      { key: "view_accounts", label: "مشاهده گزارشات حساب‌ها", checked: true },
      { key: "view_tx", label: "مشاهده گزارشات تراکنش‌ها", checked: true },
      {
        key: "view_sales",
        label: "مشاهده گزارشات سفارشی مالی",
        checked: false,
      },
    ],
  },
  customers: {
    label: "دسترسی به گزارشات مشتریان",
    desc: "کنترل دسترسی به گزارشات و اطلاعات مشتریان",
    items: [
      { key: "view_all_c", label: "مشاهده همه گزارشات مشتریان", checked: true },
      {
        key: "view_cash",
        label: "مشاهده گزارشات نقدینگی مشتریان",
        checked: true,
      },
      { key: "view_checks", label: "مشاهده گزارشات چک مشتریان", checked: true },
      {
        key: "view_transfers",
        label: "مشاهده گزارشات نقل و انتقالات",
        checked: true,
      },
      {
        key: "view_cust_sales",
        label: "مشاهده گزارشات سفارشی مشتریان",
        checked: false,
      },
    ],
  },
};

const changeLog = [
  {
    date: "۱۴۰۳/۰۲/۲۴ - ۱۴:۳۰",
    user: "احمد محمدی",
    type: "ویرایش نقش",
    detail: "به روزرسانی دسترسی‌های گزارشات مالی و مشتریان",
  },
  {
    date: "۱۴۰۳/۰۲/۲۳ - ۱۶:۴۵",
    user: "احمد محمدی",
    type: "ایجاد نقش",
    detail: "ایجاد نقش مدیر سیستم",
  },
  {
    date: "۱۴۰۳/۰۲/۲۰ - ۰۹:۱۵",
    user: "سارا رضایی",
    type: "ویرایش نقش",
    detail: "تغییر نام نقش از سرپرست به مدیر سیستم",
  },
];

const settingsMenu = [
  {
    id: "general",
    label: "تنظیمات عمومی",
    icon: IconSettings,
    color: "#2563EB",
  },
  { id: "users", label: "تنظیمات کاربران", icon: IconUsers, color: "#7C3AED" },
  { id: "roles", label: "تنظیمات نقش‌ها", icon: IconShield, color: "#059669" },
  {
    id: "system",
    label: "تنظیمات سیستم",
    icon: IconDatabase,
    color: "#0891B2",
  },
  { id: "financial", label: "تنظیمات مالی", icon: IconCoin, color: "#D97706" },
  { id: "security", label: "تنظیمات امنیتی", icon: IconLock, color: "#DC2626" },
  { id: "alerts", label: "تنظیمات اعلان‌ها", icon: IconBell, color: "#8B5CF6" },
  {
    id: "backup",
    label: "تنظیمات پشتیبان",
    icon: IconDatabase,
    color: "#64748B",
  },
  { id: "lang", label: "تنظیمات زبان", icon: IconWorld, color: "#0891B2" },
];

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState("roles");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [checkedPerms, setCheckedPerms] = useState<Record<string, boolean>>({
    ...Object.fromEntries(
      permissions.financial.items.map((i) => [i.key, i.checked]),
    ),
    ...Object.fromEntries(
      permissions.customers.items.map((i) => [i.key, i.checked]),
    ),
  });
  const [activeTab, setActiveTab] = useState("sections");

  const togglePerm = (key: string) => {
    setCheckedPerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">تنظیمات</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          <span className="text-slate-400">خانه</span>
          <span className="text-slate-300 mx-1">›</span>
          <span className="text-slate-400">تنظیمات</span>
          <span className="text-slate-300 mx-1">›</span>
          <span className="text-slate-600">تنظیمات نقش‌ها</span>
        </p>
      </div>

      <div className="flex gap-5">
        {/* Settings sidebar menu */}
        <div className="w-56 shrink-0 space-y-1">
          {settingsMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors ${activeMenu === item.id ? "bg-blue-50 text-[#2563EB] font-medium border border-blue-200" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <IconChevronLeft
                size={14}
                className={
                  activeMenu === item.id ? "text-[#2563EB]" : "text-slate-300"
                }
              />
              <div className="flex items-center gap-2.5">
                <span>{item.label}</span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: item.color + "15" }}
                >
                  <item.icon size={15} style={{ color: item.color }} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex gap-5">
          {/* Roles list */}
          <div className="w-72 shrink-0 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
              <button className="flex items-center gap-1.5 text-xs bg-[#2563EB] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <IconPlus size={12} />
                افزودن نقش جدید
              </button>
              <h3 className="text-sm font-semibold text-slate-800">
                لیست نقش‌ها
              </h3>
            </div>
            <div className="p-3">
              <div className="relative mb-3">
                <input
                  placeholder="جستجو در نقش‌ها..."
                  className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg pr-3 pl-3 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="space-y-1">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-right px-3 py-2.5 rounded-xl transition-colors ${selectedRole.id === role.id ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50 border border-transparent"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${role.active ? "bg-emerald-500" : "bg-slate-300"}`}
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          {role.default && (
                            <span className="text-[9px] bg-blue-100 text-blue-600 px-1 py-0.5 rounded font-medium shrink-0">
                              پیش‌فرض
                            </span>
                          )}
                          <p
                            className={`text-xs font-semibold truncate ${selectedRole.id === role.id ? "text-[#2563EB]" : "text-slate-700"}`}
                          >
                            {role.name}
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight truncate">
                          {role.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 text-center">
                نمایش ۱ تا ۸ از ۸ نقش
              </div>
            </div>
          </div>

          {/* Role detail */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Role info */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-start gap-5">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 mb-1 block">
                        نام نقش
                      </label>
                      <input
                        defaultValue={selectedRole.name}
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-slate-500 mb-1 block">
                        آیکون نقش
                      </label>
                      <div className="w-16 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mx-auto">
                        <IconShield size={20} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">
                      توضیحات
                    </label>
                    <input
                      defaultValue={selectedRole.desc}
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${selectedRole.active ? "text-emerald-600" : "text-slate-400"}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${selectedRole.active ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}
                        />
                        {selectedRole.active ? "فعال" : "غیرفعال"}
                      </span>
                      <span className="text-xs text-slate-400">وضعیت</span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-xs text-slate-600">
                        نقش پیش فرض
                      </span>
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${selectedRole.default ? "bg-[#2563EB]" : "bg-slate-200"}`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${selectedRole.default ? "translate-x-1" : "translate-x-5"}`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">
                  دسترسی‌های نقش
                </h3>
                <div className="flex gap-2 mt-3">
                  {[
                    "دسترسی به بخش‌ها",
                    "دسترسی به عملیات",
                    "دسترسی به بخش‌ها",
                  ].map((t, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setActiveTab(
                          i === 0
                            ? "sections"
                            : i === 1
                              ? "operations"
                              : "sections2",
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${(i === 0 && activeTab === "sections") || (i === 2 && activeTab === "sections2") ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-slate-50"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                >
                  {Object.entries(permissions).map(([key, section]) => (
                    <div
                      key={key}
                      className={`border rounded-xl p-4 ${key === "financial" ? "border-blue-200 bg-blue-50/30" : "border-slate-200"}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${key === "financial" ? "bg-blue-100" : "bg-slate-100"}`}
                        >
                          {key === "financial" ? (
                            <IconCoin size={16} className="text-[#2563EB]" />
                          ) : (
                            <IconUsers size={16} className="text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {section.label}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {section.desc}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${true ? "bg-[#2563EB] border-[#2563EB]" : "border-slate-300"}`}
                          >
                            <IconCircleCheck size={10} className="text-white" />
                          </div>
                          <span className="text-xs text-slate-700">
                            مشاهده همه{" "}
                            {key === "financial"
                              ? "گزارشات مالی"
                              : "گزارشات مشتریان"}
                          </span>
                        </label>
                        {section.items.slice(1).map((item) => (
                          <label
                            key={item.key}
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => togglePerm(item.key)}
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${checkedPerms[item.key] ? "bg-[#2563EB] border-[#2563EB]" : "border-slate-300 bg-white"}`}
                            >
                              {checkedPerms[item.key] && (
                                <IconCircleCheck
                                  size={10}
                                  className="text-white"
                                />
                              )}
                            </div>
                            <span className="text-xs text-slate-600">
                              {item.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                <button className="px-4 py-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                  انصراف
                </button>
                <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <IconCircleCheck size={15} />
                  ذخیره تغییرات
                </button>
              </div>
            </div>

            {/* Change log */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <button className="text-xs text-[#2563EB] hover:underline">
                  مشاهده همه تغییرات
                </button>
                <h3 className="text-sm font-semibold text-slate-800">
                  گزارش تغییرات نقش
                </h3>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["تاریخ و زمان", "کاربر", "نوع تغییر", "جزئیات تغییر"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-right text-slate-500 font-medium px-4 py-3"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {changeLog.map((log, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {log.user}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-50 text-[#2563EB]">
                          {log.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{log.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right system status panel */}
        <div className="w-48 shrink-0 space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-700 mb-3">
              وضعیت سیستم
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  فعال
                </span>
                <span className="text-slate-500">سیستم</span>
              </div>
              <p className="text-[10px] text-emerald-500">
                سیستم فعال و پایدار است
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-700 mb-3">
              آخرین بک‌آپ
            </h3>
            <p className="text-[11px] text-slate-600 ltr">۱۴۰۳/۰۲/۲۴ - ۰۳:۱۵</p>
            <p className="text-[10px] text-slate-400 mt-1">245.6 MB</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-700 mb-2">
              یک بک‌آپ دستی
            </h3>
            <button className="w-full text-xs bg-blue-50 text-[#2563EB] border border-blue-200 rounded-lg py-2 hover:bg-blue-100 transition-colors font-medium">
              بک‌آپ الان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
