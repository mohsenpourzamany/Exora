export const txReportStats = [
  { id: 'total',   label: 'کل تراکنش‌ها',      value: '12,568', unit: 'مورد', color: '#2563EB', bg: '#EFF6FF', icon: 'IconArrowsExchange', change: '+12.5%', positive: true  },
  { id: 'today',   label: 'تراکنش‌های امروز',   value: '287',    unit: 'مورد', color: '#059669', bg: '#ECFDF5', icon: 'IconClock',          change: '+18.3%', positive: true  },
  { id: 'volume',  label: 'حجم کل تراکنش‌ها',  value: '45.8M',  unit: 'دلار', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconCash',           change: '+15.6%', positive: true  },
  { id: 'failed',  label: 'تراکنش‌های ناموفق',  value: '24',     unit: 'مورد', color: '#DC2626', bg: '#FEF2F2', icon: 'IconCircleX',        change: '-8.4%',  positive: true  },
]

export const txByType = [
  { name: 'عواید و مصارف',       count: 560, percent: 44.9, color: '#2563EB' },
  { name: 'نقد و بانک',          count: 249, percent: 19.9, color: '#7C3AED' },
  { name: 'انتقال حساب به حساب', count: 187, percent: 15.0, color: '#059669' },
  { name: 'انتقال حواله',         count: 124, percent: 9.9,  color: '#D97706' },
  { name: 'متفرقه',              count: 125, percent: 10.0, color: '#94A3B8' },
]

export const dailyTxData = Array.from({ length: 14 }, (_, i) => ({
  date: `${i + 11} اردیبهشت`,
  count: Math.floor(Math.random() * 150) + 180,
  volume: Math.floor(Math.random() * 2000000) + 3000000,
  failed: Math.floor(Math.random() * 5),
}))

export const allTransactions = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۱۵', type: 'عواید و مصارف',       typeColor: '#2563EB', typeBg: '#EFF6FF', desc: 'دریافت از مشتری',           branch: 'شعبه مرکزی', currency: 'USD', amount: 2450.00,  status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۵۰', type: 'نقد و بانک',          typeColor: '#7C3AED', typeBg: '#F5F3FF', desc: 'واریز به حساب بانکی',       branch: 'شعبه مرکزی', currency: 'USD', amount: 25000.00, status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', type: 'انتقال حواله',         typeColor: '#D97706', typeBg: '#FFFBEB', desc: 'ارسال حواله به دبی',        branch: 'شعبه کابل',  currency: 'USD', amount: 12450.00, status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۱۰', type: 'انتقال حساب به حساب', typeColor: '#059669', typeBg: '#ECFDF5', desc: 'انتقال بین حساب‌ها',        branch: 'شعبه مرکزی', currency: 'USD', amount: 5000.00,  status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵', type: 'عواید و مصارف',       typeColor: '#2563EB', typeBg: '#EFF6FF', desc: 'پرداخت کرایه دفتر',         branch: 'شعبه هرات',  currency: 'USD', amount: 850.00,   status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 6,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۳۰', type: 'متفرقه',              typeColor: '#94A3B8', typeBg: '#F8FAFC', desc: 'هزینه‌های اداری',           branch: 'شعبه مرکزی', currency: 'USD', amount: 350.00,   status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 7,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۰۰', type: 'نقد و بانک',          typeColor: '#7C3AED', typeBg: '#F5F3FF', desc: 'برداشت از بانک',            branch: 'شعبه مزار',  currency: 'EUR', amount: 8500.00,  status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB' },
  { id: 8,  date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۳۰', type: 'انتقال حواله',         typeColor: '#D97706', typeBg: '#FFFBEB', desc: 'دریافت حواله از استانبول', branch: 'شعبه مرکزی', currency: 'TRY', amount: 75000.00, status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 9,  date: '۱۴۰۳/۰۲/۲۳ - ۱۵:۰۰', type: 'عواید و مصارف',       typeColor: '#2563EB', typeBg: '#EFF6FF', desc: 'حقوق کارمندان',             branch: 'شعبه مرکزی', currency: 'USD', amount: 12000.00, status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 10, date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۰۰', type: 'انتقال حساب به حساب', typeColor: '#059669', typeBg: '#ECFDF5', desc: 'تأمین نقدینگی شعبه',       branch: 'شعبه کابل',  currency: 'USD', amount: 50000.00, status: 'ناموفق', statusColor: '#DC2626', statusBg: '#FEF2F2' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const txTypes = ['همه انواع', 'عواید و مصارف', 'نقد و بانک', 'انتقال حساب به حساب', 'انتقال حواله', 'متفرقه']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED']
export const statuses = ['همه وضعیت‌ها', 'موفق', 'در انتظار', 'ناموفق']
