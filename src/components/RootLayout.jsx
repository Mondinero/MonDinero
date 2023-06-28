import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/RootLayout.module.scss';
import { useSelector } from 'react-redux';

function RootLayout() {
  const firstName = useSelector((state) => state.appSlice.firstName);
  let login;

  if (!firstName)
    login = [
      <Link className={styles.link} to='/loginPage'>
        Login
      </Link>,
    ];
  else login = [];

  return (
    <div className={styles.container}>
      <header className={styles.navHeader}>
        <nav>
          <ul className={styles.navBar}>
            <Link className={styles.link} to='/homePage'>
              <i className={`fa-solid fa-arrow-up ${styles.logo}`}></i>
              Home
            </Link>
            <Link className={`${styles.link} ${styles.center}`} to='/'>
              MonDinero
            </Link>
            <div>
              {login}
              <Link className={styles.link} to='/graphs'>
                Graphs
              </Link>
              <Link className={styles.link} to='/aboutPage'>
                About
              </Link>
              <Link className={styles.link} to='/teamPage'>
                Team
              </Link>
            </div>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default RootLayout;
