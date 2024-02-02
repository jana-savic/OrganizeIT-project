import React from 'react'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';


const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [user, setUser] = useState(null)
  const userEmail = cookies.Email
  const userRole = cookies.Role

    const signOut = () => {
        console.log('Sign out')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
      };

       //za rolu
    const getUser = async () => {
      try {
          const response = await fetch(`http://localhost:8002/users/${userEmail}`)
          const json = await response.json()
          setUser(json[0])
          setCookie('user_role', json[0].role)
      } catch (err) {
          console.error(err)
      }
  }
  useEffect(() => {
    getUser()
   
}, [])
      
  return (
    <header className="header">
      
      <p>{userRole}</p>

      <h1>Todo App</h1>
      
      <div className="button-container">
            <button className="signout" onClick={signOut}>SIGN OUT</button>
      </div>
      
      
    </header>
  )
}

export default Header