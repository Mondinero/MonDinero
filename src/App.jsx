import React, { useContext, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import CredentialsProvider from './CredentialsProvider';

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
      <Route path="/" element={<LandingPage />} />
      <Route path="loginPage" element={<LoginPage />} />
      {/* <Route path='signupPage' element={<SignupPage />} />
      <Route path='homePage' element={<HomePage />} /> */}
    </Route>
  )
);

function App() {
  // This bit is temporary -- testing Link

  return (
    <CredentialsProvider>
      <RouterProvider router={router} />
    </CredentialsProvider>
  );
}

export default App;
