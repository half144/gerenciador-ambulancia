import { EmergencyCall } from "../types";

export const useCallList = () => {
  const getSeverityColor = (severity: EmergencyCall["severity"]) => {
    switch (severity) {
      case "critica":
        return "bg-red-600";
      case "alta":
        return "bg-orange-500";
      case "media":
        return "bg-yellow-500";
      case "baixa":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: EmergencyCall["status"]) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-500";
      case "atribuido":
        return "bg-blue-500";
      case "em_andamento":
        return "bg-green-500";
      case "concluido":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return {
    getSeverityColor,
    getStatusColor,
  };
};
