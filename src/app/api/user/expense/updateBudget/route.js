import { db } from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {
        // Parse JSON body
        const { id, name, amount, icon } = await req.json();

        if (!id || !name || !amount) {
            return NextResponse.json({ error: 'ID, name, and amount are required' }, { status: 400 });
        }

        const updatedBudget = await db.budget.update({
            where: { id: Number(id) },
            data: {
                name,
                amount,
                icon,
            },
        });

        return NextResponse.json(updatedBudget, { status: 200 });
    } catch (error) {
        console.error('Error updating budget:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}