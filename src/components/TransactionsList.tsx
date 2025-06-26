import { TrendingUp, TrendingDown, Edit, Trash2, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TransactionsListProps {
  transactions: Array<{
    id: number;
    type: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    paymentMethod?: string;
  }>;
  onEditTransaction: (transaction: any) => void;
  onDeleteTransaction: (id: number) => void;
}

export const TransactionsList = ({ transactions, onEditTransaction, onDeleteTransaction }: TransactionsListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma transação encontrada</p>
        <p className="text-sm">Adicione sua primeira transação!</p>
      </div>
    );
  }

  const getPaymentMethodBadge = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "PIX":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800">
            <Zap className="h-3 w-3 mr-1" />
            PIX
          </Badge>
        );
      case "Cartão de Crédito":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            <CreditCard className="h-3 w-3 mr-1" />
            Cartão
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {paymentMethod || "PIX"}
          </Badge>
        );
    }
  };

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="space-y-3 pr-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{transaction.description}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  {getPaymentMethodBadge(transaction.paymentMethod || "PIX")}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditTransaction(transaction)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir a transação "{transaction.description}"? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
