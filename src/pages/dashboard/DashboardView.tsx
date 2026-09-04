import "./DashboardView.css";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

import Card from "../../shared/statisticsCard/Card";
import data from "../../data/data.json";

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setKpiData(data.kpiData);
    setFlowData(data.flowData);
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <div className="dashboard-view">
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
        <div className="charts-grid">
          <Card title="Пассажиропоток и инцеденты">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={flowData}
                // responsive
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <Legend />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--muted-foreground)", fontSize: "0.8rem" }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  width="auto"
                  tick={{ fill: "var(--muted-foreground)", fontSize: "0.8rem" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  width="auto"
                  tick={{ fill: "var(--muted-foreground)", fontSize: "0.8rem" }}
                />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="passengers"
                  name="Пассажиры"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="incidents"
                  name="Инциденты"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Распределение по виду транспорта"></Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
