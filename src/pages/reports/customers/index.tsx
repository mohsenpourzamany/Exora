import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid,
} from 'recharts'
import {
  IconWallet, IconUsers, IconSend, IconFileText,
  IconCash, IconArrowsExchange, IconCircleCheck,
  IconFileInvoice, IconScale,
  IconDownload, IconSearch, IconFilter,
  IconChevronDown, IconCalendar,
  IconCircleX, IconClock,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import {
  customerReportStats, reportTypes, customerBalanceData,
  cashChartData, customerSummary, recentActivity,
  customerTypes, branches, currencies,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconWallet, IconUsers, IconSend, IconFileText,
  IconCash, IconArrowsExchange, IconCircleCheck,
  IconFileInvoice, IconScale,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-xs font-bold text-[#2563EB]">{payload[0].value.toLocaleString()} $</p>
      </div>
    )
  }
  return null
}

const StatusIcon = ({ s }: { s: string }) => {
  if (s === 'موفق') return <IconCircleCheck size={12} />
  if (s === 'در انتظار') return <IconClock size={12} />
  return <IconCircleX size={12} />
}

export default function CustomerReports() {
  const { hasPermission } = useAuth()
  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState('همه شعب')
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')

  const filtered = recentActivity.filter(a =>
    a.customer.includes(search) || a.code.includes(search)
  )

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>گزارشات</span><span>›</span>
            <span className="text-slate-600 font-medium">گزارشات مشتریان</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">گزارشات مشتریان</h1>
          <p className="text-sm text-slate-500 mt-0.5">مشاهده و تحلیل اطلاعات مالی مشتریان</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <IconDownload size={15} />خروجی Excel
          </button>
          <button className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconFileText size={15} />گزارش جدید
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {customerReportStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <div key={stat.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                  {Icon && <Icon size={18} style={{ color: stat.color }} />}
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-lg ${stat.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-base font-bold text-slate-800 ltr">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Report types grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">انواع گزارشات مشتریان</h3>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {reportTypes.map(rt => {
            const Icon = ICONS[rt.icon]
            return (
              <button
                key={rt.id}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all text-right group"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" style={{ background: rt.bg }}>
                  {Icon && <Icon size={18} style={{ color: rt.color }} />}
                </div>
                <span className="text-xs font-medium text-slate-700">{rt.label}</span>
                <IconChevronDown size={13} className="text-slate-300 mr-auto rotate-[-90deg]" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '3fr 2fr' }}>

        {/* Cash trend chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#2563EB]" />نقدینگی مشتریان</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">نمودار نقدینگی مشتریان</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cashChartData}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={70} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="نقدینگی" stroke="#2563EB" strokeWidth={2.5} fill="url(#cg)" dot={{ fill: '#2563EB', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Balance distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">توزیع مشتریان بر اساس بالانس</h3>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={customerBalanceData} cx="50%" cy="50%" innerRadius={36} outerRadius={56} paddingAngle={2} dataKey="count">
                    {customerBalanceData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs font-bold text-slate-800">3,652</p>
                <p className="text-[9px] text-slate-400">مشتری</p>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {customerBalanceData.map(d => (
                <div key={d.range} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 ltr">{d.count.toLocaleString()}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[11px]">{d.range}</span>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter + table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Filter bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 flex-wrap">
          {hasPermission('viewAllBranches') && (
            <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
              {branches.map(b => <option key={b}>{b}</option>)}
            </select>
          )}
          <select value={filterCurrency} onChange={e => setFilterCurrency(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {currencies.map(c => <option key={c}>{c}</option>)}
          </select>
          <div className="flex items-center gap-1.5 h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-xs text-slate-600">۱۴۰۳/۰۱/۰۱ — ۱۴۰۳/۰۲/۲۴</span>
            <IconCalendar size={13} className="text-slate-400" />
          </div>
          <div className="flex-1" />
          <div className="relative">
            <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو مشتری، کد..." className="w-48 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">آخرین فعالیت مشتریان</h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['#', 'مشتری', 'نوع فعالیت', 'شماره', 'شعبه', 'مبلغ', 'ارز', 'کاربر', 'وضعیت'].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-400">{a.id}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-800 whitespace-nowrap">{a.customer}</td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{a.activity}</td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#2563EB] ltr whitespace-nowrap">{a.code}</td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{a.branch}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-800 ltr">{a.amount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-600 ltr">{a.currency}</td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{a.user}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: a.statusColor, background: a.statusBg }}>
                      <StatusIcon s={a.status} />{a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {recentActivity.length}</span>
          <div className="flex items-center gap-1">
            {['«', '‹', '1', '2', '3', '›', '»'].map((p, i) => (
              <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom summary */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'مشتریان فعال',    value: customerSummary.active,   color: '#059669', bg: '#ECFDF5' },
          { label: 'مشتریان غیرفعال', value: customerSummary.inactive, color: '#94A3B8', bg: '#F8FAFC' },
          { label: 'مشتریان جدید',    value: customerSummary.new,      color: '#2563EB', bg: '#EFF6FF' },
          { label: 'مشتریان مسدود',   value: customerSummary.blocked,  color: '#DC2626', bg: '#FEF2F2' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <span className="text-xl font-bold ltr" style={{ color: s.color }}>{s.value.toLocaleString()}</span>
            <div className="text-right">
              <p className="text-xs text-slate-600 font-medium">{s.label}</p>
              <div className="w-8 h-1.5 rounded-full mt-1" style={{ background: s.bg, border: `1px solid ${s.color}30` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
