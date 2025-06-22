
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Target, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { AddObjectiveDialog } from "@/components/AddObjectiveDialog";
import { TransactionsList } from "@/components/TransactionsList";
import { ObjectivesList } from "@/components/ObjectivesList";
import { FinancialChart } from "@/components/FinancialChart";

const Index = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddObjective, setShowAddObjective] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      description: "Salário",
      amount: 3500,
      date: "2024-06-01",
      category: "Salário"
    },
    {
      id: 2,
      type: "expense",
      description: "Supermercado",
      amount: 450,
      date: "2024-06-15",
      category: "Alimentação"
    }
  ]);
  
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      title: "Viagem de Férias",
      target: 3000,
      current: 800,
      emoji: "✈️"
    },
    {
      id: 2,
      title: "Reserva de Emergência",
      target: 10000,
      current: 2500,
      emoji: "🛡️"
    }
  ]);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const addObjective = (objective) => {
    setObjectives([...objectives, { ...objective, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mana Finanças
          </h1>
          <p className="text-slate-600">Gerencie suas finanças de forma simples e intuitiva</p>
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
                <TransactionsList transactions={transactions.slice(-5)} />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Gráfico de Despesas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FinancialChart transactions={transactions} />
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
                <ObjectivesList objectives={objectives} />
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
      </div>
    </div>
  );
};

export default Index;
