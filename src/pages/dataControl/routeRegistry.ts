import dataControlData from "../../data/dataControlData.json";

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

export type RouteDraft = Omit<RouteInfo, "id">;

export type RouteFilters = {
  status: string;
  mode: string;
  query: string;
};

export const ALL_OPTION = "все";

export const ROUTE_MODES = [
  "метро",
  "автобус",
  "электробус",
  "трамвай",
  "троллейбус",
];

export const ROUTE_STATUSES = ["активный", "на проверке", "приостановлен"];

export const initialRoutes = dataControlData as RouteInfo[];

export const initialFilters: RouteFilters = {
  status: ALL_OPTION,
  mode: ALL_OPTION,
  query: "",
};

export function filterRoutes(
  routeList: RouteInfo[],
  filters: RouteFilters,
): RouteInfo[] {
  const query = filters.query.trim().toLowerCase();

  return routeList.filter((route) => {
    const matchesStatus =
      filters.status === ALL_OPTION || route.status === filters.status;
    const matchesMode =
      filters.mode === ALL_OPTION || route.mode === filters.mode;
    const matchesQuery =
      query === "" ||
      [route.number, route.name, route.driver].some((field) =>
        field.toLowerCase().includes(query),
      );

    return matchesStatus && matchesMode && matchesQuery;
  });
}

export function getFilterOptions(
  routeList: RouteInfo[],
  key: "status" | "mode",
): string[] {
  return [ALL_OPTION, ...new Set(routeList.map((route) => route[key]))];
}

export function getNextRouteId(routeList: RouteInfo[]): number {
  return routeList.reduce((maxId, route) => Math.max(maxId, route.id), 0) + 1;
}

export function addRoute(
  routeList: RouteInfo[],
  draft: RouteDraft,
): RouteInfo[] {
  return [{ ...draft, id: getNextRouteId(routeList) }, ...routeList];
}

export function updateRoute(
  routeList: RouteInfo[],
  id: number,
  draft: RouteDraft,
): RouteInfo[] {
  return routeList.map((route) => (route.id === id ? { ...draft, id } : route));
}

export function removeRoutes(routeList: RouteInfo[], ids: number[]): RouteInfo[] {
  return routeList.filter((route) => !ids.includes(route.id));
}

export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}
