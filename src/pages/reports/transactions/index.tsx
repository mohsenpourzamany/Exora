import { useState } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
} from 'recharts'
import {
  IconArrowsExchange, IconClock, IconCash, IconCircleX,
  IconDownload, IconSearch, IconCircleCheck, IconFilter,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import {
  txReportStats, txByType, dailyTxData,
  allTransactions, branches, txTypes, currencies, statuses,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconArrowsExchange, IconClock, IconCash, IconCircleX,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
            <span className="text-xs font-bold" style={{ color: p.color || p.fill }}>{p.value?.toLocaleString()}</span>
            <span className="text-xs text-slate-500">{p.name}</span>
          </div>
        ))}
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

export default function TransactionsReport() {
  const { user } = useAuth()
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState('همه شعب')
  const [filterType, setFilterType] = useState('همه انواع')
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')
  const [filterStatus, setFilterStatus] = useState('همه وضعیت‌ها')

  const filtered = allTransactions.filter(tx => {
    const matchSearch = tx.desc.includes(search)
    const matchBranch = filterBranch === 'همه شعب' || tx.branch === filterBranch
    const matchType = filterType === 'همه انواع' || tx.type === filterType
    const matchCurrency = filterCurrency === 'همه ارزها' || tx.currency === filterCurrency
    const matchStatus = filterStatus === 'همه وضعیت‌ها' || tx.status === filterStatus
    return matchSearch && matchBranch && matchType && matchCurrency && matchStatus
  })

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>گزارشات</span><span>›</span>
            <span className="text-slate-600 font-medium">گزارش تراکنش‌ها</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">گزارش تراکنش‌ها</h1>
          <p className="text-sm text-slate-500 mt-0.5">تحلیل کامل تمام تراکنش‌های سیستم</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <IconDownload size={15} />خروجی Excel
          </button>
          <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <IconDownload size={15} />خروجی PDF
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {txReportStats.map(stat => {
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
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              {isTeller && stat.id === 'volume'
                ? <p className="text-lg font-bold text-slate-300">••••••</p>
                : <p className="text-lg font-bold text-slate-800 ltr">{stat.value}</p>
              }
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '3fr 2fr' }}>

        {/* Composed chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#2563EB]" />تعداد</span>
              {!isTeller && <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#DC2626]" />ناموفق</span>}
            </div>
            <h3 className="text-sm font-semibold text-slate-800">نمودار تراکنش‌ها — ۱۴ روز اخیر</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={dailyTxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} interval={2} />
              <YAxis yAxisId="count" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={40} />
              {!isTeller && <YAxis yAxisId="failed" orientation="right" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={30} />}
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="count" dataKey="count" name="تعداد" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={20} />
              {!isTeller && <Line yAxisId="failed" type="monotone" dataKey="failed" name="ناموفق" stroke="#DC2626" strokeWidth={2} dot={{ fill: '#DC2626', r: 3 }} />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">توزیع تراکنش‌ها بر اساس نوع</h3>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={txByType} cx="50%" cy="50%" innerRadius={36} outerRadius={56} paddingAngle={2} dataKey="count">
                    {txByType.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs font-bold text-slate-800">1,245</p>
                <p className="text-[9px] text-slate-400">کل</p>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {txByType.map(t => (
                <div key={t.name} className="flex items-center justify-between text-xs">
                  <span className="font-semibold ltr" style={{ color: t.color }}>{t.percent}%</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[11px]">{t.name}</span>
                    <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {txTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        {!isTeller && (
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
        )}
        <select value={filterCurrency} onChange={e => setFilterCurrency(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {currencies.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <div className="flex-1" />
        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..." className="w-44 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
        <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          {filtered.length} مورد
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['#', 'تاریخ و زمان', 'نوع تراکنش', 'شرح', !isTeller ? 'شعبه' : null, 'ارز', 'مبلغ', 'وضعیت'].filter(Boolean).map(h => (
                  <th key={h!} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-400">{tx.id}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: tx.typeColor, background: tx.typeBg }}>{tx.type}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{tx.desc}</td>
                  {!isTeller && <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{tx.branch}</td>}
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{tx.currency}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-800 ltr whitespace-nowrap">
                    {isTeller ? '••••••' : tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: tx.statusColor, background: tx.statusBg }}>
                      <StatusIcon s={tx.status} />{tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {allTransactions.length}</span>
          <div className="flex items-center gap-1">
            {['«', '‹', '1', '2', '3', '›', '»'].map((p, i) => (
              <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
