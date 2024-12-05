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

  if (loading) return <p className="taskContainer">Loading...</p>;
  if (error) return <p className="taskContainer">Error: {error}</p>;

  return (
    <div className="taskContainer">
      <div className="taskCard">
        <h1 className="taskTitle">{task.title}</h1>
        <div className="taskMeta">
          <p>
            <span className="metaLabel">Priority:</span> {task.priority}
          </p>
          <p>
            <span className="metaLabel">Status:</span> {task.status}
          </p>
        </div>
        <p className="taskDescription">{task.description}</p>
        <p className="taskMeta">
          <span className="metaLabel">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <div className="buttonGroup">
          <Link href={`/tasks/edit/${id}`}>
            <button className="button">Edit Task</button>
          </Link>
          <button
            className="button buttonSecondary"
            onClick={() => router.push('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;



