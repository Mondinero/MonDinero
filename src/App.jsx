import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CredentialsContext from './CredentialsContext';

//Children components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import RootLayout from './components/RootLayout';

//Importing Link, just for testing purposes
import Link from './components/link';

// Dynamic rendering of components
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path='/' element={<LandingPage />} />
      <Route path='loginPage' element={<LoginPage />} />
      {/* <Route path='signupPage' element={<SignupPage />} /> */}
      <Route path='homePage' element={<HomePage />} />
    </Route>
  )
);

function App() {
  // This bit is temporary -- testing Link
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const resp = await fetch('api/create_link_token', { method: 'POST' });
    const data = await resp.json();
    console.log(data);
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
