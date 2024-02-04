import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import ListHeader from "../components/ListHeader";
import ListItem from '../components/ListItem';

const User = () => {
  const [tasks, setTasks] = useState(null);
  const [cookies, setCookie] = useCookies(null);
  const [user, setUser] = useState(null);
  const [userEmail] = useState(cookies.Email);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));
  const [selectedCategory, setSelectedCategory] = useState('');

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:8002/users/${userEmail}`);
      const json = await response.json();
      setUser(json[0]);
      setCookie('user_role', json[0].role);
    } catch (err) {
      console.error(err);
    }
  }

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8002/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  }

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue === "ALL" ? "" : selectedValue);
  }

  const filteredTasks = selectedCategory ? sortedTasks?.filter(task => task.category === selectedCategory) : sortedTasks;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks?.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <div>
      <ListHeader listName={'Your list'} getData={getData} />
      <p className="user-email">Welcome back {userEmail}</p>
      {/* ComboBox */}
      <select value={selectedCategory} onChange={handleCategoryChange} className='combo-box'>
        <option className='combo-box-item' value="ALL">ALL</option>
        <option className='combo-box-item' value="WORK">WORK</option>
        <option className='combo-box-item' value="HOME">HOME</option>
        <option className='combo-box-item' value="TRAVEL">TRAVEL</option>
      </select>
      {currentTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      {/* Pagination */}
      {filteredTasks && filteredTasks.length > tasksPerPage && (
        <div className="pagination-container">
          {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }, (_, index) => (
            <button className = "button-page" key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default User;