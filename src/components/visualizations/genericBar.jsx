import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const makeRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

export default function GenericBar(props) {
  const { data, xkey, dataKeys, dataColors, stacked } = props;

  const barColors = dataColors
    ? dataColors
    : new Array(dataKeys.length).map((el) => {
        return makeRandomColor();
      });

  const bars = [];
  if (stacked) {
    for (const i in dataKeys) {
      bars.push(<Bar dataKey={dataKeys[i]} stackId="a" fill={barColors[i]} />);
    }
  } else {
    for (const i in dataKeys) {
      bars.push(<Bar dataKey={dataKeys[i]} fill={barColors[i]} />);
    }
  }

  return (
    <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xkey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars}
      </BarChart>
    </ResponsiveContainer>
  );
}
