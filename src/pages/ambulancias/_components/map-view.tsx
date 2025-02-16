import { Ambulance, EmergencyCall } from "../types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../../../components/ui/button";
import { useMapView } from "../_hooks/useMapView";
import { MapLegend } from "./map-legend";

interface MapViewProps {
  ambulances: Ambulance[];
  emergencyCalls: EmergencyCall[];
  selectedCall: EmergencyCall | null;
  onCallSelect: (call: EmergencyCall | null) => void;
  selectedAmbulance: Ambulance | null;
  onAmbulanceSelect: (ambulance: Ambulance | null) => void;
}

export const MapView = ({
  ambulances,
  emergencyCalls,
  selectedCall,
  onCallSelect,
  selectedAmbulance,
  onAmbulanceSelect,
}: MapViewProps) => {
  const {
    center,
    handleCallClick,
    createAmbulanceIcon,
    createEmergencyIcon,
    mapRef,
  } = useMapView(selectedCall, onCallSelect, selectedAmbulance);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mapa de Ambulâncias</h2>
        <MapLegend />
      </div>

      <div className="w-full flex-1 rounded-lg border overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={19}
            subdomains="abcd"
          />

          {/* Ambulance Markers */}
          {ambulances.map((ambulance) => (
            <Marker
              key={ambulance.id}
              position={[ambulance.location.lat, ambulance.location.lng]}
              icon={createAmbulanceIcon(
                ambulance.status,
                selectedAmbulance?.id === ambulance.id
              )}
            >
              <Popup>
                <div className="p-2 text-sm">
                  <p className="font-semibold">{ambulance.id}</p>
                  <p>Equipe: {ambulance.crew.join(", ")}</p>
                  <p>Status: {ambulance.status}</p>
                  <Button
                    onClick={() => onAmbulanceSelect(ambulance)}
                    className="w-full mt-2"
                    variant={
                      selectedAmbulance?.id === ambulance.id
                        ? "default"
                        : "outline"
                    }
                  >
                    {selectedAmbulance?.id === ambulance.id
                      ? "Desselecionar"
                      : "Visualizar no Mapa"}
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Emergency Call Markers */}
          {emergencyCalls.map((call) => (
            <Marker
              key={call.id}
              position={[call.location.lat, call.location.lng]}
              icon={createEmergencyIcon(
                call.severity,
                selectedCall?.id === call.id
              )}
            >
              <Popup>
                <div className="p-2 text-sm">
                  <p className="font-semibold">{call.id}</p>
                  <p>Severidade: {call.severity}</p>
                  <p>Endereço: {call.location.address}</p>
                  <p>Paciente: {call.patientDetails.name}</p>
                  <p>Condição: {call.patientDetails.condition}</p>
                  <Button
                    onClick={() => handleCallClick(call)}
                    className="w-full mt-2"
                    variant={
                      selectedCall?.id === call.id ? "default" : "outline"
                    }
                  >
                    {selectedCall?.id === call.id
                      ? "Desselecionar"
                      : "Selecionar Chamado"}
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
