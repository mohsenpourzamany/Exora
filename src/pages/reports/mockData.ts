export const reportStats = [
  { id: 'customers',  label: 'گزارشات مشتریان',     value: '3,652',      unit: 'مشتری',    color: '#2563EB', bg: '#EFF6FF', icon: 'IconUsers',          path: '/reports/customers' },
  { id: 'income',     label: 'گزارش عواید و مصارف', value: '12,650,850', unit: 'دلار عواید', color: '#059669', bg: '#ECFDF5', icon: 'IconTrendingUp',     path: '/reports/income' },
  { id: 'accounts',   label: 'گزارش حساب‌ها',        value: '1,245',      unit: 'حساب',     color: '#7C3AED', bg: '#F5F3FF', icon: 'IconWallet',         path: '/reports/accounts' },
  { id: 'orders',     label: 'گزارش‌های سفارشی',    value: '8',          unit: 'در دسترس', color: '#D97706', bg: '#FFFBEB', icon: 'IconStarFilled',     path: '/reports/orders' },
  { id: 'transactions', label: 'گزارش تراکنش‌ها',   value: '12,568',     unit: 'تراکنش',   color: '#0891B2', bg: '#ECFEFF', icon: 'IconArrowsExchange', path: '/reports/transactions' },
]

export const incomeExpenseChart = [
  { month: 'فروردین', income: 980000,  expense: 620000 },
  { month: 'اردیبهشت', income: 1150000, expense: 780000 },
  { month: 'خرداد',   income: 1050000, expense: 690000 },
  { month: 'تیر',     income: 1280000, expense: 820000 },
  { month: 'مرداد',   income: 1100000, expense: 750000 },
  { month: 'شهریور',  income: 1350000, expense: 890000 },
]

export const incomeByType = [
  { name: 'نقدی',                value: 45.2, amount: 5716200, color: '#2563EB' },
  { name: 'حواله',               value: 28.7, amount: 3631450, color: '#7C3AED' },
  { name: 'انتقال حساب به حساب', value: 15.3, amount: 1935820, color: '#059669' },
  { name: 'متفرقه',              value: 7.1,  amount: 897380,  color: '#D97706' },
  { name: 'سایر',                value: 3.7,  amount: 470000,  color: '#94A3B8' },
]

export const recentReports = [
  { id: 1,  name: 'گزارش عواید و مصارف ماهانه',       type: 'income',      typeLabel: 'عواید و مصارف', typeColor: '#059669', typeBg: '#ECFDF5', period: '۱۴۰۳/۰۱/۰۱ - ۱۴۰۳/۰۱/۳۱', created: '۱۴۰۳/۰۲/۲۴ - ۱۰:۳۰', creator: 'احمد محمدی', format: 'PDF',   status: 'تکمیل شد',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2,  name: 'گزارش تراکنش‌های مشتریان',          type: 'customers',   typeLabel: 'مشتریان',       typeColor: '#2563EB', typeBg: '#EFF6FF', period: '۱۴۰۳/۰۱/۰۱ - ۱۴۰۳/۰۲/۲۴', created: '۱۴۰۳/۰۲/۲۴ - ۰۹:۱۵', creator: 'سارا کریمی',  format: 'Excel', status: 'تکمیل شد',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3,  name: 'گزارش حساب‌های فعال',               type: 'accounts',    typeLabel: 'حساب‌ها',       typeColor: '#7C3AED', typeBg: '#F5F3FF', period: 'تا تاریخ امروز',               created: '۱۴۰۳/۰۲/۲۴ - ۱۶:۴۵', creator: 'علی رضایی',   format: 'PDF',   status: 'تکمیل شد',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4,  name: 'گزارش شعبه‌های سفارشی (شعبه کابل)', type: 'orders',      typeLabel: 'سفارشی',        typeColor: '#D97706', typeBg: '#FFFBEB', period: '۱۴۰۳/۰۱/۰۱ - ۱۴۰۳/۰۲/۲۴', created: '۱۴۰۳/۰۲/۲۳ - ۱۴:۲۰', creator: 'محمد اکبری',  format: 'Excel', status: 'در حال پردازش', statusColor: '#D97706', statusBg: '#FFFBEB' },
  { id: 5,  name: 'گزارش مشتریان VIP',                 type: 'customers',   typeLabel: 'مشتریان',       typeColor: '#2563EB', typeBg: '#EFF6FF', period: '۱۴۰۲/۰۱/۰۱ - ۱۴۰۳/۰۲/۲۴', created: '۱۴۰۳/۰۲/۲۳ - ۱۱:۱۵', creator: 'سارا کریمی',  format: 'PDF',   status: 'تکمیل شد',      statusColor: '#059669', statusBg: '#ECFDF5' },
]

export const summaryStats = {
  total: 25,
  periodic: 15,
  custom: 8,
  issued: 18,
  scheduled: 4,
}

export const reportSummary = {
  totalTransactions: 12568,
  totalIncome: 12650850,
  totalExpense: 8245300,
  totalCustomers: 3652,
  totalAccounts: 1245,
  activeBranches: 12,
}
