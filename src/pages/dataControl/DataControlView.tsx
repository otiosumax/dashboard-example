import "./DataControlView.css";

import Card from "../../shared/statisticsCard/Card";
import { useState, type ReactNode } from "react";

function DataControlView() {
  const statusFilters = ["все", "активный", "приостановлен", "на проверке"];
  const [activeStatusFilter, setActiveStatusFilter] = useState("все");
  const typeFilters = ["все", "метро", "автобус", "троллейбус", "трамвай"];
  const [activeTypeFilter, setActiveTypeFilter] = useState("все");

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="data-control-view slide-in-up">
      <div
        style={{
          display: "grid",
          gridTemplate: ` "a . c" auto
                          "b . c" auto / auto 1fr auto`,
        }}
      >
        <h3 className="text-muted font-mono" style={{ gridArea: "a" }}>
          Управление маршрутами
        </h3>
        <h1 style={{ gridArea: "b" }}>Реестр маршрутов</h1>
        <button
          className="button-active"
          style={{ gridArea: "c", alignSelf: "end" }}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <p className="text-muted">Статус</p>
          {statusFilters.map((filter) => (
            <FilterChip
              key={filter}
              isActive={activeStatusFilter === filter}
              onClick={() => setActiveStatusFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}

          <p className="text-muted">Транспорт</p>
          {typeFilters.map((filter) => (
            <FilterChip
              key={filter}
              isActive={activeTypeFilter === filter}
              onClick={() => setActiveTypeFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </div>
      </Card>
      <section>soso</section>
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
