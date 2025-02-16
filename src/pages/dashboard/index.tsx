import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Calendar, ListTodo, Activity, Ambulance, Clock } from "lucide-react";
import { CartaoEstatistica } from "./_components/cartao-estatistica";
import { ListaAtividades } from "./_components/lista-atividades";
import { ListaTarefas } from "./_components/lista-tarefas";
import { useDashboard } from "./_hooks/useDashboard";
import { PageWrapper } from "../../components/core/page-wrapper";

export function Dashboard() {
  const { atividades, tarefas, estatisticas } = useDashboard();

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Clock className="mr-2 h-4 w-4" />
        Histórico de Chamados
      </Button>
      <Button>
        <Calendar className="mr-2 h-4 w-4" />
        Relatório de Operações
      </Button>
    </div>
  );

  return (
    <PageWrapper title="Dashboard Operacional" actions={actions}>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            <Ambulance className="h-4 w-4 mr-2" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="h-4 w-4 mr-2" />
            Atividades
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <ListTodo className="h-4 w-4 mr-2" />
            Tarefas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {estatisticas.map((estatistica, index) => (
              <CartaoEstatistica
                key={index}
                titulo={estatistica.titulo}
                descricao={estatistica.descricao}
                valor={estatistica.valor}
                icone={estatistica.icone}
                tendencia={estatistica.tendencia}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <ListaAtividades atividades={atividades} />
        </TabsContent>

        <TabsContent value="tasks">
          <ListaTarefas tarefas={tarefas} />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
