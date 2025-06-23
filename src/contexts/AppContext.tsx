
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

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
  };

  const editTransaction = (id: number, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...updatedTransaction, id } : t
    ));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addObjective = (objective: Omit<Objective, 'id'>) => {
    setObjectives(prev => [...prev, { ...objective, id: Date.now() }]);
  };

  const editObjective = (id: number, updatedObjective: Omit<Objective, 'id'>) => {
    setObjectives(prev => prev.map(o => 
      o.id === id ? { ...updatedObjective, id } : o
    ));
  };

  const deleteObjective = (id: number) => {
    setObjectives(prev => prev.filter(o => o.id !== id));
  };

  return (
    <AppContext.Provider value={{
      transactions,
      objectives,
      addTransaction,
      editTransaction,
      deleteTransaction,
      addObjective,
      editObjective,
      deleteObjective
    }}>
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
