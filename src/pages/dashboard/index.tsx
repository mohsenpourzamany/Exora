import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import {
  IconWallet, IconArrowsExchange, IconTrendingUp, IconUsers,
  IconArrowUpRight, IconArrowDownRight, IconCloudUpload,
  IconShoppingCart, IconSend, IconDownload, IconRefresh,
  IconChartBar, IconCircleCheck,
} from '@tabler/icons-react'
import {
  statsData, chartData, currencyData, transactionsData,
  quickStats, systemStatus, liveRates,
} from './mockData'
import { useAuth, type Permission } from '../../context/AuthContext'

const STAT_ICONS: Record<string, React.ElementType> = {
  IconWallet, IconArrowsExchange, IconTrendingUp, IconUsers,
}

// Sensitive stat cards require a specific permission to view.
// Cards not listed here (e.g. transaction/customer counts) are visible to everyone.
const STAT_PERMISSIONS: Record<string, Permission> = {
  total: 'viewSensitiveStats',
  profit: 'viewNetProfit',
}

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000
              ? p.value.toLocaleString()
              : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const { hasPermission } = useAuth()

  const visibleStats = statsData.filter(stat => {
    const required = STAT_PERMISSIONS[stat.id]
    return !required || hasPermission(required)
  })

  return (
    <div className="space-y-5">

      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">سلام احمد جان 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">خوش آمدید به سیستم جامع صرافی</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            سیستم فعال و پایدار است
          </span>
        </div>
      </div>

      {/* Live rates bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-6 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-slate-600">نرخ زنده بازار</span>
        </div>
        <div className="h-5 w-px bg-slate-200 shrink-0" />
        {liveRates.map(rate => (
          <div key={rate.name} className="flex items-center gap-2.5 shrink-0">
            <span className="text-base">{rate.flag}</span>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-800 ltr">{rate.rate.toLocaleString()}</span>
            </div>
            <span className={`text-[11px] font-medium flex items-center gap-0.5 ${rate.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {rate.positive
                ? <IconArrowUpRight size={12} />
                : <IconArrowDownRight size={12} />}
              {rate.change}
            </span>
            <span className="text-[10px] text-slate-400">{rate.label}</span>
          </div>
        ))}
        <button className="shrink-0 mr-auto p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <IconRefresh size={15} />
        </button>
      </div>

      {/* Main grid: content + right panel */}
      <div className="flex gap-5">

        {/* Left: main content */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleStats.map(stat => {
              const Icon = STAT_ICONS[stat.icon]
              return (
                <div key={stat.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: stat.bgColor }}
                    >
                      {Icon && <Icon size={20} style={{ color: stat.color }} />}
                    </div>
                    <span className={`text-[11px] font-medium flex items-center gap-0.5 px-2 py-1 rounded-lg ${stat.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                      {stat.positive
                        ? <IconArrowUpRight size={12} />
                        : <IconArrowDownRight size={12} />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-800 ltr">{stat.value}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stat.unit}</p>
                </div>
              )
            })}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-5 gap-4">

            {/* Bar + Line chart */}
            <div className="col-span-3 bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">نمودار تراکنش‌ها</h3>
                  <p className="text-xs text-slate-400 mt-0.5">هفته جاری</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#2563EB]" />
                    مبلغ (دلار)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1.5 rounded-full bg-[#7C3AED]" />
                    تعداد
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={28}>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <YAxis yAxisId="right" orientation="left" tick={false} axisLine={false} tickLine={false} width={0} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="left" dataKey="amount" name="مبلغ" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="count" name="تعداد" stroke="#7C3AED" strokeWidth={2.5} dot={{ fill: '#7C3AED', r: 4 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut chart */}
            <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-800">توزیع ارزها</h3>
                <p className="text-xs text-slate-400 mt-0.5">در موجودی</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <ResponsiveContainer width={140} height={140}>
                    <PieChart>
                      <Pie
                        data={currencyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {currencyData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[10px] text-slate-400">کل موجودی</p>
                    <p className="text-sm font-bold text-slate-800">1.2M</p>
                    <p className="text-[10px] text-slate-400">دلار</p>
                  </div>
                </div>
                <div className="w-full mt-3 space-y-1.5">
                  {currencyData.slice(0, 5).map(c => (
                    <div key={c.name} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 ltr">{c.percent}%</span>
                      <span className="text-slate-500">{c.label}</span>
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transactions table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <button className="text-xs text-[#2563EB] hover:underline font-medium">مشاهده همه</button>
              <h3 className="text-sm font-semibold text-slate-800">آخرین تراکنش‌ها</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-right text-slate-500 font-medium px-5 py-3">#</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">تاریخ و زمان</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">نوع تراکنش</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">شرح</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">مبدا/مقصد</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">ارز</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">مبلغ</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">مشتری</th>
                    <th className="text-right text-slate-500 font-medium px-4 py-3">وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.map((tx, i) => (
                    <tr key={tx.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-5 py-3.5 text-slate-400">{tx.id}</td>
                      <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap"
                          style={{ color: tx.typeColor, background: tx.typeBg }}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-700">{tx.desc}</td>
                      <td className="px-4 py-3.5 text-slate-500">
                        {tx.from} ← {tx.to}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-700 ltr">{tx.currency}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-800 ltr">{tx.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{tx.customer}</td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit text-[11px] font-medium">
                          <IconCircleCheck size={12} />
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-64 shrink-0 space-y-4">

          {/* Quick access */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">دسترسی سریع</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'خرید ارز',      icon: IconShoppingCart, color: '#059669', bg: '#ECFDF5' },
                { label: 'فروش ارز',      icon: IconChartBar,     color: '#DC2626', bg: '#FEF2F2' },
                { label: 'حواله',          icon: IconSend,         color: '#2563EB', bg: '#EFF6FF' },
                { label: 'دریافت',        icon: IconDownload,     color: '#7C3AED', bg: '#F5F3FF' },
                { label: 'پرداخت',        icon: IconArrowsExchange, color: '#D97706', bg: '#FFFBEB' },
                { label: 'تبدیل',         icon: IconRefresh,      color: '#0891B2', bg: '#ECFEFF' },
              ].map(item => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:shadow-sm transition-all border border-slate-100 hover:border-slate-200"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats today */}
          {(hasPermission('viewTotalIncome') || hasPermission('viewTotalExpense') || hasPermission('viewNetProfit')) && (
            <div className="bg-[#1E3A8A] rounded-xl p-4 text-white">
              <h3 className="text-sm font-semibold mb-3 text-blue-100">خلاصه عملکرد امروز</h3>
              <div className="space-y-2.5">
                {hasPermission('viewTotalIncome') && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200 text-xs font-semibold ltr">
                        {quickStats.received.toLocaleString()} $
                      </span>
                      <span className="text-blue-300 text-xs">دریافت</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '65%' }} />
                    </div>
                  </>
                )}
                {hasPermission('viewTotalExpense') && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200 text-xs font-semibold ltr">
                        {quickStats.paid.toLocaleString()} $
                      </span>
                      <span className="text-blue-300 text-xs">پرداخت</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div className="bg-red-400 h-1 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </>
                )}
                {hasPermission('viewNetProfit') && (
                  <div className="pt-1 border-t border-white/10 flex items-center justify-between">
                    <span className="text-emerald-300 text-sm font-bold ltr">
                      {quickStats.profit.toLocaleString()} $
                    </span>
                    <span className="text-blue-300 text-xs">سود خالص</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Currency balances */}
          {hasPermission('viewSensitiveStats') && (
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">موجودی صندوق</h3>
              <div className="space-y-2">
                {currencyData.slice(0, 5).map(c => (
                  <div key={c.name} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                    <span className="text-xs font-bold ltr" style={{ color: c.color }}>
                      {c.value.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-600">{c.label}</span>
                      <span className="text-sm">{c.flag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System status */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">وضعیت سیستم</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  {systemStatus.status}
                </span>
                <span className="text-xs text-slate-500">وضعیت</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 ltr">{systemStatus.lastBackup}</span>
                <span className="text-slate-500">آخرین بک‌آپ</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 ltr">{systemStatus.backupSize}</span>
                <span className="text-slate-500">حجم بک‌آپ</span>
              </div>
              <button className="w-full mt-1 flex items-center justify-center gap-2 text-xs text-[#2563EB] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 transition-colors font-medium">
                <IconCloudUpload size={14} />
                بک‌آپ دستی
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
