import { useLegend } from "../_hooks/useLegend";

export const MapLegend = () => {
  const { ambulanceStatuses, callSeverities } = useLegend();

  return (
    <div className="flex gap-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Status das Ambulâncias</h3>
        <div className="flex gap-4">
          {ambulanceStatuses.map((status) => (
            <div key={status.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span className="text-sm">{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Severidade dos Chamados</h3>
        <div className="flex gap-4">
          {callSeverities.map((severity) => (
            <div key={severity.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${severity.color}`} />
              <span className="text-sm">{severity.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
