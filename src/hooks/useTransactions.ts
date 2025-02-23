import { useState, useEffect } from 'react';
import { addTransaction as addTransactionToDB, getTransactions, addCategory as addCategoryToDB, getCategories, deleteCategory as deleteCategoryFromDB, addAmount as addAmountToDB, getAmounts, deleteAmount as deleteAmountFromDB } from '../utils/db';
import { Message } from '../types/Message';
import { useStore } from '../store/useStore';
import { ParsedMessage, parseMessage } from '@/utils/parseMessage';

export const useTransactions = () => {
  const { input, transactions, setInput, setType, setCategory, setAmount, setError, setTransactions,
    addTransaction,
    removeTransaction, categories, setCategories,
    addCategory, removeCategory: removeCategoryFromStore, amounts, setAmounts, addAmount, removeAmount: removeAmountFromStore } = useStore();

  useEffect(() => {
    const fetchTransactions = async () => {
      const storedTransactions = await getTransactions();
      setTransactions(storedTransactions);
    };
    fetchTransactions();
  }, [setTransactions]);

  useEffect(() => {
    const fetchCategories = async () => {
      const storedCategories = await getCategories();
      storedCategories.sort((a, b) => b.time - a.time);
      setCategories(storedCategories);
    };
    fetchCategories();
  }, [setCategories]);

  useEffect(() => {
    const fetchAmounts = async () => {
      const storedAmounts = await getAmounts();
      storedAmounts.sort((a, b) => b.time - a.time);
      setAmounts(storedAmounts);
    };
    fetchAmounts();
  }, [setAmounts]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const parsedMessage: ParsedMessage = parseMessage(input, categories.map((cate) => cate.value));

      if (!parsedMessage.isValid) {
        setError(parsedMessage.errorMessage || 'Nội dung không hợp lệ. Vui lòng nhập lại.');
        return;
      }

      setError(null);

      const newMessage: Message = {
        id: Date.now(),
        sender: 'user',
        text: `${parsedMessage.type === 'income' ? 'Thu nhập' : 'Chi tiêu'} ${parsedMessage.amount} vào danh mục ${parsedMessage.category}`,
        time: new Date().toLocaleTimeString(),
      };

      await Promise.all([addTransactionToDB(newMessage),
      addNewCategory(parsedMessage.category),
      addNewAmount(parsedMessage.amount)]);
      addTransaction(newMessage);

      // Simulate bot response
      setTimeout(async () => {
        const botMessage: Message = {
          id: Date.now(),
          sender: 'bot',
          text: `Đã ghi nhận ${newMessage.text}.`,
          time: new Date().toLocaleTimeString(),
        };
        await addTransactionToDB(botMessage);
        addTransaction(botMessage);
      }, 1000);

      setInput('');
      setType(null);
      setCategory('');
      setAmount(null);
    }
  };

  const addNewCategory = async (category: string) => {
    const existingCategory = categories.find((cate) => cate.value === category);
    if (existingCategory) {
      setCategories([existingCategory, ...categories.filter((cate) => cate.value !== category)]);
      return;
    };
    let newCategory = { value: category, time: Date.now() };
    newCategory = await addCategoryToDB(newCategory);
    addCategory(newCategory);
  };

  const removeCategory = async (id: number) => {
    await deleteCategoryFromDB(id);
    removeCategoryFromStore(id);
  };

  const addNewAmount = async (amount: number) => {
    const existingAmount = amounts.find((amt) => amt.value === amount);
    if (existingAmount) {
      setAmounts([existingAmount, ...amounts.filter((amt) => amt.value !== amount)]);
      return;
    }
    let newAmount = { value: amount, time: Date.now() };
    newAmount = await addAmountToDB(newAmount);
    addAmount(newAmount);
  };

  const removeAmount = async (id: number) => {
    await deleteAmountFromDB(id);
    removeAmountFromStore(id);
  };

  return {
    transactions,
    handleSendMessage,
    removeTransaction,
    categories,
    addNewCategory,
    removeCategory,
    amounts,
    addNewAmount,
    removeAmount,
  };
};
