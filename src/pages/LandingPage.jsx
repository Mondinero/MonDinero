import React from 'react';
import styles from './LandingPageStyles.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  window.addEventListener(
    'scroll',
    () => {
      document.body.style.setProperty('--scroll', window.scrollY);
      let bodyScroll = document.querySelector('body').style.cssText.slice(10);
      bodyScroll = Number(bodyScroll.slice(0, bodyScroll.length - 1));
      if (bodyScroll < 2400) document.querySelector('body').setAttribute('position', 'top');
      else if (bodyScroll > 3900 && bodyScroll < 6300)
        document.querySelector('body').setAttribute('position', 'middle');
      else if (bodyScroll > 7800 && bodyScroll < 9500)
        document.querySelector('body').setAttribute('position', 'bottom');
      else if (bodyScroll > 10200) document.querySelector('body').setAttribute('position', 'stop');
      else document.querySelector('body').setAttribute('position', '');

      if (bodyScroll > 7600) document.querySelector('body').setAttribute('arrow', 'stop');
      else document.querySelector('body').setAttribute('arrow', '');

      if (bodyScroll > 10000) document.querySelector('body').setAttribute('zoom', 'zoom');
      else document.querySelector('body').setAttribute('zoom', '');
    },
    false
  );

  const firstName = useSelector((state) => state.appSlice.firstName);

  let login;

  if (!firstName)
    login = [
      <>
        <Link className={styles.menuLink} to='/loginPage'>
          Login
        </Link>
        <Link className={styles.menuLink} to='/signupPage'>
          Sign up
        </Link>
      </>,
    ];
  else
    login = [
      <Link className={styles.menuLink} to='/homePage'>
        Home
      </Link>,
    ];

  return (
    <>
      <div className={styles.bigDiv}>
        <Dropdown className={styles.dropdown}>
          <Dropdown.Toggle className={styles.toggle} variant='success' id='dropdown-basic'>
            <i className='fa-solid fa-bars'></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            {login}
            <Link className={styles.menuLink} to='/graphs'>
              Graphs
            </Link>
            <Link className={styles.menuLink} to='/aboutPage'>
              About
            </Link>
            <Link className={styles.menuLink} to='/teamPage'>
              Team
            </Link>
          </Dropdown.Menu>
        </Dropdown>
        <i className={`fa-solid fa-arrow-up ${styles.upArrow}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn1}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn2}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn3}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn4}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn5}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn6}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn7}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn8}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn9}`}></i>
        <br />
        <i className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn10}`}></i>
        <br />
        <p className={styles.welcome}>WELCOME TO MONDINERO</p>
        <p className={styles.motto}>TAKE BACK CONTROL OF YOUR MONEY</p>
        <p className={styles.logo}>GROWING SEEDS INTO MONEY TREES</p>
        <p className={styles.join}>Join the movement and take back control of your money</p>
        <Link className={styles.joinButton} to='/loginPage'>
          Sign up
        </Link>
      </div>

      <div className={styles.footer}>
        © 2023 by{' '}
        <a className={styles.bottomLinks} href='https://github.com/sjk06'>
          Sooji
        </a>
        ,{' '}
        <a className={styles.bottomLinks} href='https://github.com/kneazle714'>
          Yueran
        </a>
        ,{' '}
        <a className={styles.bottomLinks} href='https://github.com/kyleslugg'>
          Kyle
        </a>
        ,{' '}
        <a className={styles.bottomLinks} href='https://github.com/praisepelumi'>
          Praise
        </a>
        , and{' '}
        <a className={styles.bottomLinks} href='https://github.com/kfan1'>
          Kevin
        </a>
      </div>
    </>
  );
}
