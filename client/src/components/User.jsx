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

  /*Filtriranje*/
  const [selectedCategory, setSelectedCategory] = useState('');

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

  /*Promena odabranog u comboBoxu*/
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "ALL" ? "" : selectedValue);
  }

  const filteredTasks = selectedCategory ? sortedTasks?.filter(task => task.category === selectedCategory) : sortedTasks;

  useEffect(() => {
    getUser()
    getData()
  }, [])


  return (

    <div>

      <ListHeader listName={'Your list'} getData={getData} />
      <p className="user-email">Welcome back {userEmail}</p>

      {/* ComboBox */}
      <select value={selectedCategory} onChange={handleCategoryChange} className='combo-box'>
        <option className = 'combo-box-item' value="ALL">ALL</option>
        <option className = 'combo-box-item' value="WORK">WORK</option>
        <option className = 'combo-box-item' value="HOME">HOME</option>
        <option className = 'combo-box-item' value="TRAVEL">TRAVEL</option>
        {/* Add other category options as needed */}
      </select>
      {/* Display filtered tasks */}
      {filteredTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
    </div>


  )
}

export default User