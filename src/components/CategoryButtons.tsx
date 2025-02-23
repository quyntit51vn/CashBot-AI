import React, { useState, useEffect } from 'react';
import NewCategoryInput from './NewCategoryInput';
import { useStore } from '@/store/useStore';

interface CategoryButtonsProps {
  setCategory: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ setCategory }) => {
  const { categories, removeCategory, addCategory } = useStore();
  const { category } = useStore();
  const [visibleCategories, setVisibleCategories] = useState(categories.slice(0, 3));
  const [moreCategories, setMoreCategories] = useState(categories.slice(3));
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  useEffect(() => {
    setVisibleCategories(categories.slice(0, 3));
    setMoreCategories(categories.slice(3));
  }, [categories]);

  return (
    <div className="flex mb-2 space-x-2">
      {visibleCategories.map((cat) => (
        <div key={cat.id} className="relative">
          <button
            onClick={() => setCategory(cat.value)}
            className={`p-2 rounded-lg pr-3 text-xs border ${category === cat.value ? 'bg-blue-700 text-white' : 'border-blue-500 text-blue-500'} hover:bg-blue-500 hover:text-white`}
          >
            {cat.value}
          </button>
          <button
            onClick={() => removeCategory(cat.id!)}
            className="absolute top-1 right-0 p-1 text-xs text-red-500 hover:text-red-700"
          >
            x
          </button>
        </div>
      ))}
      {moreCategories.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="p-2 rounded-lg text-xs border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            More...
          </button>
          {showMoreCategories && (
            <div className="absolute z-10 mb-2 w-48 bg-white text-black border border-gray-300 rounded-lg shadow-lg bottom-full">
              {moreCategories.map((cat) => (
                <div key={cat.id} className="relative">
                  <button
                    onClick={() => {
                      setCategory(cat.value);
                      setShowMoreCategories(false);
                    }}
                    className="block w-full text-left p-2 text-xs border-b border-gray-200 hover:bg-blue-500 hover:text-white"
                  >
                    {cat.value}
                  </button>
                  <button
                    onClick={() => removeCategory(cat.id!)}
                    className="absolute top-1 right-0 p-1 text-xs text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <NewCategoryInput addNewCategory={addCategory} />
    </div>
  );
};

export default CategoryButtons;