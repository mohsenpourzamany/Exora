import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import {
  IconCash, IconBuildingBank, IconCoins, IconList,
  IconArrowDownLeft, IconArrowUpRight,
  IconPlus, IconDownload, IconSearch,
  IconCircleCheck, IconClock, IconCircleX,
  IconDotsVertical, IconEdit, IconTrash, IconLock,
  IconArrowsExchange,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import type { TabType } from './mockData'
import {
  tabLabels, cashBankStats,
  cashTransactions, bankTransactions, miscTransactions,
  branches, currencies, dailyData,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconCash, IconBuildingBank, IconCoins, IconList,
  IconArrowDownLeft, IconArrowUpRight,
}

const TAB_COLORS: Record<TabType, { primary: string; bg: string; chartIn: string; chartOut: string }> = {
  cash: { primary: '#2563EB', bg: '#EFF6FF', chartIn: '#059669', chartOut: '#DC2626' },
  bank: { primary: '#7C3AED', bg: '#F5F3FF', chartIn: '#2563EB', chartOut: '#7C3AED' },
  misc: { primary: '#D97706', bg: '#FFFBEB', chartIn: '#D97706', chartOut: '#0891B2' },
}

const TAB_DATA: Record<TabType, typeof cashTransactions> = {
  cash: cashTransactions,
  bank: bankTransactions,
  misc: miscTransactions,
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
        <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold" style={{ color: p.color }}>{p.value.toLocaleString()}</span>
            <span className="text-xs text-slate-500">{p.name}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const NewEntryModal = ({ tab, onClose }: { tab: TabType; onClose: () => void }) => {
  const [entryType, setEntryType] = useState<'in' | 'out'>('in')
  const color = TAB_COLORS[tab]

  const typeLabels = {
    cash: { in: 'دریافت نقد', out: 'پرداخت نقد' },
    bank: { in: 'واریز بانکی', out: 'برداشت بانکی' },
    misc: { in: 'دریافت متفرقه', out: 'پرداخت متفرقه' },
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">ثبت تراکنش {tabLabels[tab]}</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          {/* Type selector */}
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">نوع تراکنش</label>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <button
                onClick={() => setEntryType('in')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${entryType === 'in' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <IconArrowDownLeft size={16} />
                {typeLabels[tab].in}
              </button>
              <button
                onClick={() => setEntryType('out')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${entryType === 'out' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <IconArrowUpRight size={16} />
                {typeLabels[tab].out}
              </button>
            </div>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branches.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ارز</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {currencies.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">مبلغ</label>
            <input type="number" className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="0.00" />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">حساب / طرف حساب</label>
            <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام حساب..." />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">شرح</label>
            <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="شرح تراکنش..." />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">توضیحات (اختیاری)</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none" rows={2} placeholder="توضیحات..." />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button
            className="flex-1 py-2.5 rounded-xl text-sm text-white font-medium transition-colors"
            style={{ background: entryType === 'in' ? '#059669' : '#DC2626' }}
          >
            ✓ ثبت {entryType === 'in' ? typeLabels[tab].in : typeLabels[tab].out}
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

export default function CashBank() {
  const { user, hasPermission } = useAuth()
  const navigate = useNavigate()
  const isTeller = user.role === 'teller'

  const location = useLocation()
  const getInitialTab = (): TabType => {
    if (location.pathname.includes('misc')) return 'misc'
    return 'cash'
  }
  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab())
  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState(hasPermission('viewAllBranches') ? 'همه شعب' : user.branch)
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')
  const [modal, setModal] = useState(false)

  const colors = TAB_COLORS[activeTab]
  const stats = cashBankStats[activeTab]
  const transactions = TAB_DATA[activeTab]

  const chartKeys = {
    cash: { in: 'cashIn', out: 'cashOut', inLabel: 'دریافت', outLabel: 'پرداخت' },
    bank: { in: 'bankIn', out: 'bankOut', inLabel: 'واریز', outLabel: 'برداشت' },
    misc: { in: 'cashIn', out: 'cashOut', inLabel: 'دریافت', outLabel: 'پرداخت' },
  }
  const ck = chartKeys[activeTab]

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.desc.includes(search) || tx.account.includes(search)
    const matchBranch = filterBranch === 'همه شعب' || tx.branch === filterBranch
    const matchCurrency = filterCurrency === 'همه ارزها' || tx.currency === filterCurrency
    return matchSearch && matchBranch && matchCurrency
  })

  return (
    <div className="space-y-5">

      {modal && <NewEntryModal tab={activeTab} onClose={() => setModal(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>ترانزکشن‌ها</span><span>›</span>
            <span className="text-slate-600 font-medium">نقد و بانک</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">نقد و بانک</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت تراکنش‌های نقدی و بانکی</p>
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('viewReports') && (
            <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <IconDownload size={15} />خروجی Excel
            </button>
          )}
          {hasPermission('createTransaction') && (
            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-2 text-sm text-white px-4 py-2 rounded-xl transition-colors font-medium"
              style={{ background: colors.primary }}
            >
              <IconPlus size={15} />ثبت تراکنش {tabLabels[activeTab]}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1.5 w-fit">
        {(Object.keys(tabLabels) as TabType[]).map(tab => {
          const tabIcons = { cash: IconCash, bank: IconBuildingBank, misc: IconCoins }
          const Icon = tabIcons[tab]
          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearch(''); navigate(tab === 'misc' ? '/transactions/misc' : '/transactions/cash-bank') }}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              style={activeTab === tab ? { background: TAB_COLORS[tab].primary } : {}}
            >
              <Icon size={16} />
              {tabLabels[tab]}
            </button>
          )
        })}
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map((stat, idx) => {
          const Icon = ICONS[stat.icon]
          if (isTeller && idx === 0) return <RestrictedCard key={stat.id} label={stat.label} />
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

      {/* Chart */}
      {hasPermission('viewReports') && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full" style={{ background: colors.chartIn }} />{ck.inLabel}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full" style={{ background: colors.chartOut }} />{ck.outLabel}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">نمودار {tabLabels[activeTab]} — ۱۴ روز اخیر</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="cig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.chartIn} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={colors.chartIn} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cog" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.chartOut} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={colors.chartOut} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={ck.in} name={ck.inLabel} stroke={colors.chartIn} strokeWidth={2} fill="url(#cig)" />
              <Area type="monotone" dataKey={ck.out} name={ck.outLabel} stroke={colors.chartOut} strokeWidth={2} fill="url(#cog)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
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
              +{filtered.filter(t => t.positive).reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg ltr">
              -{filtered.filter(t => !t.positive).reduce((s, t) => s + t.amount, 0).toLocaleString()}
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
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: tx.typeColor, background: tx.typeBg }}>{tx.type}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{tx.desc}</td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{tx.account}</td>
                  {hasPermission('viewAllBranches') && <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{tx.branch}</td>}
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{tx.currency}</td>
                  <td className="px-4 py-3.5">
                    <span className={`font-bold ltr whitespace-nowrap ${tx.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                      {tx.positive ? '+' : '-'}{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد</span>
          <div className="flex items-center gap-1">
            {['«', '‹', '1', '2', '›', '»'].map((p, i) => (
              <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
