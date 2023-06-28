import React, { useEffect } from 'react';
import Link from '../components/link';
import { useDispatch, useSelector } from 'react-redux';
import { setLinkToken } from '../store/slices/credentialSlice';
import { TransactionsBar } from '../components/vizRepository';
import styles from '../styles/Home.module.scss';


import {
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
  setExpenses
} from '../store/slices/appSlice'
function HomePage() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });


  const firstName = useSelector((state) => state.appSlice.firstName);

  function addExpense() {
    const e = document.getElementById('expense');
    //const value = e.value;
    const desc = e.options[e.selectedIndex].text;
   
    const amount = document.getElementById('amount').value;

    dispatch(setExpenses({[desc]: amount}))
    
    // Set routes to add it to database 
    

    // Display it on page
    const totalExpenses = useSelector((state) => state.expenses);

    const allExpensesDiv = document.getElementById('allExpenses');
    for (let key in totalExpenses) {
    
    console.log(key)
    const itemDiv = document.createElement('div');
    const descText = document.createElement('span');
    const amountText = document.createElement('span');

    descText.textContent = key;
    amountText.textContent = totalExpenses[key];

    itemDiv.appendChild(descText);
    itemDiv.appendChild(amountText)
    allExpensesDiv.appendChild(itemDiv)
    }
  }

  const linkToken = useSelector((state) => state.credentialSlice.linkToken);

  const generateToken = async () => {
    const resp = await fetch('/api/create_link_token', { method: 'POST' });
    const data = await resp.json();
    dispatch(setLinkToken(data.link_token));
  };

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    console.log('Logging linkTokens obj from home page:');
    console.log(linkToken);
  }, [linkToken]);

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
          <span>Income <input type="number"  min="1" step="any" /></span>
          <button
            onClick={() => {
              dispatch(setMonthlyIncome())
            }}
          >Add income</button>
        </div>

        <div>
          <span>Total Income</span>
          <span>{useSelector((state) => state.appSlice.monthlyIncome)}</span>
        </div>
        
        <p>Enter Your Expenses</p>

        <div>
          {/* <label for="expense">Select an Expense:</label> */}
          <select name="expense" id="expense">
            <option value="rent" >Rent</option>
            <option value="food and drink">Food and Drink</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
          </select>
          
            <input type="number" placeholder="Amount" id='amount'  min="1" step="any" />
            <button onClick={addExpense} type="submit">Add</button>
        
        </div>

        <div id="allExpenses">
          
        </div>
     
      </div>

      <TransactionsBar />
      <Link linkToken={linkToken} />
    </React.Fragment>
   
  )

}

export default HomePage;
