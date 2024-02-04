import { useState } from 'react'
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date(),
    category: editMode ? task.category: null
    })
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //rad sa dugmetom add new task

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8002/todos', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      /* Inspect - nakon submit-a status response-a je 200 */
      if (response.status === 200) {
        console.log('WORKED')
        setShowModal(false)
        getData();
      }

    } catch (err) {
      console.error(err)
    }
  };

  // radjenje sa dugmetom edit

  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8002/todos/${task.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)

        })
      console.log(response)
      if (response.status === 200) {
        setShowModal(false)
        getData();

      }
    } catch (err) {
      console.error(err);
    }

  }

  const handleChange = (e) => {


    const { name, value } = e.target

    /* override objekta sa kojim radimo zavisno od naziva inputa */
    setData(data => ({
      ...data,
      [name]: value
    }))

    // console.log(data)
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task!</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />

          <label>Choose category</label>
          <label>
            <input
              type="radio"
              value="WORK"
              name='category'
              checked={selectedOption === 'WORK'}
              onChange={(e) => {
                handleOptionChange(e);
                handleChange(e);
              }}
              className="radio-input"
            />
            Work
          </label>
          <label>
            <input
              type="radio"
              value="HOME"
              name='category'
              checked={selectedOption === 'HOME'}
              onChange={(e) => {
                handleOptionChange(e);
                handleChange(e);
              }}
              className="radio-input"
              
            />
            Home
          </label>
          <label>
            <input
              type="radio"
              value="TRAVEL"
              name='category'
              checked={selectedOption === 'TRAVEL'}
              onChange={(e) => {
                handleOptionChange(e);
                handleChange(e);
              }}
              className="radio-input"
            />
            Travel
          </label>
          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  );
}

export default Modal