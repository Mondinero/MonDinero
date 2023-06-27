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
        <div>
          <img src="" alt="logo" />
        </div>
        <p>Login</p>
        <form action="">
          <input type="text" placeholder="username" />
          <input type="text" placeholder="password" />
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
        
        <button onClick={() => {
          navigate('/signupPage')
        }}>
          Not a member?
        </button>


      </div>
    </React.Fragment>
  )
}

export default LoginPage;