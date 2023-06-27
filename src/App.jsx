import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import styles from './styles/AppStyles.module.scss';

//Children components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import RootLayout from './components/RootLayout';
import Graphs from './pages/GraphsPage';
import { setColorTheme } from './store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

// Dynamic rendering of components
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path='/' element={<LandingPage />} />
      <Route path='loginPage' element={<LoginPage />} />
      <Route path='signupPage' element={<SignupPage />} />
      <Route path='homePage' element={<HomePage />} />
      <Route path='graphs' element={<Graphs />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const colorTheme = useSelector((state) => state.appSlice.colorTheme);
  let currTheme;
  let selectedDay;
  let selectedNight;

  if (window.matchMedia('(prefers-color-scheme: dark)').matches && colorTheme === null) {
    dispatch(setColorTheme('dark'));
  }

  document.querySelector('body').setAttribute('theme', colorTheme);

  if (colorTheme === 'dark') {
    currTheme = <i className='fa-solid fa-moon'></i>;
    selectedNight = <i className='fa-solid fa-check'></i>;
  } else {
    currTheme = <i className='fa-solid fa-sun'></i>;
    selectedDay = <i className='fa-solid fa-check'></i>;
  }

  return (
    <>
      <RouterProvider router={router} />
      <button
        className={styles.darkModeButton}
        onClick={() => {
          if (colorTheme === 'dark') dispatch(setColorTheme('light'));
          else dispatch(setColorTheme('dark'));
        }}>
        <i className={`fa-solid fa-moon ${styles.moon}`}></i>
      </button>
    </>
  );
}

export default App;
