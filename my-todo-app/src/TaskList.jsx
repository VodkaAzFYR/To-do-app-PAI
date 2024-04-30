import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    const { data } = await axios.get('http://localhost:5000/tasks');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting the task:', error);
    }
  };
  

  return (
    <div>
      <h1>Lista Zadań</h1>
      {tasks.map(task => (
        <div key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button><Link to={`/edit/${task._id}`}>Edytuj</Link></button>
          <button onClick={() => deleteTask(task._id)}>Usuń zadanie</button>
        </div>
      ))}
      <Link to="/add">Dodaj zadanie</Link>
    </div>
  );
}

export default TaskList;
