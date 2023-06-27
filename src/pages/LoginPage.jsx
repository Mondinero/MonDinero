import React from "react";




function LoginPage() {


  return (
    <React.Fragment>
      <div>
        <form action="">
          <input type="text" placeholder="username" />
          <input type="text" placeholder="password" />
          <button type="submit">Login</button>
        </form>
        
        <button>Not a member?</button>


      </div>
    </React.Fragment>
  )
}

export default LoginPage;