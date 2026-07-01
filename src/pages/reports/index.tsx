import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import {
  IconUsers, IconTrendingUp, IconWallet,
  IconStarFilled, IconArrowsExchange,
  IconDownload, IconPlus, IconCalendar,
  IconDotsVertical, IconRefresh, IconFilter,
  IconFileTypePdf, IconFileTypeXls,
  IconClock, IconCircleCheck,
} from '@tabler/icons-react'
import {
  reportStats, incomeExpenseChart, incomeByType,
  recentReports, summaryStats, reportSummary,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconUsers, IconTrendingUp, IconWallet,
  IconStarFilled, IconArrowsExchange,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Reports() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('income')

  const tabs = [
    { id: 'income',    label: 'عواید و مصارف' },
    { id: 'customers', label: 'مشتریان' },
    { id: 'accounts',  label: 'حساب‌ها' },
    { id: 'orders',    label: 'سفارشی' },
    { id: 'transactions', label: 'تراکنش‌ها' },
  ]

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">گزارشات</h1>
          <p className="text-sm text-slate-500 mt-0.5">مشاهده و تحلیل گزارش‌های مالی و عملیاتی</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <IconRefresh size={15} />
            بروزرسانی
          </button>
          <button className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconPlus size={15} />
            ایجاد گزارش جدید
          </button>
        </div>
      </div>

      {/* Report type cards */}
      <div className="grid grid-cols-5 gap-4">
        {reportStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <button
              key={stat.id}
              onClick={() => navigate(stat.path)}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all text-right group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: stat.bg }}>
                  {Icon && <Icon size={18} style={{ color: stat.color }} />}
                </div>
                <span className="text-xs text-slate-400">مشاهده گزارش ←</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-slate-800 ltr">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </button>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="flex gap-5">

        {/* Left: charts + table */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Filter bar */}
          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-1.5 text-xs bg-[#2563EB] text-white px-3 py-1.5 rounded-lg font-medium">
              <IconFilter size={13} />
              اعمال فیلتر
            </button>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg overflow-hidden">
              {['امروز', 'دیروز', 'هفته', 'ماه جاری', 'ماه گذشته', 'باز دلخواه'].map((t, i) => (
                <button
                  key={t}
                  className={`px-3 py-1.5 text-xs transition-colors ${i === 3 ? 'bg-blue-50 text-[#2563EB] font-medium' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs text-slate-600">۱۴۰۳/۰۱/۰۱ - ۱۴۰۳/۰۲/۲۴</span>
              <IconCalendar size={14} className="text-slate-400" />
            </div>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none">
              <option>همه شعب</option>
              <option>شعبه مرکزی</option>
              <option>شعبه کابل</option>
            </select>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none">
              <option>همه ارزها</option>
              <option>دلار</option>
              <option>یورو</option>
            </select>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none">
              <option>همه حساب‌ها</option>
            </select>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none">
              <option>دسته‌بندی</option>
            </select>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-5 gap-4">

            {/* Area chart */}
            <div className="col-span-3 bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1.5 rounded-full bg-[#2563EB]" />
                    عواید
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1.5 rounded-full bg-[#DC2626]" />
                    مصارف
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none">
                    <option>ماه جاری</option>
                    <option>۳ ماه</option>
                    <option>۶ ماه</option>
                  </select>
                  <h3 className="text-sm font-semibold text-slate-800">نمودار عواید و مصارف</h3>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={incomeExpenseChart}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="income" name="عواید" stroke="#2563EB" strokeWidth={2.5} fill="url(#incomeGrad)" dot={{ fill: '#2563EB', r: 4 }} />
                  <Area type="monotone" dataKey="expense" name="مصارف" stroke="#DC2626" strokeWidth={2.5} fill="url(#expenseGrad)" dot={{ fill: '#DC2626', r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">توزیع عواید بر اساس نوع</h3>
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <ResponsiveContainer width={110} height={110}>
                    <PieChart>
                      <Pie data={incomeByType} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={2} dataKey="value">
                        {incomeByType.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-bold text-slate-800">12.6M</p>
                    <p className="text-[9px] text-slate-400">دلار</p>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {incomeByType.map(t => (
                    <div key={t.name} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 ltr">{t.value}%</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 text-[11px]">{t.name}</span>
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent reports table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <button className="text-xs text-[#2563EB] hover:underline font-medium">مشاهده همه گزارشات</button>
              <h3 className="text-sm font-semibold text-slate-800">گزارشات اخیر</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['نام گزارش', 'نوع گزارش', 'بازه زمانی', 'تاریخ ایجاد', 'ایجاد کننده', 'فرمت', 'وضعیت', 'عملیات'].map(h => (
                      <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((r, i) => (
                    <tr key={r.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{r.name}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: r.typeColor, background: r.typeBg }}>
                          {r.typeLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap ltr">{r.period}</td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap ltr">{r.created}</td>
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{r.creator}</td>
                      <td className="px-4 py-3.5">
                        {r.format === 'PDF'
                          ? <span className="flex items-center gap-1 text-red-500"><IconFileTypePdf size={15} />PDF</span>
                          : <span className="flex items-center gap-1 text-green-600"><IconFileTypeXls size={15} />Excel</span>
                        }
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: r.statusColor, background: r.statusBg }}>
                          {r.status === 'تکمیل شد' ? <IconCircleCheck size={12} /> : <IconClock size={12} />}
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <IconDownload size={14} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <IconDotsVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-56 shrink-0 space-y-4">

          {/* Summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">خلاصه گزارشات</h3>
            <div className="space-y-2.5">
              {[
                { label: 'کل گزارشات',       value: summaryStats.total,    color: '#2563EB', icon: IconArrowsExchange },
                { label: 'گزارشات دوره‌ای',   value: summaryStats.periodic, color: '#7C3AED', icon: IconCalendar },
                { label: 'گزارشات سفارشی',    value: summaryStats.custom,   color: '#D97706', icon: IconStarFilled },
                { label: 'گزارشات صادر شده',  value: summaryStats.issued,   color: '#059669', icon: IconCircleCheck },
                { label: 'گزارشات زمانبندی',  value: summaryStats.scheduled,color: '#0891B2', icon: IconClock },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: item.color }}>{item.value}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick access */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">عملیات سریع گزارشات</h3>
            <div className="space-y-2">
              {[
                { label: 'ایجاد گزارش جدید',    color: '#2563EB', bg: '#EFF6FF' },
                { label: 'گزارش دوره‌ای جدید',  color: '#7C3AED', bg: '#F5F3FF' },
                { label: 'گزارش سفارشی',         color: '#D97706', bg: '#FFFBEB' },
                { label: 'گزارش زمانبندی شده',   color: '#0891B2', bg: '#ECFEFF' },
              ].map(action => (
                <button
                  key={action.label}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all text-right"
                >
                  <span className="text-xs font-medium" style={{ color: action.color }}>{action.label}</span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: action.bg }}>
                    <IconPlus size={12} style={{ color: action.color }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Overall summary */}
          <div className="bg-[#1E3A8A] rounded-xl p-4 text-white">
            <h3 className="text-sm font-semibold mb-3 text-blue-100">خلاصه کلی بازه انتخابی</h3>
            <div className="space-y-2.5 text-xs">
              {[
                { label: 'کل تراکنش‌ها',  value: reportSummary.totalTransactions.toLocaleString(), unit: '' },
                { label: 'کل عواید',       value: (reportSummary.totalIncome / 1000000).toFixed(1) + 'M', unit: '$' },
                { label: 'کل مصارف',       value: (reportSummary.totalExpense / 1000000).toFixed(1) + 'M', unit: '$' },
                { label: 'کل مشتریان',     value: reportSummary.totalCustomers.toLocaleString(), unit: '' },
                { label: 'شعب فعال',       value: reportSummary.activeBranches.toString(), unit: '' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-bold text-blue-100 ltr">{item.value} {item.unit}</span>
                  <span className="text-blue-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
