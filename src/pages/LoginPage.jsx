import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUserName, setFirstName, setErrorMsg, setPrevBudget } from '../store/slices/appSlice';

import styles from '../styles/Verify.module.scss';
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const usernameInput = e.currentTarget.elements[0];
      const passwordInput = e.currentTarget.elements[1];
      const username = usernameInput.value;
      const password = passwordInput.value;

      const response = await fetch('/server/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      })

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        dispatch(setUserName(username));
        dispatch(setFirstName(data.firstName));
        const budget = await fetch ('/server/budget/checkBudget', {method: 'POST'});
        const response = await budget.json();
        dispatch(setPrevBudget(response));

        dispatch(set)
        navigate('/homePage')
      } else {
        dispatch(setErrorMsg('Invalid username or password'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.content}>
          <i className={`fa-solid fa-arrow-up ${styles.logo} `}></i>
          <p className={styles.loginText}>Login</p>
          <form action="" className={styles.form} onSubmit={(e) => {
              handleLogin(e)
            }}>
            <input type="text" placeholder="username" className={styles.input} />
            <input type="password" placeholder="password" className={styles.input} />
            <button type="submit" className={styles.primaryBtn} >Login</button>
          </form>

          <button
            className={`${styles.secondaryBtn}`}
            onClick={() => {
              navigate('/signupPage');
            }}>
            Not a member?
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
