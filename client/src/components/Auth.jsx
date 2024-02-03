import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const [cookie, setCookie] = useCookies(null)
  const [isLogIn, setIsLogIn] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
 
  const navigate = useNavigate()

  const viewLogIn = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match')
      return
    }
    const response = await fetch(`http://localhost:8002/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)
      setCookie('Role', data.role)
      //uspesno logovanje nas vodi do glavne stranice, vise nije u url-u auth
      navigate("/")
    }
    //kada posaljemo email i password u sign up modu
    //i nama vraca kao data
  }

  const handleLinkClick = () => {
    // Navigate to the desired page when the link input is clicked
    window.location.href = '/forgotten';
  };

  /*u slucaju sign-up opcije imamo dodatni input "confirm password"*/
  return (
    <div className="app">
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
              onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
            {error && <p>{error}</p>}

            { isLogIn && <input type="reset" value="Change password" className="forgotten"
              onClick={ handleLinkClick }
            />}
           
                

          </form>
          <div className="auth-options">
            <button
              onClick={() => viewLogIn(false)}
              style={{ backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}
            >Sign up</button>
            <button
              onClick={() => viewLogIn(true)}
              style={{ backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}
            >Log in</button>
          </div>


        </div>
      </div>
     
    </div>
  );
}

export default Auth