import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function DonutChart({ data = [] }: { data?: { name: string; value: number }[] }) {

    return (
        <ResponsiveContainer width="100%" aspect={1.4}>
            <PieChart>
                <Pie
                    dataKey="value"
                    innerRadius="50%"
                    data={data}
                    isAnimationActive={false}
                    strokeWidth={0}
                />
                <Tooltip defaultIndex={1} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}