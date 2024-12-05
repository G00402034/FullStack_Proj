import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const TaskDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

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

    fetchTask();
  }, [id]);

  if (loading) return <p className="taskDetailsContainer">Loading...</p>;
  if (error) return <p className="taskDetailsContainer">Error: {error}</p>;

  return (
    <div className="taskDetailsContainer">
      <h1 className="taskDetailsTitle">{task.title}</h1>
      <div className="taskDetailsMeta">
        <span>Priority: {task.priority}</span>
        <span>Status: {task.status}</span>
        <span>Due Date: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <p className="taskDetailsDescription">{task.description}</p>
      <div className="taskDetailsButtons">
        <Link href={`/tasks/edit/${id}`}>
          <button className="taskDetailsButton">Edit Task</button>
        </Link>
        <button
          className="taskDetailsButton taskDetailsButtonSecondary"
          onClick={() => router.push('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
