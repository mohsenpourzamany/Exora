export const branchStats = [
  { id: 'total',    label: 'کل شعب',       value: '12', unit: 'شعبه',  color: '#2563EB', bg: '#EFF6FF', icon: 'IconBuilding' },
  { id: 'active',   label: 'شعب فعال',     value: '10', unit: 'شعبه',  color: '#059669', bg: '#ECFDF5', icon: 'IconCircleCheck' },
  { id: 'inactive', label: 'شعب غیرفعال', value: '2',  unit: 'شعبه',  color: '#94A3B8', bg: '#F8FAFC', icon: 'IconCircleX' },
  { id: 'online',   label: 'کاربران آنلاین', value: '18', unit: 'نفر', color: '#D97706', bg: '#FFFBEB', icon: 'IconUsers' },
]

export const branches = [
  { id: 1,  code: '001', name: 'شعبه مرکزی کابل',   country: 'افغانستان', city: 'کابل',        manager: 'احمد محمدی',  managerEmail: 'ahmad.m@exora.com', phone: '+93 20 111 2222', address: 'شهر نو، کابل',          users: 8,  transactions: 2845, income: 4850000, status: true,  createdAt: '۱۴۰۰/۰۱/۰۱' },
  { id: 2,  code: '002', name: 'شعبه مزار شریف',     country: 'افغانستان', city: 'مزار شریف',   manager: 'سارا کریمی',   managerEmail: 'sara.k@exora.com',  phone: '+93 40 222 3333', address: 'خیابان اصلی، مزار شریف', users: 5,  transactions: 1520, income: 2800000, status: true,  createdAt: '۱۴۰۰/۰۳/۱۵' },
  { id: 3,  code: '003', name: 'شعبه هرات',           country: 'افغانستان', city: 'هرات',         manager: 'علی رضایی',    managerEmail: 'ali.r@exora.com',   phone: '+93 40 333 4444', address: 'بازار قدیم، هرات',        users: 4,  transactions: 1248, income: 2400000, status: true,  createdAt: '۱۴۰۰/۰۶/۰۱' },
  { id: 4,  code: '004', name: 'شعبه جلال آباد',     country: 'افغانستان', city: 'جلال آباد',   manager: 'مریم حسینی',  managerEmail: 'maryam.h@exora.com',phone: '+93 70 444 5555', address: 'خیابان دانشگاه، جلال آباد',users: 3,  transactions: 987,  income: 1500000, status: true,  createdAt: '۱۴۰۱/۰۱/۱۰' },
  { id: 5,  code: '005', name: 'شعبه قندهار',         country: 'افغانستان', city: 'قندهار',       manager: 'حسین احمدی',  managerEmail: 'hossein.a@exora.com',phone: '+93 50 555 6666', address: 'مرکز شهر، قندهار',        users: 3,  transactions: 654,  income: 1100000, status: false, createdAt: '۱۴۰۱/۰۴/۰۱' },
  { id: 6,  code: '006', name: 'شعبه بامیان',         country: 'افغانستان', city: 'بامیان',       manager: 'فریده نوری',  managerEmail: 'farida.n@exora.com', phone: '+93 79 666 7777', address: 'مرکز شهر، بامیان',        users: 2,  transactions: 420,  income: 850000,  status: true,  createdAt: '۱۴۰۱/۰۷/۱۵' },
  { id: 7,  code: '007', name: 'شعبه کندهار',         country: 'افغانستان', city: 'کندهار',       manager: 'یوسف کریمی', managerEmail: 'yousef.k@exora.com', phone: '+93 81 777 8888', address: 'بازار مرکزی، کندهار',     users: 2,  transactions: 380,  income: 720000,  status: true,  createdAt: '۱۴۰۲/۰۲/۰۱' },
  { id: 8,  code: '008', name: 'شعبه لوگر',           country: 'افغانستان', city: 'لوگر',         manager: 'ناصر احمد',   managerEmail: 'naser.a@exora.com',  phone: '+93 29 888 9999', address: 'مرکز شهر، لوگر',          users: 2,  transactions: 285,  income: 520000,  status: true,  createdAt: '۱۴۰۲/۰۵/۱۰' },
  { id: 9,  code: '009', name: 'شعبه دبی',            country: 'امارات',    city: 'دبی',          manager: 'محمد سلیمان', managerEmail: 'mohd.s@exora.com',   phone: '+971 4 111 2222', address: 'دیره، دبی، امارات',       users: 6,  transactions: 1850, income: 5200000, status: true,  createdAt: '۱۴۰۰/۰۹/۰۱' },
  { id: 10, code: '010', name: 'شعبه استانبول',       country: 'ترکیه',     city: 'استانبول',     manager: 'آیشه دمیر',   managerEmail: 'ayse.d@exora.com',   phone: '+90 212 111 2222', address: 'بشیکتاش، استانبول',      users: 4,  transactions: 1240, income: 3800000, status: true,  createdAt: '۱۴۰۱/۰۱/۰۱' },
  { id: 11, code: '011', name: 'شعبه تهران',          country: 'ایران',     city: 'تهران',        manager: 'رضا احمدی',   managerEmail: 'reza.a@exora.com',   phone: '+98 21 111 2222', address: 'ولیعصر، تهران',           users: 5,  transactions: 1580, income: 4100000, status: true,  createdAt: '۱۴۰۱/۰۳/۱۵' },
  { id: 12, code: '012', name: 'شعبه لاهور',          country: 'پاکستان',   city: 'لاهور',        manager: 'عمر فاروق',   managerEmail: 'omar.f@exora.com',   phone: '+92 42 111 2222', address: 'گلبرگ، لاهور',           users: 3,  transactions: 680,  income: 1850000, status: false, createdAt: '۱۴۰۲/۰۱/۰۱' },
]

export const countries = ['همه کشورها', 'افغانستان', 'امارات', 'ترکیه', 'ایران', 'پاکستان']
export const statuses = ['همه', 'فعال', 'غیرفعال']
