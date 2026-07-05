export const currencies = [
  { id: 1, code: 'USD', name: 'دلار آمریکا',  flag: '🇺🇸', buy: 71600, sell: 71900, change: +0.32, positive: true,  sparkline: [70800, 71000, 71200, 70900, 71300, 71500, 71600], status: true  },
  { id: 2, code: 'EUR', name: 'یورو',          flag: '🇪🇺', buy: 77100, sell: 77450, change: +0.28, positive: true,  sparkline: [76500, 76700, 76900, 76600, 77000, 77200, 77100], status: true  },
  { id: 3, code: 'AED', name: 'درهم امارات',  flag: '🇦🇪', buy: 19500, sell: 19650, change: +0.31, positive: true,  sparkline: [19300, 19400, 19500, 19350, 19480, 19520, 19500], status: true  },
  { id: 4, code: 'TRY', name: 'لیر ترکیه',   flag: '🇹🇷', buy: 2110,  sell: 2130,  change: -0.18, positive: false, sparkline: [2150, 2140, 2130, 2145, 2125, 2115, 2110],         status: true  },
  { id: 5, code: 'GBP', name: 'یوند انگلیس', flag: '🇬🇧', buy: 90200, sell: 90600, change: +0.45, positive: true,  sparkline: [89600, 89800, 90000, 89700, 90100, 90300, 90200], status: true  },
  { id: 6, code: 'SAR', name: 'ریال سعودی',  flag: '🇸🇦', buy: 18890, sell: 18990, change: +0.16, positive: true,  sparkline: [18700, 18800, 18850, 18820, 18870, 18900, 18890], status: true  },
  { id: 7, code: 'INR', name: 'روپیه هند',   flag: '🇮🇳', buy: 850,   sell: 860,   change: -0.12, positive: false, sparkline: [862, 858, 855, 860, 852, 851, 850],               status: true  },
  { id: 8, code: 'CNY', name: 'یوان چین',    flag: '🇨🇳', buy: 9750,  sell: 9850,  change: +0.22, positive: true,  sparkline: [9700, 9720, 9740, 9710, 9760, 9760, 9750],        status: false },
]

export const chartData7Day = [
  { date: '۱۸ اردیبهشت', USD: 71200, EUR: 76800, AED: 19300, TRY: 2150 },
  { date: '۱۹ اردیبهشت', USD: 71350, EUR: 76950, AED: 19380, TRY: 2140 },
  { date: '۲۰ اردیبهشت', USD: 71100, EUR: 76700, AED: 19320, TRY: 2145 },
  { date: '۲۱ اردیبهشت', USD: 71400, EUR: 77050, AED: 19420, TRY: 2135 },
  { date: '۲۲ اردیبهشت', USD: 71250, EUR: 76900, AED: 19350, TRY: 2148 },
  { date: '۲۳ اردیبهشت', USD: 71500, EUR: 77200, AED: 19480, TRY: 2120 },
  { date: '۲۴ اردیبهشت', USD: 71600, EUR: 77100, AED: 19500, TRY: 2110 },
]

export const topGainers = [
  { code: 'GBP', flag: '🇬🇧', change: '+0.45%' },
  { code: 'USD', flag: '🇺🇸', change: '+0.32%' },
]

export const topLosers = [
  { code: 'TRY', flag: '🇹🇷', change: '-0.18%' },
  { code: 'INR', flag: '🇮🇳', change: '-0.12%' },
]

export const currencyStats = {
  total: 24,
  active: 4,
  inactive: 0,
}

export const dailyRateSnapshots = [
  { code: 'USD', flag: '🇺🇸', morning: 71450, noon: 71550, current: 71600, setBy: 'احمد محمدی' },
  { code: 'EUR', flag: '🇪🇺', morning: 76900, noon: 77000, current: 77100, setBy: 'احمد محمدی' },
  { code: 'AED', flag: '🇦🇪', morning: 19420, noon: 19460, current: 19500, setBy: 'سارا کریمی' },
  { code: 'TRY', flag: '🇹🇷', morning: 2125,  noon: 2118,  current: 2110,  setBy: 'احمد محمدی' },
  { code: 'GBP', flag: '🇬🇧', morning: 90050, noon: 90150, current: 90200, setBy: 'احمد محمدی' },
  { code: 'SAR', flag: '🇸🇦', morning: 18860, noon: 18875, current: 18890, setBy: 'سارا کریمی' },
  { code: 'INR', flag: '🇮🇳', morning: 855,   noon: 852,   current: 850,   setBy: 'احمد محمدی' },
  { code: 'CNY', flag: '🇨🇳', morning: 9730,  noon: 9740,  current: 9750,  setBy: 'احمد محمدی' },
]

export const rateHistory = [
  { id: 1, date: '۱۴۰۳/۰۲/۲۴ - ۱۱:۳۰', currency: 'USD', oldRate: 71500, newRate: 71600, changePercent: '+0.14%', positive: true,  changedBy: 'احمد محمدی' },
  { id: 2, date: '۱۴۰۳/۰۲/۲۴ - ۱۰:۱۵', currency: 'TRY', oldRate: 2118,  newRate: 2110,  changePercent: '-0.38%', positive: false, changedBy: 'احمد محمدی' },
  { id: 3, date: '۱۴۰۳/۰۲/۲۴ - ۰۹:۰۰', currency: 'AED', oldRate: 19460, newRate: 19500, changePercent: '+0.21%', positive: true,  changedBy: 'سارا کریمی' },
  { id: 4, date: '۱۴۰۳/۰۲/۲۳ - ۱۶:۴۵', currency: 'EUR', oldRate: 77000, newRate: 77100, changePercent: '+0.13%', positive: true,  changedBy: 'احمد محمدی' },
  { id: 5, date: '۱۴۰۳/۰۲/۲۳ - ۱۴:۲۰', currency: 'GBP', oldRate: 90000, newRate: 90200, changePercent: '+0.22%', positive: true,  changedBy: 'احمد محمدی' },
  { id: 6, date: '۱۴۰۳/۰۲/۲۳ - ۱۱:۱۰', currency: 'INR', oldRate: 858,   newRate: 850,   changePercent: '-0.93%', positive: false, changedBy: 'سارا کریمی' },
]
