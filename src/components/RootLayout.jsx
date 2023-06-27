import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Link from './link.jsx';

import styles from '../styles/RootLayout.module.scss'

function RootLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.navHeader}>
        <nav>
        <ul className={styles.navBar}>  
          <div className={styles.link}>
            <i className={`fa-solid fa-arrow-up ${styles.logo} `}></i>
            <li>Home</li>
          </div>

            <li className={styles.center}> MonDinero </li>
            
            <div className={styles.link}>
              <li>Login</li>
              <li>About</li>
              <li>Team</li>
            </div>
            
          </ul>
        </nav>
       
      </header>
    
      <main>
        <Outlet/>
      </main>

    </div>

    
    
  )
}


export default RootLayout;
