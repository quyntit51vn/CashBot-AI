import { create } from 'zustand';
import { Message } from '../types/Message';
import { ActionTime } from '@/types/ActionTime';

interface StoreState {
  transactions: Message[];
  categories: ActionTime<string>[];
  amounts: ActionTime<number>[];
  input: string;
  type: 'income' | 'expense' | null;
  category: string;
  amount: number | null;
  error: string | null;
  setTransactions: (transactions: Message[]) => void;
  addTransaction: (transaction: Message) => void;
  updateTransaction: (id: number, updatedTransaction: Message) => void;
  removeTransaction: (id: number) => void;
  setCategories: (categories: ActionTime<string>[]) => void;
  addCategory: (category: ActionTime<string>) => void;
  removeCategory: (id: number) => void;
  setAmounts: (amounts: ActionTime<number>[]) => void;
  addAmount: (amount: ActionTime<number>) => void;
  removeAmount: (id: number) => void;
  setInput: (input: string) => void;
  setType: (type: 'income' | 'expense' | null) => void;
  setCategory: (category: string) => void;
  setAmount: (amount: number | null) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  transactions: [],
  categories: [],
  amounts: [],
  input: '',
  type: null,
  category: '',
  amount: null,
  error: null,
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
  updateTransaction: (id, updatedTransaction) => set((state) => ({
    transactions: state.transactions.map((transaction) => (transaction.id === id ? updatedTransaction : transaction)),
  })),
  removeTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((transaction) => transaction.id !== id),
  })),
  setCategories: (categories) => set({ categories }),
  addCategory: (category) => set((state) => ({ categories: [category, ...state.categories] })),
  removeCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id),
  })),
  setAmounts: (amounts) => set({ amounts }),
  addAmount: (amount) => set((state) => ({ amounts: [amount, ...state.amounts] })),
  removeAmount: (id) => set((state) => ({
    amounts: state.amounts.filter((amount) => amount.id !== id),
  })),
  setInput: (input) => set({ input }),
  setType: (type) => set({ type }),
  setCategory: (category) => set({ category }),
  setAmount: (amount) => set({ amount }),
  setError: (error) => set({ error }),
}));