import type { RouteInfo } from "./DataControlPaths";

export default function DataControlPathLine({ route }: { route: RouteInfo }) {
  return (
    <div className="route-line border-t">
      <p className="route-line-number font-mono">{route.number}</p>
      <div className="route-line-route">
        <p className="bold">{route.name}</p>
        <p className="text-muted">{route.driver}</p>
      </div>
      <span className="route-line-mode">{route.mode}</span>
      <div className="route-line-stats">
        <p>
          {route.passengers.toLocaleString("ru-RU")}{" "}
          <span className="text-muted">пассажиров</span>
        </p>
        <p>
          {route.departures} <span className="text-muted">рейсов</span>
        </p>
      </div>
      <div className="route-line-meta">
        <span className="route-line-status">
          <span className="status-dot" />
          {route.status}
        </span>
        <p className="text-muted">{route.updated}</p>
      </div>
    </div>
  );
}
