export const exchangeStats = [
  { id: 'today',   label: 'حجم تبادله امروز',   value: '1,850,000', unit: 'افغانی', color: '#2563EB', bg: '#EFF6FF', icon: 'IconArrowsExchange', change: '+9.4%',  positive: true  },
  { id: 'count',   label: 'تعداد تبادلات امروز', value: '38',        unit: 'مورد',   color: '#7C3AED', bg: '#F5F3FF', icon: 'IconList',           change: '+6.1%',  positive: true  },
  { id: 'buy',     label: 'خرید از مشتری',      value: '22',        unit: 'مورد',   color: '#059669', bg: '#ECFDF5', icon: 'IconTrendingDown',   change: '+4.2%',  positive: true  },
  { id: 'sell',    label: 'فروش به مشتری',      value: '16',        unit: 'مورد',   color: '#D97706', bg: '#FFFBEB', icon: 'IconTrendingUp',     change: '-2.5%',  positive: false },
]

export const exchangeTransactions = [
  { id: 1, code: 'EX-1403-02-24-0038', date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۴۵', customer: 'محمد یوسفی',   type: 'buy',  currency: 'USD', foreignAmount: 500,   rate: 71600, rateManual: false, afnAmount: 35800000, branch: 'شعبه مرکزی کابل', teller: 'علی رضایی',   status: 'موفق' },
  { id: 2, code: 'EX-1403-02-24-0037', date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۱۰', customer: 'شرکت باختر تجارت', type: 'sell', currency: 'EUR', foreignAmount: 2000,  rate: 77600, rateManual: true,  afnAmount: 155200000, branch: 'شعبه مرکزی کابل', teller: 'سارا کریمی', status: 'موفق' },
  { id: 3, code: 'EX-1403-02-24-0036', date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', customer: 'فرید احمدی',    type: 'buy',  currency: 'AED', foreignAmount: 3000,  rate: 19500, rateManual: false, afnAmount: 58500000, branch: 'شعبه هرات',       teller: 'احمد محمدی',  status: 'موفق' },
  { id: 4, code: 'EX-1403-02-24-0035', date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۵۰', customer: 'نیلوفر رضایی',  type: 'sell', currency: 'USD', foreignAmount: 1000,  rate: 71950, rateManual: true,  afnAmount: 71950000, branch: 'شعبه کابل',       teller: 'علی رضایی',   status: 'در انتظار' },
  { id: 5, code: 'EX-1403-02-23-0034', date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۲۰', customer: 'عبدالله کریمی', type: 'buy',  currency: 'TRY', foreignAmount: 15000, rate: 2110,  rateManual: false, afnAmount: 31650000, branch: 'شعبه مزار شریف',  teller: 'سارا کریمی', status: 'موفق' },
  { id: 6, code: 'EX-1403-02-23-0033', date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۰۵', customer: 'مصطفی نوری',    type: 'sell', currency: 'GBP', foreignAmount: 800,   rate: 90600, rateManual: false, afnAmount: 72480000, branch: 'شعبه مرکزی کابل', teller: 'احمد محمدی',  status: 'رد شده' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
