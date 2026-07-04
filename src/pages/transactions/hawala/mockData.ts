export const hawalaStats = [
  { id: 'total',    label: 'کل حوالات',          value: '3,650,750', unit: 'دلار', color: '#2563EB', bg: '#EFF6FF', icon: 'IconSend',    change: '+9.2%',  positive: true  },
  { id: 'sent',     label: 'حوالات ارسالی',       value: '124',       unit: 'مورد', color: '#059669', bg: '#ECFDF5', icon: 'IconSend',    change: '+14.5%', positive: true  },
  { id: 'received', label: 'حوالات دریافتی',      value: '98',        unit: 'مورد', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconDownload',change: '+11.2%', positive: true  },
  { id: 'pending',  label: 'در انتظار پرداخت',    value: '18',        unit: 'مورد', color: '#D97706', bg: '#FFFBEB', icon: 'IconClock',   change: '-2.8%',  positive: false },
]

export type HawalaType = 'all' | 'sent' | 'received'

export const hawalaList = [
  { id: 1,  date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۱۵', type: 'ارسال',   typeBg: '#EFF6FF', typeColor: '#2563EB', sender: 'احمد محمدی',       receiver: 'محمد علی',        fromCity: 'کابل',      toCity: 'دبی',       currency: 'USD', amount: 12450.00, fee: 45.00,  status: 'موفق',           statusColor: '#059669', statusBg: '#ECFDF5', trackingCode: 'HW-1403-001' },
  { id: 2,  date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', type: 'دریافت',  typeBg: '#F5F3FF', typeColor: '#7C3AED', sender: 'علی احمدی',        receiver: 'سارا کریمی',     fromCity: 'استانبول',  toCity: 'کابل',      currency: 'USD', amount: 8750.00,  fee: 35.00,  status: 'موفق',           statusColor: '#059669', statusBg: '#ECFDF5', trackingCode: 'HW-1403-002' },
  { id: 3,  date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۴۵', type: 'ارسال',   typeBg: '#EFF6FF', typeColor: '#2563EB', sender: 'شرکت تجارت جهانی', receiver: 'صرافی دبی',      fromCity: 'کابل',      toCity: 'دبی',       currency: 'USD', amount: 35000.00, fee: 120.00, status: 'در انتظار پرداخت', statusColor: '#D97706', statusBg: '#FFFBEB', trackingCode: 'HW-1403-003' },
  { id: 4,  date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۳۰', type: 'دریافت',  typeBg: '#F5F3FF', typeColor: '#7C3AED', sender: 'رضا احمدی',        receiver: 'مریم حسینی',     fromCity: 'تهران',     toCity: 'هرات',      currency: 'IRR', amount: 500000000, fee: 0,    status: 'موفق',           statusColor: '#059669', statusBg: '#ECFDF5', trackingCode: 'HW-1403-004' },
  { id: 5,  date: '۱۴۰۳/۰۲/۲۳ - ۱۵:۰۰', type: 'ارسال',   typeBg: '#EFF6FF', typeColor: '#2563EB', sender: 'احمد محمدی',       receiver: 'خالد عمر',       fromCity: 'مزار شریف', toCity: 'پاکستان',   currency: 'USD', amount: 5600.00,  fee: 25.00,  status: 'موفق',           statusColor: '#059669', statusBg: '#ECFDF5', trackingCode: 'HW-1403-005' },
  { id: 6,  date: '۱۴۰۳/۰۲/۲۳ - ۱۳:۱۵', type: 'ارسال',   typeBg: '#EFF6FF', typeColor: '#2563EB', sender: 'فریده محمدی',      receiver: 'صرافی لندن',     fromCity: 'کابل',      toCity: 'لندن',      currency: 'GBP', amount: 4200.00,  fee: 30.00,  status: 'رد شده',         statusColor: '#DC2626', statusBg: '#FEF2F2', trackingCode: 'HW-1403-006' },
  { id: 7,  date: '۱۴۰۳/۰۲/۲۳ - ۱۱:۰۰', type: 'دریافت',  typeBg: '#F5F3FF', typeColor: '#7C3AED', sender: 'یوسف کریمی',       receiver: 'حسین احمدی',     fromCity: 'دبی',       toCity: 'جلال‌آباد', currency: 'AED', amount: 18500.00, fee: 0,     status: 'موفق',           statusColor: '#059669', statusBg: '#ECFDF5', trackingCode: 'HW-1403-007' },
  { id: 8,  date: '۱۴۰۳/۰۲/۲۲ - ۱۶:۰۰', type: 'ارسال',   typeBg: '#EFF6FF', typeColor: '#2563EB', sender: 'ناصر احمد',        receiver: 'صرافی استانبول', fromCity: 'هرات',      toCity: 'استانبول',  currency: 'TRY', amount: 75000.00, fee: 150.00, status: 'در انتظار پرداخت', statusColor: '#D97706', statusBg: '#FFFBEB', trackingCode: 'HW-1403-008' },
]

export const branches = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد']
export const currencies = ['همه ارزها', 'USD', 'EUR', 'AFN', 'IRR', 'TRY', 'AED', 'GBP']
