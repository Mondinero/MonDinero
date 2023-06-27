import React from "react";
import { NavLink, Outlet } from 'react-router-dom';


function RootLayout() {
  return (

    <main>
      <Outlet/>
    </main>
    
  )
}

export default RootLayout;