import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconStar, IconCircleCheck, IconClock, IconDownload,
  IconPlus, IconEdit, IconTrash, IconPlayerPlay,
  IconFileTypePdf, IconFileTypeXls,
  IconCircleX, IconSettings,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { orderReportStats, customReports, reportHistory } from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconStar, IconCircleCheck, IconClock, IconDownload,
}

// New custom report modal
const NewReportModal = ({ onClose }: { onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">ایجاد گزارش سفارشی جدید</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">نام گزارش</label>
            <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام گزارش سفارشی..." />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">توضیحات</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none" rows={2} placeholder="توضیحات گزارش..." />
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نوع گزارش</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                <option>گزارش عملکرد</option>
                <option>گزارش مالی</option>
                <option>گزارش مشتریان</option>
                <option>گزارش تراکنش‌ها</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">فرمت خروجی</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                <option>Excel</option>
                <option>PDF</option>
                <option>CSV</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">زمانبندی</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                <option>دستی</option>
                <option>روزانه</option>
                <option>هفتگی</option>
                <option>ماهانه</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                <option>همه شعب</option>
                <option>شعبه مرکزی کابل</option>
                <option>شعبه مزار شریف</option>
                <option>شعبه هرات</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">فیلدهای گزارش</label>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {['تاریخ', 'شعبه', 'مشتری', 'مبلغ', 'ارز', 'نوع', 'وضعیت', 'کاربر', 'توضیحات'].map(f => (
                <label key={f} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" defaultChecked className="accent-blue-600" />
                  <span className="text-xs text-slate-700">{f}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ ایجاد گزارش
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
)

export default function OrdersReport() {
  const { user } = useAuth()
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = customReports.filter(r =>
    r.name.includes(search) || r.desc.includes(search)
  )

  return (
    <div className="space-y-5">

      {modal && <NewReportModal onClose={() => setModal(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>گزارشات</span><span>›</span>
            <span className="text-slate-600 font-medium">گزارش‌های سفارشی</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">گزارش‌های سفارشی</h1>
          <p className="text-sm text-slate-500 mt-0.5">ساخت و مدیریت گزارش‌های اختصاصی</p>
        </div>
        {user.role === 'admin' && (
          <button onClick={() => setModal(true)} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconPlus size={15} />گزارش جدید
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {orderReportStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <div key={stat.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                  {Icon && <Icon size={18} style={{ color: stat.color }} />}
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg text-emerald-600 bg-emerald-50">
                  {stat.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <IconStar size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو در گزارشات..." className="w-full h-9 bg-white border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
      </div>

      {/* Custom reports grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {filtered.map(report => (
          <div key={report.id} className={`bg-white border rounded-xl p-5 hover:shadow-md transition-shadow ${report.status ? 'border-slate-200' : 'border-slate-100 opacity-70'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {user.role === 'admin' && (
                  <>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><IconEdit size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash size={14} /></button>
                  </>
                )}
                <button className="flex items-center gap-1.5 text-xs text-white bg-[#2563EB] px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <IconPlayerPlay size={12} />اجرا
                </button>
              </div>
              <div className="text-right">
                <h3 className="text-sm font-semibold text-slate-800">{report.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{report.desc}</p>
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-wrap gap-1.5 mb-3 justify-end">
              {report.fields.map(f => (
                <span key={f} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">{f}</span>
              ))}
            </div>

            {/* Info row */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1 text-[11px] font-medium ${report.status ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {report.status ? <IconCircleCheck size={12} /> : <IconCircleX size={12} />}
                  {report.status ? 'فعال' : 'غیرفعال'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {report.format === 'Excel'
                    ? <IconFileTypeXls size={14} className="text-green-600 inline" />
                    : <IconFileTypePdf size={14} className="text-red-500 inline" />
                  } {report.format}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">
                  <span className="text-slate-600">{report.schedule}</span> · آخرین اجرا: <span className="ltr">{report.lastRun}</span>
                </p>
                <p className="text-[10px] text-slate-400">
                  اجرای بعدی: <span className="ltr">{report.nextRun}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-[#2563EB] cursor-pointer hover:underline">مشاهده همه</span>
          <h3 className="text-sm font-semibold text-slate-800">تاریخچه اجرای گزارشات</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['#', 'نام گزارش', 'تاریخ اجرا', 'فرمت', 'حجم', 'اجرا کننده', 'وضعیت', ''].map(h => (
                <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportHistory.map((h, i) => (
              <tr key={h.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                <td className="px-4 py-3.5 text-slate-400">{h.id}</td>
                <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{h.reportName}</td>
                <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{h.runDate}</td>
                <td className="px-4 py-3.5">
                  {h.format === 'Excel'
                    ? <span className="flex items-center gap-1 text-green-600"><IconFileTypeXls size={14} />Excel</span>
                    : <span className="flex items-center gap-1 text-red-500"><IconFileTypePdf size={14} />PDF</span>
                  }
                </td>
                <td className="px-4 py-3.5 text-slate-500 ltr">{h.size}</td>
                <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{h.runBy}</td>
                <td className="px-4 py-3.5">
                  <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium ${h.status === 'تکمیل' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                    {h.status === 'تکمیل' ? <IconCircleCheck size={12} /> : <IconClock size={12} />}
                    {h.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <IconDownload size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
