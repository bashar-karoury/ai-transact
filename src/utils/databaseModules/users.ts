// User model and schema.
import mongoose, { Schema, Document, Model } from "mongoose";
import { experimental_useEffectEvent } from "react";

// transaction interface
export interface ITransaction extends Document {
  transaction_id: mongoose.Schema.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: Date;
}

// budget interface
export interface IBudget extends Document {
  budget_id: mongoose.Schema.Types.ObjectId;
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
  notifications: any[];
}

// transaction schema
const TransactionSchema: Schema<ITransaction> = new Schema({
  // transaction_id, will be used to update and delete transactions in the future
  transaction_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// budget schema
const BudgetSchema: Schema<IBudget> = new Schema({
  budget_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

// user schema
const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true },
  profilePicture: { type: String },
  balance: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  transactions: [TransactionSchema],
  budgets: [BudgetSchema],
  notifications: { type: mongoose.Schema.Types.Mixed, default: [] },
});

// user model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// export user model
export default User;
