import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

function randomData() {
  return (Math.random() * 100).toPrecision(4);
}

const data = [
  {
    name: "Jan",
    total: randomData(),
  },
  {
    name: "Feb",
    total: randomData(),
  },
  {
    name: "Mar",
    total: randomData(),
  },
  {
    name: "Apr",
    total: randomData(),
  },
  {
    name: "May",
    total: randomData(),
  },
  {
    name: "Jun",
    total: randomData(),
  },
  {
    name: "Jul",
    total: randomData(),
  },
  {
    name: "Aug",
    total: randomData(),
  },
  {
    name: "Sep",
    total: randomData(),
  },
  {
    name: "Oct",
    total: randomData(),
  },
  {
    name: "Nov",
    total: randomData(),
  },
  {
    name: "Dec",
    total: randomData(),
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(tick) => `${tick}%`} />
        <Tooltip formatter={(data) => `${data}%`} />
        <Legend />
        <Line type="monotone" dataKey="total" strokeWidth={2} />
      </LineChart>
      {/* <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart> */}
    </ResponsiveContainer>
  );
}
