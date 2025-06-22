
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditObjectiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  objective: {
    id: number;
    title: string;
    target: number;
    current: number;
    emoji: string;
  } | null;
  onEditObjective: (id: number, objective: any) => void;
}

export const EditObjectiveDialog = ({ open, onOpenChange, objective, onEditObjective }: EditObjectiveDialogProps) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [emoji, setEmoji] = useState("");

  useState(() => {
    if (objective) {
      setTitle(objective.title);
      setTarget(objective.target.toString());
      setCurrent(objective.current.toString());
      setEmoji(objective.emoji);
    }
  }, [objective]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!objective || !title || !target) return;

    onEditObjective(objective.id, {
      title,
      target: parseFloat(target),
      current: parseFloat(current) || 0,
      emoji
    });

    onOpenChange(false);
  };

  if (!objective) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Objetivo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Objetivo</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Viagem de férias"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emoji">Emoji</Label>
            <Input
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="✈️"
              maxLength={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Valor Alvo (R$)</Label>
            <Input
              id="target"
              type="number"
              step="0.01"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current">Valor Atual (R$)</Label>
            <Input
              id="current"
              type="number"
              step="0.01"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
