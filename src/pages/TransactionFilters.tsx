
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TransactionsList } from "@/components/TransactionsList";
import { EditTransactionDialog } from "@/components/EditTransactionDialog";
import { ArrowLeft, Filter, CreditCard, Zap, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

const TransactionFilters = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("todas");
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const { transactions, editTransaction, deleteTransaction } = useAppContext();

  console.log('TransactionFilters page - transactions:', transactions.length, transactions);

  const filteredTransactions = transactions.filter(transaction => {
    switch (filter) {
      case "pix":
        return transaction.paymentMethod === "PIX";
      case "cartao":
        return transaction.paymentMethod === "Cartão de Crédito";
      default:
        return true;
    }
  });

  console.log('Filtered transactions:', filteredTransactions.length, 'with filter:', filter);

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditTransaction(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 py-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Filtrar por Tipo de Pagamento
            </h1>
            <p className="text-slate-600">Visualize suas transações organizadas por método de pagamento</p>
          </div>
        </div>

        {/* Filter Controls */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ToggleGroup 
              type="single" 
              value={filter} 
              onValueChange={(value) => value && setFilter(value)}
              className="justify-start"
            >
              <ToggleGroupItem 
                value="todas" 
                aria-label="Todas as transações"
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                Todas
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="pix" 
                aria-label="Transações via PIX"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                PIX
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="cartao" 
                aria-label="Transações no cartão"
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Cartão de Crédito
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        {/* Filtered Transactions */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {filter === "todas" && "Todas as Transações"}
                {filter === "pix" && "Transações via PIX"}
                {filter === "cartao" && "Transações no Cartão de Crédito"}
              </span>
              <span className="text-sm font-normal text-gray-500">
                {filteredTransactions.length} transação(ões)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsList 
              transactions={filteredTransactions}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={deleteTransaction}
            />
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <EditTransactionDialog 
          open={showEditTransaction}
          onOpenChange={setShowEditTransaction}
          transaction={editingTransaction}
          onEditTransaction={editTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionFilters;
