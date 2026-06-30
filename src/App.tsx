import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Placeholder from './components/ui/Placeholder'

// Pages — will be replaced one by one
const Dashboard     = () => <Placeholder title="داشبورد" />
const Management    = () => <Placeholder title="مدیریت" />
const Transactions  = () => <Placeholder title="ترانزکشن‌ها" />
const Reports       = () => <Placeholder title="گزارشات" />
const Exchange      = () => <Placeholder title="اسعار" />
const Settings      = () => <Placeholder title="تنظیمات" />
const Backup        = () => <Placeholder title="بک آپ" />

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Management */}
          <Route path="management" element={<Management />} />
          <Route path="management/branches"  element={<Placeholder title="مدیریت شعب" />} />
          <Route path="management/accounts"  element={<Placeholder title="مدیریت حساب‌ها" />} />
          <Route path="management/customers" element={<Placeholder title="مدیریت مشتریان" />} />
          <Route path="management/users"     element={<Placeholder title="مدیریت کاربران" />} />

          {/* Transactions */}
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/income-expense"   element={<Placeholder title="عواید و مصارف" />} />
          <Route path="transactions/cash-bank"        element={<Placeholder title="نقد و بانک" />} />
          <Route path="transactions/misc"             element={<Placeholder title="متفرقه نقد و بانک" />} />
          <Route path="transactions/account-transfer" element={<Placeholder title="انتقال حساب به حساب" />} />
          <Route path="transactions/hawala"           element={<Placeholder title="انتقال حواله" />} />

          {/* Reports */}
          <Route path="reports" element={<Reports />} />
          <Route path="reports/customers"    element={<Placeholder title="گزارشات مشتریان" />} />
          <Route path="reports/income"       element={<Placeholder title="گزارش عواید و مصارف" />} />
          <Route path="reports/accounts"     element={<Placeholder title="گزارش حساب‌ها" />} />
          <Route path="reports/orders"       element={<Placeholder title="گزارش‌های سفارشی" />} />
          <Route path="reports/transactions" element={<Placeholder title="گزارش تراکنش‌ها" />} />

          {/* Exchange */}
          <Route path="exchange" element={<Exchange />} />
          <Route path="exchange/rates"   element={<Placeholder title="لیست اسعار" />} />
          <Route path="exchange/daily"   element={<Placeholder title="نرخ‌های روزانه" />} />
          <Route path="exchange/history" element={<Placeholder title="تاریخچه تغییرات" />} />
          <Route path="exchange/manage"  element={<Placeholder title="مدیریت اسعار" />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/general"   element={<Placeholder title="تنظیمات عمومی" />} />
          <Route path="settings/users"     element={<Placeholder title="تنظیمات کاربران" />} />
          <Route path="settings/roles"     element={<Placeholder title="تنظیمات نقش‌ها" />} />
          <Route path="settings/system"    element={<Placeholder title="تنظیمات سیستم" />} />
          <Route path="settings/financial" element={<Placeholder title="تنظیمات مالی" />} />
          <Route path="settings/security"  element={<Placeholder title="تنظیمات امنیتی" />} />

          {/* Backup */}
          <Route path="backup" element={<Backup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
