import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { useCallList } from "../_hooks/useCallList";
import type { EmergencyCall } from "../types";

interface CallListProps {
  calls: EmergencyCall[];
  selectedCall: EmergencyCall | null;
  onCallSelect: (call: EmergencyCall) => void;
}

export const CallList = ({
  calls,
  selectedCall,
  onCallSelect,
}: CallListProps) => {
  const { getSeverityColor, getStatusColor } = useCallList();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chamados de Emergência</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Severidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ambulância</TableHead>
            <TableHead>Endereço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow
              key={call.id}
              className={`cursor-pointer hover:bg-gray-100 ${
                selectedCall?.id === call.id ? "bg-blue-50" : ""
              }`}
              onClick={() => onCallSelect(call)}
            >
              <TableCell>{call.id}</TableCell>
              <TableCell>{call.timestamp.toLocaleTimeString()}</TableCell>
              <TableCell>
                <Badge className={getSeverityColor(call.severity)}>
                  {call.severity.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(call.status)}>
                  {call.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                {call.assignedAmbulanceId ? (
                  <Badge variant="secondary">{call.assignedAmbulanceId}</Badge>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{call.location.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
