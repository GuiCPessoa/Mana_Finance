
import { TrendingUp, TrendingDown } from "lucide-react";

export const TransactionsList = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhuma transação encontrada</p>
        <p className="text-sm">Adicione sua primeira transação!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              transaction.type === 'income' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {transaction.type === 'income' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className={`font-bold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
