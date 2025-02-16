import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface CartaoEstatisticaProps {
  titulo: string;
  descricao: string;
  valor: string | number;
  icone: LucideIcon;
  tendencia?: {
    valor: string;
    icone: LucideIcon;
  };
}

export function CartaoEstatistica({
  titulo,
  descricao,
  valor,
  icone: Icone,
  tendencia,
}: CartaoEstatisticaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-semibold">{valor}</div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Icone className="h-6 w-6 text-primary" />
          </div>
        </div>
        {tendencia && (
          <div className="text-sm text-primary mt-2">
            <tendencia.icone className="h-4 w-4 inline mr-1" />
            {tendencia.valor}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
