export const accountStats = [
  { id: 'total',   label: 'کل حساب‌ها',     value: '1,248', unit: 'حساب', color: '#2563EB', bg: '#EFF6FF', icon: 'IconWallet'       },
  { id: 'active',  label: 'حساب‌های فعال',  value: '1,128', unit: 'حساب', color: '#059669', bg: '#ECFDF5', icon: 'IconCircleCheck'  },
  { id: 'cash',    label: 'حساب‌های نقدی',  value: '485',   unit: 'حساب', color: '#7C3AED', bg: '#F5F3FF', icon: 'IconCash'         },
  { id: 'bank',    label: 'حساب‌های بانکی', value: '312',   unit: 'حساب', color: '#D97706', bg: '#FFFBEB', icon: 'IconBuildingBank' },
]

export const accountTypes = ['همه انواع', 'نقدی', 'بانکی', 'صندوق', 'ذخیره', 'سرمایه']
export const currencies   = ['همه ارزها', 'USD', 'EUR', 'AFN', 'TRY', 'AED', 'GBP', 'IRR']
export const branchList   = ['همه شعب', 'شعبه مرکزی کابل', 'شعبه مزار شریف', 'شعبه هرات', 'شعبه جلال آباد', 'شعبه دبی', 'شعبه استانبول']

export const accounts = [
  { id: 1,  code: 'ACC-001', name: 'حساب دلار نقدی',       type: 'نقدی',   typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'USD', balance: 245850.00,  branch: 'شعبه مرکزی کابل',  transactions: 248, status: true,  createdAt: '۱۴۰۰/۰۱/۰۱', desc: 'حساب اصلی نقد دلار شعبه مرکزی' },
  { id: 2,  code: 'ACC-002', name: 'حساب یورو نقدی',       type: 'نقدی',   typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'EUR', balance: 85450.00,   branch: 'شعبه هرات',         transactions: 124, status: true,  createdAt: '۱۴۰۰/۰۱/۰۱', desc: 'حساب نقد یورو شعبه هرات' },
  { id: 3,  code: 'ACC-003', name: 'حساب افغانی نقدی',     type: 'نقدی',   typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'AFN', balance: 3245000.00, branch: 'شعبه کابل',         transactions: 312, status: true,  createdAt: '۱۴۰۰/۰۱/۰۱', desc: 'حساب اصلی نقد افغانی' },
  { id: 4,  code: 'ACC-004', name: 'حساب لیر ترکیه',       type: 'نقدی',   typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'TRY', balance: 75950.00,   branch: 'شعبه مزار شریف',    transactions: 87,  status: true,  createdAt: '۱۴۰۰/۰۳/۱۵', desc: 'حساب نقد لیر ترکیه' },
  { id: 5,  code: 'ACC-005', name: 'حساب درهم امارات',     type: 'نقدی',   typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'AED', balance: 152600.00,  branch: 'شعبه دبی',          transactions: 156, status: true,  createdAt: '۱۴۰۰/۰۹/۰۱', desc: 'حساب نقد درهم امارات' },
  { id: 6,  code: 'ACC-006', name: 'حساب بانک ملی افغان',  type: 'بانکی',  typeColor: '#7C3AED', typeBg: '#F5F3FF', currency: 'AFN', balance: 8500000.00, branch: 'شعبه مرکزی کابل',  transactions: 89,  status: true,  createdAt: '۱۴۰۰/۰۲/۰۱', desc: 'حساب بانکی در بانک ملی افغان' },
  { id: 7,  code: 'ACC-007', name: 'حساب بانک دبی',        type: 'بانکی',  typeColor: '#7C3AED', typeBg: '#F5F3FF', currency: 'USD', balance: 1250000.00, branch: 'شعبه دبی',          transactions: 145, status: true,  createdAt: '۱۴۰۰/۰۹/۰۱', desc: 'حساب بانکی در Emirates NBD' },
  { id: 8,  code: 'ACC-008', name: 'صندوق مرکزی',          type: 'صندوق',  typeColor: '#059669', typeBg: '#ECFDF5', currency: 'USD', balance: 125000.00,  branch: 'شعبه مرکزی کابل',  transactions: 445, status: true,  createdAt: '۱۴۰۰/۰۱/۰۱', desc: 'صندوق اصلی شعبه مرکزی' },
  { id: 9,  code: 'ACC-009', name: 'صندوق شعبه هرات',      type: 'صندوق',  typeColor: '#059669', typeBg: '#ECFDF5', currency: 'AFN', balance: 850000.00,  branch: 'شعبه هرات',         transactions: 198, status: true,  createdAt: '۱۴۰۰/۰۶/۰۱', desc: 'صندوق اصلی شعبه هرات' },
  { id: 10, code: 'ACC-010', name: 'حساب ذخیره ارزی',      type: 'ذخیره',  typeColor: '#D97706', typeBg: '#FFFBEB', currency: 'USD', balance: 350000.00,  branch: 'شعبه مرکزی کابل',  transactions: 12,  status: true,  createdAt: '۱۴۰۱/۰۱/۰۱', desc: 'حساب ذخیره برای نوسانات ارزی' },
  { id: 11, code: 'ACC-011', name: 'حساب سرمایه اصلی',     type: 'سرمایه', typeColor: '#0891B2', typeBg: '#ECFEFF', currency: 'USD', balance: 2500000.00, branch: 'شعبه مرکزی کابل',  transactions: 8,   status: true,  createdAt: '۱۴۰۰/۰۱/۰۱', desc: 'حساب سرمایه اصلی شرکت' },
  { id: 12, code: 'ACC-012', name: 'حساب درهم لاهور',      type: 'نقدی',   typeColor: '#2563EB', typeBg: '#EFF6FF', currency: 'AED', balance: 45000.00,   branch: 'شعبه لاهور',        transactions: 65,  status: false, createdAt: '۱۴۰۲/۰۱/۰۱', desc: 'حساب نقد درهم شعبه لاهور' },
]
