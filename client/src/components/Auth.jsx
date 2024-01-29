import { useState } from "react";

const Auth = () => {
  const [isLogIn, setIsLogIn] = useState(true)
  const [error, setError] = useState(null)

  const viewLogIn = (status) => {
    setError(null)
    setIsLogIn(status)
  }
  /*u slucaju sign-up opcije imamo dodatni input "confirm password"*/
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {!isLogIn && <input type="password" placeholder="confirm password" />}
          <input type="submit" className="create" />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogIn(false)}
            style = {{backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Sign up</button>
          <button
            onClick={() => viewLogIn(true)}
            style = {{backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Log in</button>
        </div>


      </div>
    </div>
  );
}

export default Auth