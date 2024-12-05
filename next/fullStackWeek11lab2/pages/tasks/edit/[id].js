import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
        if (!res.ok) throw new Error('Failed to fetch task');
        const data = await res.json();
        setTask(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTask();
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

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Task</h1>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTask;
