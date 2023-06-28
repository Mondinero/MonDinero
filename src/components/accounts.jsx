import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from './link';
import { setAccountData } from '../store/slices/dataSlice';
import styles from '../pages/GraphPageStyles.module.scss';

const Account = (props) => {
  const { name, current, available } = props;
  console.log(name, current, available);
  return (
    <div className={styles.account}>
      <h2>{name}</h2>
      <div>Current Balance: ${current}</div>
      <div>Available Balance: ${available}</div>
    </div>
  );
};

const AccountPane = () => {
  const accountData = useSelector((state) => state.dataSlice.accountData);
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState();

  const getAccountData = async () => {
    const data = await fetch('api/accounts/balance/get', { method: 'POST' });
    const formatted = await data.json();
    console.log(formatted);

    dispatch(setAccountData(formatted));
  };

  useEffect(() => {
    getAccountData();
  }, []);

  useEffect(() => {
    const newAccounts = [];
    for (const row of accountData) {
      newAccounts.push(<Account name={row.name} current={row.current} available={row.available} />);
    }
    setAccounts(newAccounts);
  }, [accountData]);

  return (
    <div>
      <div className={styles.accountData}>{accounts}</div>
      <Link />
    </div>
  );
};

export default AccountPane;
