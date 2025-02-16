export interface Ambulance {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  status: "available" | "busy";
  crew: string[];
}

export interface EmergencyCall {
  id: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: "baixa" | "media" | "alta" | "critica";
  patientDetails: {
    name: string;
    age?: number;
    condition: string;
  };
  status: "pendente" | "atribuido" | "em_andamento" | "concluido";
  assignedAmbulanceId?: string;
}
