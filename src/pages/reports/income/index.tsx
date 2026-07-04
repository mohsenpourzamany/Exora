import { useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  CartesianGrid, Legend,
} from 'recharts'
import {
  IconTrendingUp, IconTrendingDown, IconCoin, IconPercentage,
  IconDownload, IconCalendar, IconCircleCheck, IconClock, IconCircleX,
  IconBuilding,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import {
  incomeReportStats, monthlyIncomeData, weeklyIncomeData,
  incomeByType, expenseByType, branchIncomeData, recentEntries, branches,
} from './mockData'

type PeriodType = 'weekly' | 'monthly'

const ICONS: Record<string, React.ElementType> = {
  IconTrendingUp, IconTrendingDown, IconCoin, IconPercentage,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
            <span className="text-xs font-bold" style={{ color: p.color }}>{p.value.toLocaleString()}</span>
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

const RestrictedValue = () => (
  <span className="text-slate-300 font-bold">••••••</span>
)

export default function IncomeReport() {
  const { user } = useAuth()
  const isTeller = user.role === 'teller'
  const isAdmin = user.role === 'admin'

  const [period, setPeriod] = useState<PeriodType>('monthly')
  const [filterBranch, setFilterBranch] = useState('همه شعب')

  const chartData = useMemo(() =>
    period === 'monthly' ? monthlyIncomeData : weeklyIncomeData
  , [period])

  const dateKey = period === 'monthly' ? 'month' : 'day'

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>گزارشات</span><span>›</span>
            <span className="text-slate-600 font-medium">گزارش عواید و مصارف</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">گزارش عواید و مصارف</h1>
          <p className="text-sm text-slate-500 mt-0.5">تحلیل درآمدها و هزینه‌های سیستم</p>
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
        {incomeReportStats.map(stat => {
          const Icon = ICONS[stat.icon]
          const isRestricted = isTeller || (user.role === 'branch_manager' && stat.id === 'profit')
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
              {isRestricted ? <RestrictedValue /> : (
                <p className="text-lg font-bold text-slate-800 ltr">{stat.value}</p>
              )}
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {(['weekly', 'monthly'] as PeriodType[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${period === p ? 'bg-white shadow-sm text-[#2563EB]' : 'text-slate-500 hover:text-slate-700'}`}>
              {p === 'weekly' ? 'هفتگی' : 'ماهانه'}
            </button>
          ))}
        </div>

        {user.role !== 'teller' && (
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
        )}

        <div className="flex items-center gap-1.5 h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 cursor-pointer">
          <span className="text-xs text-slate-600">۱۴۰۳/۰۱/۰۱ — ۱۴۰۳/۰۶/۳۱</span>
          <IconCalendar size={13} className="text-slate-400" />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '3fr 2fr' }}>

        {/* Bar chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#059669]" />عواید</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#DC2626]" />مصارف</span>
              {isAdmin && <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#2563EB]" />سود</span>}
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              نمودار عواید و مصارف — {period === 'monthly' ? 'ماهانه' : 'هفتگی'}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={period === 'monthly' ? 20 : 28} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey={dateKey} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="عواید" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="مصارف" fill="#DC2626" radius={[4, 4, 0, 0]} />
              {isAdmin && <Bar dataKey="profit" name="سود" fill="#2563EB" radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie charts */}
        <div className="space-y-4">
          {/* Income by type */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-800 mb-3">توزیع عواید بر اساس نوع</h3>
            <div className="flex items-center gap-3">
              <ResponsiveContainer width={90} height={90}>
                <PieChart>
                  <Pie data={incomeByType} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={2} dataKey="value">
                    {incomeByType.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {incomeByType.map(t => (
                  <div key={t.name} className="flex items-center justify-between text-xs">
                    <span className="font-semibold ltr" style={{ color: t.color }}>{t.value}%</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px]">{t.name}</span>
                      <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expense by type */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-800 mb-3">توزیع مصارف بر اساس نوع</h3>
            <div className="flex items-center gap-3">
              <ResponsiveContainer width={90} height={90}>
                <PieChart>
                  <Pie data={expenseByType} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={2} dataKey="value">
                    {expenseByType.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {expenseByType.map(t => (
                  <div key={t.name} className="flex items-center justify-between text-xs">
                    <span className="font-semibold ltr" style={{ color: t.color }}>{t.value}%</span>
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
      </div>

      {/* Branch comparison — admin only */}
      {user.role !== 'teller' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">مقایسه شعب</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['شعبه', 'عواید', 'مصارف', isAdmin ? 'سود' : null, 'نمودار'].filter(Boolean).map(h => (
                    <th key={h!} className="text-right text-slate-500 font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {branchIncomeData.map((b, i) => {
                  const maxIncome = Math.max(...branchIncomeData.map(x => x.income))
                  return (
                    <tr key={b.branch} className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-3 font-medium text-slate-700">
                        <div className="flex items-center gap-2">
                          <IconBuilding size={14} className="text-slate-400" />
                          {b.branch}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-emerald-600 ltr">{b.income.toLocaleString()}</td>
                      <td className="px-4 py-3 font-bold text-red-500 ltr">{b.expense.toLocaleString()}</td>
                      {isAdmin && <td className="px-4 py-3 font-bold text-[#2563EB] ltr">{b.profit.toLocaleString()}</td>}
                      <td className="px-4 py-3 w-32">
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-[#2563EB] transition-all"
                            style={{ width: `${(b.income / maxIncome) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent entries */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-[#2563EB] hover:underline cursor-pointer">مشاهده همه</span>
          <h3 className="text-sm font-semibold text-slate-800">آخرین تراکنش‌های عواید و مصارف</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['#', 'تاریخ', 'نوع', 'شرح', 'شعبه', 'ارز', 'مبلغ', 'وضعیت'].map(h => (
                <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentEntries.map((e, i) => (
              <tr key={e.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                <td className="px-4 py-3.5 text-slate-400">{e.id}</td>
                <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{e.date}</td>
                <td className="px-4 py-3.5">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: e.typeColor, background: e.typeBg }}>{e.type}</span>
                </td>
                <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{e.desc}</td>
                <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{e.branch}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{e.currency}</td>
                <td className="px-4 py-3.5">
                  {isTeller ? <RestrictedValue /> : (
                    <span className={`font-bold ltr whitespace-nowrap ${e.type === 'عاید' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {e.type === 'عاید' ? '+' : '-'}{e.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: e.statusColor, background: e.statusBg }}>
                    <StatusIcon s={e.status} />{e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
