import { useState } from "react";

const Auth = () => {
  const [isLogIn, setIsLogIn] = useState(true)
  const [error, setError] = useState(null)
  const[email,setEmail]= useState(null)
  const[password,setPassword] = useState(null)
  const[confirmPassword,setConfirmPassword] = useState(null)

  console.log(email,password,confirmPassword)
  const viewLogIn = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if(!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match')
      return
    }

    const response= await fetch(`http://localhost:8002/${endpoint}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
   const data= await  response.json()
   console.log(data)
   //kada posaljemo email i password u sign up modu
   //i nama vraca kao data
  }
  /*u slucaju sign-up opcije imamo dodatni input "confirm password"*/
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
          <input type="email"
           placeholder="email"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input type="password" 
          placeholder="password" 
          onChange={(e) => setPassword(e.target.value)}   
          />
          {!isLogIn && <input 
          type="password" 
          placeholder="confirm password" 
          onChange={(e) => setConfirmPassword(e.target.value)}

          />}
          <input type="submit" className="create"
           onClick={ (e) => handleSubmit(e,isLogIn ? 'login' : 'signup')} />
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