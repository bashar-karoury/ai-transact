// لإhis file contains all the functions that are used to handle the transactions.
import Transaction from "../database-models/Transaction";

// add a new transaction

export const addTransaction = async (data: any) => {
    try {
        const transaction = await Transaction.create(data);
        return transaction;
    } catch (error) {
        throw new Error(error as string);
    }
};

// get all transactions

export const getTransactions = async () => {
    try {
        const transactions = await Transaction.find();
        return transactions;
    } catch (error) {
        throw new Error(error as string);
    }
};

// get a single transaction

export const getTransaction = async (id: string) => {
    try {
        const transaction = await Transaction.findById(id);
        return transaction;
    } catch (error) {
        throw new Error(error as string);
    }
};

// update a transaction

export const updateTransaction = async (id: string, data: any) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(id, data, { new: true });
        return transaction;
    } catch (error) {
        throw new Error(error as string);
    }
};

// delete a transaction

export const deleteTransaction = async (id: string) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        return transaction;
    } catch (error) {
        throw new Error(error as string);
    }
};

// get all transactions by type

export const getTransactionsByType = async (type: string) => {
    try {
        const transactions = await Transaction.find({ type });
        return transactions;
    } catch (error) {
        throw new Error(error as string);
    }
};

// get all transactions by date

export const getTransactionsByDate = async (date: string) => {
    try {
        const transactions = await Transaction.find({ date });
        return transactions;
    } catch (error) {
        throw new Error(error as string);
    }
};

// get transactions by date range

export const getTransactionsByDateRange = async (startDate: string, endDate: string) => {
    try {
        const transactions = await Transaction.find({ date: { $gte: startDate, $lte: endDate } });
        return transactions;
    } catch (error) {
        throw new Error(error as string);
    }
};