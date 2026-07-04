export const transferStats = [
  { id: 'total',    label: 'کل انتقالات',          value: '45,850,200', unit: 'دلار', color: '#2563EB', bg: '#EFF6FF', icon: 'IconArrowsExchange', change: '+15.8%', positive: true  },
  { id: 'today',    label: 'انتقالات امروز',        value: '1,245,000',  unit: 'دلار', color: '#059669', bg: '#ECFDF5', icon: 'IconArrowsExchange', change: '+12.5%', positive: true  },
  { id: 'count',    label: 'تعداد انتقالات',        value: '187',        unit: 'مورد', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconList',           change: '+8.4%',  positive: true  },
  { id: 'pending',  label: 'در انتظار تأیید',       value: '12',         unit: 'مورد', color: '#D97706', bg: '#FFFBEB', icon: 'IconClock',          change: '-3.2%',  positive: false },
]

export const transfers = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰', fromAccount: 'حساب دلار نقدی',    toAccount: 'حساب بانک ملی',     fromBranch: 'شعبه مرکزی', toBranch: 'شعبه مرکزی', currency: 'USD', amount: 25000.00, desc: 'انتقال به حساب بانکی',     status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5', approver: 'احمد محمدی' },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵', fromAccount: 'حساب یورو نقدی',    toAccount: 'حساب ارزی اروپا',  fromBranch: 'شعبه کابل',  toBranch: 'شعبه هرات',  currency: 'EUR', amount: 15000.00, desc: 'انتقال بین شعبه‌ای',        status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5', approver: 'سارا کریمی' },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵', fromAccount: 'حساب افغانی نقدی',  toAccount: 'صندوق افغانی',     fromBranch: 'شعبه مرکزی', toBranch: 'شعبه مرکزی', currency: 'AFN', amount: 500000,   desc: 'انتقال به صندوق',           status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB', approver: '—' },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۰۰', fromAccount: 'حساب بانک ملی',     toAccount: 'حساب دلار نقدی',   fromBranch: 'شعبه مرکزی', toBranch: 'شعبه کابل',  currency: 'USD', amount: 10000.00, desc: 'تأمین نقدینگی شعبه',        status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5', approver: 'احمد محمدی' },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۳۰', fromAccount: 'حساب لیر ترکیه',    toAccount: 'حساب ارزی ترکیه',  fromBranch: 'شعبه مرکزی', toBranch: 'شعبه مزار',  currency: 'TRY', amount: 200000,   desc: 'انتقال ارز ترکیه',          status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5', approver: 'علی رضایی'  },
  { id: 6,  date: '۱۴۰۳/۰۲/۲۳ - ۱۲:۰۰', fromAccount: 'صندوق مرکزی',       toAccount: 'حساب یورو نقدی',   fromBranch: 'شعبه مرکزی', toBranch: 'شعبه هرات',  currency: 'EUR', amount: 8500.00,  desc: 'تأمین موجودی شعبه هرات',    status: 'رد شده',    statusColor: '#DC2626', statusBg: '#FEF2F2', approver: 'احمد محمدی' },
  { id: 7,  date: '۱۴۰۳/۰۲/۲۳ - ۱۰:۱۵', fromAccount: 'حساب درهم امارات',  toAccount: 'صندوق درهم',       fromBranch: 'شعبه کابل',  toBranch: 'شعبه کابل',  currency: 'AED', amount: 50000,    desc: 'انتقال درهم به صندوق',      status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5', approver: 'سارا کریمی' },
  { id: 8,  date: '۱۴۰۳/۰۲/۲۲ - ۱۵:۳۰', fromAccount: 'حساب دلار نقدی',    toAccount: 'حساب ذخیره',       fromBranch: 'شعبه مرکزی', toBranch: 'شعبه مرکزی', currency: 'USD', amount: 35000.00, desc: 'انتقال به حساب ذخیره',      status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB', approver: '—' },
]

export const accounts = [
  'حساب دلار نقدی', 'حساب یورو نقدی', 'حساب افغانی نقدی',
  'حساب لیر ترکیه', 'حساب درهم امارات', 'حساب بانک ملی',
  'صندوق مرکزی', 'حساب ذخیره', 'صندوق افغانی',
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED']
