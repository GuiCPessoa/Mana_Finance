
import { Progress } from "@/components/ui/progress";

export const ObjectivesList = ({ objectives }) => {
  if (objectives.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum objetivo criado</p>
        <p className="text-sm">Crie seu primeiro objetivo financeiro!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">
                  {progress.toFixed(0)}%
                </span>
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
  );
};
