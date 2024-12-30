import {User, IUser, ITransaction, IBudget } from '../databaseModules/users';

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

export const updateCurrency = async (userId: string, currency: string) => {
  try {
    return await User.findByIdAndUpdate(userId, { currency }, { new: true });
  } catch (error) {
    console.error('Error updating currency:', error);
    throw new Error('Failed to update currency');
  }
};

export const getBalance = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.balance;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw new Error('Failed to get balance');
  }
};

export const getAllExpenses = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.transactions.filter(t => t.type === 'expense');
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw new Error('Failed to get expenses');
  }
};

export const getAllIncomes = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user?.transactions.filter(t => t.type === 'income');
  } catch (error) {
    console.error('Error getting incomes:', error);
    throw new Error('Failed to get incomes');
  }
};
