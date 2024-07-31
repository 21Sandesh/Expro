"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { useRouter } from 'next/navigation';
import IncomeItem from "./IncomeItem";
import { getSession } from 'next-auth/react';

function IncomeList() {
  const [incomelist, setIncomeList] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
        const sessionData = await getSession();
        setSession(sessionData);
      };
      fetchSession();
    }, [router]);

  const getIncomeList = async () => {
    try {
      const response = await fetch(`/api/user/income/get?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch income list');
      }

      const result = await response.json();
      setIncomeList(result);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching income list: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      getIncomeList();
    }
  }, [session?.user?.email]);

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes refreshData={() => getIncomeList()} />
        {incomelist?.length > 0
          ? incomelist.map((budget, index) => (
              <IncomeItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
