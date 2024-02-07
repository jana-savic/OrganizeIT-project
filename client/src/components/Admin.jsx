import React from 'react'
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

export const Admin = () => {

  const [users, setUsers] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userRole = cookies.Role

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
    //provera 
    if (userRole === 'ADMIN') {
      getAllUsers();
    }
  }, [userRole]);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userEmail}>{user.userRole}
            User: {user.email}, Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin; 
