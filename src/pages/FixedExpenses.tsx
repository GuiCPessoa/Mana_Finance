
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { AddFixedExpenseDialog } from "@/components/AddFixedExpenseDialog";
import { EditFixedExpenseDialog } from "@/components/EditFixedExpenseDialog";
import { FixedExpensesList } from "@/components/FixedExpensesList";
import { useAppContext } from "@/contexts/AppContext";

const FixedExpenses = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const {
    fixedExpenses,
    addFixedExpense,
    editFixedExpense,
    deleteFixedExpense,
    toggleFixedExpensePayment
  } = useAppContext();

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowEditDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
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
                Contas Fixas
              </h1>
              <p className="text-slate-600">Gerencie suas despesas recorrentes mensais</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta Fixa
          </Button>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-blue-600" />
              Suas Contas Fixas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FixedExpensesList 
              fixedExpenses={fixedExpenses}
              onEditFixedExpense={handleEditExpense}
              onDeleteFixedExpense={deleteFixedExpense}
              onTogglePayment={toggleFixedExpensePayment}
            />
          </CardContent>
        </Card>

        {/* Dialogs */}
        <AddFixedExpenseDialog 
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddFixedExpense={addFixedExpense}
        />
        
        <EditFixedExpenseDialog 
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          fixedExpense={editingExpense}
          onEditFixedExpense={editFixedExpense}
        />
      </div>
    </div>
  );
};

export default FixedExpenses;
