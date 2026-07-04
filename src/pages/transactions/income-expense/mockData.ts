export const incomeExpenseStats = [
  { id: 'total-income',  label: 'کل عواید',        value: '12,650,850', unit: 'دلار', color: '#059669', bg: '#ECFDF5', icon: 'IconTrendingUp',   change: '+18.3%', positive: true  },
  { id: 'total-expense', label: 'کل مصارف',        value: '8,245,300',  unit: 'دلار', color: '#DC2626', bg: '#FEF2F2', icon: 'IconTrendingDown', change: '-7.6%',  positive: false },
  { id: 'net-profit',    label: 'سود خالص',        value: '4,405,550',  unit: 'دلار', color: '#2563EB', bg: '#EFF6FF', icon: 'IconCoin',         change: '+12.4%', positive: true  },
  { id: 'count',         label: 'تعداد تراکنش‌ها', value: '1,245',      unit: 'مورد', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconList',         change: '+8.2%',  positive: true  },
]

// Daily data for last 30 days
export const dailyData = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2024, 3, i + 1)
  const day = d.toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })
  return {
    date: day,
    rawDate: new Date(2024, 3, i + 1),
    income:  Math.floor(Math.random() * 800000) + 600000,
    expense: Math.floor(Math.random() * 500000) + 400000,
  }
})

// Monthly data
export const monthlyData = [
  { date: 'فروردین',    rawDate: new Date(2024, 0, 1), income: 9800000,  expense: 6200000 },
  { date: 'اردیبهشت',  rawDate: new Date(2024, 1, 1), income: 11500000, expense: 7800000 },
  { date: 'خرداد',     rawDate: new Date(2024, 2, 1), income: 10500000, expense: 6900000 },
  { date: 'تیر',       rawDate: new Date(2024, 3, 1), income: 12800000, expense: 8200000 },
  { date: 'مرداد',     rawDate: new Date(2024, 4, 1), income: 11000000, expense: 7500000 },
  { date: 'شهریور',    rawDate: new Date(2024, 5, 1), income: 13500000, expense: 8900000 },
]

// Weekly data
export const weeklyData = [
  { date: 'شنبه',      rawDate: new Date(2024, 3, 20), income: 1850000, expense: 1200000 },
  { date: 'یکشنبه',   rawDate: new Date(2024, 3, 21), income: 2100000, expense: 1400000 },
  { date: 'دوشنبه',   rawDate: new Date(2024, 3, 22), income: 1750000, expense: 1100000 },
  { date: 'سه‌شنبه',  rawDate: new Date(2024, 3, 23), income: 2300000, expense: 1600000 },
  { date: 'چهارشنبه', rawDate: new Date(2024, 3, 24), income: 1950000, expense: 1300000 },
  { date: 'پنجشنبه',  rawDate: new Date(2024, 3, 25), income: 1400000, expense: 950000  },
  { date: 'جمعه',     rawDate: new Date(2024, 3, 26), income: 800000,  expense: 550000  },
]

export const incomeExpenseData = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۱۵', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از مشتری',             account: 'علی رضایی',          branch: 'شعبه مرکزی',  currency: 'USD', amount: 2450.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۵۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'پرداخت کرایه دفتر',            account: 'کرایه دفتر',         branch: 'شعبه مرکزی',  currency: 'USD', amount: 850.00,   status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از شرکت تجارت جهانی',  account: 'شرکت تجارت جهانی',  branch: 'شعبه کابل',   currency: 'USD', amount: 8750.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۰۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'حقوق کارمندان',                account: 'کارمندان',           branch: 'شعبه مرکزی',  currency: 'USD', amount: 12000.00, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۳۰', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت کمیسیون',               account: 'احمد محمدی',        branch: 'شعبه هرات',   currency: 'EUR', amount: 1200.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 6,  date: '۱۴۰۳/۰۲/۲۳ - ۱۵:۰۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'هزینه برق و آب',               account: 'هزینه‌های جاری',    branch: 'شعبه مرکزی',  currency: 'USD', amount: 320.00,   status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 7,  date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۰۰', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از مشتری VIP',          account: 'سارا کریمی',        branch: 'شعبه مزار',   currency: 'USD', amount: 5600.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 8,  date: '۱۴۰۳/۰۲/۲۳ - ۱۲:۳۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'هزینه‌های تبلیغاتی',           account: 'تبلیغات',            branch: 'شعبه مرکزی',  currency: 'USD', amount: 1500.00,  status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB' },
  { id: 9,  date: '۱۴۰۳/۰۲/۲۳ - ۱۰:۰۰', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'سود معاملات روزانه',           account: 'حساب داخلی',        branch: 'شعبه کابل',   currency: 'AFN', amount: 45000.00, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 10, date: '۱۴۰۳/۰۲/۲۲ - ۱۶:۰۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'هزینه حمل و نقل',              account: 'حمل و نقل',          branch: 'شعبه هرات',   currency: 'USD', amount: 280.00,   status: 'ناموفق',    statusColor: '#DC2626', statusBg: '#FEF2F2' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED']

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'custom'
