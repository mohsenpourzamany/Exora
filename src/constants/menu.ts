export interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
  children?: { id: string; label: string; path: string }[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'داشبورد',
    icon: 'IconLayoutDashboard',
    path: '/',
  },
  {
    id: 'management',
    label: 'مدیریت',
    icon: 'IconSettings2',
    path: '/management',
    children: [
      { id: 'branches',  label: 'مدیریت شعب',           path: '/management/branches' },
      { id: 'accounts',  label: 'مدیریت حساب‌ها',        path: '/management/accounts' },
      { id: 'customers', label: 'مدیریت مشتریان',        path: '/management/customers' },
      { id: 'users',     label: 'مدیریت کاربران',         path: '/management/users' },
    ],
  },
  {
    id: 'transactions',
    label: 'ترانزکشن',
    icon: 'IconArrowsExchange',
    path: '/transactions',
    children: [
      { id: 'income-expense',     label: 'عواید و مصارف',        path: '/transactions/income-expense' },
      { id: 'currency-exchange',  label: 'تبادل اسعار',           path: '/transactions/currency-exchange' },
      { id: 'cash-bank',          label: 'نقد و بانک',            path: '/transactions/cash-bank' },
      { id: 'misc',               label: 'متفرقه نقد و بانک',    path: '/transactions/misc' },
      { id: 'account-transfer',   label: 'انتقال حساب به حساب',  path: '/transactions/account-transfer' },
      { id: 'hawala',             label: 'انتقال حواله',          path: '/transactions/hawala' },
    ],
  },
  {
    id: 'reports',
    label: 'گزارشات',
    icon: 'IconChartBar',
    path: '/reports',
    children: [
      { id: 'customer-reports',     label: 'گزارشات مشتریان',      path: '/reports/customers' },
      { id: 'income-reports',       label: 'گزارش عواید و مصارف',  path: '/reports/income' },
      { id: 'account-reports',      label: 'گزارش حساب‌ها',         path: '/reports/accounts' },
      { id: 'order-reports',        label: 'گزارش‌های سفارشی',     path: '/reports/orders' },
      { id: 'transaction-reports',  label: 'گزارش تراکنش‌ها',      path: '/reports/transactions' },
    ],
  },
  {
    id: 'exchange',
    label: 'اسعار',
    icon: 'IconCurrencyDollar',
    path: '/exchange',
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    icon: 'IconAdjustments',
    path: '/settings',
    children: [
      { id: 'general',   label: 'تنظیمات عمومی',   path: '/settings/general' },
      { id: 'users-set', label: 'تنظیمات کاربران', path: '/settings/users' },
      { id: 'roles',     label: 'تنظیمات نقش‌ها',  path: '/settings/roles' },
      { id: 'system',    label: 'تنظیمات سیستم',   path: '/settings/system' },
      { id: 'financial', label: 'تنظیمات مالی',    path: '/settings/financial' },
      { id: 'security',  label: 'تنظیمات امنیتی',  path: '/settings/security' },
    ],
  },
  {
    id: 'backup',
    label: 'بک آپ',
    icon: 'IconCloudUpload',
    path: '/backup',
  },
]
