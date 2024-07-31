"use client";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/components/BudgetItem";
import AddExpense from "../components/AddExpense";
import ExpenseListTable from "../components/ExpenseListTable";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../components/EditBudget";
import { getSession } from 'next-auth/react';

function ExpensesScreen({ params }) {
  const { id } = params;
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    if (id) {
      getBudgetInfo();
    }
  }, [id]);

  useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, [router]);

  const getBudgetInfo = async () => {
  try {
    const response = await fetch(`/api/user/expense/id/getBudgetInfo?email=${session?.user?.email}&id=${params.id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch budget info');
      }

      const result = await response.json();
      setBudgetInfo(result);
      getExpensesList();
    } catch (error) {
      console.error(error);
      toast.error("Error fetching budget info: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getExpensesList = async () => {
    try {
      const response = await fetch(`/api/user/expense/id/getExpenseList?budgetId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const result = await response.json();
      setExpensesList(result);
      console.log(result);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching expenses: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async (budgetId) => {
    try {
      const response = await fetch(`/api/user/expense/id/deleteBudget`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete budget');
      }
      const result = await response.json();
      if (result) {
        toast("Budget Deleted!");
        refreshData();
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting budget: " + error.message);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={session?.user?.email}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
