export type View = 'dashboard' | 'budget' | 'investments' | 'savings' | 'ai-assistant' | 'connect-bank';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  price: number;
  changePercent: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
}

export interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

// --- Plaid Types ---
declare global {
  interface Window {
    Plaid: {
      create: (options: PlaidLinkOptions) => PlaidLinkHandler;
    };
  }
}

export interface PlaidLinkOptions {
    token: string;
    onSuccess: (public_token: string, metadata: any) => void;
    onLoad?: () => void;
    onExit?: (err: any, metadata: any) => void;
    onEvent?: (eventName: string, metadata: any) => void;
}

export interface PlaidLinkHandler {
    open: () => void;
    exit: (options?: any) => void;
    destroy: () => void;
}