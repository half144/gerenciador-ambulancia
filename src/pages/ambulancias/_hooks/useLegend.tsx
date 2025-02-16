interface LegendItem {
  color: string;
  label: string;
}

export const useLegend = () => {
  const ambulanceStatuses: LegendItem[] = [
    { color: "bg-green-500", label: "Disponível" },
    { color: "bg-red-500", label: "Ocupada" },
  ];

  const callSeverities: LegendItem[] = [
    { color: "bg-red-600", label: "Crítica" },
    { color: "bg-orange-500", label: "Alta" },
    { color: "bg-yellow-500", label: "Média" },
    { color: "bg-blue-500", label: "Baixa" },
  ];

  return {
    ambulanceStatuses,
    callSeverities,
  };
};
