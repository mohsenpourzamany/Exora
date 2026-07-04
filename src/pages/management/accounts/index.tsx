import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconWallet, IconCircleCheck, IconCircleX, IconCash, IconBuildingBank,
  IconPlus, IconEdit, IconTrash, IconSearch, IconX, IconArrowsExchange,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { accountStats, accounts, accountTypes, currencies, branchList } from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconWallet, IconCircleCheck, IconCircleX, IconCash, IconBuildingBank,
}

const currencyColors: Record<string, string> = {
  USD: '#2563EB', EUR: '#7C3AED', AFN: '#059669',
  TRY: '#D97706', AED: '#0891B2', GBP: '#DC2626', IRR: '#94A3B8',
}

// Account form modal
const AccountModal = ({ account, onClose }: { account?: typeof accounts[0], onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">{account ? 'ویرایش حساب' : 'افزودن حساب جدید'}</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نام حساب</label>
              <input defaultValue={account?.name} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام حساب..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">کد حساب</label>
              <input defaultValue={account?.code} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="ACC-001" />
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نوع حساب</label>
              <select defaultValue={account?.type} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {accountTypes.slice(1).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ارز</label>
              <select defaultValue={account?.currency} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {currencies.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select defaultValue={account?.branch} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branchList.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">موجودی اولیه</label>
              <input type="number" defaultValue={account?.balance} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">توضیحات</label>
            <textarea defaultValue={account?.desc} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none" rows={2} placeholder="توضیحات حساب..." />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">وضعیت</label>
            <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
              <option>فعال</option>
              <option>غیرفعال</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ {account ? 'ذخیره تغییرات' : 'افزودن حساب'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
)

// Account detail drawer
const AccountDrawer = ({ account, onClose }: { account: typeof accounts[0], onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex" onClick={onClose}>
      <div className="flex-1 bg-black/40" />
      <div className="w-80 bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <IconX size={18} />
          </button>
          <h2 className="text-sm font-bold text-slate-800">اطلاعات حساب</h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Header card */}
          <div className="p-4 rounded-xl text-white" style={{ background: currencyColors[account.currency] || '#2563EB' }}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${account.status ? 'bg-white/20' : 'bg-white/10 text-white/60'}`}>
                {account.status ? '● فعال' : '○ غیرفعال'}
              </span>
              <span className="font-mono text-sm font-bold ltr opacity-80">{account.code}</span>
            </div>
            <h3 className="text-base font-bold mb-1">{account.name}</h3>
            <p className="text-2xl font-bold ltr">{account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <p className="text-sm opacity-70 mt-0.5">{account.currency}</p>
          </div>

          {/* Details */}
          <div className="space-y-2.5">
            {[
              { label: 'نوع حساب',     value: account.type },
              { label: 'شعبه',         value: account.branch },
              { label: 'تعداد تراکنش', value: account.transactions.toLocaleString(), ltr: true },
              { label: 'تاریخ ایجاد',  value: account.createdAt, ltr: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className={`text-xs font-medium text-slate-700 ${item.ltr ? 'ltr' : ''}`}>{item.value}</span>
                <span className="text-[11px] text-slate-400">{item.label}</span>
              </div>
            ))}
            <div className="py-2">
              <p className="text-[11px] text-slate-400 mb-1">توضیحات</p>
              <p className="text-xs text-slate-600">{account.desc}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors">
              <IconEdit size={13} />ویرایش
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs hover:bg-slate-100 transition-colors">
              <IconArrowsExchange size={13} />گردش
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
)

export default function AccountsManagement() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('همه انواع')
  const [filterCurrency, setFilterCurrency] = useState('همه ارزها')
  const [filterBranch, setFilterBranch] = useState('همه شعب')
  const [filterStatus, setFilterStatus] = useState('همه')
  const [modal, setModal] = useState<typeof accounts[0] | null | 'new'>(null)
  const [drawer, setDrawer] = useState<typeof accounts[0] | null>(null)

  const filtered = accounts.filter(a => {
    const matchSearch = a.name.includes(search) || a.code.includes(search)
    const matchType = filterType === 'همه انواع' || a.type === filterType
    const matchCurrency = filterCurrency === 'همه ارزها' || a.currency === filterCurrency
    const matchBranch = filterBranch === 'همه شعب' || a.branch === filterBranch
    const matchStatus = filterStatus === 'همه' || (filterStatus === 'فعال' ? a.status : !a.status)
    return matchSearch && matchType && matchCurrency && matchBranch && matchStatus
  })

  return (
    <div className="space-y-5">

      {modal && <AccountModal account={modal === 'new' ? undefined : modal} onClose={() => setModal(null)} />}
      {drawer && <AccountDrawer account={drawer} onClose={() => setDrawer(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>مدیریت</span><span>›</span>
            <span className="text-slate-600 font-medium">مدیریت حساب‌ها</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت حساب‌ها</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت تمام حساب‌های مالی سیستم</p>
        </div>
        {isAdmin && (
          <button onClick={() => setModal('new')} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconPlus size={15} />افزودن حساب
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {accountStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <div key={stat.id} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.bg }}>
                {Icon && <Icon size={18} style={{ color: stat.color }} />}
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800 ltr">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Filter */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {['همه', 'فعال', 'غیرفعال'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterStatus === s ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {s}
            </button>
          ))}
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {accountTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterCurrency} onChange={e => setFilterCurrency(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {currencies.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {branchList.map(b => <option key={b}>{b}</option>)}
        </select>
        <div className="flex-1" />
        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو نام، کد..." className="w-44 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
        <span className="text-xs text-slate-500">{filtered.length} حساب</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['کد', 'نام حساب', 'نوع', 'ارز', 'موجودی', 'شعبه', 'تراکنش‌ها', 'وضعیت', ''].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr
                  key={a.id}
                  className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}
                  onClick={() => setDrawer(a)}
                >
                  <td className="px-4 py-3.5 font-mono text-slate-500 ltr font-semibold">{a.code}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800 whitespace-nowrap">{a.name}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: a.typeColor, background: a.typeBg }}>{a.type}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold ltr text-sm" style={{ color: currencyColors[a.currency] || '#64748B' }}>{a.currency}</span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-[#2563EB] ltr whitespace-nowrap">
                    {user.role === 'teller' ? '••••••' : a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{a.branch}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{a.transactions.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium ${a.status ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                      {a.status ? <IconCircleCheck size={12} /> : <IconCircleX size={12} />}
                      {a.status ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModal(a)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <IconEdit size={13} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <IconTrash size={13} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {accounts.length}</span>
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
