import React from 'react'
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import ListHeader from "../components/ListHeader";
import ListItem from '../components/ListItem';

const User = () => {
  const [tasks, setTasks] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [user, setUser] = useState(null)
  const userEmail = cookies.Email
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

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

const getData = async () => {
    try {
        const response = await fetch(`http://localhost:8002/todos/${userEmail}`)
        const json = await response.json()
        setTasks(json)
    } catch (err) {
        console.error(err)
    }
}

useEffect(() => {
  getUser()
  getData()
}, [])


  return (
    
        <div>
    
    <ListHeader listName={'TO DO :)'} getData={getData} />
    <p className="user-email">Welcome back {userEmail}</p>
    {sortedTasks?.map((task) => <ListItem key={task.id} task={task} />)}
    </div>
    
    
  )
}

export default User