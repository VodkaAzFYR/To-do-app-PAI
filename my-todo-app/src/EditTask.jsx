import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const { data } = await axios.get(`http://localhost:5000/tasks/${id}`);
    setTitle(data.title);
    setDescription(data.description);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:5000/tasks/${id}`, { title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
      </div>
      <button type="submit">Zapisz zmiany</button>
    </form>
  );
}

export default EditTask;
