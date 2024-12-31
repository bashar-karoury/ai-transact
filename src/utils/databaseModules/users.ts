// User model and schema.
import mongoose, { Schema, Document, Model } from 'mongoose';

// transaction interface
export interface ITransaction extends Document {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
}

// budget interface
export interface IBudget extends Document {
  category: string;
  startDate: Date;
  endDate: Date;
  amount: number;
}

// user interface
export interface IUser extends Document {
  email: string;
  profilePicture?: string;
  balance: number;
  currency: string;
  transactions: ITransaction[];
  budgets: IBudget[];
//   notifucations: INotification[];
}

// transaction schema
const TransactionSchema: Schema<ITransaction> = new Schema({
  // _id: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// budget schema
const BudgetSchema: Schema<IBudget> = new Schema({
  // _id: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: { type: Number, required: true },
});

// user schema
const UserSchema: Schema<IUser> = new Schema({
  // _id: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: String },
  balance: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  transactions: [TransactionSchema],
  budgets: [BudgetSchema],
});

// user model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// export user model
export default User;
