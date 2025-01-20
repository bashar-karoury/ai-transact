// Import the 'NextRequest' and 'NextResponse' types from 'next/server'
import { NextRequest, NextResponse } from "next/server";
import {
  getUserIdByEmail,
  getAllExpensesForToday,
  getAllExpensesForThisMonth,
  getAllExpensesForThisYear,
  getAllIncomesForToday,
  getAllIncomesForThisMonth,
  getAllIncomesForThisYear,
  getAllExpenses,
  getAllIncomes,
} from "../../../utils/handler/functions";
import dbConnect from "../../../utils/db";
import { stackServerApp } from "@/stack";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    const user_email = req.headers.get("x-user-email");
    // console.log('User email:', user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    const _id: string = await getUserIdByEmail(user_email);
    // console.log('id is: ', _id);

    // Get the 'time' parameter from the body
    // const body = await req.json();
    // const time = body.time;
    // console.log('Request Body:', body);

    const { searchParams } = new URL(req.url);
    const time = searchParams.get("time");

    // Log the '_id'
    // console.log('Request ID:', _id);

    // Validate if '_id' exists
    if (!_id) {
      return NextResponse.json(
        { error: "_id parameter is required" },
        { status: 400 }
      );
    }

    // Fetch the expenses and incomes
    let expenses;
    let incomes;

    // Get the transactions based on the time frame
    switch (time) {
      case "today":
        expenses = await getAllExpensesForToday(_id);
        incomes = await getAllIncomesForToday(_id);
        break;
      case "this_month":
        expenses = await getAllExpensesForThisMonth(_id);
        incomes = await getAllIncomesForThisMonth(_id);
        break;
      case "this_year":
        expenses = await getAllExpensesForThisYear(_id);
        incomes = await getAllIncomesForThisYear(_id);
        break;
      default:
        expenses = await getAllExpenses(_id);
        incomes = await getAllIncomes(_id);
    }

    // define the total income and total expense
    let total_income = 0;
    let total_expense = 0;
    const categorize_income: { [key: string]: number } = {};
    const categorize_expense: { [key: string]: number } = {};

    // Calculate the total income and total expense
    total_income = (incomes ?? []).reduce(
      (acc, income) => acc + income.amount,
      0
    );
    total_expense = (expenses ?? []).reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // Categorize the expenses
    expenses?.forEach((expense) => {
      const expenseCategory = (expense as any).category;
      if (categorize_expense[expenseCategory]) {
        categorize_expense[expenseCategory] += (expense as any).amount;
      } else {
        categorize_expense[expenseCategory] = (expense as any).amount;
      }
    });

    // Categorize the incomes
    incomes?.forEach((income) => {
      const incomeCategory = (income as any).category;
      if (categorize_income[incomeCategory]) {
        categorize_income[incomeCategory] += (income as any).amount;
      } else {
        categorize_income[incomeCategory] = (income as any).amount;
      }
    });

    // Log the expenses and incomes
    console.log("Expenses:", expenses);
    console.log("Incomes:", incomes);

    // Return the expenses and incomes
    return NextResponse.json(
      { total_income, total_expense, categorize_income, categorize_expense },
      { status: 200 }
    );
  } catch (error: any) {
    // Catch any errors and return the error response
    console.error("Error getting expenses and incomes:", error);
    return NextResponse.json(
      { error: "Failed to get incomes and expenses", details: error.message },
      { status: 500 }
    );
  }
}
