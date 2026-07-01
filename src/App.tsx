import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Placeholder from "./components/ui/Placeholder";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Reports from "./pages/reports";
import Management from "./pages/management";
import Exchange from "./pages/exchange";
import Settings from "./pages/settings";

const Backup = () => <Placeholder title="بک آپ" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="management" element={<Management />} />
          <Route
            path="management/branches"
            element={<Placeholder title="مدیریت شعب" />}
          />
          <Route
            path="management/accounts"
            element={<Placeholder title="مدیریت حساب‌ها" />}
          />
          <Route
            path="management/customers"
            element={<Placeholder title="مدیریت مشتریان" />}
          />
          <Route
            path="management/users"
            element={<Placeholder title="مدیریت کاربران" />}
          />
          <Route path="transactions" element={<Transactions />} />
          <Route
            path="transactions/income-expense"
            element={<Placeholder title="عواید و مصارف" />}
          />
          <Route
            path="transactions/cash-bank"
            element={<Placeholder title="نقد و بانک" />}
          />
          <Route
            path="transactions/misc"
            element={<Placeholder title="متفرقه نقد و بانک" />}
          />
          <Route
            path="transactions/account-transfer"
            element={<Placeholder title="انتقال حساب به حساب" />}
          />
          <Route
            path="transactions/hawala"
            element={<Placeholder title="انتقال حواله" />}
          />
          <Route path="reports" element={<Reports />} />
          <Route
            path="reports/customers"
            element={<Placeholder title="گزارشات مشتریان" />}
          />
          <Route
            path="reports/income"
            element={<Placeholder title="گزارش عواید و مصارف" />}
          />
          <Route
            path="reports/accounts"
            element={<Placeholder title="گزارش حساب‌ها" />}
          />
          <Route
            path="reports/orders"
            element={<Placeholder title="گزارش‌های سفارشی" />}
          />
          <Route
            path="reports/transactions"
            element={<Placeholder title="گزارش تراکنش‌ها" />}
          />
          <Route path="exchange" element={<Exchange />} />
          <Route
            path="exchange/rates"
            element={<Placeholder title="لیست اسعار" />}
          />
          <Route
            path="exchange/daily"
            element={<Placeholder title="نرخ‌های روزانه" />}
          />
          <Route
            path="exchange/history"
            element={<Placeholder title="تاریخچه تغییرات" />}
          />
          <Route
            path="exchange/manage"
            element={<Placeholder title="مدیریت اسعار" />}
          />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/general" element={<Settings />} />
          <Route path="settings/users" element={<Settings />} />
          <Route path="settings/roles" element={<Settings />} />
          <Route path="settings/system" element={<Settings />} />
          <Route path="settings/financial" element={<Settings />} />
          <Route path="settings/security" element={<Settings />} />
          <Route path="backup" element={<Backup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
