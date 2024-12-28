// // this file contains all the functions that are used to handle the transactions.
import User, { IUser, ITransaction, IBudget } from '../databaseModules/users';

export const addUser = async (userData: IUser) => {
  // check if the user already exists
    const newUser = new User(userData);
    console.log(newUser);
    return await newUser.save();
  };
  
  export const addTransaction = async (userId: string, transactionData: ITransaction) => {
    return await User.findByIdAndUpdate(userId, {
      $push: { transactions: transactionData },
    });
  };
  
  export const deleteTransaction = async (userId: string, transactionId: string) => {
    return await User.findByIdAndUpdate(userId, {
      $pull: { transactions: { _id: transactionId } },
    });
  };
  
  export const updateTransaction = async (
    userId: string,
    transactionId: string,
    transactionData: Partial<ITransaction>
  ) => {
    return await User.findOneAndUpdate(
      { _id: userId, 'transactions._id': transactionId },
      { $set: { 'transactions.$': transactionData } },
      
      { new: true }
    );
  };
  
  export const addBudget = async (userId: string, budgetData: IBudget) => {
    return await User.findByIdAndUpdate(userId, {
      $push: { budgets: budgetData },
    });
  };
  
  export const updateBudget = async (
    userId: string,
    budgetId: string,
    budgetData: Partial<IBudget>
  ) => {
    return await User.findOneAndUpdate(
      { _id: userId, 'budgets._id': budgetId },
      { $set: { 'budgets.$': budgetData } },
      { new: true }
    );
  };
  
  export const deleteBudget = async (userId: string, budgetId: string) => {
    return await User.findByIdAndUpdate(userId, {
      $pull: { budgets: { _id: budgetId } },
    });
  };
  
  export const updateCurrency = async (userId: string, currency: string) => {
    return await User.findByIdAndUpdate(userId, { currency }, { new: true });
  };
  
  export const getBalance = async (userId: string) => {
    const user = await User.findById(userId);
    return user?.balance;
  };
  
  export const getAllExpenses = async (userId: string) => {
    const user = await User.findById(userId);
    return user?.transactions.filter(t => t.type === 'expense');
  };
  
  export const getAllIncomes = async (userId: string) => {
    const user = await User.findById(userId);
    return user?.transactions.filter(t => t.type === 'income');
  };
