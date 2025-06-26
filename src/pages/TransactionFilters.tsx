import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Bank, Money, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { TransactionsList } from "@/components/TransactionsList";
import { ThemeToggle } from "@/components/theme-toggle";

const TransactionFilters = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const { transactions } = useAppContext();

  const filteredTransactions = selectedPaymentMethod
    ? transactions.filter(transaction => transaction.paymentMethod === selectedPaymentMethod)
    : transactions;

  const totalFilteredAmount = filteredTransactions.reduce((sum, transaction) => {
    return transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount;
  }, 0);

  const handlePaymentMethodClick = (method: string | null) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Filtrar por Pagamento
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Analise suas transações por método de pagamento</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Payment Method Filter */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle>Filtrar por Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button
              variant={selectedPaymentMethod === 'creditCard' ? 'default' : 'outline'}
              onClick={() => handlePaymentMethodClick(selectedPaymentMethod === 'creditCard' ? null : 'creditCard')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Cartão de Crédito
            </Button>
            <Button
              variant={selectedPaymentMethod === 'debitCard' ? 'default' : 'outline'}
              onClick={() => handlePaymentMethodClick(selectedPaymentMethod === 'debitCard' ? null : 'debitCard')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Cartão de Débito
            </Button>
            <Button
              variant={selectedPaymentMethod === 'bankTransfer' ? 'default' : 'outline'}
              onClick={() => handlePaymentMethodClick(selectedPaymentMethod === 'bankTransfer' ? null : 'bankTransfer')}
            >
              <Bank className="h-4 w-4 mr-2" />
              Transferência Bancária
            </Button>
            <Button
              variant={selectedPaymentMethod === 'cash' ? 'default' : 'outline'}
              onClick={() => handlePaymentMethodClick(selectedPaymentMethod === 'cash' ? null : 'cash')}
            >
              <Money className="h-4 w-4 mr-2" />
              Dinheiro
            </Button>
            <Button
              variant={selectedPaymentMethod === 'digitalWallet' ? 'default' : 'outline'}
              onClick={() => handlePaymentMethodClick(selectedPaymentMethod === 'digitalWallet' ? null : 'digitalWallet')}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Carteira Digital
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary Card */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Resultado do Filtro</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Total de Transações:{' '}
                <span className="font-bold">{filteredTransactions.length}</span>
              </p>
              <p>
                Valor Total:{' '}
                <span className="font-bold">
                  R$ {totalFilteredAmount.toFixed(2)}
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsList transactions={filteredTransactions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
