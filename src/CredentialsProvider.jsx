import React, { createContext, useContext, useState } from 'react';

const CredentialsContext = createContext(null);
export const useCredentials = () => useContext(CredentialsContext);

const CredentialsProvider = ({ children }) => {
  const [linkToken, setLinkToken] = useState('default-token-val');

  return (
    <CredentialsContext.Provider value={{ linkToken, setLinkToken }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsProvider;
