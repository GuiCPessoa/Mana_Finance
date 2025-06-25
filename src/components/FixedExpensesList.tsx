
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FixedExpense {
  id: number;
  name: string;
  amount: number;
  category: string;
  dueDate: string;
  isPaid: boolean;
}

interface FixedExpensesListProps {
  fixedExpenses: FixedExpense[];
  onEditFixedExpense: (fixedExpense: FixedExpense) => void;
  onDeleteFixedExpense: (id: number) => void;
  onTogglePayment: (id: number) => void;
}

export const FixedExpensesList = ({ 
  fixedExpenses, 
  onEditFixedExpense, 
  onDeleteFixedExpense,
  onTogglePayment 
}: FixedExpensesListProps) => {
  if (fixedExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhuma conta fixa cadastrada</p>
        <p className="text-sm">Adicione suas contas fixas mensais para melhor controle financeiro</p>
      </div>
    );
  }

  const totalAmount = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidAmount = fixedExpenses
    .filter(expense => expense.isPaid)
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 rounded-lg p-4">
          <div className="text-sm text-red-800 font-medium">Total das Contas</div>
          <div className="text-2xl font-bold text-red-700">
            R$ {totalAmount.toLocaleString('pt-BR')}
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-800 font-medium">Já Pago</div>
          <div className="text-2xl font-bold text-green-700">
            R$ {paidAmount.toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Conta</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fixedExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{expense.category}</Badge>
              </TableCell>
              <TableCell className="font-semibold">
                R$ {expense.amount.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell>
                {format(new Date(expense.dueDate), "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={expense.isPaid ? "default" : "destructive"}
                  className={expense.isPaid ? "bg-green-100 text-green-800 border-green-300" : ""}
                >
                  {expense.isPaid ? "Pago" : "Pendente"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTogglePayment(expense.id)}
                    className={expense.isPaid ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditFixedExpense(expense)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteFixedExpense(expense.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
