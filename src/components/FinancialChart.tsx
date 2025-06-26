import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '@/components/theme-provider';
import { useEffect, useState } from 'react';

const getChartColors = () => {
  return [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
  ];
};

interface FinancialChartProps {
  transactions: Array<{
    type: string;
    category: string;
    amount: number;
  }>;
}

export const FinancialChart = ({ transactions }: FinancialChartProps) => {
  const { theme } = useTheme();
  const [chartColors, setChartColors] = useState(getChartColors());

  // As cores são definidas no CSS e podem não estar disponíveis imediatamente.
  // Este efeito garante que as cores sejam recarregadas quando o tema muda.
  useEffect(() => {
    setChartColors(getChartColors());
  }, [theme]);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const incomesByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const expenseData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const incomeData = Object.entries(incomesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);

  if (expenseData.length === 0 && incomeData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma transação para exibir</p>
        <p className="text-sm">Adicione algumas transações para ver os gráficos</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Gráfico de Despesas */}
      {expenseData.length > 0 && (
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Despesas por Categoria</h3>
          <div className="flex items-center gap-8">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))'
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 space-y-3">
              {expenseData.map((entry, index) => {
                const percentage = ((entry.value / totalExpenses) * 100).toFixed(1);
                return (
                  <div key={entry.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: chartColors[index % chartColors.length] }}
                      />
                      <span className="text-muted-foreground font-medium">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">R$ {entry.value.toLocaleString('pt-BR')}</div>
                      <div className="text-sm text-muted-foreground">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Gráfico de Receitas */}
      {incomeData.length > 0 && (
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Receitas por Categoria</h3>
          <div className="flex items-center gap-8">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))'
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 space-y-3">
              {incomeData.map((entry, index) => {
                const percentage = ((entry.value / totalIncome) * 100).toFixed(1);
                return (
                  <div key={entry.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: chartColors[index % chartColors.length] }}
                      />
                      <span className="text-muted-foreground font-medium">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">R$ {entry.value.toLocaleString('pt-BR')}</div>
                      <div className="text-sm text-muted-foreground">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
