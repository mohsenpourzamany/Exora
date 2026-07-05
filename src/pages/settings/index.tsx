import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  IconBuildingBank,
  IconUpload,
  IconEdit,
  IconTrash,
  IconSearch,
  IconAlertTriangle,
  IconDeviceDesktop,
  IconCloudUpload,
  IconDownload,
  IconMail,
  IconDeviceMobile,
  IconCheck,
} from "@tabler/icons-react";
import Placeholder from "../../components/ui/Placeholder";
import { useAuth } from "../../context/AuthContext";

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

const systemUsers = [
  { id: 1, name: "احمد محمدی",  email: "ahmad.m@exora.com", role: "مدیر سیستم",  branch: "همه شعب",         active: true,  lastLogin: "۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰" },
  { id: 2, name: "سارا کریمی",  email: "sara.k@exora.com",  role: "مدیر شعبه",   branch: "شعبه مرکزی کابل", active: true,  lastLogin: "۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵" },
  { id: 3, name: "علی رضایی",   email: "ali.r@exora.com",   role: "صندوقدار",    branch: "شعبه مرکزی کابل", active: true,  lastLogin: "۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵" },
  { id: 4, name: "فرید احمدی",  email: "farid.a@exora.com", role: "صندوقدار",    branch: "شعبه هرات",        active: true,  lastLogin: "۱۴۰۳/۰۲/۲۳ - ۱۶:۰۰" },
  { id: 5, name: "نیلوفر رضایی", email: "niloofar.r@exora.com", role: "حسابدار", branch: "شعبه مزار شریف",   active: false, lastLogin: "۱۴۰۳/۰۲/۱۸ - ۱۳:۲۰" },
]

const activityLog = [
  { id: 1, user: "احمد محمدی", action: "ورود به سیستم",         ip: "192.168.1.14", date: "۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰" },
  { id: 2, user: "سارا کریمی", action: "ویرایش دسترسی نقش",     ip: "192.168.1.22", date: "۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵" },
  { id: 3, user: "علی رضایی",  action: "ثبت سند تبادل اسعار",   ip: "192.168.1.31", date: "۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵" },
  { id: 4, user: "ناشناس",     action: "تلاش ناموفق ورود (×۳)", ip: "185.23.44.9",  date: "۱۴۰۳/۰۲/۲۳ - ۲۲:۱۰" },
  { id: 5, user: "احمد محمدی", action: "تغییر رمز عبور",         ip: "192.168.1.14", date: "۱۴۰۳/۰۲/۲۳ - ۰۹:۰۰" },
]

const backupHistory = [
  { id: 1, date: "۱۴۰۳/۰۲/۲۴ - ۰۳:۱۵", type: "خودکار", size: "245.6 MB", status: "موفق" },
  { id: 2, date: "۱۴۰۳/۰۲/۲۳ - ۰۳:۱۵", type: "خودکار", size: "244.1 MB", status: "موفق" },
  { id: 3, date: "۱۴۰۳/۰۲/۲۲ - ۱۴:۴۰", type: "دستی",   size: "243.8 MB", status: "موفق" },
  { id: 4, date: "۱۴۰۳/۰۲/۲۲ - ۰۳:۱۵", type: "خودکار", size: "243.5 MB", status: "ناموفق" },
  { id: 5, date: "۱۴۰۳/۰۲/۲۱ - ۰۳:۱۵", type: "خودکار", size: "242.9 MB", status: "موفق" },
]

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

// "roles", "general", "users", "system" and "security" are fully built out;
// the rest (alerts, backup, lang) fall back to a placeholder for now.
function menuIdFromPath(pathname: string): string {
  const segment = pathname.split("/settings/")[1];
  if (!segment) return "general"; // bare "/settings" or "/settings/general"
  const id = segment.split("/")[0];
  return settingsMenu.some((m) => m.id === id) ? id : "general";
}

const RestrictedSection = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center">
    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
      <IconLock size={20} className="text-slate-400" />
    </div>
    <p className="text-sm font-semibold text-slate-600">دسترسی محدود</p>
    <p className="text-xs text-slate-400 mt-1">این بخش فقط برای مدیر سیستم قابل دسترسی است.</p>
  </div>
);

function GeneralSettings() {
  const [form, setForm] = useState({
    name: "صرافی اکسورا",
    license: "AF-EXC-1403-0245",
    phone: "+93 70 123 4567",
    email: "info@exora.com",
    address: "کابل، شهرک تجارتی، بلاک سوم",
    currency: "AFN",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
          <IconBuildingBank size={26} className="text-[#2563EB]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">لوگوی صرافی</p>
          <p className="text-[11px] text-slate-400 mt-0.5">فرمت PNG یا SVG، حداکثر ۲ مگابایت</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
          <IconUpload size={13} />آپلود لوگو
        </button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">نام صرافی</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">شماره جواز فعالیت</label>
          <input value={form.license} onChange={(e) => update("license", e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">شماره تماس</label>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">ایمیل</label>
          <input value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">واحد پول پایه</label>
          <select value={form.currency} onChange={(e) => update("currency", e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
            <option value="AFN">افغانی (AFN)</option>
            <option value="USD">دلار آمریکا (USD)</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-xs text-slate-500 block mb-1.5">آدرس دفتر مرکزی</label>
          <input value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button className="px-4 py-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">انصراف</button>
        <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <IconCircleCheck size={15} />ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

function UsersSettings() {
  const [search, setSearch] = useState("");
  const filtered = systemUsers.filter((u) => u.name.includes(search) || u.email.includes(search));

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-3">
        <button className="flex items-center gap-1.5 text-xs bg-[#2563EB] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shrink-0">
          <IconPlus size={12} />افزودن کاربر جدید
        </button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جستجوی کاربر..." className="w-48 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">کاربران سیستم</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["کاربر", "ایمیل", "نقش", "شعبه", "آخرین ورود", "وضعیت", "عملیات"].map((h) => (
                <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}>
                <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">{u.name}</td>
                <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-50 text-[#2563EB]">{u.role}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{u.branch}</td>
                <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">{u.lastLogin}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-medium px-2 py-1 rounded-lg ${u.active ? "text-emerald-600 bg-emerald-50" : "text-slate-400 bg-slate-100"}`}>
                    {u.active ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><IconEdit size={13} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
        نمایش {filtered.length} کاربر از {systemUsers.length} کاربر ثبت‌شده
      </div>
    </div>
  );
}

function SystemSettings() {
  const [form, setForm] = useState({
    dateFormat: "jalali",
    defaultLanguage: "fa",
    uploadLimitMb: 10,
    maintenanceMode: false,
    activityLogging: true,
  });

  const toggle = (key: "maintenanceMode" | "activityLogging") =>
    setForm((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">فرمت تاریخ</label>
          <select value={form.dateFormat} onChange={(e) => setForm((p) => ({ ...p, dateFormat: e.target.value }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
            <option value="jalali">شمسی</option>
            <option value="gregorian">میلادی</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">زبان پیش‌فرض سیستم</label>
          <select value={form.defaultLanguage} onChange={(e) => setForm((p) => ({ ...p, defaultLanguage: e.target.value }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
            <option value="fa">دری</option>
            <option value="ps">پشتو</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">حداکثر حجم آپلود فایل (مگابایت)</label>
          <input type="number" value={form.uploadLimitMb} onChange={(e) => setForm((p) => ({ ...p, uploadLimitMb: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer" onClick={() => toggle("activityLogging")}>
          <div className={`w-10 h-5 rounded-full transition-colors ${form.activityLogging ? "bg-[#2563EB]" : "bg-slate-200"}`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${form.activityLogging ? "translate-x-1" : "translate-x-5"}`} />
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-700 font-medium">ثبت لاگ فعالیت کاربران</p>
            <p className="text-[11px] text-slate-400">تمام عملیات مهم کاربران در سابقه فعالیت ذخیره می‌شود</p>
          </div>
        </label>
        <label className="flex items-center justify-between cursor-pointer" onClick={() => toggle("maintenanceMode")}>
          <div className={`w-10 h-5 rounded-full transition-colors ${form.maintenanceMode ? "bg-amber-500" : "bg-slate-200"}`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${form.maintenanceMode ? "translate-x-1" : "translate-x-5"}`} />
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-700 font-medium">حالت تعمیر و نگهداری</p>
            <p className="text-[11px] text-slate-400">در این حالت فقط مدیر سیستم می‌تواند وارد سیستم شود</p>
          </div>
        </label>
      </div>

      {form.maintenanceMode && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <IconAlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">با فعال بودن حالت تعمیر، صندوقداران و مدیران شعب قادر به ورود نخواهند بود.</p>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button className="px-4 py-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">انصراف</button>
        <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <IconCircleCheck size={15} />ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  const [form, setForm] = useState({
    minLength: 8,
    requireSpecialChar: true,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
  });

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
        <h3 className="text-sm font-semibold text-slate-800">سیاست رمز عبور</h3>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">حداقل طول رمز عبور</label>
            <input type="number" value={form.minLength} onChange={(e) => setForm((p) => ({ ...p, minLength: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">انقضای رمز عبور (روز)</label>
            <input type="number" value={form.passwordExpiryDays} onChange={(e) => setForm((p) => ({ ...p, passwordExpiryDays: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">حداکثر تلاش ناموفق ورود</label>
            <input type="number" value={form.maxLoginAttempts} onChange={(e) => setForm((p) => ({ ...p, maxLoginAttempts: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <label className="flex items-center justify-between cursor-pointer" onClick={() => setForm((p) => ({ ...p, requireSpecialChar: !p.requireSpecialChar }))}>
          <div className={`w-10 h-5 rounded-full transition-colors ${form.requireSpecialChar ? "bg-[#2563EB]" : "bg-slate-200"}`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${form.requireSpecialChar ? "translate-x-1" : "translate-x-5"}`} />
          </div>
          <p className="text-sm text-slate-700 font-medium">الزام کاراکتر خاص و عدد در رمز عبور</p>
        </label>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <IconCircleCheck size={15} />ذخیره تغییرات
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <IconDeviceDesktop size={16} className="text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-800">سابقه فعالیت‌ها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["تاریخ و زمان", "کاربر", "عملیات", "آدرس IP"].map((h) => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activityLog.map((log, i) => (
                <tr key={log.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}>
                  <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">{log.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">{log.user}</td>
                  <td className="px-4 py-3 text-slate-600">{log.action}</td>
                  <td className="px-4 py-3 text-slate-500 ltr">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FinancialSettings() {
  const [form, setForm] = useState({
    exchangeFeePercent: 0.5,
    approvalThresholdUsd: 10000,
    decimalPlaces: 2,
    fiscalYearStart: "حمل",
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">کارمزد پیش‌فرض تبادله (درصد)</label>
          <input type="number" step="0.1" value={form.exchangeFeePercent} onChange={(e) => setForm((p) => ({ ...p, exchangeFeePercent: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">سقف تراکنش بدون نیاز به تأیید مدیر (دلار)</label>
          <input type="number" value={form.approvalThresholdUsd} onChange={(e) => setForm((p) => ({ ...p, approvalThresholdUsd: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">تعداد رقم اعشار در محاسبات</label>
          <input type="number" value={form.decimalPlaces} onChange={(e) => setForm((p) => ({ ...p, decimalPlaces: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1.5">شروع سال مالی</label>
          <select value={form.fiscalYearStart} onChange={(e) => setForm((p) => ({ ...p, fiscalYearStart: e.target.value }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
            <option value="حمل">حمل (فروردین)</option>
            <option value="جدی">جدی (دی)</option>
          </select>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
        <IconAlertTriangle size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">تغییر سقف تأیید مدیر روی تمام ماژول‌های تراکنش (انتقال حساب، تبادل اسعار، حواله) اعمال می‌شود.</p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button className="px-4 py-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">انصراف</button>
        <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <IconCircleCheck size={15} />ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

function AlertsSettings() {
  const [toggles, setToggles] = useState({
    largeTransactions: true,
    failedLogin: true,
    rateChange: false,
    backupFailure: true,
  });
  const [threshold, setThreshold] = useState(10000);
  const [channels, setChannels] = useState({ email: true, sms: false, inApp: true });

  const toggle = (key: keyof typeof toggles) => setToggles((p) => ({ ...p, [key]: !p[key] }));
  const toggleChannel = (key: keyof typeof channels) => setChannels((p) => ({ ...p, [key]: !p[key] }));

  const ALERTS = [
    { key: "largeTransactions" as const, label: "تراکنش‌های بزرگ", desc: "اعلان هنگام ثبت تراکنشی بالاتر از حد آستانه" },
    { key: "failedLogin" as const, label: "تلاش ناموفق ورود", desc: "اعلان بعد از چند تلاش پیاپی ناموفق برای ورود" },
    { key: "rateChange" as const, label: "تغییر نرخ ارز", desc: "اعلان هر بار که نرخ رسمی یک ارز تغییر می‌کند" },
    { key: "backupFailure" as const, label: "خطا در بک‌آپ", desc: "اعلان در صورت ناموفق بودن بک‌آپ خودکار شبانه" },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 mb-1">انواع اعلان</h3>
        {ALERTS.map((a) => (
          <label key={a.key} className="flex items-center justify-between cursor-pointer py-1" onClick={() => toggle(a.key)}>
            <div className={`w-10 h-5 rounded-full transition-colors ${toggles[a.key] ? "bg-[#2563EB]" : "bg-slate-200"}`}>
              <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${toggles[a.key] ? "translate-x-1" : "translate-x-5"}`} />
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-700 font-medium">{a.label}</p>
              <p className="text-[11px] text-slate-400">{a.desc}</p>
            </div>
          </label>
        ))}

        {toggles.largeTransactions && (
          <div className="pr-13 pt-1">
            <label className="text-xs text-slate-500 block mb-1.5">حد آستانه تراکنش بزرگ (دلار)</label>
            <input type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-48 h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">کانال‌های ارسال اعلان</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { key: "email" as const, label: "ایمیل", icon: IconMail },
            { key: "sms" as const, label: "پیامک", icon: IconDeviceMobile },
            { key: "inApp" as const, label: "درون‌برنامه‌ای", icon: IconBell },
          ].map((c) => (
            <button
              key={c.key}
              onClick={() => toggleChannel(c.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${channels[c.key] ? "bg-blue-50 border-blue-200 text-[#2563EB]" : "bg-white border-slate-200 text-slate-500"}`}
            >
              <c.icon size={14} />
              {c.label}
              {channels[c.key] && <IconCheck size={12} />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <IconCircleCheck size={15} />ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

function BackupSettings() {
  const [form, setForm] = useState({
    autoEnabled: true,
    frequency: "daily",
    time: "03:15",
    retainCount: 14,
    location: "cloud",
  });

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
        <label className="flex items-center justify-between cursor-pointer" onClick={() => setForm((p) => ({ ...p, autoEnabled: !p.autoEnabled }))}>
          <div className={`w-10 h-5 rounded-full transition-colors ${form.autoEnabled ? "bg-[#2563EB]" : "bg-slate-200"}`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${form.autoEnabled ? "translate-x-1" : "translate-x-5"}`} />
          </div>
          <p className="text-sm text-slate-700 font-medium">بک‌آپ خودکار</p>
        </label>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">تناوب بک‌آپ</label>
            <select value={form.frequency} onChange={(e) => setForm((p) => ({ ...p, frequency: e.target.value }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
              <option value="daily">روزانه</option>
              <option value="weekly">هفتگی</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">ساعت اجرا</label>
            <input type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">تعداد نسخه‌های نگهداری‌شده</label>
            <input type="number" value={form.retainCount} onChange={(e) => setForm((p) => ({ ...p, retainCount: Number(e.target.value) }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">محل ذخیره‌سازی</label>
            <select value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
              <option value="cloud">ابری</option>
              <option value="local">سرور محلی</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-[#2563EB] border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors font-medium">
            <IconCloudUpload size={15} />بک‌آپ دستی الان
          </button>
          <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <IconCircleCheck size={15} />ذخیره تنظیمات
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <IconCloudUpload size={16} className="text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-800">تاریخچه بک‌آپ‌ها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["تاریخ و زمان", "نوع", "حجم", "وضعیت", ""].map((h) => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((b, i) => (
                <tr key={b.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}>
                  <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">{b.date}</td>
                  <td className="px-4 py-3 text-slate-600">{b.type}</td>
                  <td className="px-4 py-3 text-slate-600 ltr">{b.size}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-2 py-1 rounded-lg ${b.status === "موفق" ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {b.status === "موفق" && (
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><IconDownload size={13} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LanguageSettings() {
  const [defaultLang, setDefaultLang] = useState("fa");
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    fa: true, ps: true, en: false, ar: false,
  });

  const LANGUAGES = [
    { code: "fa", label: "دری" },
    { code: "ps", label: "پشتو" },
    { code: "en", label: "English" },
    { code: "ar", label: "عربی" },
  ];

  const toggleEnabled = (code: string) => {
    if (code === defaultLang) return; // default language cannot be disabled
    setEnabled((p) => ({ ...p, [code]: !p[code] }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-3">زبان‌های سیستم</h3>
        <div className="space-y-2">
          {LANGUAGES.map((l) => (
            <div key={l.code} className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDefaultLang(l.code)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors ${defaultLang === l.code ? "bg-[#2563EB] text-white" : "bg-slate-50 text-slate-500 border border-slate-200"}`}
                >
                  {defaultLang === l.code ? "زبان پیش‌فرض" : "تعیین به‌عنوان پیش‌فرض"}
                </button>
                <label className="flex items-center gap-2 cursor-pointer" onClick={() => toggleEnabled(l.code)}>
                  <div className={`w-9 h-5 rounded-full transition-colors ${enabled[l.code] ? "bg-[#2563EB]" : "bg-slate-200"} ${l.code === defaultLang ? "opacity-50" : ""}`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform shadow-sm ${enabled[l.code] ? "translate-x-1" : "translate-x-4"}`} />
                  </div>
                </label>
              </div>
              <span className="text-sm font-medium text-slate-700">{l.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-3">زبان پیش‌فرض همیشه فعال است و کاربران فقط از میان زبان‌های فعال می‌توانند انتخاب کنند.</p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button className="px-5 py-2 text-sm bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <IconCircleCheck size={15} />ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [activeMenu, setActiveMenu] = useState(() => menuIdFromPath(location.pathname));
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

  // Keep the highlighted menu item in sync with the URL (e.g. back/forward navigation)
  useEffect(() => {
    setActiveMenu(menuIdFromPath(location.pathname));
  }, [location.pathname]);

  const selectMenu = (id: string) => {
    setActiveMenu(id);
    navigate(`/settings/${id}`);
  };

  const activeLabel =
    settingsMenu.find((m) => m.id === activeMenu)?.label ?? "تنظیمات عمومی";

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
          <span className="text-slate-600">{activeLabel}</span>
        </p>
      </div>

      <div className="flex gap-5">
        {/* Settings sidebar menu */}
        <div className="w-56 shrink-0 space-y-1">
          {settingsMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => selectMenu(item.id)}
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
        {["general", "users", "system", "security", "financial", "alerts", "backup", "lang"].includes(activeMenu) ? (
          <div className="flex-1 min-w-0">
            {hasPermission("viewSettings") ? (
              activeMenu === "general" ? <GeneralSettings /> :
              activeMenu === "users" ? <UsersSettings /> :
              activeMenu === "system" ? <SystemSettings /> :
              activeMenu === "financial" ? <FinancialSettings /> :
              activeMenu === "alerts" ? <AlertsSettings /> :
              activeMenu === "backup" ? <BackupSettings /> :
              activeMenu === "lang" ? <LanguageSettings /> :
              <SecuritySettings />
            ) : (
              <RestrictedSection />
            )}
          </div>
        ) : activeMenu !== "roles" ? (
          <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl">
            <Placeholder title={activeLabel} />
          </div>
        ) : !hasPermission("viewSettings") ? (
          <div className="flex-1 min-w-0"><RestrictedSection /></div>
        ) : (
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
        )}

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
