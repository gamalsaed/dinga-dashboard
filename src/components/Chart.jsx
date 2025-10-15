import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
const data = [
  {
    name: "Jan",
    ["Average item persale"]: 4000,
    ["Average year value"]: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    ["Average item persale"]: 3000,
    ["Average year value"]: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    ["Average item persale"]: 2000,
    ["Average year value"]: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    ["Average item persale"]: 2780,
    ["Average year value"]: 3908,
    amt: 2000,
  },
  {
    name: "Jun",
    ["Average item persale"]: 1890,
    ["Average year value"]: 4800,
    amt: 2181,
  },
  {
    name: "Jul",
    ["Average item persale"]: 2390,
    ["Average year value"]: 3800,
    amt: 2500,
  },
  {
    name: "Aug",
    ["Average item persale"]: 3490,
    ["Average year value"]: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    ["Average item persale"]: 4000,
    ["Average year value"]: 2400,
    amt: 2400,
  },
  {
    name: "Oct",
    ["Average item persale"]: 3000,
    ["Average year value"]: 1398,
    amt: 2210,
  },
  {
    name: "Nov",
    ["Average item persale"]: 2000,
    ["Average year value"]: 9800,
    amt: 2290,
  },
  {
    name: "Dec",
    ["Average item persale"]: 1890,
    ["Average year value"]: 4800,
    amt: 2181,
  },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height="100%" className="px-3">
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="Average year value"
          stroke="#BCF328"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="Average item persale"
          stroke="#1A71F6"
          strokeDasharray="3 4 5 2"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
