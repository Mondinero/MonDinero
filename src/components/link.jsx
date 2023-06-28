import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLinkToken } from '../store/slices/credentialSlice';
import { usePlaidLink } from 'react-plaid-link';

const Link = () => {
  const linkToken = useSelector((state) => state.credentialSlice.linkToken);
  const dispatch = useDispatch();

  const generateToken = async () => {
    const resp = await fetch('/api/create_link_token', { method: 'POST' });
    const data = await resp.json();
    dispatch(setLinkToken(data.link_token));
  };

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    console.log('Logging linkTokens obj from link component:');
    console.log(linkToken);
  }, [linkToken]);

  const onSuccess = (public_token, metadata) => {
    console.log('Metadata:');
    console.dir(metadata);
    fetch('/api/exchange_public_token', {
      method: 'POST',
      body: JSON.stringify({ public_token }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log('Successfully stored access token');
        } else {
          console.log('Received response other than OK when storing access token');
        }
      })
      .catch((err) => {
        console.log(`Encountered error while requesting to exchange/store access token: ${err}`);
      });
  };

  const config = {
    token: linkToken,
    receivedRedirectUri: null,
    onSuccess,
  };
  const { open, ready, error } = usePlaidLink(config);
  if (error) {
    console.log(error);
  }

  return (
    <button onClick={open} disabled={!ready} style={{ borderRadius: '10px', padding: '5px 10px' }}>
      Link a new account
    </button>
  );
};

export default Link;
