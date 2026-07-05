import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import {
  IconArrowUpRight, IconArrowDownRight,
  IconRefresh, IconEdit, IconPlus,
  IconCircleCheck, IconCircleX,
  IconTrendingUp, IconTrendingDown,
  IconLock, IconHistory, IconClipboardList,
} from '@tabler/icons-react'
import { useAuth } from '../../context/AuthContext'
import {
  currencies, chartData7Day, topGainers, topLosers, currencyStats,
  dailyRateSnapshots, rateHistory,
} from './mockData'

// Mini sparkline component
const Sparkline = ({ data, positive }: { data: number[], positive: boolean }) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 80, h = 32, pad = 4
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = pad + ((max - v) / range) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#059669' : '#DC2626'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 text-right">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs mb-0.5" style={{ color: p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CHART_COLORS: Record<string, string> = {
  USD: '#2563EB', EUR: '#7C3AED', AED: '#059669', TRY: '#DC2626',
}

const TABS = [
  { id: 'rates', label: 'لیست اسعار', path: '/exchange/rates' },
  { id: 'daily', label: 'نرخ‌های روزانه', path: '/exchange/daily' },
  { id: 'history', label: 'تاریخچه تغییرات', path: '/exchange/history' },
  { id: 'manage', label: 'مدیریت اسعار', path: '/exchange/manage' },
]

function tabFromPath(pathname: string): string {
  const segment = pathname.split('/exchange/')[1]
  if (!segment) return 'rates' // bare "/exchange"
  const id = segment.split('/')[0]
  return TABS.some(t => t.id === id) ? id : 'rates'
}

export default function Exchange() {
  const location = useLocation()
  const navigate = useNavigate()
  const { hasPermission } = useAuth()
  const [activeTab, setActiveTab] = useState(() => tabFromPath(location.pathname))
  const [activeLines, setActiveLines] = useState(['USD', 'EUR', 'AED', 'TRY'])
  const [editingRate, setEditingRate] = useState<number | null>(null)

  useEffect(() => {
    setActiveTab(tabFromPath(location.pathname))
  }, [location.pathname])

  const selectTab = (id: string) => {
    setActiveTab(id)
    navigate(`/exchange/${id === 'rates' ? 'rates' : id}`)
  }

  const toggleLine = (code: string) => {
    setActiveLines(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">اسعار</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت و پیگیری نرخ‌های ارز</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            آنلاین — آخرین بروزرسانی: ۱۱:۳۰:۲۵
          </span>
          <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
            <IconRefresh size={15} />
            بروزرسانی
          </button>
          {hasPermission('viewManagement') && (
            <button className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <IconPlus size={15} />
              افزودن ارز جدید
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => selectTab(t.id)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${activeTab === t.id ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'rates' && (
      <>

      {/* Currency cards */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {currencies.slice(0, 4).map(c => (
          <div key={c.code} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Sparkline data={c.sparkline} positive={c.positive} />
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-sm font-bold text-slate-800">{c.code}</span>
                    <span className="text-xl">{c.flag}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 text-right">{c.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-lg ${c.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                {c.positive ? <IconArrowUpRight size={13} /> : <IconArrowDownRight size={13} />}
                {c.change > 0 ? '+' : ''}{c.change}%
              </span>
              <div className="text-right">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-[10px] text-slate-400">فروش</p>
                    <p className="text-sm font-bold text-slate-800 ltr">{c.sell.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">خرید</p>
                    <p className="text-sm font-bold text-[#2563EB] ltr">{c.buy.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="flex gap-5">

        {/* Left: table + chart */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Rates table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {['نرخ زنده ارز', 'نرخ‌های بانک/کری'].map((t, i) => (
                  <button key={t} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${i === 0 ? 'bg-[#2563EB] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-slate-800">لیست اسعار</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['ارز', 'خرید', 'زمان خرید', 'جزوش', 'نرخ فروش', 'زمان', 'تغییر', 'نمودار ۷ روزه', 'عملیات'].map(h => (
                      <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((c, i) => (
                    <tr key={c.code} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.flag}</span>
                          <div>
                            <p className="font-bold text-slate-800 ltr">{c.code}</p>
                            <p className="text-[10px] text-slate-400">{c.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#2563EB] ltr">{c.buy.toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-400 ltr">۱۱:۲۰:۴۵</td>
                      <td className="px-4 py-3">
                        {editingRate === c.id ? (
                          <input
                            defaultValue={c.buy}
                            className="w-20 border border-blue-400 rounded-lg px-2 py-1 text-xs ltr focus:outline-none"
                            onBlur={() => setEditingRate(null)}
                            autoFocus
                          />
                        ) : (
                          <span className="font-semibold text-slate-600 ltr">{c.buy.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-800 ltr">{c.sell.toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-400 ltr">۱۱:۲۰:۴۵</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-0.5 w-fit text-[11px] font-medium ${c.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                          {c.positive ? <IconArrowUpRight size={13} /> : <IconArrowDownRight size={13} />}
                          {c.change > 0 ? '+' : ''}{c.change}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Sparkline data={c.sparkline} positive={c.positive} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingRate(c.id)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <IconEdit size={13} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            {c.status ? <IconCircleCheck size={13} className="text-emerald-500" /> : <IconCircleX size={13} className="text-slate-400" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
              نمایش {currencies.length} ارز از {currencyStats.total} ارز ثبت شده
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3 flex-wrap">
                {['USD', 'EUR', 'AED', 'TRY'].map(code => (
                  <button
                    key={code}
                    onClick={() => toggleLine(code)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${activeLines.includes(code) ? 'text-white border-transparent' : 'text-slate-400 bg-white border-slate-200'}`}
                    style={activeLines.includes(code) ? { background: CHART_COLORS[code], borderColor: CHART_COLORS[code] } : {}}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[code] }} />
                    {code}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 focus:outline-none">
                  <option>۷ روز گذشته</option>
                  <option>۳۰ روز</option>
                </select>
                <h3 className="text-sm font-semibold text-slate-800">نمودار تغییرات نرخ ارز</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData7Day}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={60} tickFormatter={v => v.toLocaleString()} />
                <Tooltip content={<CustomTooltip />} />
                {activeLines.map(code => (
                  <Line
                    key={code}
                    type="monotone"
                    dataKey={code}
                    name={code}
                    stroke={CHART_COLORS[code]}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS[code], r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-56 shrink-0 space-y-4">

          {/* Stats */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">تعداد کل ارزها</h3>
            <div className="space-y-2.5">
              {[
                { label: 'کل ارزها',    value: currencyStats.total,    color: '#2563EB' },
                { label: 'فعال',         value: currencyStats.active,   color: '#059669' },
                { label: 'غیرفعال',     value: currencyStats.inactive,  color: '#94A3B8' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="font-bold text-sm ltr" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top gainers */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <IconTrendingUp size={16} className="text-emerald-500" />
              بیشترین افزایش
            </h3>
            <div className="space-y-2">
              {topGainers.map(g => (
                <div key={g.code} className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                  <span className="text-xs font-bold text-emerald-600">{g.change} ↑</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-700 ltr">{g.code}</span>
                    <span>{g.flag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top losers */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <IconTrendingDown size={16} className="text-red-500" />
              بیشترین کاهش
            </h3>
            <div className="space-y-2">
              {topLosers.map(l => (
                <div key={l.code} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-xs font-bold text-red-500">{l.change} ↓</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-700 ltr">{l.code}</span>
                    <span>{l.flag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick access to currency management */}
          {hasPermission('viewManagement') && (
            <div className="bg-[#1E3A8A] rounded-xl p-4 text-white">
              <h3 className="text-sm font-semibold mb-3 text-blue-100">مدیریت اسعار</h3>
              <button
                onClick={() => selectTab('manage')}
                className="w-full text-right px-3 py-2.5 rounded-lg text-xs font-medium bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
              >
                رفتن به بخش مدیریت اسعار
              </button>
            </div>
          )}

          {/* Link to the currency-exchange transaction form */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">تبادل اسعار</h3>
            <p className="text-[11px] text-slate-400 mb-3">ثبت سند خرید/فروش ارز با مشتری از بخش تراکنش‌ها انجام می‌شود.</p>
            <button
              onClick={() => navigate('/transactions/currency-exchange')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors text-right"
            >
              <span className="text-[11px] font-medium text-[#2563EB]">←</span>
              <span className="text-xs text-slate-700 font-medium">ثبت سند تبادل اسعار جدید</span>
            </button>
          </div>

        </div>
      </div>
      </>
      )}

      {activeTab === 'daily' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="text-xs text-slate-400">آخرین بروزرسانی: امروز، ۱۱:۳۰</span>
              <h3 className="text-sm font-semibold text-slate-800">نرخ‌های روزانه</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['ارز', 'نرخ صبح', 'نرخ ظهر', 'نرخ فعلی', 'روند امروز', 'تنظیم‌شده توسط'].map(h => (
                      <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyRateSnapshots.map((r, i) => {
                    const trendUp = r.current >= r.morning
                    return (
                      <tr key={r.code} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{r.flag}</span>
                            <span className="font-bold text-slate-800 ltr">{r.code}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-500 ltr">{r.morning.toLocaleString()}</td>
                        <td className="px-4 py-3 text-slate-500 ltr">{r.noon.toLocaleString()}</td>
                        <td className="px-4 py-3 font-bold text-slate-800 ltr">{r.current.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-0.5 w-fit text-[11px] font-medium px-2 py-1 rounded-lg ${trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                            {trendUp ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
                            {trendUp ? 'صعودی' : 'نزولی'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{r.setBy}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <IconHistory size={16} className="text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-800">تاریخچه تغییرات نرخ</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['تاریخ و زمان', 'ارز', 'نرخ قبلی', 'نرخ جدید', 'درصد تغییر', 'تغییر توسط'].map(h => (
                      <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rateHistory.map((h, i) => (
                    <tr key={h.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-3 text-slate-500 ltr whitespace-nowrap">{h.date}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700 ltr">{h.currency}</td>
                      <td className="px-4 py-3 text-slate-500 ltr">{h.oldRate.toLocaleString()}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 ltr">{h.newRate.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-medium px-2 py-1 rounded-lg ${h.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                          {h.changePercent}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{h.changedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        hasPermission('viewManagement') ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <IconClipboardList size={16} className="text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-800">مدیریت ارزهای فعال</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['ارز', 'نام', 'خرید', 'فروش', 'وضعیت', 'عملیات'].map(h => (
                      <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((c, i) => (
                    <tr key={c.code} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.flag}</span>
                          <span className="font-bold text-slate-800 ltr">{c.code}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{c.name}</td>
                      <td className="px-4 py-3 font-semibold text-[#2563EB] ltr">{c.buy.toLocaleString()}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700 ltr">{c.sell.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-medium px-2 py-1 rounded-lg ${c.status ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                          {c.status ? 'فعال' : 'غیرفعال'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><IconEdit size={13} /></button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            {c.status ? <IconCircleCheck size={13} className="text-emerald-500" /> : <IconCircleX size={13} className="text-slate-400" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
              <IconLock size={20} className="text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-600">دسترسی محدود</p>
            <p className="text-xs text-slate-400 mt-1">مدیریت اسعار فقط برای مدیر سیستم قابل دسترسی است.</p>
          </div>
        )
      )}
    </div>
  )
}
