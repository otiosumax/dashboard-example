import "./DataControlView.css";

import { useMemo, useState, type ReactNode } from "react";

import Card from "../../shared/statisticsCard/Card";
import Modal from "../../shared/modal/Modal";
import DataControlPaths from "./DataControlPaths";
import RouteFormModal from "./RouteFormModal";
import {
  addRoute,
  ALL_OPTION,
  filterRoutes,
  getFilterOptions,
  initialFilters,
  initialRoutes,
  removeRoutes,
  updateRoute,
  type RouteDraft,
  type RouteFilters,
  type RouteInfo,
} from "./routeRegistry";

type ModalState =
  | { kind: "create" }
  | { kind: "edit"; route: RouteInfo }
  | { kind: "delete"; ids: number[] }
  | null;

function DataControlView() {
  const [routeList, setRouteList] = useState<RouteInfo[]>(initialRoutes);
  const [filters, setFilters] = useState<RouteFilters>(initialFilters);
  const [modal, setModal] = useState<ModalState>(null);

  const filteredRoutes = useMemo(
    () => filterRoutes(routeList, filters),
    [routeList, filters],
  );

  const statusOptions = useMemo(
    () => getFilterOptions(routeList, "status"),
    [routeList],
  );
  const modeOptions = useMemo(
    () => getFilterOptions(routeList, "mode"),
    [routeList],
  );

  const setFilter = (key: keyof RouteFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (draft: RouteDraft) => {
    setRouteList((current) =>
      modal?.kind === "edit"
        ? updateRoute(current, modal.route.id, draft)
        : addRoute(current, draft),
    );
    setModal(null);
  };

  const handleDelete = () => {
    if (modal?.kind !== "delete") return;

    setRouteList((current) => removeRoutes(current, modal.ids));
    setModal(null);
  };

  const routesToDelete =
    modal?.kind === "delete"
      ? routeList.filter((route) => modal.ids.includes(route.id))
      : [];

  return (
    <div className="data-control-view slide-in-up">
      <div
        style={{
          display: "grid",
          gridTemplate: ` "a . c" auto
                          "b . c" auto / auto 1fr auto `,
        }}
      >
        <h3 className="text-muted font-mono" style={{ gridArea: "a" }}>
          Управление маршрутами
        </h3>
        <h1 style={{ gridArea: "b" }}>Реестр маршрутов</h1>
        <button
          className="button-active"
          style={{ gridArea: "c", alignSelf: "end" }}
          onClick={() => setModal({ kind: "create" })}
        >
          + Добавить маршрут
        </button>
      </div>
      <div style={{ marginTop: "2rem" }} />
      <Card>
        <div className="search-and-filter-panel">
          <input
            className="search-bar"
            placeholder="Поиск по номеру, названию или водителю"
            type="text"
            name="searchBarInput"
            value={filters.query}
            onChange={(event) => setFilter("query", event.target.value)}
          />

          <p className="text-muted">Статус</p>
          {statusOptions.map((option) => (
            <FilterChip
              key={option}
              isActive={filters.status === option}
              onClick={() => setFilter("status", option)}
            >
              {option}
            </FilterChip>
          ))}

          <p className="text-muted">Транспорт</p>
          {modeOptions.map((option) => (
            <FilterChip
              key={option}
              isActive={filters.mode === option}
              onClick={() => setFilter("mode", option)}
            >
              {option}
            </FilterChip>
          ))}

          {(filters.status !== ALL_OPTION ||
            filters.mode !== ALL_OPTION ||
            filters.query !== "") && (
            <FilterChip onClick={() => setFilters(initialFilters)}>
              Сбросить
            </FilterChip>
          )}
        </div>
      </Card>

      <DataControlPaths
        routes={filteredRoutes}
        onEdit={(route) => setModal({ kind: "edit", route })}
        onDelete={(route) => setModal({ kind: "delete", ids: [route.id] })}
        onBulkDelete={(ids) => setModal({ kind: "delete", ids })}
      />

      {modal?.kind === "create" && (
        <RouteFormModal
          onSubmit={handleSubmit}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.kind === "edit" && (
        <RouteFormModal
          route={modal.route}
          onSubmit={handleSubmit}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.kind === "delete" && (
        <Modal title="Удаление маршрута" onClose={() => setModal(null)}>
          <div className="modal-body">
            <p className="modal-text">
              {routesToDelete.length === 1
                ? `Удалить маршрут ${routesToDelete[0].number} «${routesToDelete[0].name}»?`
                : `Удалить выбранные маршруты (${routesToDelete.length})?`}{" "}
              Действие нельзя отменить.
            </p>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={() => setModal(null)}>
              Отмена
            </button>
            <button
              type="button"
              className="button-danger"
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function FilterChip({
  isActive = false,
  onClick,
  children,
}: {
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <div
      className={`filter-chip ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default DataControlView;
