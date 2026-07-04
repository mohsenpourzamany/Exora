export const userStats = [
  { id: 'total',   label: 'کل کاربران',      value: '48',  unit: 'کاربر', color: '#2563EB', bg: '#EFF6FF', icon: 'IconUsers'       },
  { id: 'online',  label: 'آنلاین الان',      value: '18',  unit: 'کاربر', color: '#059669', bg: '#ECFDF5', icon: 'IconCircleCheck' },
  { id: 'admins',  label: 'مدیران',           value: '4',   unit: 'نفر',   color: '#7C3AED', bg: '#F5F3FF', icon: 'IconShield'      },
  { id: 'tellers', label: 'صندوقداران',       value: '28',  unit: 'نفر',   color: '#D97706', bg: '#FFFBEB', icon: 'IconCash'        },
]

export const roles = [
  { id: 'admin',          label: 'مدیر سیستم',   color: '#2563EB', bg: '#EFF6FF' },
  { id: 'branch_manager', label: 'مدیر شعبه',    color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'accountant',     label: 'حسابدار',       color: '#059669', bg: '#ECFDF5' },
  { id: 'teller',         label: 'صندوقدار',      color: '#D97706', bg: '#FFFBEB' },
  { id: 'auditor',        label: 'حسابرس',        color: '#0891B2', bg: '#ECFEFF' },
  { id: 'support',        label: 'پشتیبان سیستم', color: '#64748B', bg: '#F8FAFC' },
]

export const rolesList    = ['همه نقش‌ها', 'مدیر سیستم', 'مدیر شعبه', 'حسابدار', 'صندوقدار', 'حسابرس', 'پشتیبان سیستم']
export const branchList   = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد', 'شعبه دبی', 'شعبه استانبول']
export const statusList   = ['همه', 'فعال', 'غیرفعال', 'مسدود']

export const users = [
  { id: 1,  name: 'احمد محمدی',    email: 'ahmad.m@exora.com',    avatar: 'ا', role: 'مدیر سیستم',   roleColor: '#2563EB', roleBg: '#EFF6FF', branch: 'همه شعب',            lastLogin: '۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: true,  createdAt: '۱۴۰۰/۰۱/۰۱', phone: '+93 70 111 2222', permissions: ['همه بخش‌ها'] },
  { id: 2,  name: 'سارا کریمی',    email: 'sara.k@exora.com',     avatar: 'س', role: 'مدیر شعبه',    roleColor: '#7C3AED', roleBg: '#F5F3FF', branch: 'شعبه مرکزی کابل',   lastLogin: '۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: true,  createdAt: '۱۴۰۰/۰۳/۱۵', phone: '+93 79 222 3333', permissions: ['گزارشات', 'ترانزکشن‌ها', 'مدیریت شعبه'] },
  { id: 3,  name: 'علی رضایی',     email: 'ali.r@exora.com',      avatar: 'ع', role: 'صندوقدار',      roleColor: '#D97706', roleBg: '#FFFBEB', branch: 'شعبه هرات',          lastLogin: '۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: true,  createdAt: '۱۴۰۰/۰۶/۰۱', phone: '+93 70 333 4444', permissions: ['ترانزکشن‌ها'] },
  { id: 4,  name: 'مریم حسینی',    email: 'maryam.h@exora.com',   avatar: 'م', role: 'حسابدار',       roleColor: '#059669', roleBg: '#ECFDF5', branch: 'شعبه جلال آباد',    lastLogin: '۱۴۰۳/۰۲/۲۴ - ۰۸:۳۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: false, createdAt: '۱۴۰۱/۰۱/۱۰', phone: '+93 79 444 5555', permissions: ['گزارشات', 'ترانزکشن‌ها'] },
  { id: 5,  name: 'حسین احمدی',    email: 'hossein.a@exora.com',  avatar: 'ح', role: 'صندوقدار',      roleColor: '#D97706', roleBg: '#FFFBEB', branch: 'شعبه قندهار',        lastLogin: '۱۴۰۳/۰۲/۲۰ - ۱۴:۰۰', status: 'غیرفعال', statusColor: '#94A3B8', statusBg: '#F8FAFC', online: false, createdAt: '۱۴۰۱/۰۴/۰۱', phone: '+93 79 555 6666', permissions: ['ترانزکشن‌ها'] },
  { id: 6,  name: 'فریده نوری',    email: 'farida.n@exora.com',   avatar: 'ف', role: 'مدیر شعبه',    roleColor: '#7C3AED', roleBg: '#F5F3FF', branch: 'شعبه بامیان',        lastLogin: '۱۴۰۳/۰۲/۲۳ - ۱۶:۳۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: false, createdAt: '۱۴۰۱/۰۷/۱۵', phone: '+93 79 666 7777', permissions: ['گزارشات', 'ترانزکشن‌ها', 'مدیریت شعبه'] },
  { id: 7,  name: 'یوسف کریمی',    email: 'yousef.k@exora.com',   avatar: 'ی', role: 'صندوقدار',      roleColor: '#D97706', roleBg: '#FFFBEB', branch: 'شعبه کندهار',        lastLogin: '۱۴۰۳/۰۲/۲۳ - ۱۲:۰۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: false, createdAt: '۱۴۰۲/۰۲/۰۱', phone: '+93 79 777 8888', permissions: ['ترانزکشن‌ها'] },
  { id: 8,  name: 'ناصر احمد',     email: 'naser.a@exora.com',    avatar: 'ن', role: 'حسابرس',        roleColor: '#0891B2', roleBg: '#ECFEFF', branch: 'شعبه مرکزی کابل',   lastLogin: '۱۴۰۳/۰۲/۲۴ - ۰۷:۰۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: true,  createdAt: '۱۴۰۲/۰۵/۱۰', phone: '+93 70 888 9999', permissions: ['گزارشات (فقط خواندنی)'] },
  { id: 9,  name: 'محمد سلیمان',   email: 'mohd.s@exora.com',     avatar: 'م', role: 'مدیر شعبه',    roleColor: '#7C3AED', roleBg: '#F5F3FF', branch: 'شعبه دبی',           lastLogin: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: true,  createdAt: '۱۴۰۰/۰۹/۰۱', phone: '+971 50 111 2222', permissions: ['گزارشات', 'ترانزکشن‌ها', 'مدیریت شعبه'] },
  { id: 10, name: 'رضا احمدی',     email: 'reza.a@exora.com',     avatar: 'ر', role: 'مدیر شعبه',    roleColor: '#7C3AED', roleBg: '#F5F3FF', branch: 'شعبه تهران',         lastLogin: '۱۴۰۳/۰۲/۲۳ - ۱۸:۰۰', status: 'فعال',    statusColor: '#059669', statusBg: '#ECFDF5', online: false, createdAt: '۱۴۰۱/۰۳/۱۵', phone: '+98 912 111 2222', permissions: ['گزارشات', 'ترانزکشن‌ها', 'مدیریت شعبه'] },
]
