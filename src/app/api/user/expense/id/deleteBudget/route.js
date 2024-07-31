import { db } from '../../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        try {
            // Delete associated expenses first
            await db.expense.deleteMany({
                where: { budgetId: Number(id) },
            });

            // Then delete the budget
            await db.budget.delete({
                where: { id: Number(id) },
            });

            return NextResponse.json({ message: 'Budget deleted successfully' }, { status: 200 });
        } catch (error) {
            console.error(error);
            NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}