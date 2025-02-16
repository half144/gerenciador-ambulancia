import { ListTodo } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface Tarefa {
  titulo: string;
  prazo: string;
}

interface ListaTarefasProps {
  tarefas: Tarefa[];
}

export function ListaTarefas({ tarefas }: ListaTarefasProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas Pendentes</CardTitle>
        <CardDescription>Suas próximas tarefas e afazeres</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tarefas.map((tarefa, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <ListTodo className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{tarefa.titulo}</h3>
                <p className="text-sm text-gray-500">{tarefa.prazo}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver Todas as Tarefas
        </Button>
      </CardFooter>
    </Card>
  );
}
