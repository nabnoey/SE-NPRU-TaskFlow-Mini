import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, createTask, deleteTask } from "../../redux/taskReducer";
import { Link } from "react-router-dom";

export default function TaskDashboard() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { authUser } = useSelector((state) => state.auth);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  });

  useEffect(() => {
    if (authUser) {
      dispatch(fetchTasks());
    }
  }, [authUser, dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTask(newTask));
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "low",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTask(id));
    }
  };

  if (!authUser) {
    return <div>Please login first</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      {/* Create Task Form */}
      <form
        onSubmit={handleCreate}
        className="card bg-base-100 shadow-xl p-6 mb-6"
      >
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <select
            className="select select-bordered"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered col-span-2"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <select
            className="select select-bordered"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button className="btn btn-primary mt-4" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error.message || "Error"}</p>}

      {/* Tasks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <div className="card-actions justify-end">
                <Link to={`/task/${task._id}`} className="btn btn-primary">
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
