import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';

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
        <div>
          <span>Welcome </span>
          <span>{firstName}</span>
        </div>

        <div>
          <span>Set up your income and monthly budget for</span>
          <span>{currentMonth}</span>
        </div>

        <div>
          <span>
            Income <input type="number" id="income" min="1" step="any" />
          </span>
          <button
            onClick={(e) => {
              addIncome(e)
            }}
          >
            Add income
          </button>
        </div>

        <div>
          <span>Total Income</span>
          {income}
        </div>

        <p>Enter Your Expenses</p>

        <div>
          {/* <label for="expense">Select an Expense:</label> */}
          <select name="expense" id="expense">
            <option value="rent_and_utilities">Rent and Utilities</option>
            <option value="food_and_drink">Food and Drink</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
            <option value="general_merchandise">General Merchandise</option>
      
          </select>

          <input
            type="number"
            placeholder="Amount"
            id="amount"
            min="1"
            step="any"
          />
          <button
            onClick={(e) => {
              addExpense(e);
            }}
            type="submit"
          >
            Add
          </button>
        </div>

        <div>{expensesArr}</div>

        
        <div>
          <span>Total Budget</span>
          <span>{totalBudget}</span>
        </div>
        <button
          onClick={(e) => {
            saveBudget(e)
          }}
        >Save budget</button>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
