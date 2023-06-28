import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import Table from '../components/Table';
import {
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
  setExpenses,
  setTotalBudget
} from '../store/slices/appSlice';
function HomePage() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  const firstName = useSelector((state) => state.appSlice.firstName);
  const totalExpenses = useSelector((state) => state.appSlice.expenses);
  const monthlyIncome = useSelector((state) => state.appSlice.monthlyIncome);
  const totalBudget = useSelector((state) => state.appSlice.totalBudget);
  

  const income = [<span>{monthlyIncome}</span>];




  const expensesArr = [];

  for (let key in totalExpenses) {
    expensesArr.push(
      <div>
        <span>{key.replaceAll('_', ' ').charAt(0).toUpperCase() + key.replaceAll('_', ' ').slice(1)}</span>
        <span>{totalExpenses[key]}</span>
      </div>
    );
  }

  function addExpense(e) {
    e.preventDefault();
    const val = document.getElementById('expense');
    //const value = e.value;
    const desc = val.options[val.selectedIndex].text.toLowerCase().replaceAll(' ', '_');
    const amount = document.getElementById('amount').value;
    dispatch(setExpenses({ [desc]: amount }));
  }

  dispatch(setTotalBudget(Object.values(totalExpenses).reduce((acc, curr) => Number(acc)+Number(curr))));

  function addIncome(e) {
    e.preventDefault();
    const val = document.getElementById('income').value;
    dispatch(setMonthlyIncome(val));

  }

  async function  saveBudget(e) {
    e.preventDefault();
    const data = await fetch('server/budget/createBudget', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        income: monthlyIncome,
        totalExpenses
      })
    })

  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div class={styles.leftContent}>
        <div>
          <span>Welcome </span>
          <span className={styles.name}>{firstName}</span>
        </div>

        <div>
          <span>Set up your income and monthly budget for the month of</span>
          <span className={styles.month}>{currentMonth}</span>
        </div>

        <div>
           <input type="number" placeholder="Income" id="income" min="1" step="any" />
         
          <button
            className={styles.addIncomeBtn}
            onClick={(e) => {
              addIncome(e)
            }}
          >
            Add Income
          </button>
        </div>

        <div>
          <table>
            <tr>
              <td>Total Income:</td>
              <td className={styles.totalIncome}>&#36;{income}</td>
            </tr>
          </table>
          {/* <span>Total Income</span>
          <span className={styles.box}>{income}</span> */}
          
        </div>

        <p>Select Your Expenses</p>

        <div>
          {/* <label for="expense">Select an Expense:</label> */}
          <select name="expense" id="expense">
            <option value="rent_and_utilities">Rent and Utilities</option>
            <option value="food_and_drink">Food and Drink</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
            <option value="travel">Travel</option>
            <option value="general_merchandise">General Merchandise</option>
      
          </select>

          <input
          className={styles.numAmount}
            type="number"
            placeholder="Amount"
            id="amount"
            min="1"
            step="any"
          />
          <button
          className={styles.addExpenseBtn}
            onClick={(e) => {
              addExpense(e);
            }}
            type="submit"
          >
            Add Expense
          </button>
        </div>
        
        </div>
        
        <div className={styles.rightContent}>
          <div>
            <Table/>
          </div>
          {/* <div>{expensesArr}</div> */}

          
          {/* <div>
            <span>Total Budget</span>
            <span className={styles.box}>{totalBudget}</span>
          </div> */}
          <button
          className={styles.saveBudgetBtn}
            onClick={(e) => {
              saveBudget(e)
            }}
          >Save budget</button>
        </div>
      
        
      </div>

      
    </React.Fragment>
  );
}

export default HomePage;
