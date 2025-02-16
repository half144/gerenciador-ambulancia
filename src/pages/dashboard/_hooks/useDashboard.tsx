import {
  Ambulance,
  Clock,
  Activity,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

interface DashboardData {
  atividades: Array<{
    titulo: string;
    tempo: string;
  }>;
  tarefas: Array<{
    titulo: string;
    prazo: string;
  }>;
  estatisticas: Array<{
    titulo: string;
    descricao: string;
    valor: string;
    icone: any;
    tendencia?: {
      valor: string;
      icone: any;
    };
  }>;
  ambulancias: Array<{
    id: string;
    placa: string;
    status: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
    equipe: string;
  }>;
  despacharAmbulancia: (id: string) => void;
}

export function useDashboard(): DashboardData {
  const atividades = [
    {
      titulo: "Ambulância 123 despachada para atendimento",
      tempo: "2 minutos atrás",
    },
    { titulo: "Chamado #456 finalizado com sucesso", tempo: "5 minutos atrás" },
    { titulo: "Nova equipe iniciou plantão", tempo: "15 minutos atrás" },
    {
      titulo: "Manutenção preventiva realizada - Ambulância 789",
      tempo: "30 minutos atrás",
    },
    { titulo: "Troca de turno das equipes concluída", tempo: "1 hora atrás" },
  ];

  const tarefas = [
    { titulo: "Realizar checklist das ambulâncias", prazo: "Prazo em 2 horas" },
    { titulo: "Revisar escalas da próxima semana", prazo: "Prazo em 1 dia" },
    {
      titulo: "Manutenção programada - Ambulância 456",
      prazo: "Prazo em 2 dias",
    },
    { titulo: "Atualizar documentação das equipes", prazo: "Prazo em 3 dias" },
  ];

  const estatisticas = [
    {
      titulo: "Chamados Atendidos",
      descricao: "Total nas últimas 24h",
      valor: "47",
      icone: CheckCircle2,
      tendencia: {
        valor: "+12%",
        icone: TrendingUp,
      },
    },
    {
      titulo: "Tempo Médio",
      descricao: "Resposta aos chamados",
      valor: "8.5 min",
      icone: Clock,
      tendencia: {
        valor: "-15%",
        icone: TrendingUp,
      },
    },
    {
      titulo: "Ambulâncias Ativas",
      descricao: "Em operação agora",
      valor: "12/15",
      icone: Ambulance,
      tendencia: {
        valor: "80%",
        icone: Activity,
      },
    },
    {
      titulo: "Equipes em Campo",
      descricao: "Profissionais em atendimento",
      valor: "28",
      icone: Users,
      tendencia: {
        valor: "100%",
        icone: Activity,
      },
    },
  ];

  const ambulancias = [
    {
      id: "1",
      placa: "ABC-1234",
      status: "disponível",
      coordenadas: {
        lat: -23.55052,
        lng: -46.633308,
      },
      equipe: "Equipe Alpha",
    },
    {
      id: "2",
      placa: "DEF-5678",
      status: "em_deslocamento",
      coordenadas: {
        lat: -23.555098,
        lng: -46.640191,
      },
      equipe: "Equipe Beta",
    },
    {
      id: "3",
      placa: "GHI-9012",
      status: "disponível",
      coordenadas: {
        lat: -23.547099,
        lng: -46.628908,
      },
      equipe: "Equipe Gamma",
    },
  ];

  const despacharAmbulancia = (id: string) => {
    console.log(`Despachando ambulância ${id}`);
  };

  return {
    atividades,
    tarefas,
    estatisticas,
    ambulancias,
    despacharAmbulancia,
  };
}
