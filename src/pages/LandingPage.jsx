import React, { useContext, useEffect } from 'react';
import { useCredentials } from '../CredentialsProvider';
import Link from '../components/link';

export default function LandingPage() {
  const { linkToken, setLinkToken } = useCredentials();

  // //This bit is temporary...
  const generateToken = async () => {
    const resp = await fetch('api/create_link_token', { method: 'POST' });
    const data = await resp.json();
    console.log(data);
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);
  console.log(linkToken);

  useEffect(() => {
    console.log('Logging linkTokens obj from home page:');
    console.log(linkToken);
  }, [linkToken]);

  return (
    <div>
      Landing Page
      <Link linkToken={linkToken} />
    </div>
  );
}
