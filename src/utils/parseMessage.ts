export interface ParsedMessage {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  isValid: boolean;
  errorMessage?: string;
}

export const parseMessage = (message: string, categories: string[]): ParsedMessage => {
  const incomeKeywords = ['thu nhập', 'lương', 'thu'];
  const expenseKeywords = ['chi tiêu', 'mua', 'trả', 'chi'];
  message = message.toLowerCase();
  let type: 'income' | 'expense' | null = null;
  let amount = 0;
  let category = '';
  let isValid = false;
  let errorMessage = '';

  // Determine type
  for (const keyword of incomeKeywords) {
    if (message.includes(keyword)) {
      type = 'income';
      break;
    }
  }

  for (const keyword of expenseKeywords) {
    if (message.includes(keyword)) {
      type = 'expense';
      break;
    }
  }

  if (!type) {
    errorMessage = 'Vui lòng nhập loại giao dịch (thu nhập, chi tiêu, thu hoặc chi).';
  }

  // Extract amount
  const amountMatch = message.match(/\d+/);
  if (amountMatch) {
    amount = parseInt(amountMatch[0], 10);
  } else {
    errorMessage = 'Vui lòng nhập số tiền.';
  }

  // Extract category
  const categoryMatch = message.match(new RegExp(categories.join('|')));
  if (categoryMatch) {
    category = categoryMatch[0];
  } else {
    errorMessage = `Vui lòng nhập danh mục (${categories.join(', ')}).`;
  }

  // Validate message
  if (type && amount > 0 && category) {
    isValid = true;
    errorMessage = '';
  }

  return {
    type: type || 'expense',
    amount,
    category,
    isValid,
    errorMessage,
  };
};
