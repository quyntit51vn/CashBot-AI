import React, { useState } from 'react';
import { ActionTime } from '@/types/ActionTime';

interface NewCategoryInputProps {
  addNewCategory: (category: ActionTime<string>) => void;
}

const NewCategoryInput: React.FC<NewCategoryInputProps> = ({ addNewCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addNewCategory({ value: newCategory.trim(), time: Date.now() });
      setNewCategory('');
      setShowNewCategoryInput(false);
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
        className="p-2 rounded-lg text-xs border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      >
        +
      </button>

      {showNewCategoryInput && (
        <div className="absolute z-10 mb-2 bg-white text-black border border-gray-300 rounded-lg shadow-lg bottom-full right-0">
          <div className="flex m-2 space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Thêm danh mục"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-xs text-black"
            />
            <button onClick={handleAddCategory} className="p-2 bg-blue-500 text-white rounded-lg text-xs">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCategoryInput;