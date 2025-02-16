import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Ambulance, EmergencyCall } from "../types";
import { Eye, EyeOff } from "lucide-react";
import { useDispatchPanel } from "../_hooks/useDispatchPanel";

interface DispatchPanelProps {
  ambulances: Ambulance[];
  selectedCall: EmergencyCall | null;
  onDispatch: (ambulanceId: string, callId: string) => void;
  selectedAmbulance: Ambulance | null;
  onAmbulanceSelect: (ambulance: Ambulance | null) => void;
}

export const DispatchPanel = ({
  ambulances,
  selectedCall,
  onDispatch,
  selectedAmbulance,
  onAmbulanceSelect,
}: DispatchPanelProps) => {
  const { availableAmbulances, handleDispatchClick, getSeverityColor } =
    useDispatchPanel({
      ambulances,
      selectedCall,
      selectedAmbulance,
      onAmbulanceSelect,
      handleDispatch: onDispatch,
    });

  if (!selectedCall) {
    return (
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Painel de Despacho</h2>
        <p className="text-gray-500">
          Selecione um chamado para despachar uma ambulância
        </p>
      </Card>
    );
  }

  // Se o chamado já tem uma ambulância atribuída, mostra mensagem
  if (selectedCall.assignedAmbulanceId) {
    return (
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Painel de Despacho</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Detalhes do Chamado</h3>
            <div className="space-y-1">
              <p>
                <span className="font-medium">ID:</span> {selectedCall.id}
              </p>
              <p>
                <span className="font-medium">Ambulância Atribuída:</span>{" "}
                <Badge variant="secondary">
                  {selectedCall.assignedAmbulanceId}
                </Badge>
              </p>
            </div>
          </div>
          <p className="text-yellow-600">
            Este chamado já possui uma ambulância atribuída.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Painel de Despacho</h2>

      <div className="space-y-2">
        <h3 className="font-medium">Detalhes do Chamado</h3>
        <div className="space-y-1">
          <p>
            <span className="font-medium">ID:</span> {selectedCall.id}
          </p>
          <p>
            <span className="font-medium">Severidade:</span>{" "}
            <Badge className={getSeverityColor(selectedCall.severity)}>
              {selectedCall.severity.toUpperCase()}
            </Badge>
          </p>
          <p>
            <span className="font-medium">Paciente:</span>{" "}
            {selectedCall.patientDetails.name}
          </p>
          <p>
            <span className="font-medium">Condição:</span>{" "}
            {selectedCall.patientDetails.condition}
          </p>
          <p>
            <span className="font-medium">Endereço:</span>{" "}
            {selectedCall.location.address}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Ambulâncias Disponíveis</h3>
        {availableAmbulances.length === 0 ? (
          <p className="text-red-500">
            Nenhuma ambulância disponível no momento
          </p>
        ) : (
          <div className="space-y-2">
            {availableAmbulances.map((ambulance) => (
              <Card key={ambulance.id} className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{ambulance.id}</p>
                    <p className="text-sm text-gray-500">
                      Equipe: {ambulance.crew.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        selectedAmbulance?.id === ambulance.id
                          ? "default"
                          : "outline"
                      }
                      size="icon"
                      onClick={() =>
                        selectedAmbulance?.id === ambulance.id
                          ? onAmbulanceSelect(null)
                          : onAmbulanceSelect(ambulance)
                      }
                      title={
                        selectedAmbulance?.id === ambulance.id
                          ? "Ocultar no mapa"
                          : "Visualizar no mapa"
                      }
                    >
                      {selectedAmbulance?.id === ambulance.id ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button onClick={() => handleDispatchClick(ambulance)}>
                      Despachar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
