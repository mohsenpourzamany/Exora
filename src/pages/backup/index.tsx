import { useState } from 'react'
import {
  IconDatabase, IconCloudUpload, IconDownload,
  IconTrash, IconRefresh, IconCircleCheck,
  IconClock, IconCalendar, IconDeviceFloppy,
  IconBrandGoogleDrive, IconCloud,
} from '@tabler/icons-react'

const backupList = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', type: 'بک‌آپ کامل',       size: '245.6 MB', creator: 'احمد محمدی',  status: 'موفق' },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۳ - ۰۲:۰۰', type: 'بک‌آپ کامل',       size: '243.1 MB', creator: 'سیستم (خودکار)', status: 'موفق' },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۳ - ۱۰:۳۰', type: 'بک‌آپ پایگاه داده', size: '85.7 MB',  creator: 'احمد محمدی',  status: 'موفق' },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۱ - ۰۲:۰۰', type: 'بک‌آپ کامل',       size: '240.3 MB', creator: 'سیستم (خودکار)', status: 'موفق' },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۰ - ۰۲:۰۰', type: 'بک‌آپ کامل',       size: '238.9 MB', creator: 'سیستم (خودکار)', status: 'موفق' },
]

export default function Backup() {
  const [autoTime, setAutoTime] = useState('02:00')
  const [autoFreq, setAutoFreq] = useState('روزانه')
  const [retention, setRetention] = useState('30')
  const usedGB = 12.45
  const totalGB = 50
  const usedPercent = (usedGB / totalGB) * 100

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">بک آپ</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت و تهیه نسخه پشتیبان از اطلاعات سیستم برای حفظ امنیت داده‌ها</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <IconCircleCheck size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500">آخرین بک‌آپ موفق</p>
              <p className="text-xs font-semibold text-slate-700 ltr">۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰</p>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-800">245.6 MB</p>
          <p className="text-[11px] text-slate-400">پایگاه داده + فایل‌ها</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <IconDatabase size={20} className="text-[#2563EB]" />
            </div>
            <p className="text-[11px] text-slate-500">تعداد بک‌آپ‌ها</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">24</p>
          <p className="text-[11px] text-slate-400">دیک‌آپ ذخیره شده</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <IconDeviceFloppy size={20} className="text-purple-500" />
            </div>
            <p className="text-[11px] text-slate-500">حجم کل بک‌آپ‌ها</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">12.45 GB</p>
          <p className="text-[11px] text-slate-400">در فضای ذخیره‌سازی</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <IconCircleCheck size={20} className="text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500">وضعیت بک‌آپ خودکار</p>
          </div>
          <p className="text-lg font-bold text-emerald-600">فعال</p>
          <p className="text-[11px] text-slate-400">هر روز ساعت ۰۲:۰۰</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="flex gap-5">

        {/* Left: manual + auto + list */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Manual + Auto backup row */}
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>

            {/* Manual backup */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <IconCloudUpload size={24} className="text-[#2563EB]" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">بک‌آپ دستی</h3>
              </div>
              <p className="text-xs text-slate-500 mb-5 text-right">همین حالا از اطلاعات سیستم بک‌آپ تهیه کنید</p>
              <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors">
                  <IconDatabase size={22} className="text-[#2563EB]" />
                  <p className="text-xs font-semibold text-[#2563EB]">بک‌آپ کامل</p>
                  <p className="text-[10px] text-blue-400 text-center leading-tight">تهیه نسخه کامل از پایگاه داده و تمامی فایل‌های سیستم</p>
                  <button className="w-full mt-1 py-1.5 bg-[#2563EB] text-white text-xs rounded-lg font-medium">تهیه بک‌آپ کامل</button>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                  <IconDatabase size={22} className="text-emerald-600" />
                  <p className="text-xs font-semibold text-emerald-600">بک‌آپ پایگاه داده</p>
                  <p className="text-[10px] text-emerald-500 text-center leading-tight">فقط از پایگاه داده سیستم نسخه پشتیبانی تهیه شود</p>
                  <button className="w-full mt-1 py-1.5 bg-emerald-600 text-white text-xs rounded-lg font-medium">تهیه بک‌آپ پایگاه داده</button>
                </button>
              </div>
            </div>

            {/* Auto backup settings */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <IconCalendar size={24} className="text-purple-500" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">تنظیمات بک‌آپ خودکار</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4 text-right">زمان‌بندی و تنظیم تکرار بک‌آپ‌های خودکار</p>
              <div className="space-y-3">
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">ساعت بک‌آپ</label>
                    <input
                      type="time"
                      value={autoTime}
                      onChange={e => setAutoTime(e.target.value)}
                      className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs ltr focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">تناوب بک‌آپ</label>
                    <select
                      value={autoFreq}
                      onChange={e => setAutoFreq(e.target.value)}
                      className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option>روزانه</option>
                      <option>هفتگی</option>
                      <option>ماهانه</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">مدت نگه‌داری بک‌آپ (روز)</label>
                  <select
                    value={retention}
                    onChange={e => setRetention(e.target.value)}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                  >
                    <option>۳۰ روز</option>
                    <option>۶۰ روز</option>
                    <option>۹۰ روز</option>
                  </select>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#2563EB] text-white text-xs rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  <IconCircleCheck size={14} />
                  ذخیره تنظیمات
                </button>
              </div>
            </div>
          </div>

          {/* Backup list */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <select className="h-8 bg-slate-50 border border-slate-200 rounded-lg px-2 text-xs focus:outline-none">
                  <option>همه نوع‌ها</option>
                </select>
                <select className="h-8 bg-slate-50 border border-slate-200 rounded-lg px-2 text-xs focus:outline-none">
                  <option>همه تاریخ‌ها</option>
                </select>
              </div>
              <h3 className="text-sm font-semibold text-slate-800">لیست بک‌آپ‌ها</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['ردیف', 'نوع بک‌آپ', 'تاریخ و زمان', 'حجم', 'کاربر', 'وضعیت', 'عملیات'].map(h => (
                    <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {backupList.map((b, i) => (
                  <tr key={b.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                    <td className="px-4 py-3.5 text-slate-400 font-medium">{b.id}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <IconDatabase size={13} className="text-[#2563EB]" />
                        {b.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{b.date}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{b.size}</td>
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{b.creator}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium text-emerald-600 bg-emerald-50">
                        <IconCircleCheck size={12} />
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <IconDownload size={13} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <IconRefresh size={13} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <IconTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
              <span className="text-xs text-slate-500">نمایش ۱ تا ۵ از ۲۴ مورد</span>
              <div className="flex items-center gap-1">
                {['«', '‹', '1', '2', '3', '4', '5', '›', '»'].map((p, i) => (
                  <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-60 shrink-0 space-y-4">

          {/* Storage status */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">وضعیت فضای ذخیره‌سازی</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#2563EB" strokeWidth="12"
                    strokeDasharray={`${usedPercent * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-sm font-bold text-slate-800">{usedGB} GB</p>
                  <p className="text-[10px] text-slate-400">از {totalGB} GB</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">{usedGB} GB ({usedPercent.toFixed(1)}%)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">استفاده شده</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">{(totalGB - usedGB).toFixed(2)} GB ({(100 - usedPercent).toFixed(1)}%)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">فضای آزاد</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Storage locations */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">محل ذخیره بک‌آپ‌ها</h3>
            <div className="space-y-2">
              {[
                { label: 'سرور محلی',       icon: IconDeviceFloppy,        connected: true,  color: '#059669' },
                { label: 'فضای ابری (Google Drive)', icon: IconBrandGoogleDrive, connected: true,  color: '#2563EB' },
                { label: 'فضای ابری (OneDrive)',     icon: IconCloud,            connected: false, color: '#94A3B8' },
              ].map(loc => (
                <div key={loc.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className={`text-[11px] font-medium ${loc.connected ? '' : 'text-slate-400'}`} style={{ color: loc.connected ? loc.color : '#94A3B8' }}>
                    {loc.connected ? 'متصل' : 'غیرفعال'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">{loc.label}</span>
                    <loc.icon size={15} style={{ color: loc.color }} />
                  </div>
                </div>
              ))}
              <button className="w-full mt-1 text-xs text-[#2563EB] bg-blue-50 border border-blue-200 rounded-lg py-2 hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-1.5">
                <IconRefresh size={13} />
                مدیریت فضاهای ذخیره‌سازی
              </button>
            </div>
          </div>

          {/* System status */}
          <div className="bg-[#1E3A8A] rounded-xl p-4 text-white">
            <h3 className="text-sm font-semibold mb-3 text-blue-100">وضعیت سیستم</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  فعال و پایدار
                </span>
                <span className="text-blue-300">وضعیت سیستم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-200 ltr">امروز - ۰۳:۱۵</span>
                <span className="text-blue-300">آخرین بک‌آپ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-200">245.6 MB</span>
                <span className="text-blue-300">حجم بک‌آپ</span>
              </div>
              <button className="w-full mt-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium transition-colors">
                <IconCloudUpload size={14} />
                بکاپ دستی
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
