import React from 'react'
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Admin } from '../components/Admin';
import User from '../components/User';
import Footer from '../components/Footer';
import Header from '../components/Header';


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

    //sort tasks by date
    const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="app">
            {userRole === "USER" ?
                <User /> : <Admin />
            }
            <Header />
            <Footer />
        </div>
    )
}

export default Main

