import React, { useEffect } from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/16/solid';
import { useStore } from '../store/useStore';
import CategoryButtons from './CategoryButtons';
import AmountButtons from './AmountButtons';
import NewCategoryInput from './NewCategoryInput';

interface MessageInputProps {
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ handleSend, handleKeyPress }) => {
  const {
    input,
    type,
    category,
    amount,
    setInput,
    setType,
    setCategory,
    setAmount,
  } = useStore();

  useEffect(() => {
    let newInput = '';
    if (type) newInput += type === 'income' ? 'Thu nhập ' : 'Chi tiêu ';
    if (category) newInput += `${category} `;
    if (amount) newInput += `${amount} `;
    setInput(newInput.trim());
  }, [type, category, amount, setInput]);

  return (
    <div className="flex flex-col p-4 bg-white border-t border-gray-300">
      <div className="flex mb-2 space-x-2">
        <button
          onClick={() => setType('income')}
          className={`p-2 rounded-full border border-green-500 ${type === 'income' ? 'bg-green-700 text-white' : 'text-green-500'} hover:bg-green-500 hover:text-white`}
        >
          <PlusCircleIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setType('expense')}
          className={`p-2 rounded-full border border-red-500 ${type === 'expense' ? 'bg-red-700 text-white' : 'text-red-500'} hover:bg-red-500 hover:text-white`}
        >
          <MinusCircleIcon className="h-6 w-6" />
        </button>
      </div>
      <CategoryButtons setCategory={setCategory} />
      <AmountButtons setAmount={setAmount} />
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
        />
        <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;