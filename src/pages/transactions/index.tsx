import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import {
  IconTrendingUp, IconTrendingDown, IconArrowsExchange,
  IconWallet, IconCoins, IconBuildingBank, IconSend,
  IconArrowUpCircle, IconArrowDownCircle, IconPlus,
  IconCircleCheck, IconClock, IconCircleX,
  IconDotsVertical, IconFilter, IconSearch,
} from '@tabler/icons-react'
import {
  transactionStats, quickActions, transactionTypes,
  recentTransactions, accessLinks,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconTrendingUp, IconTrendingDown, IconArrowsExchange,
  IconWallet, IconCoins, IconBuildingBank, IconSend,
  IconArrowUpCircle, IconArrowDownCircle, IconPlus,
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'موفق') return <IconCircleCheck size={13} />
  if (status === 'در انتظار') return <IconClock size={13} />
  return <IconCircleX size={13} />
}

export default function Transactions() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = recentTransactions.filter(tx =>
    tx.desc.includes(search) || tx.type.includes(search) || tx.account.includes(search)
  )

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">ترانزکشن‌ها</h1>
        <p className="text-sm text-slate-500 mt-0.5">مدیریت کامل عواید، مصارف و انتقالات مالی</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {transactionStats.map(stat => {
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
              <p className="text-lg font-bold text-slate-800 ltr">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-5">

        {/* Donut + quick actions */}
        <div className="space-y-4">

          {/* Distribution donut */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">توزیع تراکنش‌ها</h3>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <ResponsiveContainer width={110} height={110}>
                  <PieChart>
                    <Pie data={transactionTypes} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={2} dataKey="count">
                      {transactionTypes.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs font-bold text-slate-800">1,245</p>
                  <p className="text-[9px] text-slate-400">کل</p>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {transactionTypes.map(t => (
                  <div key={t.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 ltr">{t.percent}%</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600 text-[11px]">{t.label}</span>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">عملیات سریع</h3>
            <div className="space-y-2">
              {quickActions.map(action => {
                const Icon = ICONS[action.icon]
                return (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all text-right"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: action.bg }}>
                      {Icon && <Icon size={16} style={{ color: action.color }} />}
                    </div>
                    <span className="text-xs text-slate-700 font-medium">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Transactions table — col-span-2 */}
        <div className="col-span-2 space-y-4">

          {/* Access links */}
          <div className="grid grid-cols-5 gap-2">
            {accessLinks.map(link => {
              const Icon = ICONS[link.icon]
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.path)}
                  className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform" style={{ background: link.bg }}>
                    {Icon && <Icon size={20} style={{ color: link.color }} />}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700">{link.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{link.desc}</p>
                </button>
              )
            })}
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <IconFilter size={13} />
                  فیلتر
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="جستجو..."
                    className="w-44 h-8 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">آخرین ترانزکشن‌ها</h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['#', 'تاریخ', 'نوع تراکنش', 'شرح', 'حساب/طرف حساب', 'روش پرداخت', 'ارز', 'مبلغ', 'وضعیت', ''].map(h => (
                      <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx, i) => (
                    <tr key={tx.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-3 text-slate-400 font-medium">{tx.id}</td>
                      <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: tx.typeColor, background: tx.typeBg }}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{tx.desc}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{tx.account}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{tx.method}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700 ltr">{tx.currency}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 ltr whitespace-nowrap">
                        {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: tx.statusColor, background: tx.statusBg }}>
                          <StatusIcon status={tx.status} />
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <IconDotsVertical size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
              <span className="text-xs text-slate-500">نمایش ۱ تا {filtered.length} از {recentTransactions.length} مورد</span>
              <div className="flex items-center gap-1">
                {['«', '‹', '1', '2', '3', '›', '»'].map((p, i) => (
                  <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
