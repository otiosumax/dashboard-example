import "./DashboardView.css";

import { useEffect, useState } from "react";

import Card from "../../shared/statisticsCard/Card";
import data from "../../data/dashboardData.json";
import LogLine from "./LogLine";
import DonutChart from "./DonutChart";
import FlowChart from "./FlowChart";

function DashboardView() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  type DashboardPayload = {
    kpiData: typeof data.kpiData;
    flowData: typeof data.flowData;
    modeData: typeof data.modeData;
    activity: typeof data.activity;
  };

  // мок как стартовое значение; когда появится API - будет перезаписано
  const [payload, setPayload] = useState<DashboardPayload>(data);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<DashboardPayload>;
      })
      .then(setPayload)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Не удалось загрузить данные дашборда:", error);
      });

    return () => controller.abort();
  }, []);

  const { kpiData, flowData, modeData, activity } = payload;

  const capitalizeFirstLetter = (word: string): string =>
    word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <div className="dashboard-view slide-in-up">
      <div className="dashboard-title">
        <h3 className="text-muted font-mono">Панель мониторинга</h3>
        <h1>
          Обзор системы —{" "}
          {currentTime
            .toLocaleString("ru-RU", { month: "long", year: "numeric" })
            .replace(" г.", "")}
        </h1>

        <div className="statistics-grid">
          {kpiData.map((indicator) => {
            return (
              <Card
                key={indicator.label}
                title={indicator.label}
                value={indicator.value}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content auto",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      color: `var(--${indicator.up ? "accent" : "error"})`,
                    }}
                  >
                    {indicator.delta}
                  </span>
                  <span className="text-muted">{indicator.sub}</span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="charts-grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
          <Card
            title="Пассажиропоток и инцеденты"
            value={
              flowData.length > 0
                ? `${flowData[0].month} - ${flowData[flowData.length - 1].month}`
                : ""
            }
          >
            <FlowChart data={flowData} />
          </Card>
          <Card
            title="Распределение по виду транспорта"
            value={capitalizeFirstLetter(
              currentTime.toLocaleDateString("ru-RU", { month: "long" }),
            )}
          >
            <DonutChart data={modeData} />
          </Card>
        </div>

        <div className="logs">
          <section title="Журнал событий">
            <p
              className="text-muted font-mono"
              style={{ padding: "var(--padding-w)" }}
            >
              Журнал событий
            </p>
            {activity.map((a) => (
              <LogLine key={a.id} info={a} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
