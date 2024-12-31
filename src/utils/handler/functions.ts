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
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { transactions: { _id: transactionId } },
    }, { new: true });
    return updatedUser?.transactions;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
};

// updateTransaction function is used to update a transaction in the user's transactions array
export const updateTransaction = async (
  userId: string,
  transactionId: string,
  transactionData: Partial<ITransaction>
) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'transactions._id': transactionId },
      { $set: { 'transactions.$': transactionData } },
      { new: true }
    );
    return updatedUser?.transactions;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

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
      { _id: userId, 'budgets._id': budgetId },
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
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { budgets: { _id: budgetId } },
    }, { new: true });
    return updatedUser?.budgets;
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw new Error('Failed to delete budget');
  }
};

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