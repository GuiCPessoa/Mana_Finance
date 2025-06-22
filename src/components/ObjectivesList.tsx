
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2 } from "lucide-react";

interface ObjectivesListProps {
  objectives: Array<{
    id: number;
    title: string;
    target: number;
    current: number;
    emoji: string;
  }>;
  onEditObjective: (objective: any) => void;
  onDeleteObjective: (id: number) => void;
}

export const ObjectivesList = ({ objectives, onEditObjective, onDeleteObjective }: ObjectivesListProps) => {
  if (objectives.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum objetivo criado</p>
        <p className="text-sm">Crie seu primeiro objetivo financeiro!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="space-y-4 pr-4">
        {objectives.map((objective) => {
          const progress = (objective.current / objective.target) * 100;
          
          return (
            <div
              key={objective.id}
              className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{objective.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{objective.title}</h4>
                  <p className="text-sm text-gray-600">
                    R$ {objective.current.toLocaleString('pt-BR')} de R$ {objective.target.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditObjective(objective)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir objetivo</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o objetivo "{objective.title}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteObjective(objective.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              <Progress 
                value={progress} 
                className="h-3"
              />
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Progresso atual</span>
                <span>Faltam R$ {(objective.target - objective.current).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
