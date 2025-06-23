
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
}

interface Objective {
  id: number;
  title: string;
  target: number;
  current: number;
  emoji: string;
}

interface AppContextType {
  transactions: Transaction[];
  objectives: Objective[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: number, updatedTransaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: number) => void;
  addObjective: (objective: Omit<Objective, 'id'>) => void;
  editObjective: (id: number, updatedObjective: Omit<Objective, 'id'>) => void;
  deleteObjective: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  console.log('AppProvider rendering with transactions:', transactions.length, 'objectives:', objectives.length);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now() };
    console.log('Adding transaction:', newTransaction);
    setTransactions(prev => {
      const updated = [...prev, newTransaction];
      console.log('Updated transactions:', updated);
      return updated;
    });
  };

  const editTransaction = (id: number, updatedTransaction: Omit<Transaction, 'id'>) => {
    console.log('Editing transaction:', id, updatedTransaction);
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...updatedTransaction, id } : t
    ));
  };

  const deleteTransaction = (id: number) => {
    console.log('Deleting transaction:', id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addObjective = (objective: Omit<Objective, 'id'>) => {
    const newObjective = { ...objective, id: Date.now() };
    console.log('Adding objective:', newObjective);
    setObjectives(prev => {
      const updated = [...prev, newObjective];
      console.log('Updated objectives:', updated);
      return updated;
    });
  };

  const editObjective = (id: number, updatedObjective: Omit<Objective, 'id'>) => {
    console.log('Editing objective:', id, updatedObjective);
    setObjectives(prev => prev.map(o => 
      o.id === id ? { ...updatedObjective, id } : o
    ));
  };

  const deleteObjective = (id: number) => {
    console.log('Deleting objective:', id);
    setObjectives(prev => prev.filter(o => o.id !== id));
  };

  const contextValue = {
    transactions,
    objectives,
    addTransaction,
    editTransaction,
    deleteTransaction,
    addObjective,
    editObjective,
    deleteObjective
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
