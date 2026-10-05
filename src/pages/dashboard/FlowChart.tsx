import { ResponsiveContainer, LineChart, Legend, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";

export default function FlowChart({
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