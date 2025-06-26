import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Target, TrendingUp, TrendingDown, DollarSign, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { AddObjectiveDialog } from "@/components/AddObjectiveDialog";
import { EditTransactionDialog } from "@/components/EditTransactionDialog";
import { EditObjectiveDialog } from "@/components/EditObjectiveDialog";
import { TransactionsList } from "@/components/TransactionsList";
import { ObjectivesList } from "@/components/ObjectivesList";
import { FinancialChart } from "@/components/FinancialChart";
import { useAppContext } from "@/contexts/AppContext";
import { ModeToggle } from "@/components/theme-toggle";

const Index = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddObjective, setShowAddObjective] = useState(false);
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [showEditObjective, setShowEditObjective] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingObjective, setEditingObjective] = useState(null);
  
  const {
    transactions,
    objectives,
    fixedExpenses,
    addTransaction,
    editTransaction,
    deleteTransaction,
    addObjective,
    editObjective,
    deleteObjective
  } = useAppContext();

  console.log('Index page - transactions:', transactions.length, 'objectives:', objectives.length, 'fixedExpenses:', fixedExpenses.length);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalTransactionExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFixedExpenses = fixedExpenses.reduce((sum, f) => sum + f.amount, 0);
  const totalExpenses = totalTransactionExpenses + totalFixedExpenses;
    
  const balance = totalIncome - totalExpenses;

  // Create combined data for charts including fixed expenses
  const combinedTransactions = [
    ...transactions,
    ...fixedExpenses.map(fe => ({
      id: fe.id,
      type: 'expense' as const,
      description: fe.name,
      amount: fe.amount,
      date: fe.dueDate,
      category: fe.category,
      paymentMethod: 'Conta Fixa'
    }))
  ];

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditTransaction(true);
  };

  const handleEditObjective = (objective) => {
    setEditingObjective(objective);
    setShowEditObjective(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mana
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Gerencie suas finanças de forma simples e intuitiva</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                R$ {totalIncome.toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-red-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                R$ {totalExpenses.toLocaleString('pt-BR')}
              </div>
              {totalFixedExpenses > 0 && (
                <div className="text-xs text-red-600 mt-1">
                  Inclui R$ {totalFixedExpenses.toLocaleString('pt-BR')} em contas fixas
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-50 to-indigo-100 border-blue-200' : 'from-orange-50 to-yellow-100 border-orange-200'} hover:shadow-lg transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                Saldo
              </CardTitle>
              <DollarSign className={`h-4 w-4 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                R$ {balance.toLocaleString('pt-BR')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => setShowAddTransaction(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
          
          <Button 
            onClick={() => setShowAddObjective(true)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Target className="h-4 w-4 mr-2" />
            Novo Objetivo
          </Button>

          <Link to="/fixed-expenses">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Contas Fixas
            </Button>
          </Link>

          <Link to="/transaction-filters">
            <Button 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Filtrar por Pagamento
            </Button>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transactions */}
          <div className="space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Transações Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionsList 
                  transactions={transactions.slice(-5)} 
                  onEditTransaction={handleEditTransaction}
                  onDeleteTransaction={deleteTransaction}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Análise Financeira
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FinancialChart transactions={combinedTransactions} />
              </CardContent>
            </Card>
          </div>

          {/* Objectives */}
          <div>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Objetivos Financeiros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ObjectivesList 
                  objectives={objectives} 
                  onEditObjective={handleEditObjective}
                  onDeleteObjective={deleteObjective}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialogs */}
        <AddTransactionDialog 
          open={showAddTransaction}
          onOpenChange={setShowAddTransaction}
          onAddTransaction={addTransaction}
        />
        
        <AddObjectiveDialog 
          open={showAddObjective}
          onOpenChange={setShowAddObjective}
          onAddObjective={addObjective}
        />

        <EditTransactionDialog 
          open={showEditTransaction}
          onOpenChange={setShowEditTransaction}
          transaction={editingTransaction}
          onEditTransaction={editTransaction}
        />

        <EditObjectiveDialog 
          open={showEditObjective}
          onOpenChange={setShowEditObjective}
          objective={editingObjective}
          onEditObjective={editObjective}
        />
      </div>
    </div>
  );
};

export default Index;
