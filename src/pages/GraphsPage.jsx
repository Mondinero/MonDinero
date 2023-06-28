import React, { useEffect } from 'react';
import styles from './GraphPageStyles.module.scss';
import drawChart from '../components/drawPieChart';
import { TransactionsBar } from '../components/vizRepository';
import Link from '../components/link';
import { useSelector } from 'react-redux';
import AccountPane from '../components/accounts';

export default function Graphs() {
  const expenses = useSelector((state) => state.appSlice.expenses);
  const budget = { name: 'Budget', children: [] };
  for (let key in expenses) {
    budget.children.push({ name: key, value: expenses[key] });
  }

  useEffect(() => {
    fetch('/api/data/pieChart')
      .then((res) => res.json())
      .then((res) => {
        document.querySelector('#pie-container-budget').appendChild(drawChart(budget));
        document.querySelector('#pie-container').appendChild(drawChart(res));
      });
  }, []);

  return (
    <>
      <div className={styles.linkNewAccount} id='accounts-info'>
        <Link />
      </div>
      <div id='charts' className={styles.chartsContainer}>
        <p className={`${styles.budgetLabel} ${styles.label}`}>Budget</p>
        <p className={`${styles.expensesLabel} ${styles.label}`}>Expenses</p>
        <div className={styles.pieContainer} id='pie-container-budget'></div>
        <div className={styles.pieContainer} id='pie-container'></div>
      </div>
      <div className={styles.transactionsBarContainer} id='transactions-by-month-bar-chart'>
        <TransactionsBar />
      </div>
      <AccountPane />
    </>
  );
}
