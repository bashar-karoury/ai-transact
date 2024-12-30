// ### Reports APIs

// `GET /reports?time=today|this_month|this_year`
// return {total_income:
//         total_expense:
//         categorize_income:{}
//         categorize_expense:{}
// }
import { NextRequest, NextResponse } from 'next/server';
import { getAllExpenses, getAllIncomes } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the '_id' parameter from the query string
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');

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
    const expenses = await getAllExpenses(_id);
    const incomes = await getAllIncomes(_id);
    console.log('Expenses:', expenses);
    console.log('Incomes:', incomes);

    // Return the expenses and incomes
    return NextResponse.json({ expenses, incomes }, { status: 200 });

} catch (error: any) {
    console.error('Error getting expenses and incomes:', error);
    return NextResponse.json(
      { error: 'Failed to get incomes and expenses', details: error.message },
      { status: 500 }
    );
  }
}
