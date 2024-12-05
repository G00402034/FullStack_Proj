import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to create task');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="formLabel">Title</label>
          <input
            type="text"
            className="formInput"
            name="title"
            value={task.title}
            placeholder="Enter task title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Description</label>
          <textarea
            className="formTextarea"
            name="description"
            value={task.description}
            placeholder="Enter task description"
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Due Date</label>
          <input
            type="date"
            className="formInput"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Priority</label>
          <select
            className="formSelect"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="buttonGroup">
          <button className="button">Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
