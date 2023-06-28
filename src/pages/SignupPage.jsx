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
      const passwordInput = e.currentTarget.elements[3];
  
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;

     

      const response = await fetch('/server/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({firstName,lastName,username,password })
        
      })
      if (response.ok) {
        dispatch(setFirstName(firstName));
        dispatch(setUserName(username));
        navigate('/homePage');
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
        
          <form action="" className={styles.form} onSubmit={(e) => handleSignup(e)}>
            <input type="text" placeholder="First name" className={styles.input} />
            <input type="text" placeholder="Last name" className={styles.input} />
            <input type="text" placeholder="username" className={styles.input}/>
            <input type="password" placeholder="password" className={styles.input} />
            <button type="submit" className={styles.primaryBtn} >Sign Up</button>
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