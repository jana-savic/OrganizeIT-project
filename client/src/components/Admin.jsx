 import React from 'react'
 import { useEffect, useState } from 'react';
 import { useCookies } from "react-cookie";
 import ListHeader from "../components/ListHeader";


export const Admin = () => {

  const [users, setUsers] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userRole = cookies.Role
  const userEmail = cookies.Email
  

  const getAllUsers = async () => {
    try {
        const response = await fetch(`http://localhost:8002/users`)
        const json = await response.json()
        console.log(json); 
        setUsers(json)
        console.log(users)
       
    } catch (err) {
        console.error(err)
    }
}
useEffect(() => {
    // Check if the user is an admin before fetching all users
    if (userRole === 'ADMIN') {
      getAllUsers();
    }
  }, [userRole]);

  //sign out dugme/fja
  const signOut = () => {
    console.log('Sign out')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  };

    return (
        <div>
 
      <h1>User List</h1>
      <ul>
        {users.map((user)=> (
          <li key={user.userEmail}>{user.userRole}
          User: {user.email}, Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
        
    )
} 

  
  export default Admin; 
