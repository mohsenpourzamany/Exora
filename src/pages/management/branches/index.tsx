import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconBuilding, IconCircleCheck, IconCircleX, IconUsers,
  IconPlus, IconEdit, IconTrash, IconSearch,
  IconPhone, IconMail, IconMapPin, IconX,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { branchStats, branches, countries, statuses } from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconBuilding, IconCircleCheck, IconCircleX, IconUsers,
}

const countryFlags: Record<string, string> = {
  'افغانستان': '🇦🇫',
  'امارات':    '🇦🇪',
  'ترکیه':     '🇹🇷',
  'ایران':     '🇮🇷',
  'پاکستان':  '🇵🇰',
}

// Branch form modal
const BranchModal = ({ branch, onClose }: { branch?: typeof branches[0], onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">{branch ? 'ویرایش شعبه' : 'افزودن شعبه جدید'}</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نام شعبه</label>
              <input defaultValue={branch?.name} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام شعبه..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">کد شعبه</label>
              <input defaultValue={branch?.code} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="001" />
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">کشور</label>
              <select defaultValue={branch?.country} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {countries.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شهر</label>
              <input defaultValue={branch?.city} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام شهر..." />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1.5">آدرس کامل</label>
            <input defaultValue={branch?.address} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="آدرس شعبه..." />
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">مدیر شعبه</label>
              <input defaultValue={branch?.manager} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام مدیر..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ایمیل مدیر</label>
              <input defaultValue={branch?.managerEmail} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="email@exora.com" />
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شماره تماس</label>
              <input defaultValue={branch?.phone} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="+93..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">وضعیت</label>
              <select className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                <option>فعال</option>
                <option>غیرفعال</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ {branch ? 'ذخیره تغییرات' : 'افزودن شعبه'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
)

// Branch detail drawer
const BranchDrawer = ({ branch, onClose }: { branch: typeof branches[0], onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex" onClick={onClose}>
      <div className="flex-1 bg-black/40" />
      <div className="w-96 bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <IconX size={18} />
          </button>
          <h2 className="text-sm font-bold text-slate-800">اطلاعات شعبه</h2>
        </div>
        <div className="p-6 space-y-5">
          {/* Branch header */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-14 h-14 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-2xl shrink-0">
              {countryFlags[branch.country] || '🏢'}
            </div>
            <div className="text-right">
              <h3 className="text-base font-bold text-[#1E3A8A]">{branch.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">کد: <span className="font-mono ltr font-semibold">{branch.code}</span></p>
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium mt-1 px-2 py-0.5 rounded-full ${branch.status ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                {branch.status ? <IconCircleCheck size={11} /> : <IconCircleX size={11} />}
                {branch.status ? 'فعال' : 'غیرفعال'}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconMapPin size={16} className="text-[#2563EB] shrink-0" />
              <div className="text-right">
                <p className="text-[10px] text-slate-400">آدرس</p>
                <p className="text-xs font-medium text-slate-700">{branch.address}</p>
                <p className="text-[11px] text-slate-500">{branch.city}، {branch.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconPhone size={16} className="text-[#2563EB] shrink-0" />
              <div className="text-right">
                <p className="text-[10px] text-slate-400">شماره تماس</p>
                <p className="text-xs font-medium text-slate-700 ltr">{branch.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <IconUsers size={16} className="text-[#2563EB] shrink-0" />
              <div className="text-right">
                <p className="text-[10px] text-slate-400">مدیر شعبه</p>
                <p className="text-xs font-medium text-slate-700">{branch.manager}</p>
                <p className="text-[11px] text-slate-500 ltr">{branch.managerEmail}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[#2563EB] ltr">{branch.users}</p>
              <p className="text-[11px] text-slate-500">کاربران</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[#059669] ltr">{branch.transactions.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500">تراکنش‌ها</p>
            </div>
            <div className="col-span-2 bg-[#1E3A8A] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white ltr">{(branch.income / 1000000).toFixed(1)}M</p>
              <p className="text-[11px] text-blue-200">کل عواید (دلار)</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">تاریخ ایجاد: {branch.createdAt}</p>
        </div>
      </div>
    </div>,
    document.body
  )
)

export default function BranchesManagement() {
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'

  const [search, setSearch] = useState('')
  const [filterCountry, setFilterCountry] = useState('همه کشورها')
  const [filterStatus, setFilterStatus] = useState('همه')
  const [modal, setModal] = useState<typeof branches[0] | null | 'new'>(null)
  const [drawer, setDrawer] = useState<typeof branches[0] | null>(null)

  const filtered = branches.filter(b => {
    const matchSearch = b.name.includes(search) || b.code.includes(search) || b.manager.includes(search)
    const matchCountry = filterCountry === 'همه کشورها' || b.country === filterCountry
    const matchStatus = filterStatus === 'همه' || (filterStatus === 'فعال' ? b.status : !b.status)
    return matchSearch && matchCountry && matchStatus
  })

  return (
    <div className="space-y-5">

      {modal && <BranchModal branch={modal === 'new' ? undefined : modal} onClose={() => setModal(null)} />}
      {drawer && <BranchDrawer branch={drawer} onClose={() => setDrawer(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>مدیریت</span><span>›</span>
            <span className="text-slate-600 font-medium">مدیریت شعب</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت شعب</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت شعب داخلی و خارجی</p>
        </div>
        {isAdmin && (
          <button onClick={() => setModal('new')} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconPlus size={15} />افزودن شعبه
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {branchStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <div key={stat.id} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                  {Icon && <Icon size={18} style={{ color: stat.color }} />}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Filter */}
      <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${filterStatus === s ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {s}
            </button>
          ))}
        </div>
        <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="flex-1" />
        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو نام، کد، مدیر..." className="w-52 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
        <span className="text-xs text-slate-500">{filtered.length} شعبه</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['کد', 'نام شعبه', 'کشور / شهر', 'مدیر', 'تماس', 'کاربران', 'تراکنش‌ها', 'عواید', 'وضعیت', ''].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr
                  key={b.id}
                  className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}
                  onClick={() => setDrawer(b)}
                >
                  <td className="px-4 py-3.5 font-mono text-slate-500 ltr font-semibold">{b.code}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{countryFlags[b.country] || '🏢'}</span>
                      <span className="font-semibold text-slate-800 whitespace-nowrap">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{b.city}، {b.country}</td>
                  <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{b.manager}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{b.phone}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{b.users}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700 ltr">{b.transactions.toLocaleString()}</td>
                  <td className="px-4 py-3.5 font-bold text-[#059669] ltr">{(b.income / 1000000).toFixed(1)}M $</td>
                  <td className="px-4 py-3.5">
                    <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium ${b.status ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                      {b.status ? <IconCircleCheck size={12} /> : <IconCircleX size={12} />}
                      {b.status ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      {isAdmin && (
                        <>
                          <button onClick={() => setModal(b)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <IconEdit size={13} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <IconTrash size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {branches.length}</span>
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
