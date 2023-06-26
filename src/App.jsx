import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

//Children components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import RootLayout from './components/RootLayout'


// Dynamic rendering of components
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout/>}>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='loginPage' element={<LoginPage />} />
      <Route path='signupPage' element={<SignupPage/>}/>
      <Route path='homePage' element={<HomePage/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}/>
}

export default App;