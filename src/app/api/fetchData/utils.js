import { db } from '../../../../lib/db';

const getBudgetList = async (email) => {
    const result = await db.budgets.findMany({
        where: {
            createdBy: email,
        },
        include: {
            expenses: {
                select: {
                    amount: true,
                },
            },
        },
    });

    const budgetList = result.map(budget => ({
        ...budget,
        totalSpend: budget.expenses.reduce((sum, expense) => sum + expense.amount, 0),
        totalItem: budget.expenses.length,
    }));

    return budgetList;
};

const getIncomeList = async (email) => {
    try {
        const result = await db.incomes.findMany({
            where: {
                createdBy: email,
            },
        });

        return result.map(income => ({
            ...income,
            totalAmount: parseFloat(income.amount),
        }));
    } catch (error) {
        console.error("Error fetching income list:", error);
        throw error;
    }
};

const getAllExpenses = async (email) => {
    const result = await db.expenses.findMany({
        where: {
            budget: {
                createdBy: email,
            },
        },
        orderBy: {
            id: 'desc',
        },
    });

    return result;
};

export { getBudgetList, getIncomeList, getAllExpenses };
