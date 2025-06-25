import React, { createContext, useContext, ReactNode } from 'react';
import usePersistentState from '@/hooks/usePersistentState';

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

interface FixedExpense {
  id: number;
  name: string;
  amount: number;
  category: string;
  dueDate: string;
  isPaid: boolean;
}

interface AppContextType {
  transactions: Transaction[];
  objectives: Objective[];
  fixedExpenses: FixedExpense[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: number, updatedTransaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: number) => void;
  addObjective: (objective: Omit<Objective, 'id'>) => void;
  editObjective: (id: number, updatedObjective: Omit<Objective, 'id'>) => void;
  deleteObjective: (id: number) => void;
  addFixedExpense: (fixedExpense: Omit<FixedExpense, 'id'>) => void;
  editFixedExpense: (id: number, updatedFixedExpense: Omit<FixedExpense, 'id'>) => void;
  deleteFixedExpense: (id: number) => void;
  toggleFixedExpensePayment: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = usePersistentState<Transaction[]>('transactions', []);
  const [objectives, setObjectives] = usePersistentState<Objective[]>('objectives', []);
  const [fixedExpenses, setFixedExpenses] = usePersistentState<FixedExpense[]>('fixedExpenses', []);

  console.log('AppProvider rendering with transactions:', transactions.length, 'objectives:', objectives.length, 'fixedExpenses:', fixedExpenses.length);

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

  const addFixedExpense = (fixedExpense: Omit<FixedExpense, 'id'>) => {
    const newFixedExpense = { ...fixedExpense, id: Date.now() };
    console.log('Adding fixed expense:', newFixedExpense);
    setFixedExpenses(prev => {
      const updated = [...prev, newFixedExpense];
      console.log('Updated fixed expenses:', updated);
      return updated;
    });
  };

  const editFixedExpense = (id: number, updatedFixedExpense: Omit<FixedExpense, 'id'>) => {
    console.log('Editing fixed expense:', id, updatedFixedExpense);
    setFixedExpenses(prev => prev.map(f => 
      f.id === id ? { ...updatedFixedExpense, id } : f
    ));
  };

  const deleteFixedExpense = (id: number) => {
    console.log('Deleting fixed expense:', id);
    setFixedExpenses(prev => prev.filter(f => f.id !== id));
  };

  const toggleFixedExpensePayment = (id: number) => {
    console.log('Toggling payment status for fixed expense:', id);
    setFixedExpenses(prev => prev.map(f => 
      f.id === id ? { ...f, isPaid: !f.isPaid } : f
    ));
  };

  const contextValue = {
    transactions,
    objectives,
    fixedExpenses,
    addTransaction,
    editTransaction,
    deleteTransaction,
    addObjective,
    editObjective,
    deleteObjective,
    addFixedExpense,
    editFixedExpense,
    deleteFixedExpense,
    toggleFixedExpensePayment
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
