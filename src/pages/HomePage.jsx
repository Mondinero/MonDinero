import React from "react";
import styles from '../styles/Home.module.scss';
import { useDispatch, useSelector } from "react-redux";


import {
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
} from '../store/slices/appSlice'
function HomePage() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });


  const firstName = useSelector((state) => state.appSlice.firstName)

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
              dispatch(setMonthlyIncome)
            }}
          >Add income</button>
        </div>

        <div>
          <span>Total Income</span>
          <span>{useSelector((state) => state.appSlice.monthlyIncome)}</span>
        </div>
        
        <p>Enter Your Expenses</p>

        <div>
          <label for="expense">Select an Expense:</label>
          <select name="expense" id="expense">
            <option value="rent" selected>Rent</option>
            <option value="food and drink">Food and Drink</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
          </select>
          
            <input type="number" placeholder="Amount"  min="1" step="any" />
            <button type="submit">Add</button>
        
        </div>

        <div>
          
        </div>
     
      </div>
    </React.Fragment>
   
  )

}

export default HomePage;