// Define the Transaction model.
import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Transaction model
export interface ITransaction extends Document {
  email: string;
  profilePicture?: string;
  balance: number;
  currency: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: Date;
  report?: string; // Optional 
}

// Schema for the Transaction model
const TransactionSchema: Schema<ITransaction> = new Schema({
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  balance: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  report: {
    type: String,
  },
});

// Create the Transaction model
const Transaction: Model<ITransaction> =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

// Export the Transaction model
export default Transaction;
