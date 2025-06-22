
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emojis = ["💰", "🏠", "🚗", "✈️", "🎓", "💍", "🏖️", "🛡️", "📱", "💻"];

export const AddObjectiveDialog = ({ open, onOpenChange, onAddObjective }) => {
  const [formData, setFormData] = useState({
    title: "",
    target: "",
    current: "",
    emoji: "💰"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) return;

    onAddObjective({
      ...formData,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current) || 0
    });

    setFormData({
      title: "",
      target: "",
      current: "",
      emoji: "💰"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Novo Objetivo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Objetivo</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Viagem de Férias"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Meta (R$)</Label>
            <Input
              id="target"
              type="number"
              step="0.01"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current">Valor Atual (R$)</Label>
            <Input
              id="current"
              type="number"
              step="0.01"
              value={formData.current}
              onChange={(e) => setFormData({...formData, current: e.target.value})}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label>Emoji</Label>
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({...formData, emoji})}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all duration-200 ${
                    formData.emoji === emoji 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Criar Objetivo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
