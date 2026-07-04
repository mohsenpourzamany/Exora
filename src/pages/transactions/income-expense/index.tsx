import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import {
  IconTrendingUp, IconTrendingDown, IconCoin, IconList,
  IconPlus, IconDownload, IconSearch,
  IconCircleCheck, IconClock, IconCircleX,
  IconDotsVertical, IconEdit, IconTrash, IconChevronDown, IconLock,
  IconCalendar,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import {
  incomeExpenseStats, incomeExpenseData,
  dailyData, weeklyData, monthlyData,
  branches, currencies,
} from './mockData'

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'custom'

const PERIOD_LABELS: Record<PeriodType, string> = {
  daily:   'روزانه',
  weekly:  'هفتگی',
  monthly: 'ماهانه',
  custom:  'بازه دلخواه',
}

const ICONS: Record<string, React.ElementType> = {
  IconTrendingUp, IconTrendingDown, IconCoin, IconList,
}

const StatusIcon = ({ s }: { s: string }) => {
  if (s === 'موفق') return <IconCircleCheck size={12} />
  if (s === 'در انتظار') return <IconClock size={12} />
  return <IconCircleX size={12} />
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
            <span className="text-xs font-semibold" style={{ color: p.color }}>{p.value.toLocaleString()}</span>
            <span className="text-xs text-slate-500">{p.name}</span>
          </div>
        ))}
        {payload.length === 2 && (
          <div className="flex items-center justify-between gap-4 mt-1.5 pt-1.5 border-t border-slate-100">
            <span className="text-xs font-bold text-[#2563EB]">
              {(payload[0].value - payload[1].value).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">سود خالص</span>
          </div>
        )}
      </div>
    )
  }
  return null
}

const NewEntryModal = ({ type, onClose }: { type: 'income' | 'expense', onClose: () => void }) => {
  const isIncome = type === 'income'
  const color = isIncome ? '#059669' : '#DC2626'
  const btnClass = isIncome ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors text-lg">✕</button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <h2 className="text-sm font-bold text-slate-800">{isIncome ? 'ثبت عاید جدید' : 'ثبت مصرف جدید'}</h2>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نوع تراکنش</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                <option>{isIncome ? 'عاید' : 'مصرف'}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branches.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">شرح تراکنش</label>
            <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="شرح تراکنش..." />
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">مبلغ</label>
              <input type="number" className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="0.00" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ارز</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {currencies.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">حساب / طرف حساب</label>
            <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام حساب..." />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">توضیحات (اختیاری)</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none" rows={2} placeholder="توضیحات..." />
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium">انصراف</button>
          <button className={`flex-1 py-2.5 rounded-xl text-sm text-white font-medium transition-colors ${btnClass}`}>
            {isIncome ? '✓ ثبت عاید' : '✓ ثبت مصرف'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

const RestrictedCard = ({ label }: { label: string }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4">
    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
      <IconLock size={16} className="text-slate-400" />
    </div>
    <p className="text-[11px] text-slate-400 mb-1">{label}</p>
    <p className="text-lg font-bold text-slate-300">••••••</p>
    <p className="text-[11px] text-slate-300">دسترسی محدود</p>
  </div>
)

export default function IncomeExpense() {
  const { user, hasPermission } = useAuth()
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState(hasPermission('viewAllBranches') ? 'همه شعب' : user.branch)
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')
  const [filterType, setFilterType] = useState('همه')
  const [modal, setModal] = useState<'income' | 'expense' | null>(null)

  // Chart period state
  const [period, setPeriod] = useState<PeriodType>('monthly')
  const [customFrom, setCustomFrom] = useState('2024-04-01')
  const [customTo, setCustomTo] = useState('2024-04-24')
  const [showCustom, setShowCustom] = useState(false)

  // Get chart data based on period
  const chartData = useMemo(() => {
    if (period === 'daily') return dailyData
    if (period === 'weekly') return weeklyData
    if (period === 'monthly') return monthlyData
    if (period === 'custom') {
      const from = new Date(customFrom)
      const to = new Date(customTo)
      return dailyData.filter(d => d.rawDate >= from && d.rawDate <= to)
    }
    return monthlyData
  }, [period, customFrom, customTo])

  // Compute stats from chart data
  const chartTotalIncome = chartData.reduce((s, d) => s + d.income, 0)
  const chartTotalExpense = chartData.reduce((s, d) => s + d.expense, 0)
  const chartNetProfit = chartTotalIncome - chartTotalExpense

  // Table filter
  const filtered = incomeExpenseData.filter(tx => {
    const matchSearch = tx.desc.includes(search) || tx.account.includes(search)
    const matchBranch = filterBranch === 'همه شعب' || tx.branch === filterBranch
    const matchCurrency = filterCurrency === 'همه ارزها' || tx.currency === filterCurrency
    const matchType = filterType === 'همه' || tx.type === filterType
    return matchSearch && matchBranch && matchCurrency && matchType
  })

  return (
    <div className="space-y-5">

      {modal && <NewEntryModal type={modal} onClose={() => setModal(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>ترانزکشن‌ها</span><span>›</span>
            <span className="text-slate-600 font-medium">عواید و مصارف</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">عواید و مصارف</h1>
          <p className="text-sm text-slate-500 mt-0.5">ثبت و مدیریت عواید و مصارف روزانه</p>
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('viewReports') && (
            <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <IconDownload size={15} />خروجی Excel
            </button>
          )}
          {hasPermission('createTransaction') && (
            <>
              <button onClick={() => setModal('expense')} className="flex items-center gap-2 text-sm bg-[#DC2626] text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors font-medium">
                <IconPlus size={15} />ثبت مصرف جدید
              </button>
              <button onClick={() => setModal('income')} className="flex items-center gap-2 text-sm bg-[#059669] text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors font-medium">
                <IconPlus size={15} />ثبت عاید جدید
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {incomeExpenseStats.map(stat => {
          const Icon = ICONS[stat.icon]
          if (isTeller && stat.id !== 'count') return <RestrictedCard key={stat.id} label={stat.label} />
          if (user.role === 'branch_manager' && stat.id === 'net-profit') return <RestrictedCard key={stat.id} label={stat.label} />
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
              <p className="text-lg font-bold text-slate-800 ltr">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Chart with period selector */}
      {hasPermission('viewReports') && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">

          {/* Chart header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#059669]" />عواید</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#DC2626]" />مصارف</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">نمودار عواید و مصارف</h3>
          </div>

          {/* Period selector */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
              {(['daily', 'weekly', 'monthly'] as PeriodType[]).map(p => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setShowCustom(false) }}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${period === p && !showCustom ? 'bg-white shadow-sm text-[#2563EB]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {PERIOD_LABELS[p]}
                </button>
              ))}
              <button
                onClick={() => { setPeriod('custom'); setShowCustom(true) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${showCustom ? 'bg-white shadow-sm text-[#2563EB]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <IconCalendar size={12} />
                بازه دلخواه
              </button>
            </div>

            {/* Custom date range */}
            {showCustom && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                  <span className="text-[10px] text-slate-400">تا</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={e => setCustomTo(e.target.value)}
                    className="text-xs bg-transparent ltr focus:outline-none text-slate-700"
                  />
                </div>
                <span className="text-slate-300 text-xs">—</span>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                  <span className="text-[10px] text-slate-400">از</span>
                  <input
                    type="date"
                    value={customFrom}
                    onChange={e => setCustomFrom(e.target.value)}
                    className="text-xs bg-transparent ltr focus:outline-none text-slate-700"
                  />
                </div>
              </div>
            )}

            {/* Dynamic summary */}
            <div className="flex items-center gap-3 mr-auto">
              {!isTeller && (
                <>
                  <span className="text-xs text-slate-500">
                    عواید: <span className="font-bold text-emerald-600 ltr">{(chartTotalIncome/1000000).toFixed(1)}M</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    مصارف: <span className="font-bold text-red-500 ltr">{(chartTotalExpense/1000000).toFixed(1)}M</span>
                  </span>
                  {user.role === 'admin' && (
                    <span className="text-xs text-slate-500">
                      سود: <span className="font-bold text-[#2563EB] ltr">{(chartNetProfit/1000000).toFixed(1)}M</span>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} interval={period === 'daily' ? 4 : 0} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="عواید" stroke="#059669" strokeWidth={2.5} fill="url(#ig)" dot={period !== 'daily' ? { fill: '#059669', r: 4 } : false} />
              <Area type="monotone" dataKey="expense" name="مصارف" stroke="#DC2626" strokeWidth={2.5} fill="url(#eg)" dot={period !== 'daily' ? { fill: '#DC2626', r: 4 } : false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {['همه', 'عاید', 'مصرف'].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterType === t ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {hasPermission('viewAllBranches') && (
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
        )}

        <select value={filterCurrency} onChange={e => setFilterCurrency(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {currencies.map(c => <option key={c}>{c}</option>)}
        </select>

        <div className="flex-1" />

        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..." className="w-44 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>

        {!isTeller && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg ltr">
              +{filtered.filter(t => t.type === 'عاید').reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg ltr">
              -{filtered.filter(t => t.type === 'مصرف').reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-right text-slate-500 font-medium px-4 py-3">#</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">تاریخ و زمان</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">نوع</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">شرح</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">حساب / طرف حساب</th>
                {hasPermission('viewAllBranches') && <th className="text-right text-slate-500 font-medium px-4 py-3">شعبه</th>}
                <th className="text-right text-slate-500 font-medium px-4 py-3">ارز</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">مبلغ</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">وضعیت</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-400 font-medium">{tx.id}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: tx.typeColor, background: tx.typeBg }}>{tx.type}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{tx.desc}</td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{tx.account}</td>
                  {hasPermission('viewAllBranches') && <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{tx.branch}</td>}
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{tx.currency}</td>
                  <td className="px-4 py-3.5">
                    <span className={`font-bold ltr whitespace-nowrap ${tx.type === 'عاید' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {tx.type === 'عاید' ? '+' : '-'}{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: tx.statusColor, background: tx.statusBg }}>
                      <StatusIcon s={tx.status} />{tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      {hasPermission('editTransaction') && <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><IconEdit size={13} /></button>}
                      {hasPermission('deleteTransaction') && <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash size={13} /></button>}
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><IconDotsVertical size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {incomeExpenseData.length}</span>
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
