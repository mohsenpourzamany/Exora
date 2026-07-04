export const incomeReportStats = [
  { id: 'income',   label: 'کل عواید',    value: '12,650,850', unit: 'دلار', color: '#059669', bg: '#ECFDF5', icon: 'IconTrendingUp',   change: '+18.3%', positive: true  },
  { id: 'expense',  label: 'کل مصارف',    value: '8,245,300',  unit: 'دلار', color: '#DC2626', bg: '#FEF2F2', icon: 'IconTrendingDown', change: '-7.6%',  positive: false },
  { id: 'profit',   label: 'سود خالص',    value: '4,405,550',  unit: 'دلار', color: '#2563EB', bg: '#EFF6FF', icon: 'IconCoin',         change: '+12.4%', positive: true  },
  { id: 'margin',   label: 'حاشیه سود',   value: '34.8%',      unit: '',     color: '#7C3AED', bg: '#F5F3FF', icon: 'IconPercentage',   change: '+2.1%',  positive: true  },
]

export const monthlyIncomeData = [
  { month: 'فروردین',   income: 9800000,  expense: 6200000,  profit: 3600000  },
  { month: 'اردیبهشت', income: 11500000, expense: 7800000,  profit: 3700000  },
  { month: 'خرداد',    income: 10500000, expense: 6900000,  profit: 3600000  },
  { month: 'تیر',      income: 12800000, expense: 8200000,  profit: 4600000  },
  { month: 'مرداد',    income: 11000000, expense: 7500000,  profit: 3500000  },
  { month: 'شهریور',   income: 13500000, expense: 8900000,  profit: 4600000  },
]

export const weeklyIncomeData = [
  { day: 'شنبه',      income: 1850000, expense: 1200000, profit: 650000  },
  { day: 'یکشنبه',   income: 2100000, expense: 1400000, profit: 700000  },
  { day: 'دوشنبه',   income: 1750000, expense: 1100000, profit: 650000  },
  { day: 'سه‌شنبه',  income: 2300000, expense: 1600000, profit: 700000  },
  { day: 'چهارشنبه', income: 1950000, expense: 1300000, profit: 650000  },
  { day: 'پنجشنبه',  income: 1400000, expense: 950000,  profit: 450000  },
  { day: 'جمعه',     income: 800000,  expense: 550000,  profit: 250000  },
]

export const incomeByType = [
  { name: 'نقدی',                value: 45.2, amount: 5716200,  color: '#2563EB' },
  { name: 'حواله',               value: 28.7, amount: 3631450,  color: '#7C3AED' },
  { name: 'انتقال حساب به حساب', value: 15.3, amount: 1935820,  color: '#059669' },
  { name: 'متفرقه',              value: 7.1,  amount: 897380,   color: '#D97706' },
  { name: 'سایر',                value: 3.7,  amount: 470000,   color: '#94A3B8' },
]

export const expenseByType = [
  { name: 'حقوق و دستمزد',  value: 38.5, amount: 3174345, color: '#DC2626' },
  { name: 'کرایه و اجاره',  value: 22.1, amount: 1822210, color: '#F97316' },
  { name: 'هزینه‌های جاری', value: 18.4, amount: 1517136, color: '#EAB308' },
  { name: 'کارمزد بانکی',   value: 12.6, amount: 1038908, color: '#8B5CF6' },
  { name: 'سایر',           value: 8.4,  amount: 692701,  color: '#94A3B8' },
]

export const branchIncomeData = [
  { branch: 'شعبه مرکزی کابل',  income: 4850000, expense: 3200000, profit: 1650000 },
  { branch: 'شعبه مزار شریف',   income: 2800000, expense: 1900000, profit: 900000  },
  { branch: 'شعبه هرات',         income: 2400000, expense: 1600000, profit: 800000  },
  { branch: 'شعبه جلال آباد',   income: 1500000, expense: 980000,  profit: 520000  },
  { branch: 'شعبه قندهار',       income: 1100000, expense: 565300,  profit: 534700  },
]

export const recentEntries = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۱۵', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از مشتری',           branch: 'شعبه مرکزی', currency: 'USD', amount: 2450.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۵۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'پرداخت کرایه دفتر',         branch: 'شعبه مرکزی', currency: 'USD', amount: 850.00,   status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از شرکت تجارت',     branch: 'شعبه کابل',  currency: 'USD', amount: 8750.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۰۰', type: 'مصرف', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'حقوق کارمندان',             branch: 'شعبه مرکزی', currency: 'USD', amount: 12000.00, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۳۰', type: 'عاید',  typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت کمیسیون',           branch: 'شعبه هرات',  currency: 'EUR', amount: 1200.00,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
