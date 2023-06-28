import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/Home.module.scss'

import {
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
  setExpenses,
  setTotalBudget
} from '../store/slices/appSlice';

function Table () {
  const allExpenses = useSelector((state) => state.appSlice.expenses)
  const rows = [];
  const totalBudget = useSelector((state) => state.appSlice.totalBudget)
  Object.keys(allExpenses).map((expense) => {

    rows.push(
      <tr key={expense}>
        <td>{expense.replaceAll('_', ' ').charAt(0).toUpperCase() + expense.replaceAll('_', ' ').slice(1)}</td>
        <td className={styles.amount}>&#36;{allExpenses[expense]}</td>
      </tr>
    )
  })

  return (
    <table className={styles.table} cellspacing="100">
      <thead>
        <tr>
          <th className={styles.tableHeader}>Expense</th>
          <th className={styles.tableHeader}>Amount</th>
        </tr>
      </thead>

      <tr>
          <td colSpan="5">
            <hr className={styles.footerLine} />
          </td>
      </tr>

      <tbody>
        {rows}
      </tbody>

      <tfoot>
      <tr>
          <td colSpan="5">
            <hr className={styles.footerLine} />
          </td>
        </tr>
        <tr>
          <td className={styles.tableHeader}>Total Budget</td>
          <td className={styles.amount}>&#36;{totalBudget}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default Table;