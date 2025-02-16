import { useState } from "react";
import { Ambulance, EmergencyCall } from "../types";

interface UseDispatchPanelProps {
  ambulances: Ambulance[];
  selectedCall: EmergencyCall | null;
  selectedAmbulance: Ambulance | null;
  onAmbulanceSelect: (ambulance: Ambulance | null) => void;
  handleDispatch: (ambulanceId: string, callId: string) => void;
}

export const useDispatchPanel = ({
  ambulances,
  selectedCall,
  selectedAmbulance,
  onAmbulanceSelect,
  handleDispatch,
}: UseDispatchPanelProps) => {
  const handleAmbulanceSelect = (ambulance: Ambulance) => {
    onAmbulanceSelect(ambulance);
  };

  const handleDispatchClick = (ambulance: Ambulance) => {
    if (!selectedCall) return;
    handleDispatch(ambulance.id, selectedCall.id);
  };

  const availableAmbulances = ambulances.filter(
    (ambulance) => ambulance.status === "available"
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critica":
        return "text-red-600";
      case "alta":
        return "text-orange-500";
      case "media":
        return "text-yellow-500";
      case "baixa":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return {
    availableAmbulances,
    handleAmbulanceSelect,
    handleDispatchClick,
    getSeverityColor,
  };
};
