import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import styles from '../styles/RootLayout.module.scss';

function RootLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.navHeader}>
        <nav>
          <ul className={styles.navBar}>
            <Link className={styles.link} to='/'>
              <i className={`fa-solid fa-arrow-up ${styles.logo}`}></i>
              Home
            </Link>
            <Link className={`${styles.link} ${styles.center}`} to='/'>
              MonDinero
            </Link>
            <div>
              <Link className={styles.link} to='/loginPage'>
                Login
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
