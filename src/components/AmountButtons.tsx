import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useStore } from '@/store/useStore';

interface AmountButtonsProps {
  setAmount: (amount: number) => void;
}

const AmountButtons: React.FC<AmountButtonsProps> = ({ setAmount }) => {
  const { amounts, removeAmount } = useTransactions();
  const { amount } = useStore();

  return (
    <div className="flex mb-2 space-x-2">
      {amounts.map((amt) => (
        <div key={amt.id} className="relative">
          <button
            onClick={() => setAmount(amt.value)}
            className={`p-2 pr-3 rounded-lg text-xs border ${amount === amt.value ? 'bg-yellow-700 text-white' : 'border-yellow-500 text-yellow-500'} hover:bg-yellow-500 hover:text-white`}
          >
            {amt.value / 1000}k
          </button>
          {amounts.length > 1 && (<button
            onClick={() => removeAmount(amt.id!)}
            className="absolute top-1 right-0 p-1 text-xs text-red-500 hover:text-red-700"
          >
            x
          </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AmountButtons;