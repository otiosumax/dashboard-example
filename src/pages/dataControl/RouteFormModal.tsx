import { useState, type FormEvent } from "react";

import Modal from "../../shared/modal/Modal";
import {
  getToday,
  ROUTE_MODES,
  ROUTE_STATUSES,
  type RouteDraft,
  type RouteInfo,
} from "./routeRegistry";

type RouteFormState = {
  number: string;
  name: string;
  driver: string;
  mode: string;
  status: string;
  passengers: string;
  departures: string;
  updated: string;
};

function getInitialFormState(route?: RouteInfo): RouteFormState {
  if (route) {
    return {
      number: route.number,
      name: route.name,
      driver: route.driver,
      mode: route.mode,
      status: route.status,
      passengers: String(route.passengers),
      departures: String(route.departures),
      updated: route.updated,
    };
  }

  return {
    number: "",
    name: "",
    driver: "",
    mode: ROUTE_MODES[1],
    status: ROUTE_STATUSES[0],
    passengers: "0",
    departures: "0",
    updated: getToday(),
  };
}

export default function RouteFormModal({
  route,
  onSubmit,
  onClose,
}: {
  route?: RouteInfo;
  onSubmit: (draft: RouteDraft) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<RouteFormState>(() =>
    getInitialFormState(route),
  );

  const setField = (field: keyof RouteFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      number: form.number.trim(),
      name: form.name.trim(),
      driver: form.driver.trim(),
      mode: form.mode,
      status: form.status,
      passengers: Number(form.passengers) || 0,
      departures: Number(form.departures) || 0,
      updated: form.updated,
    });
  };

  return (
    <Modal
      title={route ? `Редактирование маршрута ${route.number}` : "Новый маршрут"}
      onClose={onClose}
    >
      <form className="route-form" onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-grid">
            <label className="form-field">
              <span>Номер</span>
              <input
                type="text"
                value={form.number}
                onChange={(event) => setField("number", event.target.value)}
                placeholder="28к"
                required
              />
            </label>

            <label className="form-field">
              <span>Водитель</span>
              <input
                type="text"
                value={form.driver}
                onChange={(event) => setField("driver", event.target.value)}
                placeholder="Иванов О.В."
                required
              />
            </label>

            <label className="form-field wide">
              <span>Направление</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Белорусский вокзал — Отрадное"
                required
              />
            </label>

            <label className="form-field">
              <span>Вид транспорта</span>
              <select
                value={form.mode}
                onChange={(event) => setField("mode", event.target.value)}
              >
                {ROUTE_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Статус</span>
              <select
                value={form.status}
                onChange={(event) => setField("status", event.target.value)}
              >
                {ROUTE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Пассажиры/мес.</span>
              <input
                type="number"
                min="0"
                value={form.passengers}
                onChange={(event) => setField("passengers", event.target.value)}
              />
            </label>

            <label className="form-field">
              <span>Рейсы/мес.</span>
              <input
                type="number"
                min="0"
                value={form.departures}
                onChange={(event) => setField("departures", event.target.value)}
              />
            </label>

            <label className="form-field wide">
              <span>Обновлено</span>
              <input
                type="date"
                value={form.updated}
                onChange={(event) => setField("updated", event.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" className="button-active">
            {route ? "Сохранить" : "Добавить маршрут"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
