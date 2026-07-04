import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import {
  IconWallet, IconCircleCheck, IconCash, IconArrowsExchange,
  IconDownload, IconSearch, IconFilter,
  IconArrowUpRight, IconArrowDownRight, IconMinus,
  IconCircleX, IconLock,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import {
  accountReportStats, accountsList, balanceByBranch,
  accountMovements, branches, accountTypes, currencies,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconWallet, IconCircleCheck, IconCash, IconArrowsExchange,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
            <span className="text-xs font-bold" style={{ color: p.fill }}>{p.value.toLocaleString()}</span>
            <span className="text-xs text-slate-500">{p.name}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const MovementIcon = ({ t }: { t: string }) => {
  if (t === 'واریز') return <IconArrowDownRight size={13} className="text-emerald-500" />
  if (t === 'برداشت') return <IconArrowUpRight size={13} className="text-red-500" />
  return <IconMinus size={13} className="text-blue-500" />
}

export default function AccountsReport() {
  const { user } = useAuth()
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState('همه شعب')
  const [filterType, setFilterType] = useState('همه انواع')
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')

  const filteredAccounts = accountsList.filter(a => {
    const matchSearch = a.name.includes(search)
    const matchBranch = filterBranch === 'همه شعب' || a.branch === filterBranch
    const matchType = filterType === 'همه انواع' || a.type === filterType
    const matchCurrency = filterCurrency === 'همه ارزها' || a.currency === filterCurrency
    return matchSearch && matchBranch && matchType && matchCurrency
  })

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>گزارشات</span><span>›</span>
            <span className="text-slate-600 font-medium">گزارش حساب‌ها</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">گزارش حساب‌ها</h1>
          <p className="text-sm text-slate-500 mt-0.5">مشاهده موجودی و گردش حساب‌ها</p>
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
        {accountReportStats.map(stat => {
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
              {isTeller && stat.id === 'balance'
                ? <p className="text-lg font-bold text-slate-300">••••••</p>
                : <p className="text-lg font-bold text-slate-800 ltr">{stat.value}</p>
              }
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Branch balance chart — not for teller */}
      {!isTeller && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">موجودی شعب به تفکیک ارز (دلار)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={balanceByBranch} barSize={16} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="branch" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={70} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="usd" name="USD" fill="#2563EB" radius={[3, 3, 0, 0]} />
              <Bar dataKey="eur" name="EUR" fill="#7C3AED" radius={[3, 3, 0, 0]} />
              <Bar dataKey="afn" name="AFN" fill="#059669" radius={[3, 3, 0, 0]} />
              <Bar dataKey="aed" name="AED" fill="#D97706" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filter + accounts table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 flex-wrap">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {accountTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          {!isTeller && (
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو حساب..." className="w-44 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">لیست حساب‌ها</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['#', 'نام حساب', 'نوع', 'ارز', 'موجودی', 'شعبه', 'تعداد تراکنش', 'وضعیت'].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((a, i) => (
                <tr key={a.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-400">{a.id}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-800 whitespace-nowrap">{a.name}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: a.typeColor, background: a.typeBg }}>{a.type}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{a.currency}</td>
                  <td className="px-4 py-3.5">
                    {isTeller
                      ? <span className="text-slate-300 font-bold">••••••</span>
                      : <span className="font-bold text-[#2563EB] ltr">{a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    }
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{a.branch}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{a.transactions.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium ${a.status ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                      {a.status ? <IconCircleCheck size={12} /> : <IconCircleX size={12} />}
                      {a.status ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-500">نمایش {filteredAccounts.length} مورد از {accountsList.length}</span>
          <div className="flex items-center gap-1">
            {['«', '‹', '1', '2', '›', '»'].map((p, i) => (
              <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent movements */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-[#2563EB] cursor-pointer hover:underline">مشاهده همه</span>
          <h3 className="text-sm font-semibold text-slate-800">آخرین گردش حساب‌ها</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['#', 'تاریخ', 'حساب', 'نوع', 'شرح', 'ارز', 'مبلغ', 'موجودی بعد'].map(h => (
                <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accountMovements.map((m, i) => (
              <tr key={m.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                <td className="px-4 py-3.5 text-slate-400">{m.id}</td>
                <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{m.date}</td>
                <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{m.account}</td>
                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: m.typeColor, background: m.typeBg }}>
                    <MovementIcon t={m.type} />{m.type}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{m.desc}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{m.currency}</td>
                <td className="px-4 py-3.5 font-bold text-slate-800 ltr">
                  {isTeller ? '••••••' : m.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3.5 font-semibold text-[#2563EB] ltr">
                  {isTeller ? '••••••' : m.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
