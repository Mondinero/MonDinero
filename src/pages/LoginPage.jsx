import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";


import {
  setUserName,
  setFirstName,
  setErrorMsg
} from '../store/slices/appSlice'

import styles from '../styles/Login.module.scss'
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) =>  {
    e.preventDefault();
    try {

      const usernameInput = e.currentTarget.elements[0];
      const passwordInput = e.currentTarget.elements[1];
      
      const username = usernameInput.value;
      const password = passwordInput.value;

      const response = await fetch('', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: {username, password}
      })

      const data = await response.json();
      if (response.ok) {
        dispatch(setUserName(username));
        dispatch(setFirstName(data.firstName));
        navigate('/')
      } else {
        dispatch(setErrorMsg('Invalid username or password'))
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
          <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.logo}`}></i>
          <p className={styles.loginText}>Login</p>
          <form action="" className={styles.form}>
            <input type="text" placeholder="username" className={styles.input} />
            <input type="text" placeholder="password" className={styles.input} />
            <button type="submit" className={styles.loginBtn} onClick={handleLogin}>Login</button>
          </form>
          
          <button className={styles.signupBtn} onClick={() => {
            navigate('/signupPage')
          }}>
            Not a member?
          </button>
        </div>
     


      </div>
    </React.Fragment>
  )
}

export default LoginPage;