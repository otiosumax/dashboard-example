import type { RouteInfo } from "./routeRegistry";

const MODE_VARIANTS: { [mode: string]: string } = {
  метро: "violet",
  автобус: "blue",
  троллейбус: "teal",
  трамвай: "amber",
  электробус: "green",
};

const STATUS_VARIANTS: { [status: string]: string } = {
  активный: "success",
  "на проверке": "warning",
  приостановлен: "danger",
};

export default function DataControlPathLine({
  route,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: {
  route: RouteInfo;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className={`route-row ${isSelected ? "selected" : ""}`}>
      <td className="cell-checkbox">
        <input
          className="table-checkbox"
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          aria-label={`Выбрать маршрут ${route.number}`}
        />
      </td>

      <td className="route-number font-mono">{route.number}</td>
      <td className="route-name bold">{route.name}</td>
      <td className="route-driver text-muted">{route.driver}</td>

      <td>
        <span className={`mode-chip ${MODE_VARIANTS[route.mode] ?? "neutral"}`}>
          {route.mode}
        </span>
      </td>

      <td>
        <span
          className={`status-chip ${
            STATUS_VARIANTS[route.status] ?? "neutral"
          }`}
        >
          <span className="status-dot" />
          {route.status}
        </span>
      </td>

      <td className="route-stat font-mono">
        {route.passengers.toLocaleString("ru-RU")}
      </td>
      <td className="route-stat text-muted font-mono">
        {route.departures.toLocaleString("ru-RU")}
      </td>
      <td className="route-updated text-muted font-mono">{route.updated}</td>

      <td>
        <div className="route-actions">
          <button className="table-action" type="button" onClick={onEdit}>
            Ред.
          </button>
          <button className="table-action" type="button" onClick={onDelete}>
            Уд.
          </button>
        </div>
      </td>
    </tr>
  );
}
