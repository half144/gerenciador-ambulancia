import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { MapView } from "./_components/map-view";
import { CallList } from "./_components/call-list";
import { DispatchPanel } from "./_components/dispatch-panel";
import { PageWrapper } from "../../components/core/page-wrapper";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useAmbulanciaPage } from "./_hooks/useAmbulanciaPage";

export const Ambulancias = () => {
  const navigate = useNavigate();
  const {
    ambulances,
    calls,
    selectedCall,
    setSelectedCall,
    selectedAmbulance,
    setSelectedAmbulance,
    handleDispatch,
  } = useAmbulanciaPage();

  const actions = (
    <Button
      variant="outline"
      size="icon"
      onClick={() => navigate("/dashboard")}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );

  return (
    <PageWrapper title="Controle de Ambulâncias" actions={actions}>
      <div className="h-full">
        <div className="grid h-full grid-cols-[1fr_400px] gap-4">
          <Tabs defaultValue="map" className="flex flex-col h-full">
            <TabsList>
              <TabsTrigger value="map">Mapa</TabsTrigger>
              <TabsTrigger value="list">Lista de Chamados</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="flex-1 min-h-0 mt-0">
              <MapView
                ambulances={ambulances}
                emergencyCalls={calls}
                selectedCall={selectedCall}
                onCallSelect={setSelectedCall}
                selectedAmbulance={selectedAmbulance}
                onAmbulanceSelect={setSelectedAmbulance}
              />
            </TabsContent>

            <TabsContent value="list" className="flex-1 min-h-0 mt-0">
              <CallList
                calls={calls}
                selectedCall={selectedCall}
                onCallSelect={setSelectedCall}
              />
            </TabsContent>
          </Tabs>

          <DispatchPanel
            ambulances={ambulances}
            selectedCall={selectedCall}
            onDispatch={handleDispatch}
            selectedAmbulance={selectedAmbulance}
            onAmbulanceSelect={setSelectedAmbulance}
          />
        </div>
      </div>
    </PageWrapper>
  );
};
