
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Wallet, PiggyBank, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { EditTransactionDialog } from "@/components/EditTransactionDialog";
import { TransactionsList } from "@/components/TransactionsList";
import { AddObjectiveDialog } from "@/components/AddObjectiveDialog";
import { EditObjectiveDialog } from "@/components/EditObjectiveDialog";
import { ObjectivesList } from "@/components/ObjectivesList";
import { FinancialChart } from "@/components/FinancialChart";
import { useAppContext } from "@/contexts/AppContext";
import { ThemeToggle } from "@/components/theme-toggle";

const Index = () => {
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false);
  const [showEditTransactionDialog, setShowEditTransactionDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showAddObjectiveDialog, setShowAddObjectiveDialog] = useState(false);
  const [showEditObjectiveDialog, setShowEditObjectiveDialog] = useState(false);
  const [editingObjective, setEditingObjective] = useState(null);

  const {
    transactions,
    objectives,
    addTransaction,
    editTransaction,
    deleteTransaction,
    addObjective,
    editObjective,
    deleteObjective
  } = useAppContext();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditTransactionDialog(true);
  };

  const handleEditObjective = (objective) => {
    setEditingObjective(objective);
    setShowEditObjectiveDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mana Finance
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Gerencie suas finanças de forma inteligente
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-600" />
                Receitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-green-700 dark:text-green-400">
                R$ {totalIncome.toFixed(2)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                Total de receitas registradas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-red-600" />
                Despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-red-700 dark:text-red-400">
                R$ {totalExpenses.toFixed(2)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                Total de despesas registradas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-blue-600" />
                Saldo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                R$ {balance.toFixed(2)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                Saldo atual (Receitas - Despesas)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => setShowAddTransactionDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Transação
          </Button>

          <Link to="/transaction-filters">
            <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowRight className="h-5 w-5 mr-2" />
              Filtrar Transações
            </Button>
          </Link>

          <Button
            onClick={() => setShowAddObjectiveDialog(true)}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Objetivo
          </Button>
        </div>

        {/* Charts and Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Chart */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Visão Geral Financeira</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialChart transactions={transactions} />
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsList
                transactions={transactions}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={deleteTransaction}
              />
            </CardContent>
          </Card>
        </div>

        {/* Objectives */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle>Objetivos Financeiros</CardTitle>
          </CardHeader>
          <CardContent>
            <ObjectivesList
              objectives={objectives}
              onEditObjective={handleEditObjective}
              onDeleteObjective={deleteObjective}
            />
          </CardContent>
        </Card>

        {/* Dialogs */}
        <AddTransactionDialog
          open={showAddTransactionDialog}
          onOpenChange={setShowAddTransactionDialog}
          onAddTransaction={addTransaction}
        />

        <EditTransactionDialog
          open={showEditTransactionDialog}
          onOpenChange={setShowEditTransactionDialog}
          transaction={editingTransaction}
          onEditTransaction={editTransaction}
        />

        <AddObjectiveDialog
          open={showAddObjectiveDialog}
          onOpenChange={setShowAddObjectiveDialog}
          onAddObjective={addObjective}
        />

        <EditObjectiveDialog
          open={showEditObjectiveDialog}
          onOpenChange={setShowEditObjectiveDialog}
          objective={editingObjective}
          onEditObjective={editObjective}
        />
      </div>
    </div>
  );
};

export default Index;
