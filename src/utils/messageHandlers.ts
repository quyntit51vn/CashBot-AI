import { Message } from '../types/Message';
import { ParsedMessage, parseMessage } from './parseMessage';
import { useStore } from '../store/useStore';
import { addTransaction as addTransactionToDB } from '../utils/db';

export const handleSendMessage = async () => {
  const {
    input,
    type,
    category,
    amount,
    categories,
    setInput,
    setError,
    setType,
    setCategory,
    setAmount,
    addTransaction,
  } = useStore.getState();

  if (input.trim() || (type && category && amount)) {
    const parsedMessage: ParsedMessage = parseMessage(input, categories.map((cate) => cate.value));

    if (!parsedMessage.isValid && (!type || !category || !amount)) {
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

    await addTransactionToDB(newMessage);
    addTransaction(newMessage);

    setInput('');
    setType(null);
    setCategory('');
    setAmount(null);

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
  }
};