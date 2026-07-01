export const managementStats = [
  { id: 'users',     label: 'مدیریت کاربران',  value: '48',   unit: 'کاربر',  color: '#2563EB', bg: '#EFF6FF', icon: 'IconUsers',        path: '/management/users',     change: '+5.2%',  positive: true },
  { id: 'customers', label: 'مدیریت مشتریان', value: '3,652', unit: 'مشتری', color: '#059669', bg: '#ECFDF5', icon: 'IconUserCheck',    path: '/management/customers', change: '+12.5%', positive: true },
  { id: 'accounts',  label: 'مدیریت حساب‌ها', value: '1,248', unit: 'حساب',  color: '#7C3AED', bg: '#F5F3FF', icon: 'IconWallet',       path: '/management/accounts',  change: '+8.3%',  positive: true },
  { id: 'branches',  label: 'مدیریت شعب',     value: '12',   unit: 'شعبه فعال', color: '#D97706', bg: '#FFFBEB', icon: 'IconBuilding', path: '/management/branches',  change: '0%',     positive: true },
]

export const users = [
  { id: 1, name: 'احمد محمدی',   email: 'ahmad.m@gmail.com',   avatar: 'ا', role: 'مدیر',      roleColor: '#2563EB', roleBg: '#EFF6FF', branch: 'شعبه مرکزی کابل', status: true,  lastLogin: '۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰' },
  { id: 2, name: 'سارا کریمی',   email: 'sara.karimi@gmail.com', avatar: 'س', role: 'کارشناس',   roleColor: '#7C3AED', roleBg: '#F5F3FF', branch: 'شعبه مزار شریف',  status: true,  lastLogin: '۱۴۰۳/۰۲/۲۴ - ۰۹:۱۵' },
  { id: 3, name: 'علی رضایی',    email: 'ali.rezaei@gmail.com',  avatar: 'ع', role: 'صندوقدار',  roleColor: '#059669', roleBg: '#ECFDF5', branch: 'شعبه هرات',       status: true,  lastLogin: '۱۴۰۳/۰۲/۲۴ - ۱۰:۴۵' },
  { id: 4, name: 'مریم حسینی',   email: 'maryam.h@gmail.com',   avatar: 'م', role: 'کارشناس',   roleColor: '#7C3AED', roleBg: '#F5F3FF', branch: 'شعبه جلال آباد', status: true,  lastLogin: '۱۴۰۳/۰۲/۲۳ - ۱۶:۰۰' },
  { id: 5, name: 'حسین احمدی',   email: 'hossein.a@gmail.com',  avatar: 'ح', role: 'بازرس',     roleColor: '#D97706', roleBg: '#FFFBEB', branch: 'شعبه قندهار',    status: false, lastLogin: '۱۴۰۳/۰۲/۲۰ - ۰۸:۳۰' },
]

export const customers = [
  { id: 1, name: 'شرکت تجارت جهانی', type: 'شرکت',  typeColor: '#2563EB', typeBg: '#EFF6FF', balance: 245850.00, currency: 'USD', branch: 'شعبه مرکزی', status: true  },
  { id: 2, name: 'احمد ولی زاده',    type: 'حقیقی', typeColor: '#059669', typeBg: '#ECFDF5', balance: 85450.00,  currency: 'EUR', branch: 'شعبه هرات',  status: true  },
  { id: 3, name: 'شرکت افق روشن',    type: 'شرکت',  typeColor: '#2563EB', typeBg: '#EFF6FF', balance: 3245000,   currency: 'AFN', branch: 'شعبه کابل',  status: true  },
  { id: 4, name: 'محمد اکبری',       type: 'حقیقی', typeColor: '#059669', typeBg: '#ECFDF5', balance: 75950.00,  currency: 'TRY', branch: 'شعبه مزار',  status: true  },
  { id: 5, name: 'شرکت توسعه پایدار',type: 'شرکت',  typeColor: '#2563EB', typeBg: '#EFF6FF', balance: 152600.00, currency: 'AED', branch: 'شعبه کابل',  status: false },
]

export const accounts = [
  { id: 1, name: 'حساب دلار نقدی',    type: 'نقدی', typeColor: '#2563EB', typeBg: '#EFF6FF', balance: 245850.00,  currency: 'USD', branch: 'شعبه مرکزی', status: true  },
  { id: 2, name: 'حساب یورو نقدی',    type: 'نقدی', typeColor: '#2563EB', typeBg: '#EFF6FF', balance: 85450.00,   currency: 'EUR', branch: 'شعبه هرات',  status: true  },
  { id: 3, name: 'حساب افغانی نقدی',  type: 'نقدی', typeColor: '#2563EB', typeBg: '#EFF6FF', balance: 3245000,    currency: 'AFN', branch: 'شعبه کابل',  status: true  },
  { id: 4, name: 'حساب لیر ترکیه',    type: 'بانکی',typeColor: '#7C3AED', typeBg: '#F5F3FF', balance: 75950.00,   currency: 'TRY', branch: 'شعبه مزار',  status: true  },
  { id: 5, name: 'حساب درهم امارات',  type: 'بانکی',typeColor: '#7C3AED', typeBg: '#F5F3FF', balance: 152600.00,  currency: 'AED', branch: 'شعبه کابل',  status: true  },
]

export const branches = [
  { id: '001', name: 'شعبه مرکزی کابل',  country: '🇦🇫', manager: 'احمد محمدی',  transactions: 2845, status: true  },
  { id: '002', name: 'شعبه مزار شریف',   country: '🇦🇫', manager: 'سارا کریمی',   transactions: 1520, status: true  },
  { id: '003', name: 'شعبه هرات',         country: '🇦🇫', manager: 'علی رضایی',    transactions: 1248, status: true  },
  { id: '004', name: 'شعبه جلال آباد',   country: '🇦🇫', manager: 'مریم حسینی',   transactions: 987,  status: true  },
  { id: '005', name: 'شعبه قندهار',       country: '🇦🇫', manager: 'حسین احمدی',   transactions: 654,  status: false },
]

export const overallStats = {
  totalCustomers: 2845,
  activeCustomers: 485,
  totalAccounts: 1248,
  totalTransactions: 8652,
  onlineUsers: 18,
}
