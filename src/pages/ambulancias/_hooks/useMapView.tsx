import { useEffect, useRef } from "react";
import L from "leaflet";
import { Ambulance, EmergencyCall } from "../types";
import { MapContainer } from "react-leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export const useMapView = (
  selectedCall: EmergencyCall | null,
  onCallSelect: (call: EmergencyCall | null) => void,
  selectedAmbulance: Ambulance | null
) => {
  const mapRef = useRef<L.Map | null>(null);

  const center: [number, number] = [-19.9167, -43.9345];

  useEffect(() => {
    if (!mapRef.current) return;

    // Se tiver uma ambulância selecionada, prioriza ela
    if (selectedAmbulance) {
      mapRef.current.flyTo(
        [selectedAmbulance.location.lat, selectedAmbulance.location.lng],
        15,
        { duration: 0.5 }
      );
      return;
    }

    // Se não tiver ambulância selecionada mas tiver chamado, vai para o chamado
    if (selectedCall) {
      mapRef.current.flyTo(
        [selectedCall.location.lat, selectedCall.location.lng],
        15,
        { duration: 0.5 }
      );
      return;
    }

    // Se não tiver nada selecionado, volta para o centro
    mapRef.current.flyTo(center, 13, { duration: 0.5 });
  }, [selectedAmbulance, selectedCall]);

  const handleCallClick = (call: EmergencyCall) => {
    if (selectedCall?.id === call.id) {
      onCallSelect(null);
    } else {
      onCallSelect(call);
    }
  };

  const createAmbulanceIcon = (status: string, isSelected: boolean = false) => {
    const color =
      status === "available"
        ? "#22c55e"
        : status === "busy"
        ? "#dc2626"
        : "#9ca3af";

    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white" ${
            isSelected ? 'stroke="#000" stroke-width="3"' : ""
          }/>
          <path d="M36 16H12c-2.21 0-4 1.79-4 4v12h4v4h24v-4h4V20c0-2.21-1.79-4-4-4zm-4 16H16v-4h16v4zm4-8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4-8H16v-4h16v4z" fill="${color}"/>
          <path d="M12 20h24v12H12z" fill="${color}"/>
          <path d="M20 24h8v2h-8z" fill="white"/>
          <path d="M23 21v8h2v-8z" fill="white"/>
        </svg>`,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24],
    });
  };

  const createEmergencyIcon = (
    severity: string,
    isSelected: boolean = false
  ) => {
    const color =
      severity === "critica"
        ? "#dc2626" // red-600
        : severity === "alta"
        ? "#ea580c" // orange-500
        : severity === "media"
        ? "#eab308" // yellow-500
        : severity === "baixa"
        ? "#3b82f6" // blue-500
        : "#6b7280"; // gray-500

    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white" ${
            isSelected ? 'stroke="#000" stroke-width="3"' : ""
          }/>
          <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" fill="${color}"/>
          <path d="M24 12c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2s2-.9 2-2V14c0-1.1-.9-2-2-2zm0 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="${color}"/>
        </svg>`,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24],
    });
  };

  return {
    center,
    handleCallClick,
    createAmbulanceIcon,
    createEmergencyIcon,
    mapRef,
  };
};
