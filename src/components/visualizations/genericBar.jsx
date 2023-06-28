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
import { uid } from '../../uid';

const makeRandomColor = () => {
  return '#'.concat(Math.floor(Math.random() * 16777215).toString(16));
};

export default function GenericBar(props) {
  const { data, xkey, dataKeys, dataColors, stacked } = props;

  let barColors;

  if (dataColors) {
    barColors = dataColors;
  } else {
    barColors = new Array(dataKeys.length).fill(1);
    barColors = barColors.map((el) => makeRandomColor());
  }

  console.log(barColors);

  const bars = [];
  if (stacked) {
    for (const i in dataKeys) {
      bars.push(
        <Bar
          key={uid()}
          dataKey={dataKeys[i]}
          stackId="a"
          fill={barColors[i]}
        />
      );
    }
  } else {
    for (const i in dataKeys) {
      bars.push(<Bar key={uid()} dataKey={dataKeys[i]} fill={barColors[i]} />);
    }
  }

  return (
    // <ResponsiveContainer>
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
    // </ResponsiveContainer>
  );
}
