export type TabType = 'cash' | 'bank' | 'misc'

export const tabLabels: Record<TabType, string> = {
  cash: 'نقد',
  bank: 'بانک',
  misc: 'متفرقه',
}

export const cashBankStats = {
  cash: [
    { id: 'cash-total', label: 'موجودی نقد کل',        value: '245,850', unit: 'دلار', color: '#2563EB', bg: '#EFF6FF', icon: 'IconCash',          change: '+8.3%',  positive: true  },
    { id: 'cash-in',    label: 'دریافت نقد امروز',      value: '12,450',  unit: 'دلار', color: '#059669', bg: '#ECFDF5', icon: 'IconArrowDownLeft', change: '+15.2%', positive: true  },
    { id: 'cash-out',   label: 'پرداخت نقد امروز',      value: '8,200',   unit: 'دلار', color: '#DC2626', bg: '#FEF2F2', icon: 'IconArrowUpRight',  change: '-5.1%',  positive: false },
    { id: 'cash-count', label: 'تعداد تراکنش‌های نقد',  value: '48',      unit: 'مورد', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconList',          change: '+12.0%', positive: true  },
  ],
  bank: [
    { id: 'bank-total', label: 'موجودی بانک کل',        value: '1,245,200', unit: 'دلار', color: '#2563EB', bg: '#EFF6FF', icon: 'IconBuildingBank', change: '+4.6%',  positive: true  },
    { id: 'bank-in',    label: 'واریز بانکی امروز',     value: '85,400',    unit: 'دلار', color: '#059669', bg: '#ECFDF5', icon: 'IconArrowDownLeft', change: '+9.8%',  positive: true  },
    { id: 'bank-out',   label: 'برداشت بانکی امروز',    value: '42,100',    unit: 'دلار', color: '#DC2626', bg: '#FEF2F2', icon: 'IconArrowUpRight',  change: '-3.2%',  positive: false },
    { id: 'bank-count', label: 'تعداد تراکنش‌های بانک', value: '124',       unit: 'مورد', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconList',          change: '+7.5%',  positive: true  },
  ],
  misc: [
    { id: 'misc-total', label: 'موجودی متفرقه',          value: '35,600', unit: 'دلار', color: '#D97706', bg: '#FFFBEB', icon: 'IconCoins',         change: '+2.1%', positive: true  },
    { id: 'misc-in',    label: 'دریافت متفرقه امروز',    value: '4,200',  unit: 'دلار', color: '#059669', bg: '#ECFDF5', icon: 'IconArrowDownLeft', change: '+6.4%', positive: true  },
    { id: 'misc-out',   label: 'پرداخت متفرقه امروز',    value: '1,800',  unit: 'دلار', color: '#DC2626', bg: '#FEF2F2', icon: 'IconArrowUpRight',  change: '-1.8%', positive: false },
    { id: 'misc-count', label: 'تعداد تراکنش‌های متفرقه',value: '15',     unit: 'مورد', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconList',          change: '+3.0%', positive: true  },
  ],
}

export const cashTransactions = [
  { id: 1, date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۱۵', type: 'دریافت نقد', typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از مشتری',           account: 'علی رضایی',      branch: 'شعبه مرکزی', currency: 'USD', amount: 2450.00,  positive: true,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2, date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', type: 'پرداخت نقد', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'پرداخت کرایه دفتر',         account: 'کرایه دفتر',     branch: 'شعبه مرکزی', currency: 'USD', amount: 850.00,   positive: false, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3, date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵', type: 'دریافت نقد', typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از شرکت تجارت جهانی', account: 'شرکت تجارت',   branch: 'شعبه کابل',  currency: 'USD', amount: 8750.00,  positive: true,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4, date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۰۰', type: 'پرداخت نقد', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'حقوق کارمندان',             account: 'کارمندان',       branch: 'شعبه مرکزی', currency: 'USD', amount: 5000.00,  positive: false, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 5, date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۳۰', type: 'دریافت نقد', typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت کمیسیون',            account: 'احمد محمدی',     branch: 'شعبه هرات',  currency: 'EUR', amount: 1200.00,  positive: true,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 6, date: '۱۴۰۳/۰۲/۲۳ - ۱۲:۰۰', type: 'پرداخت نقد', typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'هزینه برق',                 account: 'هزینه‌های جاری', branch: 'شعبه مرکزی', currency: 'USD', amount: 320.00,   positive: false, status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB' },
]

export const bankTransactions = [
  { id: 1, date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰', type: 'واریز بانکی',  typeBg: '#EFF6FF', typeColor: '#2563EB', desc: 'واریز به حساب بانکی داخلی', account: 'حساب بانک ملی',   branch: 'شعبه مرکزی', currency: 'USD', amount: 25000.00, positive: true,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2, date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵', type: 'برداشت بانکی', typeBg: '#F5F3FF', typeColor: '#7C3AED', desc: 'برداشت از بانک',            account: 'حساب بانکی',      branch: 'شعبه مرکزی', currency: 'USD', amount: 10000.00, positive: false, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3, date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۳۰', type: 'واریز بانکی',  typeBg: '#EFF6FF', typeColor: '#2563EB', desc: 'دریافت حواله بانکی',        account: 'صرافی استانبول',  branch: 'شعبه کابل',  currency: 'EUR', amount: 15000.00, positive: true,  status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4, date: '۱۴۰۳/۰۲/۲۳ - ۱۵:۴۵', type: 'برداشت بانکی', typeBg: '#F5F3FF', typeColor: '#7C3AED', desc: 'پرداخت حقوق از بانک',       account: 'کارمندان',         branch: 'شعبه مرکزی', currency: 'USD', amount: 8500.00,  positive: false, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 5, date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۰۰', type: 'واریز بانکی',  typeBg: '#EFF6FF', typeColor: '#2563EB', desc: 'واریز از حساب مرکزی',       account: 'حساب مرکزی',      branch: 'شعبه هرات',  currency: 'AFN', amount: 500000,   positive: true,  status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB' },
  { id: 6, date: '۱۴۰۳/۰۲/۲۳ - ۱۱:۳۰', type: 'برداشت بانکی', typeBg: '#F5F3FF', typeColor: '#7C3AED', desc: 'پرداخت قبض‌های جاری',       account: 'هزینه‌های جاری',  branch: 'شعبه مزار',  currency: 'AFN', amount: 75000,    positive: false, status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
]

export const miscTransactions = [
  { id: 1, date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۴۵', type: 'متفرقه نقد',  typeBg: '#FFFBEB', typeColor: '#D97706', desc: 'هزینه‌های اداری', account: 'متفرقه',          branch: 'شعبه مرکزی', currency: 'USD', amount: 350.00,  positive: false, status: 'موفق', statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2, date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۱۵', type: 'متفرقه بانک', typeBg: '#ECFEFF', typeColor: '#0891B2', desc: 'کارمزد بانکی',    account: 'هزینه بانک',      branch: 'شعبه مرکزی', currency: 'USD', amount: 45.00,   positive: false, status: 'موفق', statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3, date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۳۰', type: 'متفرقه نقد',  typeBg: '#FFFBEB', typeColor: '#D97706', desc: 'هزینه پذیرایی',  account: 'متفرقه',           branch: 'شعبه کابل',  currency: 'AFN', amount: 5000,    positive: false, status: 'موفق', statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4, date: '۱۴۰۳/۰۲/۲۳ - ۱۳:۰۰', type: 'متفرقه بانک', typeBg: '#ECFEFF', typeColor: '#0891B2', desc: 'سود سپرده',      account: 'حساب پس‌انداز',   branch: 'شعبه مرکزی', currency: 'USD', amount: 1250.00, positive: true,  status: 'موفق', statusColor: '#059669', statusBg: '#ECFDF5' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED']

export const dailyData = Array.from({ length: 14 }, (_, i) => ({
  date: `${i + 1} اردیبهشت`,
  rawDate: new Date(2024, 3, i + 1),
  cashIn:  Math.floor(Math.random() * 8000) + 4000,
  cashOut: Math.floor(Math.random() * 5000) + 2000,
  bankIn:  Math.floor(Math.random() * 50000) + 20000,
  bankOut: Math.floor(Math.random() * 30000) + 10000,
}))
