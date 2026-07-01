import { useNavigate } from 'react-router-dom'
import {
  IconUsers, IconUserCheck, IconWallet, IconBuilding,
  IconPlus, IconEdit, IconTrash, IconEye,
  IconCircleCheck, IconCircleX, IconTrendingUp,
  IconArrowsExchange,
} from '@tabler/icons-react'
import {
  managementStats, users, customers,
  accounts, branches, overallStats,
} from './mockData'

const ICONS: Record<string, React.ElementType> = {
  IconUsers, IconUserCheck, IconWallet, IconBuilding,
}

const StatusBadge = ({ active }: { active: boolean }) => (
  <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-lg text-[11px] font-medium ${active ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
    {active ? <IconCircleCheck size={12} /> : <IconCircleX size={12} />}
    {active ? 'فعال' : 'غیرفعال'}
  </span>
)

export default function Management() {
  const navigate = useNavigate()

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت</h1>
          <p className="text-sm text-slate-500 mt-0.5">مدیریت شعب، حساب‌ها، مشتریان و کاربران</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {managementStats.map(stat => {
          const Icon = ICONS[stat.icon]
          return (
            <button
              key={stat.id}
              onClick={() => navigate(stat.path)}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all text-right group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: stat.bg }}>
                  {Icon && <Icon size={20} style={{ color: stat.color }} />}
                </div>
                <span className="text-xs text-slate-400">مشاهده همه ←</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800 ltr">{stat.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{stat.unit}</p>
            </button>
          )
        })}
      </div>

      {/* Top grid: users + customers */}
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>

        {/* Users table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <button className="flex items-center gap-1.5 text-xs bg-[#2563EB] text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <IconPlus size={13} />
              افزودن کاربر
            </button>
            <h3 className="text-sm font-semibold text-slate-800">مدیریت کاربران</h3>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['کاربر', 'نقش', 'شعبه', 'وضعیت', ''].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{u.name}</p>
                        <p className="text-[10px] text-slate-400 ltr">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg text-[11px] font-medium" style={{ color: u.roleColor, background: u.roleBg }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] whitespace-nowrap">{u.branch}</td>
                  <td className="px-4 py-3"><StatusBadge active={u.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><IconEdit size={13} /></button>
                      <button className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><IconTrash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-slate-100">
            <button onClick={() => navigate('/management/users')} className="text-xs text-[#2563EB] hover:underline">مشاهده همه کاربران ←</button>
          </div>
        </div>

        {/* Customers table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <button className="flex items-center gap-1.5 text-xs bg-[#059669] text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              <IconPlus size={13} />
              افزودن مشتری
            </button>
            <h3 className="text-sm font-semibold text-slate-800">مدیریت مشتریان</h3>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['مشتری', 'نوع', 'موجودی', 'شعبه', 'وضعیت'].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{c.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg text-[11px] font-medium" style={{ color: c.typeColor, background: c.typeBg }}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800 ltr">{c.balance.toLocaleString()}</span>
                    <span className="text-slate-400 mr-1 ltr">{c.currency}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{c.branch}</td>
                  <td className="px-4 py-3"><StatusBadge active={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-slate-100">
            <button onClick={() => navigate('/management/customers')} className="text-xs text-[#2563EB] hover:underline">مشاهده همه مشتریان ←</button>
          </div>
        </div>
      </div>

      {/* Bottom grid: accounts + branches */}
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>

        {/* Accounts */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <button className="flex items-center gap-1.5 text-xs bg-[#7C3AED] text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 transition-colors font-medium">
              <IconPlus size={13} />
              افزودن حساب
            </button>
            <h3 className="text-sm font-semibold text-slate-800">مدیریت حساب‌ها</h3>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['نام حساب', 'نوع', 'موجودی', 'شعبه', 'وضعیت'].map(h => (
                  <th key={h} className="text-right text-slate-500 font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accounts.map((a, i) => (
                <tr key={a.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{a.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg text-[11px] font-medium" style={{ color: a.typeColor, background: a.typeBg }}>
                      {a.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800 ltr">{a.balance.toLocaleString()}</span>
                    <span className="text-slate-400 mr-1 ltr">{a.currency}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{a.branch}</td>
                  <td className="px-4 py-3"><StatusBadge active={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-slate-100">
            <button onClick={() => navigate('/management/accounts')} className="text-xs text-[#2563EB] hover:underline">مشاهده همه حساب‌ها ←</button>
          </div>
        </div>

        {/* Branches */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <button className="flex items-center gap-1.5 text-xs bg-[#D97706] text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                <IconPlus size={13} />
                افزودن شعبه
              </button>
              <h3 className="text-sm font-semibold text-slate-800">مدیریت شعب</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['کد', 'نام شعبه', 'مدیر', 'تراکنش‌ها', 'وضعیت'].map(h => (
                    <th key={h} className="text-right text-slate-500 font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {branches.map((b, i) => (
                  <tr key={b.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                    <td className="px-4 py-3 font-mono text-slate-500 ltr">{b.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span>{b.country}</span>
                        <span className="font-medium text-slate-800">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{b.manager}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700 ltr">{b.transactions.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge active={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100">
              <button onClick={() => navigate('/management/branches')} className="text-xs text-[#2563EB] hover:underline">مشاهده همه شعب ←</button>
            </div>
          </div>

          {/* Overall summary */}
          <div className="bg-[#1E3A8A] rounded-xl p-5 text-white">
            <h3 className="text-sm font-semibold mb-4 text-blue-100">خلاصه اطلاعات مدیریت</h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {[
                { label: 'مشتریان فعال',   value: overallStats.activeCustomers.toLocaleString(), icon: IconUserCheck,      color: '#34D399' },
                { label: 'کل حساب‌های فعال', value: overallStats.totalAccounts.toLocaleString(),  icon: IconWallet,          color: '#60A5FA' },
                { label: 'کل تراکنش‌ها',   value: overallStats.totalTransactions.toLocaleString(), icon: IconArrowsExchange, color: '#A78BFA' },
                { label: 'کاربران آنلاین',  value: overallStats.onlineUsers.toString(),           icon: IconUsers,           color: '#FCD34D' },
              ].map(item => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon size={14} style={{ color: item.color }} />
                    <span className="text-[10px] text-blue-300">{item.label}</span>
                  </div>
                  <p className="text-lg font-bold ltr" style={{ color: item.color }}>{item.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <IconTrendingUp size={11} className="text-emerald-400" />
                    <span className="text-[10px] text-emerald-400">نسبت به دیروز</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
