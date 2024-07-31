import { db } from '../../../../../../lib/db';
import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id || !email) {
        return NextResponse.json({ error: 'ID and email are required' }, { status: 400 });
    }

    try {
        const budgetInfo = await db.budget.findUnique({
            where: { id: Number(id) },
            include: {
                expenses: {
                    select: {
                        amount: true,
                    },
                },
            },
        });

        if (!budgetInfo || budgetInfo.createdBy !== email) {
            return NextResponse.json({ error: 'Budget not found or access denied' }, { status: 404 });
        }

        const totalSpend = budgetInfo.expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
        const totalItem = budgetInfo.expenses.length;

        return NextResponse.json({
            ...budgetInfo,
            totalSpend,
            totalItem,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
