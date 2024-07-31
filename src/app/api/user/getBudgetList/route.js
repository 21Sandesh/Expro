import { db } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const budgets = await db.budget.findMany({
            where: { createdBy: email },
            include: {
                expenses: {
                    select: {
                        amount: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });

        const result = budgets.map(budget => {
            const totalSpend = budget.expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
            const totalItem = budget.expenses.length;

            return {
                ...budget,
                totalSpend,
                totalItem,
            };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('API Route Error getBudgetList:', error);
        NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}