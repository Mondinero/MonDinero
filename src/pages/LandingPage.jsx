import React from 'react';
import styles from './LandingPageStyles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setColorTheme } from '../store/slices/appSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

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
      if (bodyScroll < 2000)
        document.querySelector('body').setAttribute('position', 'top');
      else if (bodyScroll > 5000 && bodyScroll < 7000)
        document.querySelector('body').setAttribute('position', 'middle');
      else if (bodyScroll > 9000)
        document.querySelector('body').setAttribute('position', 'bottom');
      else document.querySelector('body').setAttribute('position', '');

      if (bodyScroll > 7000)
        document.querySelector('body').setAttribute('arrow', 'stop');
      else document.querySelector('body').setAttribute('arrow', '');

      if (bodyScroll > 10000) document.querySelector('body').setAttribute('zoom', 'zoom');
      else document.querySelector('body').setAttribute('zoom', '');
    },
    false
  );

  const dispatch = useDispatch();
  const colorTheme = useSelector((state) => state.appSlice.colorTheme);
  let currTheme;
  let selectedDay;
  let selectedNight;

  if (
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    colorTheme === null
  ) {
    dispatch(setColorTheme('dark'));
  }

  document.querySelector('body').setAttribute('theme', colorTheme);

  if (colorTheme === 'dark') {
    currTheme = <i className="fa-solid fa-moon"></i>;
    selectedNight = <i className="fa-solid fa-check"></i>;
  } else {
    currTheme = <i className="fa-solid fa-sun"></i>;
    selectedDay = <i className="fa-solid fa-check"></i>;
  }

  return (
    <>
      <div className={styles.bigDiv}>
        <Dropdown className={styles.dropdown}>
          <Dropdown.Toggle className={styles.toggle} variant='success' id='dropdown-basic'>
            <i className='fa-solid fa-bars'></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.menu}>
            <Dropdown.Item className={styles.menuLink} href='/loginPage'>
              Login
            </Dropdown.Item>
            <Dropdown.Item className={styles.menuLink} href='/signupPage'>
              Sign up
            </Dropdown.Item>
            <Dropdown.Item className={styles.menuLink} href='/aboutPage'>
              About
            </Dropdown.Item>
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
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn1}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn2}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn3}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn4}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn5}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn6}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn7}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn8}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn9}`}
        ></i>
        <br />
        <i
          className={`fa-solid fa-arrow-up ${styles.upArrow} ${styles.turn10}`}
        ></i>
        <br />
        <p className={styles.welcome}>WELCOME TO MONDINERO</p>
        <p className={styles.motto}>TAKE BACK CONTROL OF YOUR MONEY</p>
        <p className={styles.logo}>GROWING SEEDS INTO MONEY TREES</p>
        <p className={styles.join}>Join the movement and take back control of your money</p>
        <Link className={styles.joinButton} to='/loginPage'>
          Sign up
        </Link>
      </div>
      <button
        className={styles.darkModeButton}
        onClick={() => {
          if (colorTheme === 'dark') dispatch(setColorTheme('light'));
          else dispatch(setColorTheme('dark'));
        }}
      >
        <i className={`fa-solid fa-moon ${styles.moon}`}></i>
      </button>
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
