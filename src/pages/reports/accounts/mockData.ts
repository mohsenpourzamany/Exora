export const accountReportStats = [
  { id: 'total',    label: 'کل حساب‌ها',       value: '1,245',      unit: 'حساب',  color: '#2563EB', bg: '#EFF6FF', icon: 'IconWallet',       change: '+8.3%',  positive: true  },
  { id: 'active',   label: 'حساب‌های فعال',     value: '1,128',      unit: 'حساب',  color: '#059669', bg: '#ECFDF5', icon: 'IconCircleCheck',  change: '+5.2%',  positive: true  },
  { id: 'balance',  label: 'موجودی کل',         value: '45,850,200', unit: 'دلار',  color: '#7C3AED', bg: '#F5F3FF', icon: 'IconCash',         change: '+15.8%', positive: true  },
  { id: 'transfer', label: 'انتقالات امروز',    value: '187',        unit: 'مورد',  color: '#D97706', bg: '#FFFBEB', icon: 'IconArrowsExchange',change: '+9.4%',  positive: true  },
]

export const accountsList = [
  { id: 1,  name: 'حساب دلار نقدی',     type: 'نقدی',  typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'USD', balance: 245850.00, branch: 'شعبه مرکزی', transactions: 248, status: true  },
  { id: 2,  name: 'حساب یورو نقدی',     type: 'نقدی',  typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'EUR', balance: 85450.00,  branch: 'شعبه هرات',  transactions: 124, status: true  },
  { id: 3,  name: 'حساب افغانی نقدی',   type: 'نقدی',  typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'AFN', balance: 3245000,   branch: 'شعبه کابل',  transactions: 312, status: true  },
  { id: 4,  name: 'حساب لیر ترکیه',     type: 'بانکی', typeColor: '#7C3AED', typeBg: '#F5F3FF', currency: 'TRY', balance: 75950.00,  branch: 'شعبه مزار',  transactions: 87,  status: true  },
  { id: 5,  name: 'حساب درهم امارات',   type: 'بانکی', typeColor: '#7C3AED', typeBg: '#F5F3FF', currency: 'AED', balance: 152600.00, branch: 'شعبه کابل',  transactions: 156, status: true  },
  { id: 6,  name: 'حساب بانک ملی',      type: 'بانکی', typeColor: '#7C3AED', typeBg: '#F5F3FF', currency: 'USD', balance: 850000.00, branch: 'شعبه مرکزی', transactions: 89,  status: true  },
  { id: 7,  name: 'صندوق مرکزی',        type: 'صندوق', typeColor: '#059669', typeBg: '#ECFDF5', currency: 'USD', balance: 125000.00, branch: 'شعبه مرکزی', transactions: 445, status: true  },
  { id: 8,  name: 'حساب ذخیره',         type: 'ذخیره', typeColor: '#D97706', typeBg: '#FFFBEB', currency: 'USD', balance: 350000.00, branch: 'شعبه مرکزی', transactions: 12,  status: false },
]

export const balanceByBranch = [
  { branch: 'شعبه مرکزی کابل',  usd: 850000, eur: 120000, afn: 5200000, try: 0,      aed: 250000 },
  { branch: 'شعبه مزار شریف',   usd: 320000, eur: 45000,  afn: 2100000, try: 75950,  aed: 0      },
  { branch: 'شعبه هرات',         usd: 245000, eur: 85450,  afn: 1800000, try: 0,      aed: 0      },
  { branch: 'شعبه جلال آباد',   usd: 180000, eur: 0,      afn: 950000,  try: 0,      aed: 0      },
]

export const accountMovements = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰', account: 'حساب دلار نقدی',   type: 'واریز',   typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از مشتری',        currency: 'USD', amount: 25000.00, balance: 245850.00 },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵', account: 'حساب بانک ملی',    type: 'برداشت',  typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'پرداخت حقوق',            currency: 'USD', amount: 12000.00, balance: 838000.00 },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵', account: 'حساب یورو نقدی',   type: 'واریز',   typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت حواله',           currency: 'EUR', amount: 8500.00,  balance: 85450.00  },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۰۰', account: 'صندوق مرکزی',      type: 'انتقال',  typeBg: '#EFF6FF', typeColor: '#2563EB', desc: 'انتقال به شعبه کابل',    currency: 'USD', amount: 50000.00, balance: 125000.00 },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۳۰', account: 'حساب افغانی نقدی', type: 'واریز',   typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت نقدی',            currency: 'AFN', amount: 500000,   balance: 3245000   },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const accountTypes = ['همه انواع', 'نقدی', 'بانکی', 'صندوق', 'ذخیره']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED']
