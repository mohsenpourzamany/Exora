import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "admin" | "branch_manager" | "teller";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  branch: string;
  avatar: string;
}

// Role permissions
export const PERMISSIONS = {
  // Financial sensitive data
  viewTotalIncome: ["admin"],
  viewTotalExpense: ["admin"],
  viewNetProfit: ["admin"],
  viewAllBranches: ["admin", "branch_manager"],
  viewSensitiveStats: ["admin"],

  // Transactions
  viewAllTransactions: ["admin", "branch_manager"],
  viewBranchTransactions: ["admin", "branch_manager", "teller"],
  createTransaction: ["admin", "branch_manager", "teller"],
  deleteTransaction: ["admin"],
  editTransaction: ["admin", "branch_manager"],

  // Management
  viewManagement: ["admin"],
  viewReports: ["admin", "branch_manager"],
  viewSettings: ["admin"],
  viewBackup: ["admin"],
} as const;

export type Permission = keyof typeof PERMISSIONS;

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  hasPermission: (permission: Permission) => boolean;
  canSee: (permission: Permission) => boolean;
}

const MOCK_USERS: Record<UserRole, User> = {
  admin: {
    id: 1,
    name: "احمد محمدی",
    email: "ahmad.m@exora.com",
    role: "admin",
    roleLabel: "مدیر سیستم",
    branch: "همه شعب",
    avatar: "ا",
  },
  branch_manager: {
    id: 2,
    name: "سارا کریمی",
    email: "sara.k@exora.com",
    role: "branch_manager",
    roleLabel: "مدیر شعبه",
    branch: "شعبه مرکزی کابل",
    avatar: "س",
  },
  teller: {
    id: 3,
    name: "علی رضایی",
    email: "ali.r@exora.com",
    role: "teller",
    roleLabel: "صندوقدار",
    branch: "شعبه مرکزی کابل",
    avatar: "ع",
  },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(MOCK_USERS.admin);

  const hasPermission = (permission: Permission): boolean => {
    return (PERMISSIONS[permission] as readonly string[]).includes(user.role);
  };

  const canSee = hasPermission;

  return (
    <AuthContext.Provider value={{ user, setUser, hasPermission, canSee }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useMockUsers() {
  return MOCK_USERS;
}
