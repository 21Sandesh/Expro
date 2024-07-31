import { db } from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        try {
            const incomes = await db.income.findMany({
                where: {
                    createdBy: email,
                },
                orderBy: {
                    id: 'desc',
                },
            });
            const result = await Promise.all(
                incomes.map(async (income) => {
                    const expenses = await db.expense.findMany({
                        where: {
                            budget: {
                                id: income.id,
                            },
                        },
                        select: {
                            amount: true,
                        },
                    });

                    const totalSpend = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
                    const totalItem = expenses.length;

                    return {
                        ...income,
                        totalSpend,
                        totalItem,
                    };
                })
            );

            return NextResponse.json(result);
        } catch (error) {
            console.error(error);
            NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}