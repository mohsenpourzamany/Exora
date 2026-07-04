import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconArrowsExchange, IconList, IconClock,
  IconPlus, IconDownload, IconSearch,
  IconCircleCheck, IconCircleX,
  IconDotsVertical, IconEdit, IconTrash, IconLock,
  IconArrowLeft,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { transferStats, transfers, accounts, branches, currencies } from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconArrowsExchange, IconList, IconClock,
}

const StatusIcon = ({ s }: { s: string }) => {
  if (s === 'موفق') return <IconCircleCheck size={12} />
  if (s === 'در انتظار') return <IconClock size={12} />
  return <IconCircleX size={12} />
}

const NewTransferModal = ({ onClose }: { onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">انتقال حساب به حساب جدید</h2>
        </div>
        <div className="px-6 py-5 space-y-4">

          {/* From → To visual */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 mb-1">از حساب</p>
              <select className="w-full h-9 bg-white border border-blue-200 rounded-lg px-2 text-xs focus:outline-none focus:border-blue-400">
                {accounts.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
                <IconArrowLeft size={16} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 mb-1">به حساب</p>
              <select className="w-full h-9 bg-white border border-blue-200 rounded-lg px-2 text-xs focus:outline-none focus:border-blue-400">
                {accounts.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه مبدا</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branches.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه مقصد</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branches.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
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
            <label className="text-xs text-slate-500 block mb-1.5">شرح انتقال</label>
            <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="شرح انتقال..." />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">توضیحات (اختیاری)</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none" rows={2} placeholder="توضیحات..." />
          </div>

          {/* Warning for large amounts */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <IconClock size={14} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">انتقال‌های بالای ۱۰,۰۰۰ دلار نیاز به تأیید مدیر دارند.</p>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ ثبت انتقال
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
)

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

export default function AccountTransfer() {
  const { user, hasPermission } = useAuth()
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterBranch, setFilterBranch] = useState(hasPermission('viewAllBranches') ? 'همه شعب' : user.branch)
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')
  const [filterStatus, setFilterStatus] = useState('همه')
  const [modal, setModal] = useState(false)

  const filtered = transfers.filter(tx => {
    const matchSearch = tx.desc.includes(search) || tx.fromAccount.includes(search) || tx.toAccount.includes(search)
    const matchBranch = filterBranch === 'همه شعب' || tx.fromBranch === filterBranch || tx.toBranch === filterBranch
    const matchCurrency = filterCurrency === 'همه ارزها' || tx.currency === filterCurrency
    const matchStatus = filterStatus === 'همه' || tx.status === filterStatus
    return matchSearch && matchBranch && matchCurrency && matchStatus
  })

  return (
    <div className="space-y-5">

      {modal && <NewTransferModal onClose={() => setModal(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>ترانزکشن‌ها</span><span>›</span>
            <span className="text-slate-600 font-medium">انتقال حساب به حساب</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">انتقال حساب به حساب</h1>
          <p className="text-sm text-slate-500 mt-0.5">انتقال وجه بین حساب‌های داخلی</p>
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('viewReports') && (
            <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <IconDownload size={15} />خروجی Excel
            </button>
          )}
          {hasPermission('createTransaction') && (
            <button onClick={() => setModal(true)} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <IconPlus size={15} />انتقال جدید
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {transferStats.map((stat, idx) => {
          const Icon = ICONS[stat.icon]
          if (isTeller && idx < 2) return <RestrictedCard key={stat.id} label={stat.label} />
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
        {/* Status filter */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {['همه', 'موفق', 'در انتظار', 'رد شده'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterStatus === s ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {s}
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
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-right text-slate-500 font-medium px-4 py-3">#</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">تاریخ و زمان</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">از حساب</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3"></th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">به حساب</th>
                {hasPermission('viewAllBranches') && <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">مبدا / مقصد</th>}
                <th className="text-right text-slate-500 font-medium px-4 py-3">ارز</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">مبلغ</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">شرح</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">تأییدکننده</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">وضعیت</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-400 font-medium">{tx.id}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{tx.fromAccount}</td>
                  <td className="px-4 py-3.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <IconArrowLeft size={12} className="text-[#2563EB]" />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{tx.toAccount}</td>
                  {hasPermission('viewAllBranches') && (
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap text-[11px]">
                      {tx.fromBranch} → {tx.toBranch}
                    </td>
                  )}
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{tx.currency}</td>
                  <td className="px-4 py-3.5 font-bold text-[#2563EB] ltr whitespace-nowrap">
                    {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{tx.desc}</td>
                  <td className="px-4 py-3.5 text-slate-500">{tx.approver}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: tx.statusColor, background: tx.statusBg }}>
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
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {transfers.length}</span>
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
