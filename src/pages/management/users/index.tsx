import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  IconUsers, IconCircleCheck, IconShield, IconCash,
  IconPlus, IconEdit, IconTrash, IconSearch, IconX,
  IconPhone, IconMail, IconBuilding, IconLock,
  IconCircleX, IconKey,
} from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { userStats, users, roles, rolesList, branchList, statusList } from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconUsers, IconCircleCheck, IconShield, IconCash,
}

const avatarColors = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#0891B2', '#DC2626', '#64748B']

// User form modal
const UserModal = ({ user: editUser, onClose }: { user?: typeof users[0], onClose: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          <h2 className="text-sm font-bold text-slate-800">{editUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نام کامل</label>
              <input defaultValue={editUser?.name} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400" placeholder="نام کاربر..." />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">ایمیل</label>
              <input defaultValue={editUser?.email} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="email@exora.com" />
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نقش</label>
              <select defaultValue={editUser?.role} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {rolesList.slice(1).map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شعبه</label>
              <select defaultValue={editUser?.branch} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-400">
                {branchList.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">شماره تماس</label>
              <input defaultValue={editUser?.phone} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="+93..." />
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
          {!editUser && (
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div>
                <label className="text-xs text-slate-500 block mb-1.5">رمز عبور</label>
                <input type="password" className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1.5">تکرار رمز عبور</label>
                <input type="password" className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm ltr focus:outline-none focus:border-blue-400" placeholder="••••••••" />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 font-medium">انصراف</button>
          <button className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 rounded-xl text-sm text-white font-medium transition-colors">
            ✓ {editUser ? 'ذخیره تغییرات' : 'افزودن کاربر'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
)

// User detail drawer
const UserDrawer = ({ user: viewUser, onClose, onEdit }: { user: typeof users[0], onClose: () => void, onEdit: () => void }) => (
  createPortal(
    <div className="fixed inset-0 z-[9999] flex" onClick={onClose}>
      <div className="flex-1 bg-black/40" />
      <div className="w-80 bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <IconX size={18} />
          </button>
          <h2 className="text-sm font-bold text-slate-800">پروفایل کاربر</h2>
        </div>
        <div className="p-5 space-y-5">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
                style={{ background: avatarColors[viewUser.id % avatarColors.length] }}
              >
                {viewUser.avatar}
              </div>
              {viewUser.online && (
                <span className="absolute bottom-1 left-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-800">{viewUser.name}</h3>
              <span className="inline-block text-[11px] px-2.5 py-1 rounded-full font-medium mt-1" style={{ color: viewUser.roleColor, background: viewUser.roleBg }}>
                {viewUser.role}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium ${viewUser.status === 'فعال' ? 'bg-emerald-50 text-emerald-600' : viewUser.status === 'مسدود' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'}`}>
            {viewUser.status === 'فعال' ? <IconCircleCheck size={14} /> : viewUser.status === 'مسدود' ? <IconLock size={14} /> : <IconCircleX size={14} />}
            {viewUser.status} {viewUser.online && '· آنلاین'}
          </div>

          {/* Contact */}
          <div className="space-y-2">
            {[
              { icon: IconMail,     value: viewUser.email,     ltr: true },
              { icon: IconPhone,    value: viewUser.phone,     ltr: true },
              { icon: IconBuilding, value: viewUser.branch,    ltr: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <item.icon size={15} className="text-[#2563EB] shrink-0" />
                <p className={`text-xs text-slate-700 ${item.ltr ? 'ltr' : ''}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Permissions */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">دسترسی‌ها</p>
            <div className="flex flex-wrap gap-1.5">
              {viewUser.permissions.map(p => (
                <span key={p} className="text-[11px] bg-blue-50 text-[#2563EB] border border-blue-200 px-2.5 py-1 rounded-lg font-medium">{p}</span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 ltr">{viewUser.lastLogin}</span>
              <span className="text-slate-400">آخرین ورود</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500 ltr">{viewUser.createdAt}</span>
              <span className="text-slate-400">تاریخ ایجاد</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <button onClick={onEdit} className="flex items-center justify-center gap-1.5 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors">
              <IconEdit size={13} />ویرایش
            </button>
            <button className="flex items-center justify-center gap-1.5 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-medium hover:bg-amber-100 transition-colors">
              <IconKey size={13} />تغییر رمز
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
)

export default function UsersManagement() {
  const { user: currentUser } = useAuth()
  const isAdmin = currentUser.role === 'admin'

  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('همه نقش‌ها')
  const [filterBranch, setFilterBranch] = useState('همه شعب')
  const [filterStatus, setFilterStatus] = useState('همه')
  const [modal, setModal] = useState<typeof users[0] | null | 'new'>(null)
  const [drawer, setDrawer] = useState<typeof users[0] | null>(null)

  const filtered = users.filter(u => {
    const matchSearch = u.name.includes(search) || u.email.includes(search)
    const matchRole = filterRole === 'همه نقش‌ها' || u.role === filterRole
    const matchBranch = filterBranch === 'همه شعب' || u.branch === filterBranch
    const matchStatus = filterStatus === 'همه' || u.status === filterStatus
    return matchSearch && matchRole && matchBranch && matchStatus
  })

  return (
    <div className="space-y-5">

      {modal && <UserModal user={modal === 'new' ? undefined : modal} onClose={() => setModal(null)} />}
      {drawer && (
        <UserDrawer
          user={drawer}
          onClose={() => setDrawer(null)}
          onEdit={() => { setModal(drawer); setDrawer(null) }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>مدیریت</span><span>›</span>
            <span className="text-slate-600 font-medium">مدیریت کاربران</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت کاربران</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت کاربران، نقش‌ها و دسترسی‌ها</p>
        </div>
        {isAdmin && (
          <button onClick={() => setModal('new')} className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <IconPlus size={15} />افزودن کاربر
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {userStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <div key={stat.id} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.bg }}>
                {Icon && <Icon size={18} style={{ color: stat.color }} />}
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.unit}</p>
            </div>
          )
        })}
      </div>

      {/* Roles summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">توزیع نقش‌ها</h3>
        <div className="flex flex-wrap gap-3">
          {roles.map(role => {
            const count = users.filter(u => u.role === role.label).length
            return (
              <div key={role.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ borderColor: role.color + '30', background: role.bg }}>
                <span className="text-lg font-bold" style={{ color: role.color }}>{count}</span>
                <span className="text-xs font-medium" style={{ color: role.color }}>{role.label}</span>
              </div>
            )
          })}
        </div>
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
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {rolesList.map(r => <option key={r}>{r}</option>)}
        </select>
        <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="h-9 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs focus:outline-none">
          {branchList.map(b => <option key={b}>{b}</option>)}
        </select>
        <div className="flex-1" />
        <div className="relative">
          <IconSearch size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو نام، ایمیل..." className="w-48 h-9 bg-slate-50 border border-slate-200 rounded-lg pr-8 pl-3 text-xs focus:outline-none focus:border-blue-400" />
        </div>
        <span className="text-xs text-slate-500">{filtered.length} کاربر</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['کاربر', 'نقش', 'شعبه', 'آخرین ورود', 'وضعیت', ''].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr
                  key={u.id}
                  className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}
                  onClick={() => setDrawer(u)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                          style={{ background: avatarColors[u.id % avatarColors.length] }}
                        >
                          {u.avatar}
                        </div>
                        {u.online && <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.name}</p>
                        <p className="text-[10px] text-slate-400 ltr">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium" style={{ color: u.roleColor, background: u.roleBg }}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{u.branch}</td>
                  <td className="px-4 py-3.5 text-slate-500 ltr whitespace-nowrap">{u.lastLogin}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap" style={{ color: u.statusColor, background: u.statusBg }}>
                      {u.status === 'فعال' ? <IconCircleCheck size={12} /> : u.status === 'مسدود' ? <IconLock size={12} /> : <IconCircleX size={12} />}
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModal(u)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
          <span className="text-xs text-slate-500">نمایش {filtered.length} مورد از {users.length}</span>
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
