import { useEffect } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useStore } from '../store/useStore';
import { getTransactions, getCategories, getAmounts } from '../utils/db';
import { useTransactions } from '@/hooks/useTransactions';

export default function Home() {
  const { error, transactions, setTransactions, setCategories, setAmounts } = useStore();
  const { handleSendMessage } = useTransactions();

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getTransactions();
      const categories = await getCategories();
      const amounts = await getAmounts();
      setTransactions(transactions);
      setCategories(categories);
      setAmounts(amounts);
    };
    fetchData();
  }, [setTransactions, setCategories, setAmounts]);

  const handleSend = () => handleSendMessage();

  function handleKeyPress(e: any): void {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-100" style={{ height: "100dvh" }}>
      <div className="flex flex-col w-full max-w-md h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-blue-500 text-white text-center p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold">CashBot AI</h1>
          <p>Trợ lý AI giúp theo dõi tiền của bạn</p>
        </header>
        <MessageList messages={transactions} />
        {error && <div className="text-red-500 p-2">{error}</div>}
        <MessageInput
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}