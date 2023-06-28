import React from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Link = (props) => {
  const { linkToken } = props;
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
    <div>
      <button onClick={open} disabled={!ready}>
        Link a new account
      </button>
    </div>
  );
};

export default Link;
