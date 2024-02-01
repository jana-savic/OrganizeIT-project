import React from 'react'
import ListHeader from "../components/ListHeader";
import ListItem from '../components/ListItem';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Admin } from '../components/Admin';
import User from '../components/User';


const Main = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken
    const [tasks, setTasks] = useState(null)
    const [user, setUser] = useState(null)
    const userEmail = cookies.Email
    const userRole = cookies.Role

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

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8002/todos/${userEmail}`)
            const json = await response.json()
            setTasks(json)
        } catch (err) {
            console.error(err)
        }
    }

    //hook koji se okida svaki put
    useEffect(() => {
        getUser()
        getData()
    }, [])

    console.log(user)

    //sort tasks by date

    const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

//<ListHeader listName={'TO DO :)'} getData={getData} />
    /* <p className="user-email">Welcome back {userEmail}</p>
                    {sortedTasks?.map((task) => <ListItem key={task.id} task={task} />)} */

    return (
        <div className="app">
            
            <p>{userRole}</p>
         
            {userRole === "USER" ?
                <User />  : <Admin />
            }
        </div>
    )
}

export default Main

