// function.ts is a file that contains all the functions that are used in the handlers.
import { get } from 'http';
import User, {IUser, ITransaction, IBudget } from '../databaseModules/users';

// Add a new user to the database
export const addUser = async (userData: IUser) => {
  try {
    const newUser = new User(userData);
    console.log(newUser);
    return await newUser.save();
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Failed to add user');
  }
};

// addTransaction function is used to add a new transaction to the user's transactions array
export const addTransaction = async (userId: string, transactionData: ITransaction) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: { transactions: transactionData },
    }, { new: true });
    return updatedUser?.transactions;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw new Error('Failed to add transaction');
  }
};

// deleteTransaction function is used to delete a transaction from the user's transactions array
export const deleteTransaction = async (userId: string, transactionId: string) => {
  try {
    // delete the transaction from the user's transactions array
    const updated = await User.findByIdAndUpdate(
      userId,
      { $pull: { transactions: { transaction_id: transactionId } } }, { new: true }
    );
    return updated?.transactions;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
}

// updateTransaction function is used to update a transaction in the user's transactions array
export const updateTransaction = async (
  userId: string,
  transactionId: string,
  transactionData: Partial<ITransaction>
) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'transactions.transaction_id': transactionId },
      { $set: { 'transactions.$': transactionData } },
      { new: true }
    );
    return updatedUser?.transactions;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

// getTransactions for today function is used to get all the user's transactions for today
export const getTransactionsForToday = async (userId: string) => {
  try {
    const user = await User.findById(userId).select('transactions'); // Get only transactions field

    // Filter transactions locally (alternative approach since MongoDB's `$elemMatch` can't project nested arrays)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const transactions = user?.transactions.filter(
      (t) =>
        t.date >= startOfDay &&
        t.date <= endOfDay
    );
    return transactions || [];
  } catch (error) {
    console.error('Error getting transactions for today:', error);
    throw new Error('Failed to get transactions for today');
  }
}

// getTransactionsForThisMonth function is used to get all the user's transactions for this month
export const getTransactionsForThisMonth = async (userId: string) => {
  try {
    const user = await User.findById(userId).select('transactions'); // Get only transactions field

    // Filter transactions locally (alternative approach since MongoDB's `$elemMatch` can't project nested arrays)
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); // Ensure the end is inclusive
    const transactions = user?.transactions.filter(
      (t) =>
        t.date >= startOfMonth &&
        t.date <= endOfMonth
    );
    return transactions || [];
  } catch (error) {
    console.error('Error getting transactions for this month:', error);
    throw new Error('Failed to get transactions for this month');
  }
}

// getTransactionsForThisYear function is used to get all the user's transactions for this year
export const getTransactionsForThisYear = async (userId: string) => {
  try {
    const user = await User.findById(userId).select('transactions'); // Get only transactions field

    // Filter transactions locally (alternative approach since MongoDB's `$elemMatch` can't project nested arrays)
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59); // Ensure the end is inclusive
    const transactions = user?.transactions.filter(
      (t) =>
        t.date >= startOfYear &&
        t.date <= endOfYear
    );
    return transactions || [];
  } catch (error) {
    console.error('Error getting transactions for this year:', error);
    throw new Error('Failed to get transactions for this year');
  }
}

// getAllTransactionsBySpecificDate function is used to get all the user's transactions by a specific date
export const getAllTransactionsBySpecificDate = async (
  userId: string,
  start_date: Date,
  end_date: Date
) => {
  try {
    const user = await User.findById(userId).select('transactions'); // Get only transactions field

    // Filter transactions locally (alternative approach since MongoDB's `$elemMatch` can't project nested arrays)
    const transactions = user?.transactions.filter(
      (t) =>
        t.date >= start_date &&
        t.date <= end_date
    );
    return transactions || [];
  } catch (error) {
    console.error('Error getting transactions by specific date:', error);
    throw new Error('Failed to get transactions by specific date');
  }
}

// get all transactions of a user
export const getAllTransactions = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw new Error('Failed to get transactions');
  }
}

// addBudget function is used to add a new budget to the user's budgets array
export const addBudget = async (userId: string, budgetData: IBudget) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: { budgets: budgetData },
    }, { new: true });
    return updatedUser?.budgets;
  } catch (error) {
    console.error('Error adding budget:', error);
    throw new Error('Failed to add budget');
  }
};

// updateBudget function is used to update a budget in the user's budgets array
export const updateBudget = async (
  userId: string,
  budgetId: string,
  budgetData: Partial<IBudget>
) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'budgets.budget_id': budgetId },
      { $set: { 'budgets.$': budgetData } },
      { new: true }
    );
    return updatedUser?.budgets;
  } catch (error) {
    console.error('Error updating budget:', error);
    throw new Error('Failed to update budget');
  }
};

// deleteBudget function is used to delete a budget from the user's budgets array
export const deleteBudget = async (userId: string, budgetId: string) => {
  try {
    // delete the budget from the user's budgets array
    const updated = await User.findByIdAndUpdate(
      userId,
      { $pull: { budgets: { budget_id: budgetId } } }, { new: true }
    );
    return updated?.budgets;
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw new Error('Failed to delete budget');
  }
}

// getBudgets function is used to get all the user's budgets
export const getBudgets = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.budgets;
  } catch (error) {
    console.error('Error getting budgets:', error);
    throw new Error('Failed to get budgets');
  }
}

// updaateCurrency function is used to update the user's currency
export const updateCurrency = async (userId: string, currency: string) => {
  try {
    return await User.findByIdAndUpdate(userId, { currency }, { new: true });
  } catch (error) {
    console.error('Error updating currency:', error);
    throw new Error('Failed to update currency');
  }
};

// getBalance function is used to get the user's balance
export const getBalance = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.balance;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw new Error('Failed to get balance');
  }
};


// getAllExpenses function is used to get all the user's expenses
export const getAllExpenses = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.transactions.filter(t => t.type === 'expense');
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw new Error('Failed to get expenses');
  }
};

// getAllIncomes function is used to get all the user's incomes
export const getAllIncomes = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.transactions.filter(t => t.type === 'income');
  } catch (error) {
    console.error('Error getting incomes:', error);
    throw new Error('Failed to get incomes');
  }
};

// getAllIncomesBySpecificDate function is used to get all the user's incomes by a specific date
export const getAllIncomesBySpecificDate = async (
  userId: string,
  start_date: Date,
  end_date: Date
) => {
  try {
    const user = await User.findById(userId).select('transactions'); // Get only transactions field

    // Filter transactions locally (alternative approach since MongoDB's `$elemMatch` can't project nested arrays)
    const incomes = user?.transactions.filter(
      (t) =>
        t.type === 'income' &&
        t.date >= start_date &&
        t.date <= end_date
    );
    return incomes || [];
  } catch (error) {
    console.error('Error getting incomes by specific date:', error);
    throw new Error('Failed to get incomes by specific date');
  }
};

// getAllExpensesBySpecificDate function is used to get all the user's expenses by a specific date
export const getAllExpensesBySpecificDate = async (
  userId: string,
  start_date: Date,
  end_date: Date
) => {
  try {
    const user = await User.findById(userId).select('transactions');

    const expenses = user?.transactions.filter(
      (t) =>
        t.type === 'expense' &&
        t.date >= start_date &&
        t.date <= end_date
    );
    return expenses || [];
  } catch (error) {
    console.error('Error getting expenses by specific date:', error);
    throw new Error('Failed to get expenses by specific date');
  }
};

// getUserSettings function is used to get the user's settings
export const getUserSettings = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return {
      currency: user?.currency,
      profilePicture: user?.profilePicture,
    };
  } catch (error) {
    console.error('Error getting user settings:', error);
    throw new Error('Failed to get user settings');
  }
}

// updateUserSettings function is used to update the user's settings
export const updateUserSettings = async (
  userId: string,
  settings: { currency?: string; profilePicture?: string}
) => {
  try {
    return await User.findByIdAndUpdate(userId, settings, { new: true });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw new Error('Failed to update user settings');
  }
};

// getUserIdByEmail function is used to get the user's id by email
export const getUserIdByEmail = async (email: string): Promise<string> =>  {
  try {
    const user = await User
      .findOne({ email })
      .select('_id');
    return user?._id as string;
  } catch (error) {
    console.error('Error getting user id by email:', error);
    throw new Error('Failed to get user id by email');
  }
};