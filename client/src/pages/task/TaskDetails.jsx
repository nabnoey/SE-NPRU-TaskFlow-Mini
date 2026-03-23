import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../redux/taskReducer";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t._id === id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id, data: form })).then(() => {
      navigate("/dashboard");
    });
  };

  if (!task) {
    return <div className="container mx-auto p-4">Task not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            className="select select-bordered"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered col-span-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            className="select select-bordered"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Task"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="btn btn-outline"
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}
