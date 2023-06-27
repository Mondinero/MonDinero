import React from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import {  useNavigate } from 'react-router-dom';

// Import reducers
import {
  setUserName,
  setFirstName,
  setErrorMsg
} from '../store/slices/appSlice'

function SignupPage () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const firstNameInput = e.currentTarget.elements[0]
      const usernameInput = e.currentTarget.elements[1];
      const passwordInput = ee.currentTarget.elements[2];
  
      const firstName = firstNameInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;

      const response = await fetch('', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({firstName,username,password  })
        
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
       <div>
          <img src="" alt="logo" />
        </div>

        <p>Create Account</p>
      <div>
        <form action="">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="username"/>
          <input type="password" placeholder="password" />
          <button type="submit" onClick={() => {
            handleSignup()
          }}>Sign Up</button>
        </form>

        <button onClick={() => {
          navigate('/loginPage');
        }}>
          Already have an account?</button>
      </div>
    </React.Fragment>
  )
}


export default SignupPage;