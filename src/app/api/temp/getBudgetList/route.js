import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const result = await db.budgets.findMany({
            where: { createdBy: session.user.email },
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

        return NextResponse.json(result.map(budget => ({
            ...budget,
            totalSpend: budget.expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0),
            totalItem: budget.expenses.length,
        })));
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}