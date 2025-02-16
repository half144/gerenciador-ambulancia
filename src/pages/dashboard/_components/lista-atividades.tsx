import { Activity } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface ItemAtividade {
  titulo: string;
  tempo: string;
}

interface ListaAtividadesProps {
  atividades: ItemAtividade[];
}

export function ListaAtividades({ atividades }: ListaAtividadesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>
          Suas últimas atualizações no dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {atividades.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border"
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{item.titulo}</h3>
                <p className="text-sm text-gray-500">{item.tempo}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver Todas as Atividades
        </Button>
      </CardFooter>
    </Card>
  );
}
