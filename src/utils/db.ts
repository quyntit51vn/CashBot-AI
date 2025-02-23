import { ActionTime } from '@/types/ActionTime';
import { Message } from '@/types/Message';
import { openDB } from 'idb';

const DB_NAME = 'expense-manager';
const DB_VERSION = 1;
const TRANSACTIONS_STORE = 'transactions';
const CATEGORIES_STORE = 'categories';
const AMOUNTS_STORE = 'amounts';

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TRANSACTIONS_STORE)) {
        db.createObjectStore(TRANSACTIONS_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(CATEGORIES_STORE)) {
        const store = db.createObjectStore(CATEGORIES_STORE, { keyPath: 'id', autoIncrement: true });
        const dataCategories: ActionTime<string>[] = [
          { value: 'ăn uống', time: 0 },
          { value: 'mua sắm', time: 0 },
          { value: 'giải trí', time: 0 },
          { value: 'khác', time: 0 },
        ];
        dataCategories.forEach((category) => {
          store.add(category);
        });
      }
      if (!db.objectStoreNames.contains(AMOUNTS_STORE)) {
        const store = db.createObjectStore(AMOUNTS_STORE, { keyPath: 'id', autoIncrement: true });
        const dataAmounts: ActionTime<number>[] = [
          { value: 10000, time: 0 },
          { value: 20000, time: 0 },
          { value: 50000, time: 0 },
          { value: 100000, time: 0 },
        ];
        dataAmounts.forEach((amount) => {
          store.add(amount);
        });
      }
    },
  });
  return db;
};

export const addTransaction = async (transaction: any): Promise<Message> => {
  const db = await initDB();
  const tx = db.transaction(TRANSACTIONS_STORE, 'readwrite');
  const id = await tx.objectStore(TRANSACTIONS_STORE).add(transaction);
  await tx.done;
  return { ...transaction, id };
};

export const getTransactions = async (): Promise<Message[]> => {
  const db = await initDB();
  const tx = db.transaction(TRANSACTIONS_STORE, 'readonly');
  const transactions = await tx.objectStore(TRANSACTIONS_STORE).getAll();
  await tx.done;
  return transactions;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(TRANSACTIONS_STORE, 'readwrite');
  await tx.objectStore(TRANSACTIONS_STORE).delete(id);
  await tx.done;
};

export const updateTransaction = async (id: number, updatedTransaction: any): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(TRANSACTIONS_STORE, 'readwrite');
  await tx.objectStore(TRANSACTIONS_STORE).put({ ...updatedTransaction, id });
  await tx.done;
};

export const addCategory = async (category: any): Promise<ActionTime<string>> => {
  const db = await initDB();
  const tx = db.transaction(CATEGORIES_STORE, 'readwrite');
  const id = await tx.objectStore(CATEGORIES_STORE).add(category);
  await tx.done;
  return { ...category, id };
};

export const getCategories = async (): Promise<ActionTime<string>[]> => {
  const db = await initDB();
  const tx = db.transaction(CATEGORIES_STORE, 'readonly');
  const categories = await tx.objectStore(CATEGORIES_STORE).getAll();
  await tx.done;
  return categories;
};

export const deleteCategory = async (id: number): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(CATEGORIES_STORE, 'readwrite');
  await tx.objectStore(CATEGORIES_STORE).delete(id);
  await tx.done;
};

export const addAmount = async (amount: any): Promise<ActionTime<number>> => {
  const db = await initDB();
  const tx = db.transaction(AMOUNTS_STORE, 'readwrite');
  const id = await tx.objectStore(AMOUNTS_STORE).add(amount);
  await tx.done;
  return { ...amount, id };
};

export const getAmounts = async (): Promise<ActionTime<number>[]> => {
  const db = await initDB();
  const tx = db.transaction(AMOUNTS_STORE, 'readonly');
  const amounts = await tx.objectStore(AMOUNTS_STORE).getAll();
  await tx.done;
  return amounts;
};

export const deleteAmount = async (id: number): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(AMOUNTS_STORE, 'readwrite');
  await tx.objectStore(AMOUNTS_STORE).delete(id);
  await tx.done;
};