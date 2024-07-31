import { db } from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { name, amount, createdBy, icon } = body;

    if (!name || !amount || !createdBy) {
        return NextResponse.json({ error: 'Name, amount, and createdBy are required' }, { status: 400 });
    }

    try {
        const newBudget = await db.budget.create({
            data: {
                name,
                amount,
                createdBy,
                icon,
            },
        });
        return NextResponse.json(newBudget, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
