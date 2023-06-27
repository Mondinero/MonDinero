import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Link = (props) => {
  const { linkToken } = props;
  const onSuccess = useCallback((public_token, metadata) => {
    fetch('/api/exchange_public_token', {
      method: 'POST',
      body: JSON.stringify({ public_token }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          console.log('Successfully stored access token');
        }
      })
      .catch((err) => {
        console.log(
          `Encountered error while requesting to exchange/store access token: ${err}`
        );
      });
  }, []);

  const config = {
    token: linkToken,
    receivedRedirectUri: null,
    onSuccess
  };
  console.log(config);
  const { open, ready, error } = usePlaidLink(config);
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <button onClick={open}>Link a new account</button>
    </div>
  );
};

export default Link;
