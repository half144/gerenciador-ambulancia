import { useState } from "react";
import { Ambulance, EmergencyCall } from "../types";

const mockAmbulances: Ambulance[] = [
  {
    id: "AMB-101",
    location: { lat: -19.9348, lng: -43.9361 },
    status: "available",
    crew: ["Dr. André Santos", "Enf. Mariana Costa"],
  },
  {
    id: "AMB-102",
    location: { lat: -19.9173, lng: -43.9346 },
    status: "busy",
    crew: ["Dr. Renata Oliveira", "Enf. Lucas Mendes", "Téc. João Silva"],
  },
  {
    id: "AMB-103",
    location: { lat: -19.9543, lng: -43.9388 },
    status: "available",
    crew: ["Dra. Carla Rodrigues", "Enf. Patricia Lima", "Téc. Ana Paula"],
  },
  {
    id: "AMB-105",
    location: { lat: -19.9512, lng: -43.9128 },
    status: "busy",
    crew: ["Dr. Marcelo Alves", "Enf. Juliana Santos", "Téc. Roberto Carlos"],
  },
  {
    id: "AMB-106",
    location: { lat: -19.9321, lng: -43.9326 },
    status: "available",
    crew: ["Dra. Fernanda Lima", "Enf. Ricardo Souza"],
  },
  {
    id: "AMB-107",
    location: { lat: -19.9132, lng: -43.9182 },
    status: "available",
    crew: ["Dr. Bruno Costa", "Enf. Carolina Martins", "Téc. Pedro Henrique"],
  },
  {
    id: "AMB-108",
    location: { lat: -19.9697, lng: -43.9687 },
    status: "busy",
    crew: ["Dra. Amanda Rocha", "Enf. Thais Silva", "Téc. Miguel Santos"],
  },
];

const mockCalls: EmergencyCall[] = [
  {
    id: "EMG-2024-001",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    location: {
      lat: -19.9278,
      lng: -43.9421,
      address: "R. São Paulo, 824 - Centro, Belo Horizonte",
    },
    severity: "critica",
    patientDetails: {
      name: "Antonio Carlos da Silva",
      age: 58,
      condition:
        "Dor torácica intensa, sudorese e falta de ar. Suspeita de infarto agudo do miocárdio.",
    },
    status: "pendente",
  },
  {
    id: "EMG-2024-002",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    location: {
      lat: -19.8612,
      lng: -43.9708,
      address: "Av. Antônio Carlos, 6627 - Pampulha, Belo Horizonte",
    },
    severity: "alta",
    patientDetails: {
      name: "Maria Aparecida Santos",
      age: 72,
      condition:
        "Queda da própria altura com trauma craniano leve e corte na região frontal.",
    },
    status: "pendente",
  },
  {
    id: "EMG-2024-003",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    location: {
      lat: -19.9589,
      lng: -43.9787,
      address: "R. Henrique Badaró Portugal, 111 - Buritis, Belo Horizonte",
    },
    severity: "critica",
    patientDetails: {
      name: "Bebê Silva",
      age: 0,
      condition:
        "Recém-nascido (2 horas) com cianose e dificuldade respiratória grave.",
    },
    status: "pendente",
  },
  {
    id: "EMG-2024-004",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    location: {
      lat: -19.9412,
      lng: -43.9338,
      address: "R. Tomé de Souza, 350 - Funcionários, Belo Horizonte",
    },
    severity: "media",
    patientDetails: {
      name: "Pedro Henrique Oliveira",
      age: 25,
      condition:
        "Crise de asma moderada com dispneia e sibilos. Histórico de asma.",
    },
    status: "pendente",
  },
  {
    id: "EMG-2024-005",
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
    location: {
      lat: -19.9201,
      lng: -43.9137,
      address: "R. Padre Eustáquio, 1525 - Padre Eustáquio, Belo Horizonte",
    },
    severity: "alta",
    patientDetails: {
      name: "Luisa Ferreira Costa",
      age: 45,
      condition:
        "Convulsão tônico-clônica há 10 minutos. Histórico de epilepsia.",
    },
    status: "pendente",
  },
];

export const useAmbulanciaPage = () => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>(mockAmbulances);
  const [calls, setCalls] = useState<EmergencyCall[]>(mockCalls);
  const [selectedCall, setSelectedCall] = useState<EmergencyCall | null>(null);
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(
    null
  );

  const handleDispatch = (ambulanceId: string, callId: string) => {
    setAmbulances((prev) =>
      prev.map((amb) =>
        amb.id === ambulanceId ? { ...amb, status: "busy" } : amb
      )
    );

    setCalls((prev) => {
      const updatedCalls = prev.map((call) =>
        call.id === callId
          ? {
              ...call,
              status: "atribuido" as const,
              assignedAmbulanceId: ambulanceId,
            }
          : call
      );

      if (selectedCall?.id === callId) {
        setSelectedCall(
          updatedCalls.find((call) => call.id === callId) || null
        );
      }

      setSelectedAmbulance(null);

      return updatedCalls;
    });
  };

  return {
    ambulances,
    calls,
    selectedCall,
    setSelectedCall,
    selectedAmbulance,
    setSelectedAmbulance,
    handleDispatch,
  };
};
