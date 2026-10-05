import { useState } from "react";

import DataControlPathLine from "./DataControlPathLine";
import type { RouteInfo } from "./routeRegistry";

const PAGE_SIZE = 6;
const COLUMNS = [
  "№",
  "Маршрут",
  "Водитель",
  "Вид",
  "Статус",
  "Пассажиры/мес.",
  "Рейсы/мес.",
  "Обновлено",
];

function pluralizeRoutes(count: number): string {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) return "маршрутов";
  if (mod10 === 1) return "маршрут";
  if (mod10 >= 2 && mod10 <= 4) return "маршрута";
  return "маршрутов";
}

function DataControlPaths({
  routes,
  onEdit,
  onDelete,
  onBulkDelete,
}: {
  routes: RouteInfo[];
  onEdit: (route: RouteInfo) => void;
  onDelete: (route: RouteInfo) => void;
  onBulkDelete: (ids: number[]) => void;
}) {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [prevRoutes, setPrevRoutes] = useState(routes);

  // при смене фильтров или списка возвращаемся на первую страницу
  if (prevRoutes !== routes) {
    const routeIds = new Set(routes.map((route) => route.id));

    setPrevRoutes(routes);
    setPage(1);
    setSelectedIds(selectedIds.filter((id) => routeIds.has(id)));
  }

  const totalPages = Math.max(1, Math.ceil(routes.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRoutes = routes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const isPageSelected =
    pageRoutes.length > 0 &&
    pageRoutes.every((route) => selectedIds.includes(route.id));

  const toggleRoute = (id: number) => {
    setSelectedIds((ids) =>
      ids.includes(id)
        ? ids.filter((selectedId) => selectedId !== id)
        : [...ids, id],
    );
  };

  const togglePage = () => {
    const pageIds = pageRoutes.map((route) => route.id);

    setSelectedIds((ids) =>
      isPageSelected
        ? ids.filter((id) => !pageIds.includes(id))
        : [...new Set([...ids, ...pageIds])],
    );
  };

  return (
    <section className="routes-table">
      {selectedIds.length > 0 && (
        <div className="routes-table-toolbar">
          <p className="text-muted">Выбрано: {selectedIds.length}</p>
          <button
            className="button-danger"
            type="button"
            onClick={() => onBulkDelete(selectedIds)}
          >
            Удалить выбранные
          </button>
        </div>
      )}

      <div className="routes-table-scroll">
        <table>
          <thead>
            <tr>
              <th className="cell-checkbox">
                <input
                  className="table-checkbox"
                  type="checkbox"
                  checked={isPageSelected}
                  onChange={togglePage}
                  aria-label="Выбрать все маршруты на странице"
                />
              </th>
              {COLUMNS.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
              <th aria-label="Действия" />
            </tr>
          </thead>

          <tbody>
            {pageRoutes.length === 0 ? (
              <tr>
                <td
                  className="routes-table-empty text-muted"
                  colSpan={COLUMNS.length + 2}
                >
                  Ничего не найдено — измените фильтры или добавьте маршрут
                </td>
              </tr>
            ) : (
              pageRoutes.map((route) => (
                <DataControlPathLine
                  key={route.id}
                  route={route}
                  isSelected={selectedIds.includes(route.id)}
                  onSelect={() => toggleRoute(route.id)}
                  onEdit={() => onEdit(route)}
                  onDelete={() => onDelete(route)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="routes-table-footer">
        <p className="text-muted">
          {routes.length} {pluralizeRoutes(routes.length)} · страница{" "}
          {currentPage}/{totalPages}
        </p>

        <div className="routes-pagination">
          <button
            className="pagination-arrow"
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Предыдущая страница"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={`pagination-page ${
                  pageNumber === currentPage ? "active" : ""
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            className="pagination-arrow"
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Следующая страница"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default DataControlPaths;
