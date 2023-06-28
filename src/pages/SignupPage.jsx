import React from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import {  useNavigate } from 'react-router-dom';

// Import reducers
import {
  setUserName,
  setFirstName,
  setErrorMsg
} from '../store/slices/appSlice'

import styles from '../styles/Verify.module.scss'

function SignupPage () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const firstNameInput = e.currentTarget.elements[0];
      const lastNameInput = e.currentTarget.elements[1];
      const usernameInput = e.currentTarget.elements[2];
      const passwordInput = ee.currentTarget.elements[3];
  
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;

      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({firstName,lastName,username,password })
        
      })
      const data = await response.json();
      if (response.ok) {
        dispatch(setFirstName(firstName));
        dispatch(setUserName(username));
        navigate('/');
      } else {
        dispatch(setErrorMsg('The username has been taken'))
      }


    }
    catch(err) {
      console.log(err)
    }
  
  }
  

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.content}>
          <i className={`fa-solid fa-arrow-up ${styles.logo} `}></i>
          <p className={styles.loginText}>Create Account</p>
        
          <form action="" className={styles.form}>
            <input type="text" placeholder="First name" className={styles.input} />
            <input type="text" placeholder="Last name" className={styles.input} />
            <input type="text" placeholder="username" className={styles.input}/>
            <input type="password" placeholder="password" className={styles.input} />
            <button type="submit" className={styles.primaryBtn} onClick={() => {
              handleSignup()
            }}>Sign Up</button>
          </form>

          <button className={styles.secondaryBtn} onClick={() => {
            navigate('/loginPage');
          }}>
            Already have an account?</button>
        </div>
          
      </div>
    </React.Fragment>
  )
}


export default SignupPage;