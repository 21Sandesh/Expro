import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/expense/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          amount,
          budgetId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const result = await response.json();
      if (result) {
        setAmount('');
        setName('');
        refreshData(); // Call the function to refresh the data
        toast("New Expense Added!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding expense: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
