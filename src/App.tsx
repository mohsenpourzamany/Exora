import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Placeholder from "./components/ui/Placeholder";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import IncomeExpense from "./pages/transactions/income-expense";
import CashBank from "./pages/transactions/cash-bank";
import Reports from "./pages/reports";
import Management from "./pages/management";
import Exchange from "./pages/exchange";
import Settings from "./pages/settings";
import Backup from "./pages/backup";
import AccountTransfer from "./pages/transactions/account-transfer";
import Hawala from "./pages/transactions/hawala";
import CustomerReports from "./pages/reports/customers";
import IncomeReport from "./pages/reports/income";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="management" element={<Management />} />
          <Route path="management/branches" element={<Placeholder title="مدیریت شعب" />} />
          <Route path="management/accounts" element={<Placeholder title="مدیریت حساب‌ها" />} />
          <Route path="management/customers" element={<Placeholder title="مدیریت مشتریان" />} />
          <Route path="management/users" element={<Placeholder title="مدیریت کاربران" />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/income-expense" element={<IncomeExpense />} />
          <Route path="transactions/cash-bank" element={<CashBank key="cash" />} />
          <Route path="transactions/misc" element={<CashBank key="misc" />} />
          <Route path="transactions/account-transfer" element={<AccountTransfer />} />
          <Route path="transactions/hawala" element={<Hawala />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/customers" element={<CustomerReports />} />
          <Route path="reports/income" element={<IncomeReport />} />
          <Route path="reports/accounts" element={<Placeholder title="گزارش حساب‌ها" />} />
          <Route path="reports/orders" element={<Placeholder title="گزارش‌های سفارشی" />} />
          <Route path="reports/transactions" element={<Placeholder title="گزارش تراکنش‌ها" />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="exchange/rates" element={<Placeholder title="لیست اسعار" />} />
          <Route path="exchange/daily" element={<Placeholder title="نرخ‌های روزانه" />} />
          <Route path="exchange/history" element={<Placeholder title="تاریخچه تغییرات" />} />
          <Route path="exchange/manage" element={<Placeholder title="مدیریت اسعار" />} />
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
