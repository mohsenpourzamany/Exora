export const transactionStats = [
  { id: 'income',       label: 'کل عواید',              value: '12,650,850', unit: 'دلار',     change: '+18.3%', positive: true,  color: '#059669', bg: '#ECFDF5', icon: 'IconTrendingUp' },
  { id: 'expense',      label: 'کل مصارف',              value: '8,245,300',  unit: 'دلار',     change: '-7.6%',  positive: false, color: '#DC2626', bg: '#FEF2F2', icon: 'IconTrendingDown' },
  { id: 'count',        label: 'تعداد تراکنش‌ها',       value: '1,245',      unit: 'تراکنش',  change: '+12.5%', positive: true,  color: '#2563EB', bg: '#EFF6FF', icon: 'IconArrowsExchange' },
  { id: 'cash',         label: 'موجودی نقد و بانک',     value: '45,850,200', unit: 'دلار',     change: '+15.8%', positive: true,  color: '#7C3AED', bg: '#F5F3FF', icon: 'IconWallet' },
  { id: 'misc',         label: 'متفرقه نقد و بانک',     value: '3,650,750',  unit: 'دلار',     change: '+9.2%',  positive: true,  color: '#D97706', bg: '#FFFBEB', icon: 'IconCoins' },
]

export const quickActions = [
  { label: 'ثبت عاید جدید',    color: '#059669', bg: '#ECFDF5', icon: 'IconArrowUpCircle' },
  { label: 'ثبت مصرف جدید',   color: '#DC2626', bg: '#FEF2F2', icon: 'IconArrowDownCircle' },
  { label: 'واریز به بانک',    color: '#2563EB', bg: '#EFF6FF', icon: 'IconBuildingBank' },
  { label: 'برداشت از بانک',   color: '#7C3AED', bg: '#F5F3FF', icon: 'IconBuildingBank' },
  { label: 'انتقال حساب',      color: '#0891B2', bg: '#ECFEFF', icon: 'IconArrowsExchange' },
  { label: 'ارسال حواله جدید', color: '#D97706', bg: '#FFFBEB', icon: 'IconSend' },
  { label: 'ثبت متفرقه',       color: '#64748B', bg: '#F8FAFC', icon: 'IconPlus' },
]

export const transactionTypes = [
  { id: 'income-expense', label: 'عواید و مصارف',       percent: 45, count: 560, color: '#2563EB' },
  { id: 'cash-bank',      label: 'نقد و بانک',           percent: 20, count: 249, color: '#7C3AED' },
  { id: 'misc',           label: 'متفرقه نقد و بانک',   percent: 10, count: 125, color: '#D97706' },
  { id: 'transfer',       label: 'انتقال حساب به حساب', percent: 15, count: 187, color: '#0891B2' },
  { id: 'hawala',         label: 'انتقال حواله',          percent: 10, count: 124, color: '#059669' },
]

export const recentTransactions = [
  { id: 1,  date: '۱۴۰۳/۰۴/۲۴ - ۱۱:۱۵', type: 'عاید',             typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از مشتری',            account: 'علی رضایی',         method: 'نقد',         amount: 2450.00,  currency: 'USD', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 2,  date: '۱۴۰۳/۰۴/۲۴ - ۱۰:۵۰', type: 'مصارف',            typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'پرداخت کرایه دفتر',           account: 'کرایه دفتر',        method: 'حواله بانکی', amount: 850.00,   currency: 'USD', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 3,  date: '۱۴۰۳/۰۴/۲۴ - ۱۰:۳۰', type: 'نقد و بانک',      typeBg: '#EFF6FF', typeColor: '#2563EB', desc: 'واریز به حساب بانکی داخلی',   account: 'حساب بانک ملی',     method: 'انتقال داخلی',amount: 5000.00,  currency: 'USD', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 4,  date: '۱۴۰۳/۰۴/۲۴ - ۱۰:۱۰', type: 'انتقال حساب',     typeBg: '#ECFEFF', typeColor: '#0891B2', desc: 'انتقال بین حساب‌ها',          account: 'حساب‌ها',           method: 'داخلی',       amount: 1200.00,  currency: 'USD', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 5,  date: '۱۴۰۳/۰۴/۲۴ - ۰۹:۴۵', type: 'انتقال حواله',    typeBg: '#FFFBEB', typeColor: '#D97706', desc: 'ارسال حواله به دبی',           account: 'صرافی دبی',         method: 'حواله خارجی', amount: 3500.00,  currency: 'USD', status: 'در انتظار', statusColor: '#D97706', statusBg: '#FFFBEB' },
  { id: 6,  date: '۱۴۰۳/۰۴/۲۴ - ۰۹:۲۰', type: 'عاید',             typeBg: '#ECFDF5', typeColor: '#059669', desc: 'دریافت از شرکت تجارت جهانی',  account: 'شرکت تجارت جهانی', method: 'نقد',         amount: 8750.00,  currency: 'USD', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 7,  date: '۱۴۰۳/۰۴/۲۴ - ۰۹:۰۰', type: 'مصارف',            typeBg: '#FEF2F2', typeColor: '#DC2626', desc: 'حقوق کارمندان',               account: 'کارمندان',          method: 'حواله بانکی', amount: 12000.00, currency: 'USD', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 8,  date: '۱۴۰۳/۰۴/۲۳ - ۱۶:۳۰', type: 'نقد و بانک',      typeBg: '#EFF6FF', typeColor: '#2563EB', desc: 'برداشت از بانک',              account: 'حساب بانکی',        method: 'برداشت',      amount: 2000.00,  currency: 'EUR', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 9,  date: '۱۴۰۳/۰۴/۲۳ - ۱۵:۴۵', type: 'انتقال حواله',    typeBg: '#FFFBEB', typeColor: '#D97706', desc: 'دریافت حواله از استانبول',    account: 'صرافی استانبول',    method: 'حواله',       amount: 6500.00,  currency: 'TRY', status: 'موفق',      statusColor: '#059669', statusBg: '#ECFDF5' },
  { id: 10, date: '۱۴۰۳/۰۴/۲۳ - ۱۴:۰۰', type: 'متفرقه',           typeBg: '#F8FAFC', typeColor: '#64748B', desc: 'هزینه‌های اداری',             account: 'متفرقه',            method: 'نقد',         amount: 350.00,   currency: 'USD', status: 'ناموفق',    statusColor: '#DC2626', statusBg: '#FEF2F2' },
]

export const accessLinks = [
  { id: 'income-expense', label: 'عواید و مصارف',       path: '/transactions/income-expense', icon: 'IconTrendingUp',     color: '#2563EB', bg: '#EFF6FF', desc: 'ثبت عواید و مصارف روزانه' },
  { id: 'cash-bank',      label: 'نقد و بانک',           path: '/transactions/cash-bank',      icon: 'IconBuildingBank',   color: '#7C3AED', bg: '#F5F3FF', desc: 'مدیریت تراکنش‌های نقدی و بانکی' },
  { id: 'misc',           label: 'متفرقه نقد و بانک',   path: '/transactions/misc',           icon: 'IconCoins',          color: '#D97706', bg: '#FFFBEB', desc: 'سایر تراکنش‌های نقد و بانکی' },
  { id: 'transfer',       label: 'انتقال حساب به حساب', path: '/transactions/account-transfer',icon: 'IconArrowsExchange', color: '#0891B2', bg: '#ECFEFF', desc: 'انتقال بین حساب‌های داخلی' },
  { id: 'hawala',         label: 'انتقال حواله',          path: '/transactions/hawala',         icon: 'IconSend',           color: '#059669', bg: '#ECFDF5', desc: 'ارسال و دریافت حواله داخل و خارج' },
]
