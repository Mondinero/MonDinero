import React, { useEffect } from 'react';
import styles from './GraphPageStyles.module.scss';
import drawChart from '../components/drawPieChart';
import { TransactionsBar } from '../components/vizRepository';
import Link from '../components/link';

export default function Graphs() {
  const data = {
    name: 'June Expenses',
    children: [
      {
        name: 'Entertainment',
        children: [
          { name: 'AMC Movies', value: 14.8 },
          { name: 'Steam', value: 59.99 },
        ],
      },
      {
        name: 'Food and Drink',
        children: [
          {
            name: 'Uber Eats',
            children: [
              { name: 'June 3', value: 18.92 },
              { name: 'June 6', value: 13.12 },
              { name: 'June 13', value: 11.72 },
              { name: 'June 21', value: 23.65 },
              { name: 'June 22', value: 17.42 },
            ],
          },

          { name: 'McDonalds', value: 89.92 },
        ],
      },
      {
        name: 'Merchandise',
        children: [
          { name: 'Apple', value: 2895.98 },
          { name: 'Amazon', value: 48.96 },
          { name: 'Costco', value: 213.87 },
        ],
      },
      {
        name: 'Transportation',
        children: [
          { name: 'Sunoco Gas', value: 45.94 },
          { name: 'Septa', value: 14 },
          { name: 'NYC Metro', value: 2.5 },
        ],
      },
      {
        name: 'Travel',
        children: [
          { name: 'Hilton', value: 295.95 },
          { name: 'American Airlines', value: 495.23 },
        ],
      },
      { name: 'Rent and Utilities', value: 1450 },
    ],
  };

  useEffect(() => {
    document.querySelector('#pie-container').appendChild(drawChart(data));
  }, []);

  return (
    <>
      <div id="accounts-info">
        <Link />
      </div>
      <div id="charts" className={styles.chartsContainer}>
        <div className={styles.pieContainer} id="pie-container"></div>
        <div
          className={styles.transactionsBarContainer}
          id="transactions-by-month-bar-chart"
        >
          <TransactionsBar />
        </div>
      </div>
    </>
  );
}
