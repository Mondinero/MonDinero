import React, { useEffect } from 'react';
import Link from '../components/link';
import { useDispatch, useSelector } from 'react-redux';
import { setLinkToken } from '../store/slices/credentialSlice';

function HomePage() {
  const dispatch = useDispatch();
  const linkToken = useSelector((state) => state.credentialSlice.linkToken);

  const generateToken = async () => {
    const resp = await fetch('api/create_link_token', { method: 'POST' });
    const data = await resp.json();
    dispatch(setLinkToken(data.link_token));
  };

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    console.log('Logging linkTokens obj from home page:');
    console.log(linkToken);
  }, [linkToken]);

  return <Link linkToken={linkToken} />;
}

export default HomePage;
