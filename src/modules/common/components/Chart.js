import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
// import { format, parseISO, subDays } from "date-fns";
// import bnb from 'images/bnblogo.png';


// const data = [];
// for (let num = 30; num >= 0; num--) {
//   data.push({
//     date: subDays(new Date(), num).toISOString().substr(0, 10),
//     value: 1 + Math.random(),
//   });
// }

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="price" stroke="#2451B7" fill="url(#color)" />
        <XAxis
          dataKey="created_at"
          axisLine={false}
          tickLine={false}
          padding={{ top: 10 }}
          tickFormatter={(date) => `${date.substr(date.length - 5)}`}
        />
        <XAxis />
        <YAxis
          datakey="price"
          axisLine={false}
          tickLine={false}
          tickCount={4}
          tickSize={6}
          tickFormatter={(number) => `${number} ${data?.coin || ''}`}
        />

        <Tooltip />

        <CartesianGrid opacity={0.2} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
export default Chart;
