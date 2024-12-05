import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
        if (!res.ok) throw new Error('Failed to fetch task');
        const data = await res.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to update task');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="taskContainer">
      <form className="editForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="formLabel">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            className="formInput"
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Description</label>
          <textarea
            name="description"
            value={task.description}
            className="formTextarea"
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            className="formInput"
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Priority</label>
          <select
            name="priority"
            value={task.priority}
            className="formSelect"
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="buttonGroup">
          <button type="submit" className="button">Save</button>
          <button
            type="button"
            className="button buttonSecondary"
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
