import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconSend, IconDownload as IconReceive, IconClock, IconList,
  IconPlus, IconDownload, IconSearch,
  IconCircleCheck, IconCircleX,
  IconDotsVertical, IconEdit, IconTrash, IconLock,
  IconMapPin, IconHash, IconCopy,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { hawalaStats, hawalaList, branches, currencies } from './mockData'
import { peekNextHawalaCode, generateHawalaCode } from '../../../utils/hawalaCode'

const ICONS: Record<string, React.ElementType> = {
  IconSend, IconDownload: IconReceive, IconClock, IconList,
}

const StatusIcon = ({ s }: { s: string }) => {
  if (s === 'موفق') return <IconCircleCheck size={12} />
  if (s === 'در انتظار پرداخت') return <IconClock size={12} />
  return <IconCircleX size={12} />
}

const NewHawalaModal = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState<'send' | 'receive'>('send')
  // Peek at next code without consuming it yet
  const nextCode = peekNextHawalaCode()

  const handleSubmit = () => {
    // Consume the code when actually submitting
    const code = generateHawalaCode()
    console.log('ثبت حواله با شماره:', code)
    // TODO: send to API
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">ثبت حواله جدید</h2>
        </div>
        <div className="px-6 py-5 space-y-4">

          {/* Auto tracking code — read only */}
          <div className="flex items-center justify-between p-3.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl">
            <button
              onClick={() => navigator.clipboard.writeText(nextCode)}
              className="flex items-center gap-1.5 text-xs text-[#2563EB] bg-white border border-[#BFDBFE] px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <IconCopy size={12} />
              کپی
            </button>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-[#1D4ED8] ltr tracking-widest">{nextCode}</span>
              <div className="flex items-center gap-1.5">
                <IconHash size={14} className="text-[#2563EB]" />
                <span className="text-xs font-semibold text-[#1D4ED8]">شماره حواله</span>
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <button onClick={() => setType('send')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${type === 'send' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
              <IconSend size={16} />ارسال حواله
            </button>
            <button onClick={() => setType('receive')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${type === 'receive' ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
              <IconReceive size={16} />دریافت حواله
            </button>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نام فرستنده</label>
              <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام فرستنده..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نام گیرنده</label>
              <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام گیرنده..." />
            </div>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شهر / کشور مبدا</label>
              <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="مثال: کابل، افغانستان" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شهر / کشور مقصد</label>
              <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="مثال: دبی، امارات" />
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

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">کارمزد</label>
              <input type="number" className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="0.00" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شماره تماس گیرنده</label>
              <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="+971..." />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1.5">توضیحات (اختیاری)</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none" rows={2} placeholder="توضیحات..." />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button
            onClick={handleSubmit}
            className={`flex-1 py-2.5 rounded-xl text-sm text-white font-medium transition-colors ${type === 'send' ? 'bg-[#2563EB] hover:bg-blue-700' : 'bg-[#7C3AED] hover:bg-violet-700'}`}
          >
            ✓ {type === 'send' ? 'ثبت ارسال حواله' : 'ثبت دریافت حواله'}
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

export default function Hawala() {
  const { user, hasPermission } = useAuth()
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('همه')
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')
  const [filterStatus, setFilterStatus] = useState('همه')
  const [modal, setModal] = useState(false)

  const filtered = hawalaList.filter(h => {
    const matchSearch = h.sender.includes(search) || h.receiver.includes(search) || h.trackingCode.includes(search) || h.fromCity.includes(search) || h.toCity.includes(search)
    const matchType = filterType === 'همه' || h.type === filterType
    const matchCurrency = filterCurrency === 'همه ارزها' || h.currency === filterCurrency
    const matchStatus = filterStatus === 'همه' || h.status === filterStatus
    return matchSearch && matchType && matchCurrency && matchStatus
  })

  return (
    <div className="space-y-5">

      {modal && <NewHawalaModal onClose={() => setModal(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>ترانزکشن‌ها</span><span>›</span>
            <span className="text-slate-600 font-medium">انتقال حواله</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">انتقال حواله</h1>
          <p className="text-sm text-slate-500 mt-0.5">ارسال و دریافت حواله داخلی و خارجی</p>
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('viewReports') && (
            <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <IconDownload size={15} />خروجی Excel
            </button>
          )}
          {hasPermission('createTransaction') && (
            <button onClick={() => setModal(true)} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <IconPlus size={15} />حواله جدید
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {hawalaStats.map((stat, idx) => {
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

      {/* Filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {['همه', 'ارسال', 'دریافت'].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterType === t ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {['همه', 'موفق', 'در انتظار پرداخت', 'رد شده'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterStatus === s ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {s}
            </button>
          ))}
        </div>

        <select value={filterCurrency} onChange={e => setFilterCurrency(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {currencies.map(c => <option key={c}>{c}</option>)}
        </select>

        <div className="flex-1" />

        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو نام، کد پیگیری..." className="w-52 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
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
                <th className="text-right text-slate-500 font-medium px-4 py-3">نوع</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">فرستنده</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">گیرنده</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">مبدا ← مقصد</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">ارز</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">مبلغ</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">کارمزد</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">شماره حواله</th>
                <th className="text-right text-slate-500 font-medium px-4 py-3">وضعیت</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={h.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3.5 text-slate-400 font-medium">{h.id}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{h.date}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: h.typeColor, background: h.typeBg }}>{h.type}</span>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{h.sender}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">{h.receiver}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-500 whitespace-nowrap">
                      <IconMapPin size={11} className="text-slate-400" />
                      <span>{h.fromCity}</span>
                      <span className="text-slate-300">←</span>
                      <span>{h.toCity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{h.currency}</td>
                  <td className="px-4 py-3.5 font-bold text-[#2563EB] ltr whitespace-nowrap">
                    {h.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 ltr">{h.fee > 0 ? h.fee.toFixed(2) : '—'}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <IconHash size={11} className="text-[#2563EB]" />
                      <span className="text-[#2563EB] font-mono font-semibold text-[11px] ltr">{h.trackingCode}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: h.statusColor, background: h.statusBg }}>
                      <StatusIcon s={h.status} />{h.status}
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
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {hawalaList.length}</span>
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
