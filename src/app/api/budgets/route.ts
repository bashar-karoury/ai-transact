// import type { NextRequest, NextResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { updateBudget, getBudgets, addBudget } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';


// function to handle POST request to create a budget
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log('Request Body:', body);

    const budget = await addBudget(body._id, body);
    console.log('transaction added:', budget);

    return NextResponse.json(budget, { status: 201 });
  } catch (error: any) {
    console.error('Error creating budget:', error);
    return NextResponse.json(
      { error: 'Failed to add budget', details: error.message },
      { status: 500 }
    );
  }
}


// function to handle GET request to get all budgets

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // use the query parameter to get the user's id
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');

    if (!_id) {
      return NextResponse.json(
        { error: '_id parameter is required' },
        { status: 400 }
      );
    }

    console.log('Request ID:', _id);

    const budgets = await getBudgets(_id);
    console.log('Budgets:', budgets);

    return NextResponse.json(budgets, { status: 200 });
} catch (error: any) {
    console.error('Error getting budgets:', error);
    return NextResponse.json(
      { error: 'Failed to get budgets', details: error.message },
      { status: 500 }
    );
  }
}

// function to handle PUT request to update a budget
export async function PUT(req:NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log('Request Boody:', body);

    const budget = await updateBudget(body._id, body.budget_id, body);
    console.log('Budget updated:', budget);

    return NextResponse.json(budget, { status: 200 });
  } catch (error: any) {
    console.log('Error updating Budget:', error);
    return NextResponse.json(
      { error: 'Failed to update budget', details: error.message},
      { status: 500}
    )
  }
}