import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconUsers, IconUserCheck, IconUserX, IconUserPlus,
  IconPlus, IconEdit, IconTrash, IconSearch, IconX,
  IconPhone, IconMail, IconMapPin, IconId,
  IconCircleCheck, IconCircleX, IconLock,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { customerStats, customers, customerTypes, branchList, statusList } from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconUsers, IconUserCheck, IconUserX, IconUserPlus,
}

const typeAvatarColors: Record<string, string> = {
  'حقیقی': '#2563EB',
  'شرکت':  '#7C3AED',
  'صرافی': '#059669',
  'سایر':  '#94A3B8',
}

// Customer form modal
const CustomerModal = ({ customer, onClose }: { customer?: typeof customers[0], onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">{customer ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نام مشتری / شرکت</label>
              <input defaultValue={customer?.name} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام مشتری..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نوع مشتری</label>
              <select defaultValue={customer?.type} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {customerTypes.slice(1).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شماره تماس</label>
              <input defaultValue={customer?.phone} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="+93..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ایمیل</label>
              <input defaultValue={customer?.email} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="email@..." />
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">کد ملی / شناسه</label>
              <input defaultValue={customer?.nationalId} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="کد ملی..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select defaultValue={customer?.branch} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branchList.slice(1).map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">آدرس</label>
            <input defaultValue={customer?.address} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="آدرس مشتری..." />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">وضعیت</label>
            <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
              <option>فعال</option>
              <option>غیرفعال</option>
              <option>مسدود</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ {customer ? 'ذخیره تغییرات' : 'افزودن مشتری'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
)

// Customer detail drawer
const CustomerDrawer = ({ customer, onClose, isTeller }: { customer: typeof customers[0], onClose: () => void, isTeller: boolean }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex" onClick={onClose}>
      <div className="flex-1 bg-black/40" />
      <div className="w-96 bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <IconX size={18} />
          </button>
          <h2 className="text-sm font-bold text-slate-800">پروفایل مشتری</h2>
        </div>
        <div className="p-6 space-y-5">

          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0"
              style={{ background: typeAvatarColors[customer.type] || '#2563EB' }}
            >
              {customer.name.charAt(0)}
            </div>
            <div className="text-right">
              <h3 className="text-base font-bold text-slate-800">{customer.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ color: customer.typeColor, background: customer.typeBg }}>{customer.type}</span>
                <span className="font-mono text-[11px] text-slate-400 ltr">{customer.code}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium ${customer.status === 'فعال' ? 'bg-emerald-50 text-emerald-600' : customer.status === 'مسدود' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'}`}>
            {customer.status === 'فعال' ? <IconCircleCheck size={14} /> : customer.status === 'مسدود' ? <IconLock size={14} /> : <IconCircleX size={14} />}
            {customer.status}
          </div>

          {/* Contact info */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconPhone size={15} className="text-[#2563EB] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">شماره تماس</p>
                <p className="text-xs font-medium text-slate-700 ltr">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconMail size={15} className="text-[#2563EB] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">ایمیل</p>
                <p className="text-xs font-medium text-slate-700 ltr">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconMapPin size={15} className="text-[#2563EB] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">آدرس</p>
                <p className="text-xs font-medium text-slate-700">{customer.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconId size={15} className="text-[#2563EB] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400">کد ملی / شناسه</p>
                <p className="text-xs font-medium text-slate-700 ltr">{customer.nationalId}</p>
              </div>
            </div>
          </div>

          {/* Financial stats */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">اطلاعات مالی</p>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-[#2563EB] ltr">
                  {isTeller ? '••••••' : customer.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-slate-400">{customer.currency}</p>
                <p className="text-[10px] text-slate-500">موجودی</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-[#059669] ltr">{customer.transactions.toLocaleString()}</p>
                <p className="text-[10px] text-slate-500">تراکنش‌ها</p>
              </div>
              <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">{customer.branch}</span>
                <span className="text-[11px] text-slate-400">شعبه</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">تاریخ عضویت: {customer.createdAt}</p>
        </div>
      </div>
    </div>,
    document.body
  )
)

export default function CustomersManagement() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'
  const isTeller = user.role === 'teller'

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('همه انواع')
  const [filterBranch, setFilterBranch] = useState('همه شعب')
  const [filterStatus, setFilterStatus] = useState('همه')
  const [modal, setModal] = useState<typeof customers[0] | null | 'new'>(null)
  const [drawer, setDrawer] = useState<typeof customers[0] | null>(null)

  const filtered = customers.filter(c => {
    const matchSearch = c.name.includes(search) || c.code.includes(search) || c.phone.includes(search)
    const matchType = filterType === 'همه انواع' || c.type === filterType
    const matchBranch = filterBranch === 'همه شعب' || c.branch === filterBranch
    const matchStatus = filterStatus === 'همه' || c.status === filterStatus
    return matchSearch && matchType && matchBranch && matchStatus
  })

  return (
    <div className="space-y-5">

      {modal && <CustomerModal customer={modal === 'new' ? undefined : modal} onClose={() => setModal(null)} />}
      {drawer && <CustomerDrawer customer={drawer} onClose={() => setDrawer(null)} isTeller={isTeller} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>مدیریت</span><span>›</span>
            <span className="text-slate-600 font-medium">مدیریت مشتریان</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت مشتریان</h1>
          <p className="text-sm text-slate-500 mt-0.5">مشاهده و مدیریت اطلاعات مشتریان</p>
        </div>
        {isAdmin && (
          <button onClick={() => setModal('new')} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconPlus size={15} />افزودن مشتری
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {customerStats.map(stat => {
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
          {statusList.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterStatus === s ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {s}
            </button>
          ))}
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {customerTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        {!isTeller && (
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
            {branchList.map(b => <option key={b}>{b}</option>)}
          </select>
        )}
        <div className="flex-1" />
        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو نام، کد، تلفن..." className="w-52 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
        <span className="text-xs text-slate-500">{filtered.length} مشتری</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['کد', 'نام مشتری', 'نوع', 'تماس', 'شعبه', 'موجودی', 'تراکنش‌ها', 'وضعیت', ''].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}
                  onClick={() => setDrawer(c)}
                >
                  <td className="px-4 py-3.5 font-mono text-slate-500 ltr font-semibold">{c.code}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: typeAvatarColors[c.type] || '#2563EB' }}>
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 whitespace-nowrap">{c.name}</p>
                        <p className="text-[10px] text-slate-400 ltr">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: c.typeColor, background: c.typeBg }}>{c.type}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{c.phone}</td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{c.branch}</td>
                  <td className="px-4 py-3.5 font-bold text-[#2563EB] ltr whitespace-nowrap">
                    {isTeller ? '••••••' : `${c.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${c.currency}`}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{c.transactions}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: c.statusColor, background: c.statusBg }}>
                      {c.status === 'فعال' ? <IconCircleCheck size={12} /> : c.status === 'مسدود' ? <IconLock size={12} /> : <IconCircleX size={12} />}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModal(c)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {customers.length}</span>
          <div className="flex items-center gap-1">
            {['«', '‹', '1', '2', '3', '›', '»'].map((p, i) => (
              <button key={i} className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === '1' ? 'bg-[#2563EB] text-white font-semibold' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
