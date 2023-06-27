import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Link from './link.jsx';

function RootLayout() {
  return (

    <main>
      <Outlet/>
    </main>
    
  )
}


export default RootLayout;
