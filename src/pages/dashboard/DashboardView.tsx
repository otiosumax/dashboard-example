import "./DashboardView.css";

import {
  CartesianGrid,
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
import data from "../../data/dashboardData.json";

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
        <div className="charts-grid">
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
          {/* <Card title="Распределение по виду транспорта">
            <ResponsiveContainer width="100%" aspect={1}>
              <PieChart width="100%" height="100%">
                <Pie
                  data={flowData}
                  dataKey="month"
                  innerRadius="60%"
                  outerRadius="100%"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </Card> */}
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

function FlowChart({
  data,
}: {
  data: { month: string; passengers: number; incidents: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" aspect={2.5}>
      <LineChart
        data={data}
        // responsive
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <Legend position="top" />
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

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
  );
}

function LogLine({
  info,
}: {
  info: {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
    type: string;
  };
}) {
  const COLORS_DICT: { [type: string]: string } = {
    create: "rgb(0, 212, 168)",
    warning: "#f0a500",
    edit: "rgb(45, 111, 255)",
    delete: "rgb(232, 93, 58)",
    sync: "rgb(155, 89, 216)",
    invite: "rgb(0, 212, 168)",
  };

  return (
    <div className="log-line border-t">
      <p>
        {info.user} <span className="text-muted">{info.action}</span>{" "}
        <span style={{ color: COLORS_DICT[info.type] }}>{info.target}</span>
      </p>
      <span className="text-muted">{info.time}</span>
    </div>
  );
}

export default DashboardView;
