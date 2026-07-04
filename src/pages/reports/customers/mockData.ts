export const customerReportStats = [
  { id: 'balance',    label: 'بالانس کل مشتریان',    value: '45,850,200', unit: 'دلار',  color: '#2563EB', bg: '#EFF6FF', icon: 'IconWallet',        change: '+4.16%', positive: true  },
  { id: 'customers',  label: 'کل مشتریان',            value: '3,652',      unit: 'مشتری', color: '#059669', bg: '#ECFDF5', icon: 'IconUsers',         change: '+12.5%', positive: true  },
  { id: 'hawala',     label: 'کل حوالجات اجرا شده',  value: '1,245',      unit: 'حواله', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconSend',          change: '+8.3%',  positive: true  },
  { id: 'statements', label: 'صورت حساب مشتریان',    value: '2,845',      unit: 'صورت',  color: '#D97706', bg: '#FFFBEB', icon: 'IconFileText',      change: '+6.1%',  positive: true  },
  { id: 'cash',       label: 'کل نقدینگی مشتریان',   value: '245,850,200',unit: 'دلار',  color: '#0891B2', bg: '#ECFEFF', icon: 'IconCash',          change: '+15.8%', positive: true  },
]

export const reportTypes = [
  { id: 'cash',       label: 'نقدینگی مشتریان',              icon: 'IconCash',         color: '#2563EB', bg: '#EFF6FF' },
  { id: 'checks',     label: 'چک مشتریان',                   icon: 'IconFileText',     color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'transfers',  label: 'انتقالات مشتریان',             icon: 'IconArrowsExchange',color: '#059669', bg: '#ECFDF5' },
  { id: 'hawala',     label: 'حوالجات تا اجرا',              icon: 'IconSend',         color: '#D97706', bg: '#FFFBEB' },
  { id: 'executed',   label: 'حوالجات اجرا شده',             icon: 'IconCircleCheck',  color: '#059669', bg: '#ECFDF5' },
  { id: 'statement',  label: 'صورت حساب مشتری ثابت',        icon: 'IconFileInvoice',  color: '#0891B2', bg: '#ECFEFF' },
  { id: 'balance',    label: 'بالانس مشتریان ثابت',          icon: 'IconScale',        color: '#8B5CF6', bg: '#F5F3FF' },
  { id: 'misc',       label: 'صورت حساب مشتری منفرقه',      icon: 'IconFileText',     color: '#64748B', bg: '#F8FAFC' },
  { id: 'misc-bal',   label: 'بالانس مشتری منفرقه',         icon: 'IconWallet',       color: '#DC2626', bg: '#FEF2F2' },
]

export const customerBalanceData = [
  { range: 'بیشتر از ۱۰۰,۰۰۰ دلار', count: 485,  percent: 13.3, color: '#2563EB' },
  { range: '۵۰,۰۰۰ تا ۱۰۰,۰۰۰',    count: 762,  percent: 20.9, color: '#7C3AED' },
  { range: '۱۰,۰۰۰ تا ۵۰,۰۰۰',     count: 1245, percent: 34.1, color: '#059669' },
  { range: 'کمتر از ۱۰,۰۰۰',        count: 785,  percent: 21.5, color: '#D97706' },
  { range: 'کمتر از ۱,۰۰۰',         count: 375,  percent: 10.2, color: '#DC2626' },
]

export const cashChartData = [
  { date: '۱ اردیبهشت',  value: 220000000 },
  { date: '۵ اردیبهشت',  value: 235000000 },
  { date: '۱۰ اردیبهشت', value: 228000000 },
  { date: '۱۵ اردیبهشت', value: 242000000 },
  { date: '۲۰ اردیبهشت', value: 238000000 },
  { date: '۲۴ اردیبهشت', value: 245850200 },
]

export const customerSummary = {
  active:   2845,
  inactive: 485,
  new:      125,
  blocked:  197,
}

export const recentActivity = [
  { id: 1,  customer: 'شرکت تجارت جهانی',  activity: 'حواله اجرا شده',      code: 'TRX-1403-1256', branch: 'شعبه مرکزی کابل', amount: 12450,  currency: 'USD', user: 'احمد محمدی', status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2,  customer: 'احمد ولی زاده',      activity: 'انتقال حساب به حساب', code: 'TRX-1403-1255', branch: 'شعبه سرای شهزاده', amount: 8750,   currency: 'USD', user: 'سارا کریمی', status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3,  customer: 'شرکت ساختمانی امید', activity: 'واریز نقدی',           code: 'TRX-1403-1254', branch: 'شعبه مرکزی کابل', amount: 15600,  currency: 'EUR', user: 'علی رضایی',  status: 'موفق',    statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4,  customer: 'محمد اکبری',         activity: 'صدور چک',              code: 'TRX-1403-1253', branch: 'شعبه بل پوخته',   amount: 5200,   currency: 'USD', user: 'مریم حسینی', status: 'در انتظار',statusColor: '#D97706', statusBg: '#FFFBEB' },
  { id: 5,  customer: 'شرکت بازرگانی شرق',  activity: 'حواله تا اجرا',        code: 'TRX-1403-1252', branch: 'شعبه سرای شهزاده', amount: 32000,  currency: 'EUR', user: 'رضا احمدی',  status: 'ناموفق',  statusColor: '#DC2626', statusBg: '#FEF2F2' },
]

export const customerTypes = [
  { type: 'شرکت',    count: 1245, color: '#2563EB' },
  { type: 'حقیقی',  count: 1890, color: '#7C3AED' },
  { type: 'صرافی',  count: 320,  color: '#059669' },
  { type: 'سایر',   count: 197,  color: '#94A3B8' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED']
