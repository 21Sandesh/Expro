import { db } from '../../../../../lib/db';
import moment from 'moment';
import { NextResponse } from 'next/server';

export async function POST(req) {
        const { name, amount, budgetId } = req.body;

        if (!name || !amount || !budgetId) {
            return res.status(400).json({ error: 'Name, amount, and budgetId are required' });
        }

        try {
            const newExpense = await db.expense.create({
                data: {
                    name,
                    amount: parseFloat(amount),
                    budgetId,
                    createdAt: moment().format("DD/MM/YYYY"),
                },
            });
            return NextResponse.json(newExpense, { status: 201 });
        } catch (error) {
            console.error(error);
            NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}
