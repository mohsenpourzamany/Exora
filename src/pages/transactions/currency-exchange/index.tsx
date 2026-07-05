import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  IconArrowsExchange, IconList, IconTrendingUp, IconTrendingDown,
  IconPlus, IconDownload, IconSearch,
  IconCircleCheck, IconCircleX, IconClock,
  IconDotsVertical, IconEdit, IconTrash, IconLock,
  IconEditCircle, IconRefresh,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { exchangeStats, exchangeTransactions, branches } from './mockData'
import { currencies as rateTable } from '../../exchange/mockData'
import { peekNextExchangeCode, generateExchangeCode } from '../../../utils/exchangeCode'

const ICONS: Record<string, React.ElementType> = {
  IconArrowsExchange, IconList, IconTrendingUp, IconTrendingDown,
}

const StatusIcon = ({ s }: { s: string }) => {
  if (s === 'موفق') return <IconCircleCheck size={12} />
  if (s === 'در انتظار') return <IconClock size={12} />
  return <IconCircleX size={12} />
}

// Foreign currencies available for exchange (AFN is always the other leg)
const FOREIGN_CURRENCIES = rateTable.map(c => c.code)

function defaultRateFor(code: string, type: 'buy' | 'sell'): number {
  const row = rateTable.find(c => c.code === code)
  if (!row) return 0
  // "buy" = bank buys foreign currency from customer -> uses bank's buy rate
  // "sell" = bank sells foreign currency to customer -> uses bank's sell rate
  return type === 'buy' ? row.buy : row.sell
}

const NewExchangeModal = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState<'buy' | 'sell'>('buy')
  const [currencyCode, setCurrencyCode] = useState('USD')
  const [foreignAmount, setForeignAmount] = useState<number | ''>('')
  const [rate, setRate] = useState(defaultRateFor('USD', 'buy'))
  const [rateManual, setRateManual] = useState(false)

  const nextCode = peekNextExchangeCode()

  // Whenever the operation type or currency changes, reset the rate to the live default
  useEffect(() => {
    setRate(defaultRateFor(currencyCode, type))
    setRateManual(false)
  }, [currencyCode, type])

  const handleRateChange = (value: number) => {
    setRate(value)
    setRateManual(value !== defaultRateFor(currencyCode, type))
  }

  const afnAmount = (Number(foreignAmount) || 0) * rate

  const handleSubmit = () => {
    const code = generateExchangeCode()
    console.log('ثبت سند تبادل اسعار:', {
      code, type, currencyCode, foreignAmount, rate, rateManual, afnAmount,
    })
    // TODO: send to API
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">ثبت سند تبادل اسعار</h2>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Operation type */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
            {[
              { id: 'buy', label: 'خرید ارز از مشتری' },
              { id: 'sell', label: 'فروش ارز به مشتری' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setType(t.id as 'buy' | 'sell')}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${type === t.id ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ارز</label>
              <select
                value={currencyCode}
                onChange={e => setCurrencyCode(e.target.value)}
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400"
              >
                {FOREIGN_CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">مبلغ ارز</label>
              <input
                type="number"
                value={foreignAmount}
                onChange={e => setForeignAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Rate — auto-filled, editable */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-500">نرخ تبادله (افغانی به ازای هر واحد {currencyCode})</label>
              {rateManual ? (
                <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                  <IconEditCircle size={11} />نرخ دستی
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  <IconRefresh size={11} />نرخ خودکار
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={rate}
                onChange={e => handleRateChange(Number(e.target.value))}
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400"
              />
              {rateManual && (
                <button
                  onClick={() => { setRate(defaultRateFor(currencyCode, type)); setRateManual(false) }}
                  className="shrink-0 h-10 px-3 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  بازگشت به نرخ روز
                </button>
              )}
            </div>
          </div>

          {/* Computed AFN amount */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
            <span className="text-lg font-bold text-[#2563EB] ltr">{afnAmount.toLocaleString()}</span>
            <span className="text-xs text-slate-600">مبلغ معادل (افغانی)</span>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branches.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">مشتری</label>
              <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام مشتری..." />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="ltr">{nextCode}</span>
            <span>شماره سند</span>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ ثبت سند
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

export default function CurrencyExchange() {
  const { user, hasPermission } = useAuth()
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState(hasPermission('viewAllBranches') ? 'همه شعب' : user.branch)
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all')
  const [modal, setModal] = useState(false)

  const filtered = exchangeTransactions.filter(tx => {
    const matchSearch = tx.customer.includes(search) || tx.code.includes(search)
    const matchBranch = filterBranch === 'همه شعب' || tx.branch === filterBranch
    const matchType = filterType === 'all' || tx.type === filterType
    return matchSearch && matchBranch && matchType
  })

  return (
    <div className="space-y-5">
      {modal && <NewExchangeModal onClose={() => setModal(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">تبادل اسعار</h1>
          <p className="text-sm text-slate-500 mt-0.5">ثبت و پیگیری اسناد خرید و فروش ارز با مشتریان</p>
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('viewReports') && (
            <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <IconDownload size={15} />خروجی Excel
            </button>
          )}
          {hasPermission('createTransaction') && (
            <button onClick={() => setModal(true)} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <IconPlus size={15} />تبادل جدید
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {exchangeStats.map((stat, idx) => {
          const Icon = ICONS[stat.icon]
          if (isTeller && idx < 1) return <RestrictedCard key={stat.id} label={stat.label} />
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

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {[
            { id: 'all', label: 'همه' },
            { id: 'buy', label: 'خرید' },
            { id: 'sell', label: 'فروش' },
          ].map(t => (
            <button key={t.id} onClick={() => setFilterType(t.id as 'all' | 'buy' | 'sell')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterType === t.id ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {hasPermission('viewAllBranches') && (
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
        )}

        <div className="flex-1" />

        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو با نام مشتری یا شماره سند..." className="w-56 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">شماره سند</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">تاریخ و زمان</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">مشتری</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">نوع</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">ارز</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">مبلغ ارز</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">نرخ</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">مبلغ افغانی</th>
                {hasPermission('viewAllBranches') && <th className="text-right text-slate-500 font-medium px-4 py-3">شعبه</th>}
                <th className="text-right text-slate-500 font-medium px-4 py-3">وضعیت</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{tx.code}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{tx.customer}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${tx.type === 'buy' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'}`}>
                      {tx.type === 'buy' ? 'خرید از مشتری' : 'فروش به مشتری'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{tx.currency}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-800 ltr">{tx.foreignAmount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 ltr">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-700">{tx.rate.toLocaleString()}</span>
                      {tx.rateManual && <IconEditCircle size={12} className="text-amber-500" />}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-[#2563EB] ltr whitespace-nowrap">{tx.afnAmount.toLocaleString()}</td>
                  {hasPermission('viewAllBranches') && <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{tx.branch}</td>}
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{
                      color: tx.status === 'موفق' ? '#059669' : tx.status === 'در انتظار' ? '#D97706' : '#DC2626',
                      background: tx.status === 'موفق' ? '#ECFDF5' : tx.status === 'در انتظار' ? '#FFFBEB' : '#FEF2F2',
                    }}>
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
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {exchangeTransactions.length}</span>
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
