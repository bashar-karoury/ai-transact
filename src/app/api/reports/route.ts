// Import the 'NextRequest' and 'NextResponse' types from 'next/server'
import { NextRequest, NextResponse } from 'next/server';
import { getAllIncomesBySpecificDate, getAllExpensesBySpecificDate,  getAllExpenses, getAllIncomes } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';


export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the '_id' parameter from the query string
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');
    // Get the 'time' parameter from the query string
    const start_date_str = searchParams.get('start_date');
    const end_date_str = searchParams.get('end_date');
    const start_date = start_date_str ? new Date(start_date_str) : null;
    const end_date = end_date_str ? new Date(end_date_str) : null;

    // Log the '_id'
    console.log('Request ID:', _id);

    // Validate if '_id' exists
    if (!_id) {
      return NextResponse.json(
        { error: '_id parameter is required' },
        { status: 400 }
      );
    }

    // Fetch balance using '_id'
    const expenses = await getAllExpensesBySpecificDate(_id, start_date as Date, end_date as Date);
    const incomes = await getAllIncomesBySpecificDate(_id, start_date as Date, end_date as Date);

    // define the total income and total expense
    let total_income = 0;
    let total_expense = 0;
    const categorize_income: { [key: string]: number } = {};
    const categorize_expense: { [key: string]: number } = {};

    // Calculate the total income and total expense
    total_income = incomes.reduce((acc, income) => acc + income.amount, 0);
    total_expense = expenses.reduce((acc, expense) => acc + expense.amount, 0);


    // Categorize the expenses
    expenses?.forEach(expense => {
      const expenseCategory = (expense as any).category;
      if (categorize_expense[expenseCategory]) {
        categorize_expense[expenseCategory] += (expense as any).amount;
      } else {
        categorize_expense[expenseCategory] = (expense as any).amount;
      }
    });

    // Categorize the incomes
    incomes?.forEach(income => {
      const incomeCategory = (income as any).category;
      if (categorize_income[incomeCategory]) {
        categorize_income[incomeCategory] += (income as any).amount;
      } else {
        categorize_income[incomeCategory] = (income as any).amount;
      }
    });

    // Log the expenses and incomes
    console.log('Expenses:', expenses);
    console.log('Incomes:', incomes);

    // Return the expenses and incomes
    return NextResponse.json({ total_income, total_expense, categorize_income, categorize_expense }, { status: 200 });

  }
  // Catch any errors and return the error response
  catch (error: any) {
    console.error('Error getting expenses and incomes:', error);
    return NextResponse.json(
      { error: 'Failed to get incomes and expenses', details: error.message },
      { status: 500 }
    );
  }
}