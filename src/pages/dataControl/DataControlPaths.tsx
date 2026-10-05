import routes from "../../data/dataControlData.json";
import DataControlPathLine from "./DartaControlPathLine";

export type RouteInfo = {
  id: number;
  number: string;
  name: string;
  driver: string;
  mode: string;
  status: string;
  passengers: number;
  departures: number;
  updated: string;
};

function DataControlPaths() {
  const activeRoutes = (routes as RouteInfo[]).filter(
    (route) => route.status === "активный",
  );

  return (
    <section className="active-routes">
      <div className="active-routes-header">
        <p className="text-muted font-mono">Активные маршруты</p>
        <span className="active-routes-count">{activeRoutes.length}</span>
      </div>
      {activeRoutes.map((route) => (
        <DataControlPathLine key={route.id} route={route} />
      ))}
    </section>
  );
}

export default DataControlPaths;
