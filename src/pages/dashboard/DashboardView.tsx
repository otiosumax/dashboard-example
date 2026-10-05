import "./DashboardView.css";

import { useEffect, useState } from "react";

import Card from "../../shared/statisticsCard/Card";
import data from "../../data/dashboardData.json";
import LogLine from "./LogLine";
import DonutChart from "./DonutChart";
import FlowChart from "./FlowChart";

function DashboardView() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [kpiData, setKpiData] = useState<
    {
      label: string;
      value: string;
      up: boolean;
      delta: string;
      sub: string;
    }[]
  >([]);

  const [flowData, setFlowData] = useState<
    { month: string; passengers: number; incidents: number }[]
  >([]);

  const [modeData, setModeData] = useState<{ name: string; value: number }[]>(
    [],
  );

  const [activity, setActivity] = useState<
    {
      id: number;
      user: string;
      action: string;
      target: string;
      time: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setKpiData(data.kpiData);
    setFlowData(data.flowData);
    setModeData(data.modeData);
    setActivity(data.activity);
  }, []);

  // useEffect(() => {
  // просто для примера
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(import.meta.env.VITE_API_URL);
  //     if (!response.ok) {
  //       throw new Error("vsosal");
  //     }
  //     const data = await response.json();
  //     setKpiData(data);
  //   } catch (err) {
  //     console.error("ощибко: ", err);
  //   }
  // };
  // т.к. апи у меня нет - закомментирую
  // fetchData();
  // }, []);

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
              <LogLine info={a} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
